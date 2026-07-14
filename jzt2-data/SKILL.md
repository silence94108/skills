---
name: jzt2-data
description: 建站通2.0（jzt2.china9.cn）静态站点开发与数据对接规范，含官方接口文档全量归档。只要项目根目录有 jsonDatas/ 目录、或页面引入了 js/jzt_common.js、或用户提到"建站通"、"jzt"、"requestData"、"数据包"、"制作端/客户端"，在新建页面、对接数据、改造页面、查接口文档、排查"数据不出来/回调重复执行/阅读量翻倍/翻页不对"这类问题之前，务必先读本 skill——requestData 的缓存与等待队列机制不看源码说明极易踩坑。涵盖：requestData 全参数、Vue3 setup 标准页面写法（列表/详情/表单/轮播/站点信息）、服务端 HTTP 接口（留言/简历提交、文件上传、用户注册登录、短信、微信支付宝支付、票务、人力资源）、阅读量统计防重复、数据包更新流程与纪律红线。
---

# 建站通2.0 数据对接与页面开发规范

建站通2.0 是资海云的静态化建站体系：客户在**客户端**（https://jzt2.china9.cn/）录入数据 → 制作人员下载数据包（JSON）解压到项目 `jsonDatas/` → 前端页面通过 `jzt_common.js` 的 `requestData()` 纯本地读取渲染 → 打 zip 经**制作端**（https://jzt2.china9.cn/make/）传 FTP。

**技术形态**：无构建多页站（每个 html 一个独立 Vue 应用），官方强制 Vue 3，页面逻辑用 Composition API（`Vue.createApp({ setup() {...} })` + `Vue.ref`）。没有自建后端——需要动态能力时直连建站通服务器的 HTTP 接口（留言、阅读量、文件上传、站点用户、短信、支付、票务等，官方接口文档已全量归档在 `references/http-api-common.md` 和 `references/http-api-business.md`）。

## 纪律红线（违反 = 站点数据对不上）

1. **`jsonDatas/` 内的文件名、目录名一律不许改**——`requestData('news')` 就是按文件名读 `jsonDatas/news.json`。
2. **不许改 `jzt_common.js`**——它是官方公共库，各站点应保持一致（校验：与 demo 仓库 md5 一致）。
3. **`category.json`、`label.json`、`site.json` 是官方固定文件**；其余（news/goods/about…）是客户端栏目导出的自定义数据包，文件名由制作端栏目决定。
4. **site_id 别硬编码抄别的项目**——每个站点唯一。查法：看项目 `update-data.js` 里下载地址的 `site_id` 参数，或登录制作端查看。
5. **留言接口必须带 `column_id`（留言栏目 id）**——官方示例省略了它且实测不传也返回 200，但留言不会归档到制作端对应栏目。它在数据包里查不到，只能登录制作端查看；**拿不到就停下来问用户要，不许省略、不许猜、不许抄别的站**。详见 `references/page-patterns.md` §3。

## 页面必引清单（顺序敏感）

```html
<script src="./js/jquery.min.js"></script>      <!-- 必须在 jzt_common 之前：requestData 用 $.ajax -->
<script src="./js/vue.global.prod.js"></script> <!-- Vue3，官方强制 -->
<script src="./js/jzt_common.js"></script>      <!-- requestData / timeStamp2String / getUrlParam / changeWebInfo -->
```

任何要调 `requestData` 的页面漏引 jquery 或 jzt_common 都会直接报错。另外：

- CSS 里要有 `[v-cloak] { display: none; }`，挂载根节点加 `v-cloak` 防模板闪烁。
- `jzt_common.js` 末尾的 `statistics()` 是**引入即执行**的，会向建站通服务器上报访问统计——本地开发时看到这个请求属正常，不要删。

## requestData 30 秒速查

```js
requestData(api, datas, callBack)
// api: json 文件名，不带后缀。'news' → jsonDatas/news.json；'content/<id>' → jsonDatas/content/<id>.json
// datas: 筛选条件对象，传 null 则原样返回整个 json
```

常用 datas 参数：

