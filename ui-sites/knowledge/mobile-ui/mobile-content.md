## 二、核心页面模式

### 2.1 Onboarding（引导页）

**描述：** 用户首次打开 App 时看到的介绍流程，帮助用户了解核心功能、完成必要设置。好的引导页应简洁、有价值、可跳过。

**四种主要模式：**

#### A. 轮播引导（Carousel）
最常见的形式，3-5 屏图文展示核心功能。

```html
<div class="onboarding">
  <button class="onboarding__skip">跳过</button>

  <div class="onboarding__slides" id="slides">
    <div class="onboarding__slide onboarding__slide--active">
      <div class="onboarding__illustration">
        <img src="illustration-1.svg" alt="功能介绍" />
      </div>
      <h2 class="onboarding__title">智能推荐</h2>
      <p class="onboarding__desc">基于你的喜好，为你精选优质内容</p>
    </div>
    <div class="onboarding__slide">
      <div class="onboarding__illustration">
        <img src="illustration-2.svg" alt="功能介绍" />
      </div>
      <h2 class="onboarding__title">社交分享</h2>
      <p class="onboarding__desc">一键分享精彩时刻给好友</p>
    </div>
    <div class="onboarding__slide">
      <div class="onboarding__illustration">
        <img src="illustration-3.svg" alt="功能介绍" />
      </div>
      <h2 class="onboarding__title">云端同步</h2>
      <p class="onboarding__desc">数据安全存储，多设备无缝切换</p>
    </div>
  </div>

  <div class="onboarding__footer">
    <div class="onboarding__dots">
      <span class="onboarding__dot onboarding__dot--active"></span>
      <span class="onboarding__dot"></span>
      <span class="onboarding__dot"></span>
    </div>
    <button class="onboarding__next">下一步</button>
  </div>
</div>
```

```css
.onboarding {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background: #fff;
  padding: env(safe-area-inset-top) 0 env(safe-area-inset-bottom);
}

.onboarding__skip {
  align-self: flex-end;
  padding: 12px 20px;
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;
}

.onboarding__slides {
  flex: 1;
  display: flex;
  overflow: hidden;
  scroll-snap-type: x mandatory;
}

.onboarding__slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  text-align: center;
}

.onboarding__illustration {
  width: 240px;
  height: 240px;
  margin-bottom: 48px;
}

.onboarding__illustration img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.onboarding__title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px;
}

.onboarding__desc {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  max-width: 280px;
}

.onboarding__footer {
  padding: 24px 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.onboarding__dots {
  display: flex;
  gap: 8px;
}

.onboarding__dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #DDD;
  transition: all 300ms ease;
}

.onboarding__dot--active {
  width: 24px;
  background: #007AFF;
}

.onboarding__next {
  padding: 14px 32px;
  border-radius: 12px;
  border: none;
  background: #007AFF;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
```

#### B. 渐进式引导（Progressive Disclosure）
用户实际使用时，在功能首次出现时给予提示。

**设计要点：**
- 使用 Tooltip / Coach Mark 指向具体 UI 元素
- 半透明遮罩突出目标区域
- 每次只解释一个功能
- 提供"知道了"按钮关闭

#### C. 权限请求引导
在系统弹窗前先用自定义页面说明权限用途。

**设计要点：**
- 说明为什么需要该权限（用具体场景说明）
- 提供"允许"和"暂不开启"两个选项
- 不要在首次启动时一次请求所有权限
- 在用户即将使用相关功能时再请求

#### D. 个性化设置引导
让用户选择兴趣标签、主题偏好等。

**设计要点：**
- 最少选择 3 个标签
- 标签可多选，有明确的选中状态
- 提供进度指示（第 1/3 步）
- 可以跳过，稍后在设置中修改

---

### 2.2 Login / Register（登录注册）

**描述：** 用户身份认证流程，现代移动端登录趋向极简化，社交登录和手机验证码已成为主流。

**三种主要模式：**

#### A. 社交登录（Social Login）

