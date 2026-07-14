## 一、移动端导航模式

### 1.1 Tab Bar（底部标签栏）

**描述：** 固定在屏幕底部的导航栏，包含 3-5 个主要功能入口，每个 Tab 由图标+文字标签组成。是移动端最主流的一级导航方式，用户可以在主要功能区之间快速切换。

**适用场景：**
- App 有 3-5 个平级的核心功能模块
- 用户需要频繁在模块间切换
- 每个模块相对独立，无明确层级关系
- 适合社交、电商、工具类等绝大多数 App

**iOS 与 Android 规范差异：**

| 特性 | iOS (HIG) | Android (Material 3) |
|------|-----------|---------------------|
| 名称 | Tab Bar | Navigation Bar |
| 位置 | 屏幕底部 | 屏幕底部 |
| 高度 | 49pt（不含安全区域） | 80dp |
| 图标尺寸 | 25×25pt ~ 28×28pt | 24×24dp |
| 标签文字 | 10pt，始终显示 | 12sp，可选显示 |
| 最大数量 | 5 个 | 5 个（推荐 3-5） |
| 激活状态 | 填充图标 + 高亮色 | 填充图标 + Indicator Pill |
| 角标 | 红色圆点或数字 | 红色圆点或数字 |
| 滚动行为 | 始终可见 | 可随内容滚动隐藏 |

**代码示例（HTML/CSS）：**

```html
<!-- iOS Style Tab Bar -->
<nav class="tab-bar tab-bar--ios">
  <a class="tab-bar__item tab-bar__item--active" href="#home">
    <svg class="tab-bar__icon" width="25" height="25"><!-- home icon --></svg>
    <span class="tab-bar__label">首页</span>
  </a>
  <a class="tab-bar__item" href="#search">
    <svg class="tab-bar__icon" width="25" height="25"><!-- search icon --></svg>
    <span class="tab-bar__label">搜索</span>
  </a>
  <a class="tab-bar__item" href="#cart">
    <svg class="tab-bar__icon" width="25" height="25"><!-- cart icon --></svg>
    <span class="tab-bar__label">购物车</span>
    <span class="tab-bar__badge">3</span>
  </a>
  <a class="tab-bar__item" href="#profile">
    <svg class="tab-bar__icon" width="25" height="25"><!-- profile icon --></svg>
    <span class="tab-bar__label">我的</span>
  </a>
</nav>
```

```css
/* iOS Style Tab Bar */
.tab-bar--ios {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(249, 249, 249, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 0.5px solid rgba(0, 0, 0, 0.12);
}

.tab-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-decoration: none;
  color: #999;
  position: relative;
  min-width: 64px;
  padding: 6px 0;
}

.tab-bar__item--active {
  color: #007AFF; /* iOS 系统蓝 */
}

.tab-bar__label {
  font-size: 10px;
  font-family: -apple-system, 'SF Pro Text', sans-serif;
  line-height: 1.2;
}

.tab-bar__badge {
  position: absolute;
  top: 2px;
  right: 12px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #FF3B30;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Android Material 3 Style */
.tab-bar--android {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #FFFBFE;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.08);
}

.tab-bar--android .tab-bar__item--active {
  color: #6750A4; /* Material 3 Primary */
}

.tab-bar--android .tab-bar__item--active::before {
  content: '';
  position: absolute;
  top: 12px;
  width: 64px;
  height: 32px;
  border-radius: 16px;
  background: #E8DEF8; /* Material 3 Secondary Container */
  z-index: -1;
}

.tab-bar--android .tab-bar__label {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  margin-top: 4px;
}
```

---

### 1.2 Drawer / Hamburger Menu（侧边抽屉）

**描述：** 从屏幕左侧（或右侧）滑出的导航面板，通常通过汉堡图标（☰）触发。面板中包含导航链接、用户信息、设置入口等内容。在 Material Design 中称为 Navigation Drawer。

**适用场景：**
- 导航项目较多（超过 5 个），无法用 Tab Bar 容纳
- 导航项有层级关系或分组
- 功能模块使用频率差异大，部分功能较少使用
- 内容型或工具型 App（邮件、文件管理、企业应用）
- 需要展示用户账户信息和设置入口

