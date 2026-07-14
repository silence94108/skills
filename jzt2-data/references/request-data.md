# requestData 深度参考

来源：demo 仓库 README + `jzt_common.js` 源码逐行核对。本文描述的是源码真实行为，与官方 README 有出入处以源码为准。

## 函数签名

```js
requestData(api, datas = null, callBack, async = true)
```

- `api`：JSON 文件名（不带 `.json`）。支持子路径：`'content/6a5498f4...'` → `jsonDatas/content/6a5498f4....json`（文章正文详情就这么存的）。
- `datas`：传 `null` 时**跳过全部筛选逻辑**，回调拿到整个 json 原文（`site.json` 这种对象型文件必须传 null，走筛选会当数组处理而报错）。
- `callBack(result)`：结果回调。**没有失败回调**——文件不存在时 `$.ajax` 静默失败，回调永远不执行，页面表现为"数据一直不出来"。

## 内部机制（能解释所有怪现象）

```
requestData(api, ...)
  ├─ 1. category.json 加载了吗？
  │     没有 → 当前请求推入 requestWait 队列，先去拉 category
  ├─ 2. api 的数据在缓存里吗？（内存 jsonArr 或 sessionStorage）
  │     在 → 纯本地 filterDataList 过滤 → 回调，零网络请求
  ├─ 3. 该 api 正在请求中吗？（requestList 去重）
  │     是 → 推入 requestWait 队列等待
  └─ 4. 发起 $.ajax(baseUrl + api + '.json?v=' + 时间戳)
        成功 → 缓存 → 回调 → 重放 requestWait 队列里的积压请求
```

三个关键推论：

1. **category.json 是一切的前置**。任何页面第一次 `requestData` 都会先拉 category。category.json 缺失或格式错 → 全站数据瘫痪。
2. **requestWait 队列重放不清空**（源码 `ajaxData` success 里 `requestWait.forEach(...)` 后没有清空逻辑）。多个请求排队时，每次 ajax 成功都会把队列里**所有**积压项重放一遍 → 排队中的回调可能被执行多次。规避方式见 pitfalls.md（核心：请求串行化，在上一个回调里发起下一个）。
3. **缓存粒度是整个 json 文件**。首次拉取后，同一 api 换任何筛选条件都是本地运算——按分类切 tab、翻页、上下篇都不需要"防抖/节流/loading 竞态"这类网络思维。

## 筛选执行顺序（filterDataList）

理解顺序才能预判结果：

1. `column_id` 过滤
2. `create_time` 字符串 → **时间戳**（就地修改数据）
3. `is_top==1` 提取置顶 + 按 `sort` 排序 → 置顶在前拼接
4. `category_id` 过滤：
   - 查 `category`/`navigation` 时：匹配 `item.pid == category_id`（**给父分类 id，返回子分类列表**）
   - 查内容数据时：`item.category_id` 支持**逗号分隔多分类**，任一命中即保留
   - `list_type:'all'`：先递归收集 category_id 的全部子孙分类，内容命中其一即保留
   - `list_type:'children'`：只对 category 查询有意义，返回带 `children` 嵌套的分类树
5. `type` 过滤（`item.type == type`）
6. `search_name` 搜索（默认 title 模糊；`exact_search` 精确；`search_in_intro_detail` 连简介详情一起搜）
7. `id` 过滤 → 同时在**过滤后的列表**里记录相邻项为 `up`/`down` → `browse:true` 且 `type` 命中白名单时 POST 阅读量
8. 分页切片（`limit:-1` 不切）
9. 给每条附加 `item.category` 面包屑数组（含全部父级、`level` 层级字段，已按层级从顶到底排序）

## 三种 data_type 返回形状

```js
// 'page'（默认）—— 列表页
{ total: 23, last_page: 3, data: [...] }

// 'list' —— 下拉/tab/全量场景（常配 limit:-1）
[...]

// 'show' —— 详情页
{ up: {...}|null, down: {...}|null, info: {...} }  // 查无此 id 时 info 为 {}
```