```html
<div class="login-page">
  <div class="login-page__brand">
    <img class="login-page__logo" src="logo.svg" alt="App Logo" />
    <h1 class="login-page__app-name">应用名称</h1>
    <p class="login-page__tagline">一句话描述你的产品</p>
  </div>

  <div class="login-page__social">
    <button class="social-btn social-btn--apple">
      <svg width="20" height="24"><!-- Apple icon --></svg>
      <span>通过 Apple 登录</span>
    </button>
    <button class="social-btn social-btn--google">
      <svg width="20" height="20"><!-- Google icon --></svg>
      <span>通过 Google 登录</span>
    </button>
    <button class="social-btn social-btn--wechat">
      <svg width="24" height="20"><!-- WeChat icon --></svg>
      <span>微信登录</span>
    </button>
  </div>

  <div class="login-page__divider">
    <span>或</span>
  </div>

  <button class="login-page__email-btn">使用手机号/邮箱登录</button>

  <footer class="login-page__footer">
    <p class="login-page__terms">
      登录即表示同意 <a href="#">用户协议</a> 和 <a href="#">隐私政策</a>
    </p>
  </footer>
</div>
```

```css
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 0 24px;
  padding-top: calc(env(safe-area-inset-top) + 80px);
  padding-bottom: env(safe-area-inset-bottom);
  background: #fff;
}

.login-page__brand {
  text-align: center;
  margin-bottom: 48px;
}

.login-page__logo {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.login-page__app-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
}

.login-page__tagline {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.login-page__social {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: 1px solid #E5E5E5;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.social-btn--apple {
  background: #000;
  color: #fff;
  border-color: #000;
}

.social-btn--google {
  background: #fff;
  color: #333;
}

.social-btn--wechat {
  background: #07C160;
  color: #fff;
  border-color: #07C160;
}

.login-page__divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 24px 0;
  color: #999;
  font-size: 14px;
}

.login-page__divider::before,
.login-page__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E5E5;
}

.login-page__divider span {
  padding: 0 16px;
}

.login-page__email-btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: none;
  background: #F5F5F5;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.login-page__footer {
  margin-top: auto;
  padding: 24px 0;
}

.login-page__terms {
  font-size: 12px;
  color: #999;
  text-align: center;
  line-height: 1.5;
}

.login-page__terms a {
  color: #007AFF;
  text-decoration: none;
}
```

#### B. 手机验证码登录

**设计要点：**
- 手机号输入：自动国家码、数字键盘
- 验证码倒计时：60秒，显示剩余时间
- 自动填充：支持 SMS AutoFill（iOS）和 SMS Retriever（Android）
- 输入框：独立的 4-6 位数字框，逐格输入

#### C. 生物识别登录

**设计要点：**
- Face ID / Touch ID 图标清晰可见
- 作为快捷入口，非首次登录默认方式
- 失败时自动回退到密码/验证码
- 首次使用时需要用户授权

---

### 2.3 Home / Feed（首页信息流）

**描述：** App 首页是用户最常访问的页面，信息流是展示内容的核心区域。不同类型的内容适合不同的布局模式。

#### A. 卡片流（Card Feed）

```html
<div class="feed">
  <!-- 搜索栏 -->
  <div class="feed__search">
    <div class="search-bar">
      <svg class="search-bar__icon" width="16" height="16"><!-- search --></svg>
      <input class="search-bar__input" placeholder="搜索内容..." readonly />
    </div>
  </div>

  <!-- 横向分类 -->
  <div class="feed__categories">
    <button class="category-chip category-chip--active">推荐</button>
    <button class="category-chip">科技</button>
    <button class="category-chip">设计</button>
    <button class="category-chip">生活</button>
    <button class="category-chip">音乐</button>
  </div>

  <!-- 内容卡片 -->
  <div class="feed__list">
    <article class="card">
      <img class="card__image" src="cover.jpg" alt="" loading="lazy" />
      <div class="card__body">
        <h3 class="card__title">文章标题最多显示两行文字截断</h3>
        <p class="card__excerpt">这里是文章摘要，最多显示两行，多余内容省略号截断...</p>
        <footer class="card__footer">
          <div class="card__author">
            <img class="card__author-avatar" src="avatar.jpg" alt="" />
            <span class="card__author-name">作者名</span>
          </div>
          <div class="card__meta">
            <span>3小时前</span>
            <span>·</span>
            <span>128 赞</span>
          </div>
        </footer>
      </div>
    </article>
  </div>
</div>
```