**设计要点：**
- 抽屉宽度：屏幕宽度的 80%，最大 360dp（Material 3 推荐 360dp）
- 遮罩层：半透明黑色（rgba(0,0,0,0.32)）
- 展开动画时长：250-300ms，使用 ease-out 缓动
- 支持向左滑动关闭
- iOS 上较少使用全局侧边抽屉，更常用于二级导航

```html
<!-- Drawer Navigation -->
<div class="drawer-overlay" id="drawerOverlay"></div>
<aside class="drawer" id="drawer">
  <header class="drawer__header">
    <img class="drawer__avatar" src="avatar.jpg" alt="User Avatar" />
    <h3 class="drawer__username">用户名</h3>
    <p class="drawer__email">user@example.com</p>
  </header>
  <div class="drawer__divider"></div>
  <nav class="drawer__nav">
    <a class="drawer__item drawer__item--active" href="#inbox">
      <svg class="drawer__icon" width="24" height="24"><!-- icon --></svg>
      <span class="drawer__text">收件箱</span>
      <span class="drawer__count">24</span>
    </a>
    <a class="drawer__item" href="#starred">
      <svg class="drawer__icon" width="24" height="24"><!-- icon --></svg>
      <span class="drawer__text">已加星标</span>
    </a>
    <a class="drawer__item" href="#sent">
      <svg class="drawer__icon" width="24" height="24"><!-- icon --></svg>
      <span class="drawer__text">已发送</span>
    </a>
    <div class="drawer__divider"></div>
    <h4 class="drawer__section-title">所有标签</h4>
    <a class="drawer__item" href="#drafts">
      <svg class="drawer__icon" width="24" height="24"><!-- icon --></svg>
      <span class="drawer__text">草稿</span>
    </a>
    <a class="drawer__item" href="#trash">
      <svg class="drawer__icon" width="24" height="24"><!-- icon --></svg>
      <span class="drawer__text">回收站</span>
    </a>
  </nav>
  <footer class="drawer__footer">
    <a class="drawer__item" href="#settings">
      <svg class="drawer__icon" width="24" height="24"><!-- icon --></svg>
      <span class="drawer__text">设置</span>
    </a>
  </footer>
</aside>
```

```css
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
  opacity: 0;
  visibility: hidden;
  transition: opacity 250ms ease-out, visibility 250ms ease-out;
  z-index: 999;
}

.drawer-overlay--visible {
  opacity: 1;
  visibility: visible;
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(80vw, 360px);
  background: #FFFBFE;
  transform: translateX(-100%);
  transition: transform 250ms ease-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-radius: 0 16px 16px 0; /* Material 3 */
}

.drawer--open {
  transform: translateX(0);
}

.drawer__header {
  padding: 16px 16px 8px;
}

.drawer__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.drawer__username {
  font-size: 16px;
  font-weight: 600;
  color: #1C1B1F;
  margin: 0;
}

.drawer__email {
  font-size: 14px;
  color: #49454F;
  margin: 4px 0 0;
}

.drawer__divider {
  height: 1px;
  background: #CAC4D0;
  margin: 8px 0;
}

.drawer__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px 12px 24px;
  text-decoration: none;
  color: #49454F;
  border-radius: 0 28px 28px 0;
  margin-right: 12px;
  font-size: 14px;
  transition: background 150ms ease;
}

.drawer__item:hover {
  background: rgba(28, 27, 31, 0.08);
}

.drawer__item--active {
  background: #E8DEF8;
  color: #1C1B1F;
  font-weight: 600;
}

.drawer__count {
  margin-left: auto;
  font-size: 12px;
  color: #49454F;
}

.drawer__section-title {
  font-size: 12px;
  font-weight: 500;
  color: #49454F;
  padding: 16px 24px 8px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.drawer__footer {
  margin-top: auto;
  border-top: 1px solid #CAC4D0;
  padding: 8px 0;
}
```

---

### 1.3 Top Navigation Bar（顶部导航）

**描述：** 位于屏幕顶部的导航栏，包含页面标题、返回按钮、操作按钮等。是移动端最基础的导航组件，几乎出现在每个页面。iOS 称为 Navigation Bar，Android 称为 Top App Bar。