## 场景菜谱

```js
// 1. 子分类 tab（给父分类 id 查 category）
requestData('category', { category_id: PARENT_ID, data_type: 'list', sort: 'sortAsc', limit: -1 }, list => {})

// 2. 分页列表
requestData('news', { category_id: cateId, page: 1, limit: 9, sort: 'timeDesc', data_type: 'page' }, res => {
  // res.last_page 是权威总页数，翻页时改 page 重新调用（本地运算，无网络开销）
})

// 3. 详情 + 同分类上下篇 + 阅读量
requestData('news', { id, data_type: 'show', sort: 'timeDesc', type: 'content', browse: true }, res => {
  // res.info 主体；正文若单独存放：requestData('content/' + res.info.id, null, detail => {})
})
requestData('news', { id, category_id: info.category_id, data_type: 'show', sort: 'timeDesc', type: 'content' }, res2 => {
  // 不带 browse（避免二次计数），res2.up / res2.down 即同分类上下篇
})

// 4. 站点信息（对象型文件，datas 必须 null）
requestData('site', null, data => { changeWebInfo(data) })

// 5. 首页各板块共用一个 api 不同条件（零额外请求）
requestData('news', { limit: 3, sort: 'timeDesc', data_type: 'list' }, list => {})
```

## 附属工具函数（jzt_common.js 内置）

```js
timeStamp2String(time, 'Y-m-d h:i:s')  // 时间戳(10/13位皆可)→字符串；格式符 Y m d h i s 自由组合，如 'Y年m月d日'
getUrlParam('id')                       // 取地址栏参数，中文自动 decodeURIComponent，取不到返回 null
changeWebInfo(siteInfo)                 // 动态改 document.title / meta description / keywords / favicon
                                        // 字段：siteInfo.title .description .keywords .icon
new Base64().encode(str) / .decode(str) // 内置 Base64 工具类
```

## 数据文件字段约定（客户端导出的通用结构）

内容类条目常见字段：`id`、`title`、`intro`(简介)、`details`(富文本详情)、`bg_img`(封面图)、`category_id`(可逗号分隔)、`label_id`、`sort`、`is_top`、`status`(1上线/0下线)、`type`、`column_id`、`site_id`、`create_time`、`update_time`、`gl_list`(关联数据)。

`category.json` 条目：`id`、`pid`(父分类，顶级为 0)、`title`、`type`(content/goods/image/text/carousel/navigation)、`sort`、`column_id`。

`site.json`（对象，官方完整字段）：`site_id`、`icon`、`title`、`keywords`、`description`、`company_title`(公司名)、`company_desc`(简介)、`company_address`、`company_keep`(备案号)、`company_phone`、`company_tel`(传真)、`company_email`、`pc_logo`、`phone_logo`。注意 **site_id 就在里面**——需要 site_id 的接口（留言/简历/上传等）优先 `requestData('site', null, ...)` 动态取，客户端没录站点信息（site.json 为 `{}`）时才退回查 update-data.js。

## 特殊数据类型备忘

- **navigation（导航管理）**：查询必传 `type: 'navigation'`；`category_id` 传 `0` 取全部；`list_type: 'children'` 返回带 `children` 嵌套的层级树（多级导航直接可用）；条目字段有 `pid`、`image_intro`(图标)。
- **recruitment（招聘）**：`requestData('recruitment', {...})` 查职位列表，字段 `title`(职位名)、`intro`、`details`(职位要求)；投递简历走 HTTP 接口（见 http-api-common.md 的"提交简历"，附件先走上传接口拿链接）。
- **product（商品）与 goods（产品）是两种独立类型**：分别对应制作端"商品管理"和"产品管理"栏目，datas 参数一致，别混用文件名。
- 官方 showdoc 文档与 jzt_common.js 源码有出入时（如 `search_to_lowerCase` 默认值文档写 true、源码是 false），**以源码为准**。
