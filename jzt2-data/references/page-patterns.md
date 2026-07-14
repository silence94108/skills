# 标准页面模板（Vue3 setup 风格）

全部模板遵循 demo 仓库（https://gitee.com/Silence108/jzt2.0-demo）的官方写法：无构建、`Vue.createApp` + `setup()`、全局 API 带 `Vue.` 前缀（`Vue.ref` / `Vue.onBeforeMount` / `Vue.watch` / `Vue.nextTick`）。

通用约定：

- 数据请求发起放 `Vue.onBeforeMount`；依赖 DOM 的初始化（swiper、第三方插件）放 `Vue.onMounted` 或 `Vue.watch + Vue.nextTick`。
- `setup()` 里模板要用的一切（数据、方法）**必须 return**，漏 return 的表现是"模板渲染空白但无报错"。
- 公共头/尾组件：对象字面量存 `components/*.js`，页面 `.component('HeaderApp', headerApp)` 链式注册后 `.mount()`。

## 1. 列表页（分页 + 加载更多两用）

```js
Vue.createApp({
  setup() {
    const newsList = Vue.ref([])
    const lastPage = Vue.ref(1)
    const params = Vue.ref({ page: 1, limit: 9, sort: 'timeDesc', category_id: 'xxx' })

    const getList = (mode = '') => {
      requestData('news', params.value, res => {
        const list = res.data
        list.forEach(i => i.create_time = timeStamp2String(i.create_time, 'Y-m-d'))
        newsList.value = mode === 'more' ? newsList.value.concat(list) : list
        lastPage.value = res.last_page          // ← 权威总页数，永远用它，别自己 Math.ceil
      })
    }
    const jumpPage = p => { params.value.page = p; getList() }            // 页码翻页
    const getMore = () => { params.value.page += 1; getList('more') }     // 加载更多

    Vue.onBeforeMount(() => getList())
    return { newsList, params, lastPage, jumpPage, getMore }
  }
}).component('HeaderApp', headerApp).mount('#content-app')
```

分页条模板（demo 原版结构）：

```html
<a v-if="lastPage > 1 && params.page != 1" @click="jumpPage(1)">首页</a>
<a v-if="params.page > 1" @click="jumpPage(params.page - 1)">上一页</a>
<a :class="[{'select': params.page == i}]" v-for="i of lastPage" @click="jumpPage(i)">{{ i }}</a>
<a v-if="lastPage > params.page" @click="jumpPage(params.page + 1)">下一页</a>
<a v-if="lastPage > 1 && params.page != lastPage" @click="jumpPage(lastPage)">尾页</a>
```

带子分类 tab 的列表：先查 `category`（给父分类 id），回调里再查列表（串行，见 pitfalls），tab 切换时重置 `page=1` 再 `getList()`。

## 2. 详情页（正文 + 同分类上下篇 + 阅读量）

```js
Vue.createApp({
  setup() {
    const info = Vue.ref({})      // 条目主体（列表 json 里的字段）
    const detail = Vue.ref({})    // 正文（若单独存 jsonDatas/content/<id>.json）
    const up = Vue.ref(null)
    const down = Vue.ref(null)

    const loadArticle = () => {
      const id = getUrlParam('id')
      // 第一查：browse 计数 + 拿主体（此时 up/down 是全量范围的，不用）
      requestData('news', { id, data_type: 'show', sort: 'timeDesc', type: 'content', browse: true }, res => {
        if (!res.info || !res.info.id) { info.value = { title: '内容不存在或已删除' }; return }
        info.value = res.info
        document.title = res.info.title + ' - 站点名'
        // 正文单独存放时补一查（数据包里有 content/ 目录即此模式；datas 传 null）
        requestData('content/' + res.info.id, null, d => detail.value = d)
        // 第二查：带 category_id 限定同分类上下篇；不带 browse 防重复计数；news.json 已缓存→纯本地运算
        requestData('news', { id, category_id: res.info.category_id, data_type: 'show', sort: 'timeDesc', type: 'content' }, res2 => {
          up.value = res2.up; down.value = res2.down
        })
      })
    }
    Vue.onBeforeMount(() => loadArticle())
    return { info, detail, up, down }
  }
}).component('HeaderApp', headerApp).mount('#detail-app')
```