```css
.feed__search {
  padding: 8px 16px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 12px;
  background: #F5F5F5;
  border-radius: 10px;
}

.search-bar__input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #999;
  outline: none;
}

.feed__categories {
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.feed__categories::-webkit-scrollbar {
  display: none;
}

.category-chip {
  flex-shrink: 0;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid #E5E5E5;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
}

.category-chip--active {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

.feed__list {
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid #F0F0F0;
}

.card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card__body {
  padding: 12px 16px 16px;
}

.card__title {
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 6px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__excerpt {
  font-size: 14px;
  color: #999;
  margin: 0 0 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__author {
  display: flex;
  align-items: center;
  gap: 6px;
}

.card__author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.card__author-name {
  font-size: 13px;
  color: #666;
}

.card__meta {
  display: flex;
  gap: 4px;
  font-size: 12px;
  color: #999;
}
```

#### B. 瀑布流（Masonry / Waterfall）

**设计要点（参考 Mobbin 中 Pinterest、小红书等案例）：**
- 双列布局，列间距 8-12px
- 卡片高度不固定，图片按原始比例展示
- 使用 CSS Multi-Column 或 JavaScript 计算定位
- 底部无限加载
- 卡片包含：图片 + 标题 + 用户信息 + 互动数据

```css
/* Masonry / Waterfall Layout */
.waterfall {
  columns: 2;
  column-gap: 8px;
  padding: 8px;
}

.waterfall__item {
  break-inside: avoid;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.waterfall__image {
  width: 100%;
  display: block;
}

.waterfall__info {
  padding: 8px;
}

.waterfall__title {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.waterfall__author {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
}

.waterfall__author-avatar {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
```

---

### 2.4 Search（搜索）

**描述：** 搜索页面应覆盖搜索全流程：输入前（热门/历史）、输入中（即时建议）、结果展示（筛选/排序）。

```html
<div class="search-page">
  <!-- 搜索输入区 -->
  <header class="search-page__header">
    <div class="search-input">
      <svg class="search-input__icon" width="16" height="16"><!-- search --></svg>
      <input class="search-input__field" type="search"
             placeholder="搜索商品、品牌..." autofocus />
      <button class="search-input__clear" hidden>
        <svg width="16" height="16"><!-- clear --></svg>
      </button>
    </div>
    <button class="search-page__cancel">取消</button>
  </header>

  <!-- 搜索前：热门+历史 -->
  <div class="search-page__before">
    <section class="search-section">
      <div class="search-section__header">
        <h3 class="search-section__title">搜索历史</h3>
        <button class="search-section__clear">清除</button>
      </div>
      <div class="search-tags">
        <span class="search-tag">iPhone 15</span>
        <span class="search-tag">蓝牙耳机</span>
        <span class="search-tag">运动鞋</span>
      </div>
    </section>

    <section class="search-section">
      <h3 class="search-section__title">热门搜索</h3>
      <ol class="hot-search">
        <li class="hot-search__item">
          <span class="hot-search__rank hot-search__rank--top">1</span>
          <span class="hot-search__text">年货节</span>
          <span class="hot-search__badge">热</span>
        </li>
        <li class="hot-search__item">
          <span class="hot-search__rank hot-search__rank--top">2</span>
          <span class="hot-search__text">冬季外套</span>
        </li>
        <li class="hot-search__item">
          <span class="hot-search__rank hot-search__rank--top">3</span>
          <span class="hot-search__text">保温杯</span>
          <span class="hot-search__badge hot-search__badge--new">新</span>
        </li>
      </ol>
    </section>
  </div>

  <!-- 搜索中：即时建议 -->
  <div class="search-page__suggest" hidden>
    <ul class="suggest-list">
      <li class="suggest-list__item">
        <svg width="16" height="16"><!-- search --></svg>
        <span>iPhone <strong>15 Pro Max</strong></span>
      </li>
      <li class="suggest-list__item">
        <svg width="16" height="16"><!-- search --></svg>
        <span>iPhone <strong>15 手机壳</strong></span>
      </li>
    </ul>
  </div>
</div>
```

```css
.search-page__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  padding-top: calc(env(safe-area-inset-top) + 8px);
  background: #fff;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 12px;
  background: #F5F5F5;
  border-radius: 10px;
}

.search-input__field {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  outline: none;
}

.search-input__clear {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.search-page__cancel {
  background: none;
  border: none;
  color: #007AFF;
  font-size: 16px;
  white-space: nowrap;
  padding: 0;
}

.search-section {
  padding: 16px;
}

.search-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.search-section__title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.search-section__clear {
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
}

.search-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.search-tag {
  padding: 6px 14px;
  border-radius: 16px;
  background: #F5F5F5;
  font-size: 14px;
  color: #333;
}

.hot-search {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
}

.hot-search__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.hot-search__rank {
  width: 20px;
  font-size: 15px;
  font-weight: 700;
  color: #999;
  text-align: center;
}

.hot-search__rank--top {
  color: #FF6B00;
}

.hot-search__text {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.hot-search__badge {
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #FF3B30;
  color: #fff;
}

.hot-search__badge--new {
  background: #34C759;
}

.suggest-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggest-list__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 15px;
  color: #666;
  border-bottom: 0.5px solid #F0F0F0;
}

.suggest-list__item strong {
  color: #1a1a1a;
  font-weight: 600;
}
```