**适用场景：**
- 所有需要显示页面标题的场景
- 需要返回上一级的页面层级导航
- 需要放置页面级操作按钮（搜索、分享、更多）
- 与 Tab Bar 配合使用构成完整导航体系

**iOS 与 Android 差异：**

| 特性 | iOS Navigation Bar | Android Top App Bar |
|------|-------------------|---------------------|
| 高度 | 44pt（不含状态栏） | 64dp（Regular）/ 56dp（Small） |
| 标题位置 | 居中（标准）/ 左对齐（大标题） | 居中或左对齐 |
| 大标题 | 支持（34pt，可折叠） | Material 3 Medium/Large Top App Bar |
| 返回按钮 | 左箭头 + 上级标题文字 | 左箭头图标 |
| 右侧操作 | 文字按钮或图标 | 图标按钮 |
| 模糊背景 | 常见（磨砂效果） | 不常见，使用纯色或 elevation |

```html
<!-- iOS Style Navigation Bar -->
<header class="nav-bar nav-bar--ios">
  <button class="nav-bar__back">
    <svg width="12" height="20" viewBox="0 0 12 20">
      <path d="M10 2L2 10L10 18" stroke="#007AFF" stroke-width="2.5"
            stroke-linecap="round" fill="none"/>
    </svg>
    <span class="nav-bar__back-text">返回</span>
  </button>
  <h1 class="nav-bar__title">页面标题</h1>
  <button class="nav-bar__action">编辑</button>
</header>

<!-- iOS Large Title (Collapsible) -->
<header class="nav-bar nav-bar--ios-large">
  <div class="nav-bar__compact">
    <button class="nav-bar__back">
      <svg width="12" height="20" viewBox="0 0 12 20">
        <path d="M10 2L2 10L10 18" stroke="#007AFF" stroke-width="2.5"
              stroke-linecap="round" fill="none"/>
      </svg>
    </button>
    <div class="nav-bar__actions">
      <button class="nav-bar__icon-btn">
        <svg width="22" height="22"><!-- search icon --></svg>
      </button>
    </div>
  </div>
  <h1 class="nav-bar__large-title">大标题</h1>
</header>

<!-- Android Material 3 Top App Bar -->
<header class="nav-bar nav-bar--android">
  <button class="nav-bar__icon-btn">
    <svg width="24" height="24"><!-- back arrow --></svg>
  </button>
  <h1 class="nav-bar__title">页面标题</h1>
  <div class="nav-bar__actions">
    <button class="nav-bar__icon-btn">
      <svg width="24" height="24"><!-- search icon --></svg>
    </button>
    <button class="nav-bar__icon-btn">
      <svg width="24" height="24"><!-- more icon --></svg>
    </button>
  </div>
</header>
```

```css
/* iOS Navigation Bar */
.nav-bar--ios {
  position: sticky;
  top: 0;
  height: 44px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(249, 249, 249, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
  z-index: 100;
}

.nav-bar__back {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #007AFF;
  font-size: 17px;
  padding: 0;
  min-width: 44px;
  min-height: 44px;
}

.nav-bar__title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  font-weight: 600;
  color: #000;
  margin: 0;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-bar__action {
  background: none;
  border: none;
  color: #007AFF;
  font-size: 17px;
  padding: 0;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* iOS Large Title */
.nav-bar--ios-large .nav-bar__large-title {
  font-size: 34px;
  font-weight: 700;
  color: #000;
  padding: 0 16px 8px;
  margin: 0;
}

/* Android Material 3 Top App Bar */
.nav-bar--android {
  position: sticky;
  top: 0;
  height: 64px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  background: #FFFBFE;
  z-index: 100;
}

.nav-bar--android .nav-bar__title {
  position: static;
  transform: none;
  font-size: 22px;
  font-weight: 400;
  color: #1C1B1F;
  flex: 1;
  margin: 0 4px;
}

.nav-bar__icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1C1B1F;
  cursor: pointer;
}

.nav-bar__actions {
  display: flex;
  align-items: center;
  margin-left: auto;
}
```

---

### 1.4 Segmented Control（分段控制）