上下篇跳转链接带上下文：`'news-detail.html?id=' + up.id`（demo 还会带 `category_id`、`sort` 保持浏览语境）。

## 3. 留言表单（真实提交，不是 alert 演示）

官方接口：`POST https://jzt2.china9.cn/api/message/addMsg`，用 jQuery `$.post`（jquery 因此必引）。`content` 的 key 就是制作端留言列表里显示的中文列名，可按站点需要增减字段。

```js
Vue.createApp({
  setup() {
    const message = Vue.ref({ name: '', email: '', phone: '', message: '' })
    const submitMessage = () => {
      if (!message.value.name) return alert('请输入您的姓名')
      if (!message.value.phone) return alert('请输入您的联系电话')
      if (!message.value.message) return alert('请输入您的内容')
      $.post('https://jzt2.china9.cn/api/message/addMsg', {
        site_id: 'SITE_ID',   // ← 本站唯一 id：查 update-data.js 下载地址或制作端，禁止抄别的站
        content: {
          '姓名': message.value.name,
          '邮箱地址': message.value.email,
          '联系电话': message.value.phone,
          '内容': message.value.message,
        }
      }, res => {
        if (res.code === 200) {
          alert('提交成功')
          message.value = { name: '', email: '', phone: '', message: '' }
        } else {
          alert(res.msg)
        }
      })
    }
    return { message, submitMessage }
  }
}).component('HeaderApp', headerApp).mount('#form-app')
```

## 4. 首页轮播（swiper 初始化时机是关键）

轮播数据是异步的，`v-for` 渲染完成前初始化 swiper 会抓不到 slide。官方写法：**watch 数据 → nextTick 里初始化**。

```js
Vue.createApp({
  setup() {
    const bannerList = Vue.ref([])
    Vue.onBeforeMount(() => {
      requestData('carousel', { page: 1, limit: 10, sort: 'sortAsc', category_id: 'xxx' }, res => {
        bannerList.value = res.data
      })
    })
    Vue.watch(bannerList, () => {
      Vue.nextTick(() => {
        new Swiper('.banner-swiper', { loop: true, autoplay: { delay: 5000 } })  // 数据渲染完才初始化
      })
    })
    return { bannerList }
  }
}).component('HeaderApp', headerApp).mount('#index-app')
```

## 5. 站点信息 / SEO（每页都该做）

```js
requestData('site', null, data => {   // site.json 是对象，datas 必须 null
  changeWebInfo(data)  // 动态改 title / meta description / keywords / favicon
})
```

站点字段（官方全表）：`site_id`、`title`、`description`、`keywords`、`icon`、`pc_logo`、`phone_logo`、`company_title`、`company_desc`、`company_phone`、`company_tel`、`company_email`、`company_address`、`company_keep`(备案号)。页脚/联系页直接绑定这些字段，别硬编码公司信息；留言等接口要的 `site_id` 也优先从这里动态取。

## 6. 公共组件（components/*.js）

```js
// components/headerApp.js —— 对象字面量，template 字符串 + setup
let headerApp = {
  template: `
    <div class="hd1-a1">
      <div class="hd1-a4" v-for="item in menuList"><a :href="item.link">{{ item.name }}</a></div>
    </div>
  `,
  setup() {
    const menuList = [ { name: '首页', link: './index.html' } /* ... */ ]  // 导航硬编码是官方惯例，不算违规
    return { menuList }
  }
}
```

需要站点数据（logo、电话）的组件在自己的 `setup` 里调 `requestData('site', null, ...)` 即可——有缓存，多组件重复调用无额外开销。
