# 移动端 UI 设计完整知识库

> 📦 来源：本文档知识精华整合自以下权威设计资源平台：
> - **Mobbin** — 真实 App 设计模式参考库
> - **Screenlane** — 移动端 UI 交互录屏集合
> - **Scrnshts** — App Store 截图设计灵感库
> - **UI Sources** — iOS/Android 真实交互流程参考
> - **Page Flows** — 用户流程与页面转场设计参考
> - **UX Archive** — 按交互模式分类的 UX 案例库
> - **Good UX** — 优秀用户体验微交互案例
> - **Material Design** — Google 官方 Android 设计系统
> - **Fluent UI** — Microsoft 跨平台设计系统

---

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

## 三、触控交互规范

### 3.1 最小点击区域

**铁律：** 所有可交互元素必须满足最小尺寸要求，即使视觉上看起来更小，也要通过 padding 或 min-width/min-height 扩大点击区域。

| 平台 | 最小尺寸 | 推荐尺寸 | 间距 |
|------|---------|---------|------|
| iOS (HIG) | 44 x 44 pt | 44 x 44 pt | 8pt 以上 |
| Android (Material) | 48 x 48 dp | 48 x 48 dp | 8dp 以上 |
| Web (WCAG 2.5.5) | 44 x 44 CSS px | 48 x 48 CSS px | - |

```css
/* 确保最小点击区域 */
.touchable {
  position: relative;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 用伪元素扩大点击区域（不影响视觉） */
.touch-expand::after {
  content: '';
  position: absolute;
  inset: -8px; /* 向外扩展 8px */
}

/* Android 版本 */
.touchable--android {
  min-width: 48px;
  min-height: 48px;
}
```

### 3.2 手势规范

| 手势 | 触发条件 | 用途 | 反馈 |
|------|---------|------|------|
| 点击（Tap） | 单指快速触碰 | 主要操作 | 点击高亮/Ripple |
| 长按（Long Press） | 单指按住 500ms+ | 上下文菜单 | 触觉反馈 + 弹出菜单 |
| 双击（Double Tap） | 快速连续两次点击 | 点赞/缩放 | 动画反馈 |
| 左右滑动（Swipe） | 单指水平滑动 | 切换/删除/操作 | 跟手滑动 |
| 上下滑动（Scroll） | 单指垂直滑动 | 滚动列表 | 惯性滚动 |
| 缩放（Pinch） | 双指开合 | 缩放图片/地图 | 跟手缩放 |
| 旋转（Rotate） | 双指旋转 | 旋转图片 | 跟手旋转 |
| 拖拽（Drag） | 单指按住后移动 | 排序/移动 | 元素跟随 + 阴影 |

```css
/* 点击反馈 - iOS */
.tap-feedback-ios {
  transition: opacity 100ms ease;
}

.tap-feedback-ios:active {
  opacity: 0.6;
}

/* 点击反馈 - Android Material Ripple */
.tap-feedback-android {
  position: relative;
  overflow: hidden;
}

.tap-feedback-android::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(0,0,0,0.12) 10%, transparent 10%);
  background-size: 1000% 1000%;
  background-position: center;
  opacity: 0;
  transition: opacity 300ms ease, background-size 300ms ease;
}

.tap-feedback-android:active::after {
  background-size: 100% 100%;
  opacity: 1;
  transition: opacity 0ms;
}
```

### 3.3 安全区域（Safe Area）和刘海适配

**说明：** 现代全面屏手机（刘海屏、挖孔屏、灵动岛）需要使用 `env(safe-area-inset-*)` 确保内容不被遮挡。

```css
/* 安全区域适配 */

/* viewport-fit=cover 是前提 */
/* <meta name="viewport" content="..., viewport-fit=cover"> */

/* 顶部安全区域（状态栏 + 刘海/灵动岛） */
.safe-top {
  padding-top: env(safe-area-inset-top);
}

/* 底部安全区域（Home Indicator） */
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* 完整安全区域 */
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

/* 固定底部栏的安全区域适配 */
.fixed-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  background: #fff;
}

/* 固定顶部栏的安全区域适配 */
.fixed-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  padding-top: calc(8px + env(safe-area-inset-top));
  background: #fff;
}

/* iOS 各设备安全区域参考值 */
/*
 * iPhone SE (2/3):           top: 20pt, bottom: 0pt
 * iPhone 12/13/14:           top: 47pt, bottom: 34pt
 * iPhone 14 Pro (灵动岛):    top: 59pt, bottom: 34pt
 * iPhone 15 Pro:             top: 59pt, bottom: 34pt
 * iPhone 15 Pro Max:         top: 59pt, bottom: 34pt
 */
```