---

### 2.5 Profile / Settings（个人中心 / 设置）

**描述：** 展示用户信息和 App 设置的页面。采用分组列表布局，iOS 使用 Inset Grouped 样式，Android 使用 Material 分组。

```html
<div class="profile-page">
  <!-- 用户信息头部 -->
  <header class="profile-header">
    <img class="profile-header__avatar" src="avatar.jpg" alt="" />
    <div class="profile-header__info">
      <h2 class="profile-header__name">用户昵称</h2>
      <p class="profile-header__bio">这是一段简短的个人签名</p>
    </div>
    <svg class="profile-header__arrow" width="8" height="14"><!-- chevron --></svg>
  </header>

  <!-- 数据统计 -->
  <div class="profile-stats">
    <div class="profile-stats__item">
      <span class="profile-stats__value">128</span>
      <span class="profile-stats__label">关注</span>
    </div>
    <div class="profile-stats__item">
      <span class="profile-stats__value">1.2k</span>
      <span class="profile-stats__label">粉丝</span>
    </div>
    <div class="profile-stats__item">
      <span class="profile-stats__value">56</span>
      <span class="profile-stats__label">获赞</span>
    </div>
  </div>

  <!-- 功能列表 -->
  <section class="settings-group">
    <a class="settings-item" href="#">
      <div class="settings-item__left">
        <div class="settings-item__icon settings-item__icon--orange">
          <svg width="20" height="20"><!-- orders icon --></svg>
        </div>
        <span class="settings-item__text">我的订单</span>
      </div>
      <div class="settings-item__right">
        <span class="settings-item__badge">2</span>
        <svg width="8" height="14"><!-- chevron --></svg>
      </div>
    </a>
    <a class="settings-item" href="#">
      <div class="settings-item__left">
        <div class="settings-item__icon settings-item__icon--red">
          <svg width="20" height="20"><!-- favorites icon --></svg>
        </div>
        <span class="settings-item__text">我的收藏</span>
      </div>
      <svg width="8" height="14"><!-- chevron --></svg>
    </a>
  </section>

  <section class="settings-group">
    <div class="settings-item">
      <div class="settings-item__left">
        <div class="settings-item__icon settings-item__icon--blue">
          <svg width="20" height="20"><!-- dark mode icon --></svg>
        </div>
        <span class="settings-item__text">深色模式</span>
      </div>
      <label class="toggle">
        <input type="checkbox" class="toggle__input" />
        <span class="toggle__slider"></span>
      </label>
    </div>
    <a class="settings-item" href="#">
      <div class="settings-item__left">
        <div class="settings-item__icon settings-item__icon--green">
          <svg width="20" height="20"><!-- language icon --></svg>
        </div>
        <span class="settings-item__text">语言</span>
      </div>
      <div class="settings-item__right">
        <span class="settings-item__detail">简体中文</span>
        <svg width="8" height="14"><!-- chevron --></svg>
      </div>
    </a>
  </section>
</div>
```