**描述：** 水平排列的一组按钮，用于在 2-5 个同级视图之间切换。选中项有明显的视觉高亮。iOS 中称为 Segmented Control，Android Material 3 中对应 Segmented Button。

**适用场景：**
- 同一页面内切换不同视图或筛选条件
- 内容分类展示（如：全部/进行中/已完成）
- 时间范围切换（日/周/月/年）
- 地图与列表视图切换
- 选项数量在 2-5 个之间

```html
<!-- iOS Segmented Control -->
<div class="segmented segmented--ios">
  <button class="segmented__item segmented__item--active">全部</button>
  <button class="segmented__item">进行中</button>
  <button class="segmented__item">已完成</button>
</div>

<!-- Android Material 3 Segmented Button -->
<div class="segmented segmented--android" role="group">
  <button class="segmented__item segmented__item--active">
    <svg class="segmented__check" width="18" height="18"><!-- check icon --></svg>
    <span>全部</span>
  </button>
  <button class="segmented__item"><span>进行中</span></button>
  <button class="segmented__item"><span>已完成</span></button>
</div>
```

```css
/* iOS Segmented Control */
.segmented--ios {
  display: flex;
  background: rgba(118, 118, 128, 0.12);
  border-radius: 8px;
  padding: 2px;
  margin: 0 16px;
}

.segmented--ios .segmented__item {
  flex: 1;
  padding: 6px 12px;
  border: none;
  background: transparent;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: all 200ms ease;
}

.segmented--ios .segmented__item--active {
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* Android Material 3 Segmented Button */
.segmented--android {
  display: flex;
  border: 1px solid #79747E;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 16px;
}

.segmented--android .segmented__item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-right: 1px solid #79747E;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #1C1B1F;
  cursor: pointer;
}

.segmented--android .segmented__item:last-child {
  border-right: none;
}

.segmented--android .segmented__item--active {
  background: #E8DEF8;
}

.segmented__check {
  width: 18px;
  height: 18px;
}
```

---

### 1.5 Bottom Sheet（底部弹出面板）

**描述：** 从屏幕底部向上滑出的面板，用于展示附加内容或操作选项。可以是模态（Modal）或非模态（Persistent）。支持多个吸附点（半屏/全屏）。是移动端取代传统弹窗的主流交互方式。

**适用场景：**
- 操作选项列表（分享、更多操作）
- 筛选和排序面板
- 表单填写（短表单）
- 地图应用中的详情面板
- 评论区展示
- iOS 的 ActionSheet 替代方案

**设计要点：**
- 顶部抓手条（Handle）：宽 32-40px，高 4px，圆角
- 吸附点：25%（小内容）、50%（中等）、90%（接近全屏）
- 圆角：顶部 12-16px
- 遮罩层：模态时显示，非模态可选

```html
<!-- Bottom Sheet -->
<div class="bottom-sheet-overlay" id="bsOverlay"></div>
<div class="bottom-sheet" id="bottomSheet">
  <div class="bottom-sheet__handle-area">
    <div class="bottom-sheet__handle"></div>
  </div>
  <header class="bottom-sheet__header">
    <h3 class="bottom-sheet__title">分享到</h3>
    <button class="bottom-sheet__close">
      <svg width="24" height="24"><!-- close icon --></svg>
    </button>
  </header>
  <div class="bottom-sheet__content">
    <div class="bottom-sheet__share-grid">
      <a class="share-item" href="#">
        <div class="share-item__icon share-item__icon--wechat"></div>
        <span class="share-item__label">微信</span>
      </a>
      <a class="share-item" href="#">
        <div class="share-item__icon share-item__icon--moments"></div>
        <span class="share-item__label">朋友圈</span>
      </a>
      <a class="share-item" href="#">
        <div class="share-item__icon share-item__icon--weibo"></div>
        <span class="share-item__label">微博</span>
      </a>
      <a class="share-item" href="#">
        <div class="share-item__icon share-item__icon--link"></div>
        <span class="share-item__label">复制链接</span>
      </a>
    </div>
  </div>
</div>
```