---

## 四、iOS vs Android 设计差异

### 4.1 导航模式差异

| 特性 | iOS | Android |
|------|-----|---------|
| 返回操作 | 左上角返回按钮 + 边缘右滑手势 | 系统返回键/手势 + 左上角按钮 |
| Tab Bar 位置 | 固定底部 | 底部（Material 3），之前也用顶部 Tab |
| 页面转场 | 左右推入/推出 | 多种：淡入淡出、共享元素、容器变换 |
| 大标题 | 原生支持（可折叠） | Material 3 Large Top App Bar |
| 模态页面 | 从底部上滑（Sheet） | 全屏或 Dialog |
| 下拉刷新 | 原生 UIRefreshControl | SwipeRefreshLayout（Material） |

### 4.2 按钮和交互风格差异

| 特性 | iOS | Android (Material 3) |
|------|-----|---------------------|
| 主按钮 | 圆角矩形（radius 10-12pt） | Filled Button（radius 20dp，胶囊形） |
| 点击反馈 | 透明度降低（opacity: 0.6） | Ripple 水波纹效果 |
| 开关 | 绿色/灰色滑块（51×31pt） | Material Switch（52×32dp） |
| 选择器 | Picker Wheel（滚轮） | Dropdown Menu / Date Picker |
| 确认弹窗 | UIAlertController（居中） | AlertDialog（居中，Material 样式） |
| 操作选项 | ActionSheet（底部弹出） | Bottom Sheet / Menu |
| 删除确认 | 左滑 + 红色删除按钮 | 左/右滑 + Snackbar 撤销 |

### 4.3 字体和排版差异

| 特性 | iOS | Android |
|------|-----|---------|
| 系统字体 | SF Pro（Text/Display） | Roboto |
| 中文字体 | PingFang SC | Noto Sans CJK SC |
| 字重 | Regular(400), Medium(500), Semibold(600), Bold(700) | Regular(400), Medium(500), Bold(700) |
| 大标题 | 34pt Bold | 28sp Regular (Headline Large) |
| 正文 | 17pt Regular | 16sp Regular (Body Large) |
| 副文 | 15pt Regular | 14sp Regular (Body Medium) |
| 辅助文字 | 13pt Regular | 12sp Regular (Body Small) |
| 行高 | 约 1.2 倍 | 约 1.5 倍 |

### 4.4 系统组件差异

| 功能 | iOS 组件 | Android 组件 |
|------|---------|-------------|
| 底部操作菜单 | UIActionSheet | BottomSheetDialog |
| 日期选择 | UIDatePicker（滚轮/紧凑/内联） | MaterialDatePicker |
| 时间选择 | UIDatePicker（滚轮） | MaterialTimePicker（表盘/输入） |
| 搜索 | UISearchBar + UISearchController | SearchView / SearchBar |
| 标签页 | UISegmentedControl / UIPageViewController | TabLayout + ViewPager2 |
| 刷新 | UIRefreshControl | SwipeRefreshLayout |
| Toast 提示 | 无原生支持（通常自定义） | Snackbar / Toast |
| 进度条 | UIProgressView | LinearProgressIndicator |
| 加载指示器 | UIActivityIndicatorView（菊花） | CircularProgressIndicator |

---

## 五、移动端排版规范

### 5.1 iOS 字体系统

```css
/* iOS SF Pro 字体层级 */
:root {
  /* Large Title — 大标题（页面顶部折叠标题） */
  --ios-large-title: 700 34px/41px -apple-system, 'SF Pro Display', sans-serif;

  /* Title 1 — 一级标题 */
  --ios-title1: 700 28px/34px -apple-system, 'SF Pro Display', sans-serif;

  /* Title 2 — 二级标题 */
  --ios-title2: 700 22px/28px -apple-system, 'SF Pro Display', sans-serif;

  /* Title 3 — 三级标题 */
  --ios-title3: 600 20px/25px -apple-system, 'SF Pro Display', sans-serif;

  /* Headline — 标题（列表项标题） */
  --ios-headline: 600 17px/22px -apple-system, 'SF Pro Text', sans-serif;

  /* Body — 正文 */
  --ios-body: 400 17px/22px -apple-system, 'SF Pro Text', sans-serif;

  /* Callout */
  --ios-callout: 400 16px/21px -apple-system, 'SF Pro Text', sans-serif;

  /* Subheadline — 副标题 */
  --ios-subheadline: 400 15px/20px -apple-system, 'SF Pro Text', sans-serif;

  /* Footnote — 脚注 */
  --ios-footnote: 400 13px/18px -apple-system, 'SF Pro Text', sans-serif;

  /* Caption 1 */
  --ios-caption1: 400 12px/16px -apple-system, 'SF Pro Text', sans-serif;

  /* Caption 2 — 最小正文 */
  --ios-caption2: 400 11px/13px -apple-system, 'SF Pro Text', sans-serif;
}
```