```css
.profile-page {
  background: #F2F2F7; /* iOS grouped background */
  min-height: 100vh;
  min-height: 100dvh;
  padding-bottom: env(safe-area-inset-bottom);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 16px;
  margin: 8px 16px;
  background: #fff;
  border-radius: 12px;
}

.profile-header__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  flex-shrink: 0;
}

.profile-header__info {
  flex: 1;
  min-width: 0;
}

.profile-header__name {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
}

.profile-header__bio {
  font-size: 14px;
  color: #999;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  margin: 8px 16px;
  background: #fff;
  border-radius: 12px;
}

.profile-stats__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.profile-stats__value {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.profile-stats__label {
  font-size: 13px;
  color: #999;
}

.settings-group {
  margin: 8px 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  text-decoration: none;
  color: inherit;
  border-bottom: 0.5px solid #F0F0F0;
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-item__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.settings-item__icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.settings-item__icon--orange { background: #FF9500; }
.settings-item__icon--red { background: #FF3B30; }
.settings-item__icon--blue { background: #007AFF; }
.settings-item__icon--green { background: #34C759; }

.settings-item__text {
  font-size: 16px;
  color: #1a1a1a;
}

.settings-item__right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.settings-item__detail {
  font-size: 15px;
  color: #999;
}

.settings-item__badge {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: #FF3B30;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Toggle Switch */
.toggle {
  position: relative;
  width: 51px;
  height: 31px;
}

.toggle__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle__slider {
  position: absolute;
  inset: 0;
  background: #E9E9EB;
  border-radius: 16px;
  transition: background 200ms ease;
  cursor: pointer;
}

.toggle__slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform 200ms ease;
}

.toggle__input:checked + .toggle__slider {
  background: #34C759; /* iOS Green */
}

.toggle__input:checked + .toggle__slider::after {
  transform: translateX(20px);
}
```

---

### 2.6 Detail Page（详情页）

**描述：** 内容详情页需要建立清晰的信息层级：头图/封面 > 核心信息 > 辅助信息 > 操作区域。底部常驻操作栏是移动端详情页的标准配置。

**设计要点：**
- 头图支持轮播或视频
- 向上滑动时标题进入 Navigation Bar
- 底部操作栏固定（购买/收藏/分享）
- 评论区可折叠
- 相关推荐区域

```html
<div class="detail-page">
  <!-- 头图轮播 -->
  <div class="detail-page__gallery">
    <div class="gallery-slides">
      <img src="product-1.jpg" alt="" />
    </div>
    <span class="gallery-counter">1/5</span>
    <button class="detail-page__back">
      <svg width="24" height="24"><!-- back --></svg>
    </button>
    <button class="detail-page__share">
      <svg width="24" height="24"><!-- share --></svg>
    </button>
  </div>

  <!-- 核心信息 -->
  <div class="detail-page__content">
    <div class="detail-price">
      <span class="detail-price__current">¥299</span>
      <span class="detail-price__original">¥599</span>
      <span class="detail-price__discount">5折</span>
    </div>
    <h1 class="detail-page__title">商品标题放在这里，最多显示两行文字内容</h1>
    <p class="detail-page__subtitle">副标题或简短描述信息</p>
  </div>

  <!-- 底部操作栏 -->
  <footer class="detail-page__action-bar">
    <div class="action-bar__icons">
      <button class="action-bar__icon-btn">
        <svg width="24" height="24"><!-- customer service --></svg>
        <span>客服</span>
      </button>
      <button class="action-bar__icon-btn">
        <svg width="24" height="24"><!-- favorite --></svg>
        <span>收藏</span>
      </button>
    </div>
    <div class="action-bar__buttons">
      <button class="action-bar__btn action-bar__btn--secondary">加入购物车</button>
      <button class="action-bar__btn action-bar__btn--primary">立即购买</button>
    </div>
  </footer>
</div>
```

```css
.detail-page__gallery {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #F5F5F5;
}

.detail-page__gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-counter {
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
}

.detail-page__back,
.detail-page__share {
  position: absolute;
  top: calc(env(safe-area-inset-top) + 8px);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-page__back { left: 16px; }
.detail-page__share { right: 16px; }

.detail-page__content {
  padding: 16px;
}

.detail-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.detail-price__current {
  font-size: 28px;
  font-weight: 700;
  color: #FF3B30;
}

.detail-price__original {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.detail-price__discount {
  padding: 2px 6px;
  border-radius: 4px;
  background: #FFF0F0;
  color: #FF3B30;
  font-size: 12px;
  font-weight: 600;
}

.detail-page__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
  margin: 0 0 6px;
}

.detail-page__subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.detail-page__action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
  background: #fff;
  border-top: 0.5px solid #E5E5E5;
  z-index: 100;
}

.action-bar__icons {
  display: flex;
  gap: 4px;
}

.action-bar__icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 48px;
  background: none;
  border: none;
  font-size: 10px;
  color: #666;
}

.action-bar__buttons {
  flex: 1;
  display: flex;
  gap: 8px;
}

.action-bar__btn {
  flex: 1;
  height: 44px;
  border-radius: 22px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.action-bar__btn--secondary {
  background: #FFA940;
  color: #fff;
}

.action-bar__btn--primary {
  background: #FF3B30;
  color: #fff;
}
```