```css
.bottom-sheet-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms ease;
  z-index: 999;
}

.bottom-sheet-overlay--visible {
  opacity: 1;
  visibility: visible;
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 16px 16px 0 0;
  transform: translateY(100%);
  transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);
  z-index: 1000;
  max-height: 90vh;
  overflow-y: auto;
  padding-bottom: env(safe-area-inset-bottom);
}

.bottom-sheet--open {
  transform: translateY(0);
}

.bottom-sheet--half {
  transform: translateY(50%);
}

.bottom-sheet__handle-area {
  display: flex;
  justify-content: center;
  padding: 8px 0 4px;
  cursor: grab;
}

.bottom-sheet__handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: #DDD;
}

.bottom-sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 16px;
}

.bottom-sheet__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #1C1B1F;
}

.bottom-sheet__close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.bottom-sheet__content {
  padding: 0 16px 16px;
}

.bottom-sheet__share-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.share-item__icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
}

.share-item__label {
  font-size: 12px;
  color: #666;
}
```

---

### 1.6 Gesture Navigation（手势导航）

**描述：** 通过滑动、拖拽等手势进行页面导航和操作，减少对按钮的依赖。全面屏手机时代的主流交互方式。

**适用场景：**
- 返回上一页（从屏幕边缘右滑）
- 切换 Tab 页面（水平滑动）
- 列表项快捷操作（左滑删除/收藏）
- 图片浏览（缩放/平移）
- 下拉刷新、上拉加载

**常见手势模式：**

| 手势 | 操作 | 平台 |
|------|------|------|
| 左边缘右滑 | 返回上一页 | iOS（系统级）、Android |
| 底部上滑 | 回到主屏幕 | iOS / Android 全面屏 |
| 底部上滑悬停 | 多任务切换 | iOS / Android |
| 左/右滑动列表项 | 快捷操作（删除/归档） | 通用 |
| 下拉 | 刷新 | 通用 |
| 双指捏合 | 缩放 | 通用 |
| 长按 | 上下文菜单 | 通用 |

```html
<!-- Swipeable List Item -->
<div class="swipe-container">
  <div class="swipe-actions swipe-actions--left">
    <button class="swipe-action swipe-action--pin">
      <svg width="22" height="22"><!-- pin icon --></svg>
      <span>置顶</span>
    </button>
    <button class="swipe-action swipe-action--read">
      <svg width="22" height="22"><!-- read icon --></svg>
      <span>已读</span>
    </button>
  </div>
  <div class="swipe-content">
    <div class="list-item">
      <img class="list-item__avatar" src="avatar.jpg" alt="" />
      <div class="list-item__body">
        <h4 class="list-item__title">消息标题</h4>
        <p class="list-item__subtitle">消息内容预览...</p>
      </div>
      <span class="list-item__time">14:30</span>
    </div>
  </div>
  <div class="swipe-actions swipe-actions--right">
    <button class="swipe-action swipe-action--archive">
      <svg width="22" height="22"><!-- archive icon --></svg>
      <span>归档</span>
    </button>
    <button class="swipe-action swipe-action--delete">
      <svg width="22" height="22"><!-- trash icon --></svg>
      <span>删除</span>
    </button>
  </div>
</div>
```

```css
.swipe-container {
  position: relative;
  overflow: hidden;
}

.swipe-content {
  position: relative;
  z-index: 1;
  background: #fff;
  transition: transform 250ms ease-out;
  touch-action: pan-y;
}

.swipe-actions {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
}

.swipe-actions--left {
  left: 0;
}

.swipe-actions--right {
  right: 0;
}

.swipe-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 80px;
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.swipe-action--pin { background: #007AFF; }
.swipe-action--read { background: #5856D6; }
.swipe-action--archive { background: #34C759; }
.swipe-action--delete { background: #FF3B30; }

/* Pull to Refresh */
.pull-refresh {
  position: relative;
  overflow: hidden;
}

.pull-refresh__indicator {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  transition: top 200ms ease;
}

.pull-refresh--pulling .pull-refresh__indicator {
  top: 16px;
}

.pull-refresh--refreshing .pull-refresh__indicator {
  top: 16px;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  from { transform: translateX(-50%) rotate(0deg); }
  to { transform: translateX(-50%) rotate(360deg); }
}
```

---