### 5.2 Android Material Type Scale

```css
/* Material 3 Type Scale */
:root {
  /* Display */
  --m3-display-large: 400 57px/64px 'Roboto', sans-serif;
  --m3-display-medium: 400 45px/52px 'Roboto', sans-serif;
  --m3-display-small: 400 36px/44px 'Roboto', sans-serif;

  /* Headline */
  --m3-headline-large: 400 32px/40px 'Roboto', sans-serif;
  --m3-headline-medium: 400 28px/36px 'Roboto', sans-serif;
  --m3-headline-small: 400 24px/32px 'Roboto', sans-serif;

  /* Title */
  --m3-title-large: 400 22px/28px 'Roboto', sans-serif;
  --m3-title-medium: 500 16px/24px 'Roboto', sans-serif;
  --m3-title-small: 500 14px/20px 'Roboto', sans-serif;

  /* Body */
  --m3-body-large: 400 16px/24px 'Roboto', sans-serif;
  --m3-body-medium: 400 14px/20px 'Roboto', sans-serif;
  --m3-body-small: 400 12px/16px 'Roboto', sans-serif;

  /* Label */
  --m3-label-large: 500 14px/20px 'Roboto', sans-serif;
  --m3-label-medium: 500 12px/16px 'Roboto', sans-serif;
  --m3-label-small: 500 11px/16px 'Roboto', sans-serif;
}
```

### 5.3 通用排版规则

```css
/* 移动端排版通用规范 */

/* 最小可读字号 */
.text-minimum {
  font-size: 12px; /* 12sp / 12pt，绝对最小值 */
}

/* 标准内边距 */
.page-padding {
  padding-left: 16px;
  padding-right: 16px;
}

/* 内容最大宽度（平板适配） */
.content-container {
  width: 100%;
  max-width: 428px; /* iPhone 14 Pro Max 宽度 */
  margin: 0 auto;
}

/* 段落间距 */
.prose p {
  margin: 0 0 16px;
  line-height: 1.6;
}

/* 列表项间距 */
.list-item {
  min-height: 44px; /* iOS 最小行高 */
  padding: 12px 16px;
}

/* 分组标题 */
.section-header {
  font-size: 13px;
  font-weight: 600;
  color: #6D6D72;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 24px 16px 8px;
}

/* 间距系统（4px 基数） */
/*
 * 4px  — 极小间距（图标与文字、紧凑元素间）
 * 8px  — 小间距（同组元素间、列表项内部）
 * 12px — 中小间距
 * 16px — 标准间距（页面边距、卡片内边距）
 * 20px — 中间距
 * 24px — 中大间距（分组间隔）
 * 32px — 大间距（区块间隔）
 * 40px — 超大间距
 * 48px — 区域间距
 */
```

---

## 六、App Store 截图设计

> 知识来源：Scrnshts — App Store 截图设计灵感库

### 6.1 截图尺寸规范

**iOS App Store：**

| 设备 | 尺寸（像素） | 必需 |
|------|------------|------|
| iPhone 6.9" (15 Pro Max) | 1320 x 2868 | 推荐 |
| iPhone 6.7" (14 Pro Max) | 1290 x 2796 | 推荐 |
| iPhone 6.5" (11 Pro Max) | 1284 x 2778 或 1242 x 2688 | 是 |
| iPhone 5.5" (8 Plus) | 1242 x 2208 | 是 |
| iPad Pro 12.9" (6th) | 2048 x 2732 | iPad App 必需 |
| iPad Pro 11" | 1668 x 2388 | iPad App 推荐 |

**Google Play Store：**

| 类型 | 尺寸（像素） | 要求 |
|------|------------|------|
| 手机截图 | 16:9 或 9:16，最小 1080px | 2-8 张 |
| 7 英寸平板 | 16:9 或 9:16 | 可选 |
| 10 英寸平板 | 16:9 或 9:16 | 可选 |