---

### 2.7 Chat / Messaging（聊天）

**描述：** 聊天界面由消息列表和输入工具栏组成。消息以气泡形式展示，区分发送和接收方。输入栏支持文字、语音、表情、图片等富媒体。

```html
<div class="chat-page">
  <!-- 消息列表 -->
  <div class="chat-messages">
    <!-- 时间分隔 -->
    <div class="chat-time">
      <span>14:30</span>
    </div>

    <!-- 接收的消息 -->
    <div class="message message--received">
      <img class="message__avatar" src="other-avatar.jpg" alt="" />
      <div class="message__content">
        <div class="message__bubble">
          <p class="message__text">你好，请问这个商品还有库存吗？</p>
        </div>
        <span class="message__time">14:30</span>
      </div>
    </div>

    <!-- 发送的消息 -->
    <div class="message message--sent">
      <div class="message__content">
        <div class="message__bubble">
          <p class="message__text">你好，有的！目前库存充足，可以直接下单哦</p>
        </div>
        <div class="message__status">
          <span class="message__time">14:31</span>
          <svg class="message__read" width="16" height="10"><!-- double check --></svg>
        </div>
      </div>
    </div>

    <!-- 图片消息 -->
    <div class="message message--sent">
      <div class="message__content">
        <div class="message__bubble message__bubble--image">
          <img class="message__image" src="photo.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>

  <!-- 输入工具栏 -->
  <footer class="chat-input">
    <button class="chat-input__btn">
      <svg width="24" height="24"><!-- voice icon --></svg>
    </button>
    <div class="chat-input__field-wrapper">
      <input class="chat-input__field" type="text" placeholder="输入消息..." />
    </div>
    <button class="chat-input__btn">
      <svg width="24" height="24"><!-- emoji icon --></svg>
    </button>
    <button class="chat-input__btn">
      <svg width="24" height="24"><!-- attachment icon --></svg>
    </button>
    <button class="chat-input__send">
      <svg width="20" height="20"><!-- send icon --></svg>
    </button>
  </footer>
</div>
```

```css
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  background: #F5F5F5;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-time {
  text-align: center;
  padding: 8px 0;
}

.chat-time span {
  padding: 4px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.06);
  font-size: 12px;
  color: #999;
}

.message {
  display: flex;
  gap: 8px;
  max-width: 78%;
}

.message--sent {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message--received {
  align-self: flex-start;
}

.message__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  align-self: flex-end;
}

.message__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message__bubble {
  padding: 10px 14px;
  border-radius: 18px;
  line-height: 1.4;
}

.message--received .message__bubble {
  background: #fff;
  border-bottom-left-radius: 4px;
}

.message--sent .message__bubble {
  background: #007AFF;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.message__text {
  margin: 0;
  font-size: 16px;
  word-break: break-word;
}

.message__bubble--image {
  padding: 3px;
  overflow: hidden;
}

.message__image {
  width: 200px;
  max-width: 100%;
  border-radius: 15px;
  display: block;
}

.message__status {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}

.message__time {
  font-size: 11px;
  color: #999;
}

.message--sent .message__time {
  text-align: right;
}

.message__read {
  color: #007AFF;
}

/* Input Toolbar */
.chat-input {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 8px 12px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
  background: #fff;
  border-top: 0.5px solid #E5E5E5;
}

.chat-input__btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  flex-shrink: 0;
}

.chat-input__field-wrapper {
  flex: 1;
  min-height: 36px;
  max-height: 120px;
  display: flex;
  align-items: center;
}

.chat-input__field {
  width: 100%;
  padding: 8px 14px;
  border: 1px solid #E5E5E5;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  background: #F5F5F5;
  resize: none;
}

.chat-input__field:focus {
  border-color: #007AFF;
  background: #fff;
}

.chat-input__send {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #007AFF;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
```

---

### 2.8 Empty State（空状态）

**描述：** 当页面没有内容时显示的状态，必须包含：插画/图标、说明文字、行动引导按钮。空状态是提升用户体验的关键细节。

**常见空状态场景：**
- 首次使用无数据
- 搜索无结果
- 网络断开
- 筛选无匹配
- 购物车为空
- 消息列表为空