| 参数 | 说明 |
|---|---|
| `data_type` | `'page'`(默认)→`{total, last_page, data}`；`'list'`→纯数组；`'show'`→`{up, down, info}` 详情 |
| `page` / `limit` | 分页，limit 默认 10，**取全部传 -1** |
| `category_id` | 分类筛选；查 `category` 本身时按 `pid` 匹配（即"查它的子分类"） |
| `id` | 详情筛选，配 `data_type:'show'` 用 |
| `sort` | `timeAsc/timeDesc/sortAsc/sortDesc`；`is_top==1` 的数据恒置顶 |
| `list_type` | `alone`(默认，仅当前分类) / `all`(含所有子级) / `children`(分类树递归) |
| `type` | `goods/content/product/text/carousel/image/navigation`，主要筛 category；**详情要计阅读量时必传** |
| `browse` | `true` 时上报阅读量（仅详情），有重复计数坑，见 pitfalls |
| `method` | `'session'` 用 sessionStorage 跨页缓存；默认内存缓存（仅当前页面有效） |
| `search_name` | 标题模糊搜索，配 `exact_search`/`search_to_lowerCase`/`search_in_intro_detail` |

**行为要点**（源码级，README 里没有）：
- 一切请求都**先保证 `category.json` 已加载**，它是隐性前置依赖。
- 同一 api 首次 ajax 后缓存进内存，后续调用**纯本地过滤，零请求**——同页多次、不同条件调用同一 api 很廉价。
- 返回的列表项会被自动附加 `item.category`（含父链、带 level 的面包屑数组）；`create_time` 被转成**时间戳**，展示前必须 `timeStamp2String(t, 'Y-m-d')`。
- `data_type:'show'` 的 `up/down` 是**当前筛选结果里**的相邻项——要"同分类上下篇"就带着 `category_id` 查。

## 标准页面骨架（setup 风格）

```html
<div id="page-app" v-cloak>
  <header-app></header-app>
  <div v-for="item in list">{{ item.title }}</div>
</div>
<script src="components/headerApp.js"></script>
<script>
  Vue.createApp({
    setup() {
      const list = Vue.ref([])
      const getList = () => {
        requestData('news', { page: 1, limit: 10, sort: 'timeDesc', category_id: 'xxx' }, res => {
          res.data.forEach(i => i.create_time = timeStamp2String(i.create_time, 'Y-m-d'))
          list.value = res.data
        })
      }
      Vue.onBeforeMount(() => getList())   // 数据请求放 onBeforeMount
      return { list }                       // 模板用到的必须 return
    }
  }).component('HeaderApp', headerApp).mount('#page-app')
</script>
```

公共组件模式：对象字面量 `{ template: '...', setup() {...} }` 存 `components/*.js`，页面里 `.component()` 注册。

## 深入阅读（按需读，别一次全读）

| 场景 | 读这个 |
|---|---|
| 列表分页/加载更多、详情页上下篇、留言表单提交、首页轮播 swiper、站点信息 SEO | `references/page-patterns.md` |
| requestData 参数细节、缓存/等待队列源码机制、搜索/分类树查询、navigation/recruitment 等特殊类型 | `references/request-data.md` |
| 数据不出来、回调执行两次、阅读量翻倍、翻页失灵、swiper 不动 | `references/pitfalls.md` |
| 服务端 HTTP 接口（官方文档归档）：留言/简历提交、浏览量查询、自定义信息 CRUD、关联列表、文件上传、站点用户注册登录、短信、通用记录 | `references/http-api-common.md` |
| 电商/票务/人才站专用接口：微信/支付宝支付与退款、订单、票务、职位/人才/租房 | `references/http-api-business.md` |

## 数据包更新

客户端改完数据后，重新下载解压到 `jsonDatas/`（勿改名），或项目里备有 `update-data.js` 脚本时直接 `node update-data.js`（自动下载 `https://jzt2.china9.cn/api/Download/index?site_id=<本站id>` 并解压、备份旧包到 `jsonDatas_backup/`）。

官方文档：https://www.showdoc.com.cn/2047618105032301/9242649531105122 ；demo 仓库：https://gitee.com/Silence108/jzt2.0-demo