**通用规则：**
- 最多 10 张截图（iOS），8 张（Google Play）
- 前 3 张最重要（搜索结果中直接可见）
- 格式：PNG 或 JPG
- 不要有状态栏内容（时间、信号等）

### 6.2 常见布局模式

#### A. 设备 + 文字（Device Frame + Text）
最经典的截图格式，上方标题文案 + 下方设备截屏。

**布局结构：**
```
┌─────────────────────┐
│                     │
│   大标题文案（1行）    │
│   副标题（可选）       │
│                     │
│    ┌───────────┐    │
│    │           │    │
│    │  设备截屏   │    │
│    │           │    │
│    │           │    │
│    └───────────┘    │
│                     │
└─────────────────────┘
```

**设计要点：**
- 背景使用品牌色或渐变色
- 设备框使用真实设备 Mockup
- 标题文案不超过 6 个中文字
- 字体大 + 粗，确保缩略图中也能看清

#### B. 全屏截图（Full Screen）
直接展示 App 界面截图，无设备框和文案修饰。

**适用场景：**
- UI 设计本身就是卖点
- 游戏类 App
- 功能一目了然的工具类

#### C. 场景化（Lifestyle / Context）
将 App 截屏放在真实使用场景中（如手持手机的照片）。

**适用场景：**
- 生活方式类 App
- 社交类 App
- 强调使用场景的产品

#### D. 功能 Spotlight
每张截图聚焦一个核心功能，配以功能说明。

**布局结构：**
```
┌─────────────────────┐
│   Feature Title      │
│   简要功能描述        │
│                      │
│  ┌──────┐  ● 要点1   │
│  │ 截屏  │  ● 要点2   │
│  │ 局部  │  ● 要点3   │
│  └──────┘            │
└─────────────────────┘
```

### 6.3 文案撰写原则

**核心规则：**
1. **说价值，不说功能** — "3 分钟做出专业级视频" 优于 "内置视频编辑器"
2. **用数字增加可信度** — "超过 1000 万用户信赖"
3. **制造紧迫感/好奇心** — "你想不到的隐藏功能"
4. **简短有力** — 每张截图标题不超过 8 个中文字
5. **前 3 张定胜负** — 把最吸引人的功能放在前 3 张

**文案公式：**
- **利益导向：** [动作] + [具体结果]，如 "轻松记录每一笔开支"
- **场景导向：** [场景] + [解决方案]，如 "出行必备，离线也能导航"
- **社会证明：** [数字/荣誉] + [结论]，如 "App Store 编辑推荐"

**每张截图的推荐焦点顺序：**
1. 核心价值主张（Hero Shot）
2. 最受欢迎的功能
3. 差异化功能（竞品没有的）
4. 社交证明 / 评价
5. 其他重要功能

---

## 七、移动端设计 Checklist

在输出任何移动端 UI 设计方案前，用以下清单自检：

### 布局与导航
- [ ] 导航模式是否符合 App 类型（Tab Bar / Drawer / 其他）
- [ ] 页面层级是否清晰（不超过 3 层深度为佳）
- [ ] 返回路径是否明确
- [ ] Tab Bar / Navigation Bar 是否适配安全区域

### 触控与交互
- [ ] 所有可点击元素 >= 44x44pt (iOS) / 48x48dp (Android)
- [ ] 点击反馈是否明确（iOS: opacity / Android: ripple）
- [ ] 手势操作是否有视觉引导
- [ ] 输入框是否指定正确的键盘类型

### 内容与状态
- [ ] 是否处理了空状态、加载状态、错误状态
- [ ] 文字截断是否使用省略号
- [ ] 图片是否有加载占位和失败兜底
- [ ] 列表是否支持下拉刷新和上拉加载

### 排版与间距
- [ ] 最小字号不低于 12px
- [ ] 页面水平内边距 16px
- [ ] 间距系统是否基于 4px/8px 倍数
- [ ] 行高是否合理（正文 1.4-1.6）

### 适配与兼容
- [ ] 是否适配安全区域（Safe Area）
- [ ] 是否考虑横屏场景（如果需要）
- [ ] 是否考虑 Dynamic Type / 系统字号缩放
- [ ] 暗色模式下颜色是否合理
- [ ] 是否考虑无障碍（对比度、语义化标签）

### 性能
- [ ] 图片是否懒加载
- [ ] 长列表是否使用虚拟滚动
- [ ] 动画是否使用 GPU 加速属性（transform、opacity）
- [ ] 是否避免大面积 backdrop-filter（性能开销大）