```html
<div class="empty-state">
  <div class="empty-state__illustration">
    <!-- SVG illustration or image -->
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="50" r="40" fill="#F0F0F5" />
      <rect x="40" y="35" width="40" height="32" rx="4" fill="#E0E0E8" />
      <rect x="45" y="42" width="20" height="3" rx="1.5" fill="#C8C8D0" />
      <rect x="45" y="49" width="30" height="3" rx="1.5" fill="#C8C8D0" />
      <rect x="45" y="56" width="15" height="3" rx="1.5" fill="#C8C8D0" />
    </svg>
  </div>
  <h3 class="empty-state__title">暂无内容</h3>
  <p class="empty-state__desc">你还没有收藏任何内容，去发现更多精彩吧</p>
  <button class="empty-state__action">去探索</button>
</div>
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
}

.empty-state__illustration {
  margin-bottom: 24px;
  opacity: 0.8;
}

.empty-state__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.empty-state__desc {
  font-size: 14px;
  color: #999;
  line-height: 1.5;
  margin: 0 0 24px;
  max-width: 240px;
}

.empty-state__action {
  padding: 10px 28px;
  border-radius: 20px;
  border: none;
  background: #007AFF;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}
```

---

### 2.9 Error State（错误状态）

**描述：** 出现异常时的页面状态，需要明确告知用户发生了什么、可以做什么。

**三类错误状态：**

| 类型 | 图标/插画 | 文案 | 操作 |
|------|----------|------|------|
| 网络错误 | 断网插画 | "网络连接失败" | 重试按钮 |
| 404 / 内容不存在 | 空盒子/望远镜 | "页面不存在" | 返回首页 |
| 权限不足 | 锁/盾牌 | "暂无访问权限" | 联系管理员/返回 |
| 服务器错误 | 机器人/工具 | "服务器开小差了" | 重试/反馈 |

```html
<!-- Network Error -->
<div class="error-state">
  <div class="error-state__illustration">
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="48" fill="#FFF0F0" />
      <path d="M40 60 L80 60" stroke="#FF3B30" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="48" r="3" fill="#FF3B30" />
      <circle cx="70" cy="48" r="3" fill="#FF3B30" />
    </svg>
  </div>
  <h3 class="error-state__title">网络连接失败</h3>
  <p class="error-state__desc">请检查网络设置后重试</p>
  <button class="error-state__retry">重新加载</button>
</div>
```

```css
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
}

.error-state__illustration {
  margin-bottom: 24px;
}

.error-state__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.error-state__desc {
  font-size: 14px;
  color: #999;
  margin: 0 0 24px;
}

.error-state__retry {
  padding: 10px 28px;
  border-radius: 20px;
  border: 1px solid #E5E5E5;
  background: #fff;
  color: #1a1a1a;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.error-state__retry:active {
  background: #F5F5F5;
}
```

---

### 2.10 Loading State（加载状态）

**描述：** 数据加载过程中的占位显示，好的加载状态能有效降低用户感知等待时间。

**三种主要模式：**

#### A. 骨架屏（Skeleton Screen）
模拟最终内容布局的灰色占位，是当前最佳实践。

```html
<div class="skeleton-card">
  <div class="skeleton skeleton--image"></div>
  <div class="skeleton-card__body">
    <div class="skeleton skeleton--title"></div>
    <div class="skeleton skeleton--text"></div>
    <div class="skeleton skeleton--text skeleton--text-short"></div>
    <div class="skeleton-card__footer">
      <div class="skeleton skeleton--avatar"></div>
      <div class="skeleton skeleton--name"></div>
    </div>
  </div>
</div>
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F0F0F0 25%,
    #E0E0E0 50%,
    #F0F0F0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton--image {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px 12px 0 0;
}

.skeleton-card {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.skeleton-card__body {
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton--title {
  height: 20px;
  width: 80%;
}

.skeleton--text {
  height: 14px;
  width: 100%;
}

.skeleton--text-short {
  width: 60%;
}

.skeleton-card__footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.skeleton--avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.skeleton--name {
  height: 14px;
  width: 80px;
}
```

#### B. 下拉刷新（Pull to Refresh）

**设计要点：**
- 下拉距离阈值：60-80px
- 三个状态：下拉中（箭头旋转）、释放刷新（文案切换）、刷新中（Loading 动画）
- 刷新完成后自动收起，可加 Toast 提示

#### C. 加载更多（Infinite Scroll）

**设计要点：**
- 距底部 200-300px 时触发加载
- 加载中显示小型 Spinner + "加载中..."
- 无更多数据时显示 "没有更多了"
- 加载失败时显示 "加载失败，点击重试"

---

