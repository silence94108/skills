# 实战坑清单（按症状索引）

每条坑都标注了根因（源码位置指 jzt_common.js）。排查顺序：先对症状，再看根因，最后按规避方案改。

## 症状：回调执行了两次 / 阅读量一次访问 +2 / 数据闪两下

**根因**：`requestWait` 等待队列重放且不清空（`ajaxData` 的 success 里 `requestWait.forEach(waitCallBack)`，源码约 102 行，队列 push 后没有移除逻辑）。

进队列的两种情况：① category.json 还没加载完时发起的一切请求；② 同一 api 的并发请求。只要队列里有积压项，**每次任意 ajax 成功都会整队重放一遍**。

典型触发场景：页面一进来就并行发多个 `requestData`（比如同时拉分类、列表、站点信息）——category 未就绪，全进队列，然后被重放多次。若其中有 `browse: true` 的详情查询，阅读量就被重复上报。

**规避**：
1. **请求串行化**——在上一个请求的回调里发起下一个（分类 → 列表 → 详情的链式写法）。首个请求会把 category 带起来，后续请求走缓存分支不再进队列。
2. `browse: true` 的那次查询**放链条最深处**，且全页只出现一次；上下篇等补充查询一律不带 browse。

## 症状：数据一直不出来，控制台也没报错

按概率排查：

1. **页面没引 jquery 或 jzt_common.js**（或顺序反了，jquery 必须在前）——`requestData is not defined` / `$ is not defined`。
2. **api 名与文件名不符**——`requestData('新闻')` ≠ `jsonDatas/news.json`。文件不存在时 `$.ajax` 静默失败，**回调永远不执行，没有任何报错**。
3. **用 file:// 协议直接双击打开页面**——ajax 读本地 json 被浏览器 CORS 拦截。必须起本地服务（`npx serve`、VSCode Live Server 等）。
4. **category.json 缺失或格式错**——它是一切请求的前置依赖，坏了全站瘫。
5. **数据包本身是空的**——客户端还没录数据。`node -e "console.log(require('./jsonDatas/xxx.json').length)"` 一验便知；空了去客户端补录再重新下载数据包，不是代码问题。
6. `setup()` 里**忘了 return**——数据其实取到了，模板拿不到，渲染空白且无报错。

## 症状：翻页点了没反应 / 永远只有第一页

**根因**：把"本地分页"和"requestData 分页"混用了。常见错误写法：mounted 里带 `limit` 请求一次拿回**第一页**数据存进数组，然后用 computed 对这个数组做 slice 假分页——数组里只有一页的量，怎么切都是它。

**正确姿势**：分页状态只有一份，全权交给 requestData——翻页 = 改 `params.page` + 重新调用（有缓存，纯本地运算不发请求），总页数**只用回调里的 `res.last_page`**，不要自己 `Math.ceil(list.length / pageSize)`。

## 症状：swiper 轮播不动 / 只有第一屏 / 分页点消失

**根因**：swiper 初始化时 `v-for` 的 slide 还没渲染（数据是异步的）。

**规避**：`Vue.watch(数据, () => Vue.nextTick(() => new Swiper(...)))`——官方 demo 的标准时机。不要在 `onMounted` 里直接初始化异步数据驱动的轮播。

## 症状：时间显示成一串数字 / Invalid Date

**根因**：filterDataList 会把 `create_time` 就地转成**毫秒时间戳**（源码约 175 行）。

**规避**：展示前一律 `timeStamp2String(item.create_time, 'Y-m-d')`。反过来，如果拿到的是 `2026-07-14 10:00:00` 字符串说明这条数据没经过筛选管道（datas 传了 null），别对它调 timeStamp2String。

## 症状：详情页"上一篇/下一篇"跨了分类

**根因**：`data_type:'show'` 的 up/down 是**当前筛选范围**内的相邻项。不带 `category_id` 查，相邻的就是全量列表里的邻居。

**规避**：拿到 `info.category_id` 后**再查一次**（带 category_id、不带 browse），用第二次的 up/down。第二次是纯本地运算，无开销。

## 症状：site.json 数据取出来是 undefined / 报 filter 不是函数

**根因**：`site.json` 是**对象**不是数组，走筛选管道会当数组处理而炸。

**规避**：对象型文件（site）一律 `requestData('site', null, cb)`——datas 传 null 跳过筛选。

## 症状：本地改了 json 不生效

requestData 有两层缓存：内存 `jsonArr`（刷新即清）和 sessionStorage（`method:'session'` 时，**关标签页才清**）。改数据后不生效，先普通刷新；还不行说明有 session 缓存，开新标签页或 DevTools → Application → Session Storage 清掉。ajax 的 url 自带 `?v=时间戳`，HTTP 层不会缓存。

## 症状：留言提交没反应 / 提交到了别的站点

1. `$.post` 依赖 jquery——表单页必须引。
2. `site_id` 错了留言会进**别的站点**的后台：id 一定查本站的（update-data.js 下载地址里的 `site_id` 参数，或制作端）。
3. 接口返回 `res.code === 200` 才算成功，其余弹 `res.msg`。

## 移交/验收自查清单

- [ ] 所有数据类内容（文章/产品/证书/轮播）走 requestData，页面无硬编码业务数据
- [ ] 留言表单真实提交（addMsg + 本站 site_id），不是 alert 演示
- [ ] 每页调 `changeWebInfo`，SEO 三件套（title/keywords/description）来自 site.json
- [ ] 详情页 browse 全页仅一次；上下篇限同分类
- [ ] 翻页用 res.last_page；时间用 timeStamp2String
- [ ] 无残留 console.log、无 picsum 等占位图外链
- [ ] jsonDatas 文件名未被改动；jzt_common.js 未被改动
- [ ] 本地起服务全页面点一遍：列表、翻页、tab、详情、上下篇、表单、轮播
