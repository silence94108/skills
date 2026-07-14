## 4. 无障碍（Accessibility）标准

### 4.1 WCAG 2.1 AA 必须满足的条件

**这是什么：** Web Content Accessibility Guidelines (WCAG) 2.1 是 W3C 发布的 Web 无障碍国际标准。AA 级别是行业基准，所有五大设计系统均以此为最低要求。

**为什么必须满足：** 法律合规（ADA、EAA）、用户覆盖面（全球 15% 人口有某种形式的残障）、SEO 加分、整体产品质量提升。

#### WCAG 2.1 AA 核心要求清单

| 原则 | 编号 | 要求 | 说明 |
|------|------|------|------|
| **可感知** | 1.1.1 | 非文本内容提供替代文字 | 所有 `<img>` 必须有 `alt`，装饰性图片用 `alt=""` |
| | 1.2.1 | 音频/视频提供字幕或文字稿 | 预录媒体必须有字幕 |
| | 1.3.1 | 信息与关系可通过代码确定 | 使用语义化 HTML（`<h1>-<h6>`, `<nav>`, `<main>` 等） |
| | 1.3.2 | 有意义的阅读顺序 | DOM 顺序与视觉顺序一致 |
| | 1.3.4 | 不限制内容方向 | 不锁定横屏或竖屏 |
| | 1.4.1 | 不仅靠颜色传达信息 | 错误状态要有图标+文字，不能只变红 |
| | 1.4.3 | 文本对比度至少 4.5:1 | 普通文本（< 18px 或 < 14px bold） |
| | 1.4.3 | 大文本对比度至少 3:1 | 大文本（>= 18px 或 >= 14px bold） |
| | 1.4.4 | 文本可放大到 200% 不丢失内容 | 使用 `rem` / `em` 而非 `px` 定义字体 |
| | 1.4.11 | UI 组件对比度至少 3:1 | 输入框边框、图标按钮等 |
| | 1.4.12 | 文本间距可自定义 | 不因 line-height/letter-spacing 调整而破坏布局 |
| **可操作** | 2.1.1 | 所有功能可通过键盘操作 | 无需鼠标即可完成所有操作 |
| | 2.1.2 | 无键盘陷阱 | Tab 不会困在某个组件中出不来 |
| | 2.4.1 | 提供跳过导航的机制 | "Skip to main content" 链接 |
| | 2.4.2 | 页面有描述性标题 | `<title>` 标签有意义 |
| | 2.4.3 | 焦点顺序有意义 | Tab 顺序符合逻辑 |
| | 2.4.6 | 标签和标题描述性 | 表单 label 准确描述用途 |
| | 2.4.7 | 焦点指示器可见 | 禁止 `outline: none` 除非有替代焦点样式 |
| | 2.5.3 | 可见标签匹配可访问名称 | 按钮文字与 `aria-label` 一致 |
| **可理解** | 3.1.1 | 页面语言可确定 | `<html lang="zh-CN">` |
| | 3.2.1 | 聚焦不引起上下文变化 | 焦点到达不自动跳转页面 |
| | 3.2.2 | 输入不引起意外上下文变化 | 选择下拉不自动提交表单 |
| | 3.3.1 | 输入错误有明确提示 | 错误信息指明具体问题 |
| | 3.3.2 | 输入有标签或说明 | 每个表单域有关联的 label |
| **健壮性** | 4.1.1 | HTML 标记正确 | 无重复 ID、标签正确闭合 |
| | 4.1.2 | 自定义组件有名称、角色、值 | 使用 ARIA 属性补充语义 |

### 4.2 颜色对比度详细要求

```
对比度计算公式：
(L1 + 0.05) / (L2 + 0.05)
其中 L1 是较亮颜色的相对亮度，L2 是较暗颜色的相对亮度

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
元素类型              │ AA 标准    │ AAA 标准
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
普通文本 (< 18px)     │ >= 4.5:1  │ >= 7:1
大文本 (>= 18px)      │ >= 3:1    │ >= 4.5:1
粗体文本 (>= 14px bold)│ >= 3:1    │ >= 4.5:1
UI 组件 & 图形         │ >= 3:1    │ —
非活动组件             │ 无要求    │ 无要求
纯装饰元素             │ 无要求    │ 无要求
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

推荐的安全色彩组合（亮色模式）：
- 正文文字：#111827 on #FFFFFF → 对比度 16.8:1 ✅
- 次要文字：#6B7280 on #FFFFFF → 对比度 5.0:1  ✅
- 占位文字：#9CA3AF on #FFFFFF → 对比度 2.9:1  ❌（需加深到 #6B7280）
- 链接文字：#2563EB on #FFFFFF → 对比度 6.3:1  ✅
- 按钮文字：#FFFFFF on #3B82F6 → 对比度 4.0:1  ⚠️（临界，建议用 600）
- 按钮文字：#FFFFFF on #2563EB → 对比度 6.3:1  ✅（推荐）
```

### 4.3 键盘导航规范

#### 4.3.1 全局导航键

| 按键 | 行为 |
|------|------|
| `Tab` | 向前移动焦点到下一个可聚焦元素 |
| `Shift + Tab` | 向后移动焦点到上一个可聚焦元素 |
| `Enter` / `Space` | 激活当前聚焦的按钮或链接 |
| `Escape` | 关闭当前浮层（Dialog, Dropdown, Popover） |
| `F6` | 在页面的 landmark 区域间切换 |

#### 4.3.2 组件级键盘规范

```
┌─────────────────────────────────────────────────────────────┐
│ Modal / Dialog                                               │
│ - 打开时焦点移至 Dialog 内第一个可聚焦元素                      │
│ - Tab 在 Dialog 内循环（焦点陷阱）                              │
│ - Escape 关闭                                                │
│ - 关闭后焦点返回触发器元素                                      │
├─────────────────────────────────────────────────────────────┤
│ Dropdown / Select                                            │
│ - Enter / Space 打开下拉                                     │
│ - 上下方向键导航选项                                           │
│ - Enter 选中当前项                                            │
│ - Escape 关闭下拉                                            │
│ - Home / End 跳到首项/末项                                    │
│ - 输入字符快速定位                                             │
├─────────────────────────────────────────────────────────────┤
│ Tabs 选项卡                                                  │
│ - Tab 聚焦到选项卡组                                          │
│ - 左右方向键在 Tab 间切换                                      │
│ - Enter / Space 激活当前 Tab（若非自动激活模式）                 │
│ - Home / End 跳到首个/末个 Tab                                │
├─────────────────────────────────────────────────────────────┤
│ Tree View 树形组件                                            │
│ - 上下方向键在节点间移动                                       │
│ - 右方向键展开/进入子节点                                      │
│ - 左方向键折叠/返回父节点                                      │
│ - Enter 激活当前节点                                          │
│ - * 展开所有同级节点                                           │
├─────────────────────────────────────────────────────────────┤
│ Data Grid / Table                                            │
│ - 方向键在单元格间移动                                         │
│ - Enter 编辑当前单元格                                        │
│ - Escape 取消编辑                                            │
│ - Ctrl + Home / End 跳到首行首列/末行末列                      │
│ - Page Up / Down 滚动翻页                                    │
└─────────────────────────────────────────────────────────────┘
```

#### 4.3.3 焦点样式规范

```css
/* ========================================
   Focus Styles — 焦点样式规范
   ======================================== */

/*
 * 原则：
 * 1. 永远不要使用 outline: none 而不提供替代焦点样式
 * 2. 焦点环必须有 >= 3:1 对比度
 * 3. 使用 :focus-visible 代替 :focus 以区分键盘和鼠标操作
 */

/* 全局焦点环重置 */
*:focus {
  outline: none;
}

/* 仅在键盘操作时显示焦点环 */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* 暗色背景上的焦点环 */
.dark-surface *:focus-visible,
[data-theme="dark"] *:focus-visible {
  outline-color: var(--color-primary-400);
}

/* 输入框焦点 — 使用 box-shadow 替代 outline 以支持圆角 */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: var(--shadow-focus-ring);
}

/* 按钮焦点 */
button:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Skip Link — 跳过导航 */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: top 200ms ease;
}

.skip-link:focus {
  top: 16px;
}
```

### 4.4 ARIA 属性使用指南

#### 4.4.1 ARIA 核心原则

```
第一法则：如果能用原生 HTML 实现，就不要用 ARIA。

<button> 比 <div role="button" tabindex="0"> 更好
<nav>    比 <div role="navigation"> 更好
<input type="checkbox"> 比 <div role="checkbox" aria-checked="true"> 更好
```

#### 4.4.2 常用 ARIA 属性速查

```html
<!-- ===== Landmark Roles（页面地标） ===== -->
<header role="banner">           <!-- 页头，通常自动识别 -->
<nav role="navigation">          <!-- 导航区 -->
<main role="main">               <!-- 主内容区 -->
<aside role="complementary">     <!-- 侧边栏 -->
<footer role="contentinfo">      <!-- 页脚 -->
<form role="search">             <!-- 搜索区域 -->

<!-- ===== Live Regions（动态通知） ===== -->
<!-- 用于通知屏幕阅读器内容更新 -->
<div aria-live="polite">         <!-- 等当前播报完成后通知 -->
<div aria-live="assertive">      <!-- 立即打断当前播报 -->
<div role="alert">               <!-- 等同 aria-live="assertive" -->
<div role="status">              <!-- 等同 aria-live="polite" -->

<!-- ===== Widget Attributes（组件属性） ===== -->

<!-- 展开/折叠 -->
<button aria-expanded="false" aria-controls="panel-1">
  展开详情
</button>
<div id="panel-1" hidden>
  详情内容...
</div>

<!-- 弹出层 -->
<button aria-haspopup="dialog" aria-expanded="false">
  打开对话框
</button>

<!-- 选中状态 -->
<div role="checkbox" aria-checked="true" tabindex="0">
  已勾选
</div>
<div role="checkbox" aria-checked="mixed" tabindex="0">
  部分勾选（三态）
</div>

<!-- 禁用状态 -->
<button aria-disabled="true">
  不可点击（仍可聚焦，屏幕阅读器可读取）
</button>

<!-- 当前页面/选项标记 -->
<a href="/home" aria-current="page">首页</a>
<li role="option" aria-selected="true">选项 A</li>

<!-- 描述与标注 -->
<input
  type="email"
  aria-label="邮箱地址"
  aria-describedby="email-help email-error"
/>
<p id="email-help">请输入有效的邮箱地址</p>
<p id="email-error" role="alert">邮箱格式不正确</p>

<!-- 加载状态 -->
<div aria-busy="true" aria-live="polite">
  正在加载数据...
</div>

<!-- 必填字段 -->
<input type="text" aria-required="true" />

<!-- 值范围 -->
<div
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-valuetext="50%"
  tabindex="0"
></div>
```

#### 4.4.3 常见 ARIA 模式组合

```html
<!-- ===== Modal Dialog ===== -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">确认删除</h2>
  <p id="dialog-desc">此操作不可撤销，确定要删除吗？</p>
  <button>取消</button>
  <button>确认删除</button>
</div>

<!-- ===== Tabs ===== -->
<div role="tablist" aria-label="项目设置">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">
    基本信息
  </button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
    高级设置
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  基本信息内容...
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  高级设置内容...
</div>

<!-- ===== Combobox / Autocomplete ===== -->
<div role="combobox" aria-expanded="true" aria-haspopup="listbox" aria-owns="listbox-1">
  <input
    type="text"
    aria-autocomplete="list"
    aria-controls="listbox-1"
    aria-activedescendant="option-2"
  />
</div>
<ul role="listbox" id="listbox-1">
  <li role="option" id="option-1">北京</li>
  <li role="option" id="option-2" aria-selected="true">上海</li>
  <li role="option" id="option-3">广州</li>
</ul>

<!-- ===== Breadcrumb ===== -->
<nav aria-label="面包屑导航">
  <ol role="list">
    <li><a href="/">首页</a></li>
    <li><a href="/projects">项目</a></li>
    <li><a href="/projects/123" aria-current="page">项目详情</a></li>
  </ol>
</nav>

<!-- ===== Toast / Notification ===== -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="toast"
>
  保存成功
</div>

<!-- ===== Progress Bar ===== -->
<div
  role="progressbar"
  aria-valuenow="65"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="文件上传进度"
>
  <div style="width: 65%"></div>
</div>
```

### 4.5 屏幕阅读器兼容性清单

| 检查项 | 方法 |
|--------|------|
| 页面标题有意义 | `<title>` 包含当前页面描述 |
| 语义化 HTML 结构 | 使用 `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` |
| 标题层级正确 | `<h1>` 到 `<h6>` 不跳级（不直接从 h1 到 h3） |
| 图片有替代文字 | 信息性图片用 `alt="描述"`，装饰性图片用 `alt=""` |
| 表单有关联标签 | `<label for="id">` 或 `aria-label` / `aria-labelledby` |
| 错误信息可读取 | 错误消息使用 `role="alert"` 或 `aria-live="assertive"` |
| 动态内容有通知 | 使用 `aria-live` 区域通知内容更新 |
| 链接文字有意义 | 避免"点击这里"，用"查看订单详情" |
| 表格有标题 | `<caption>` 或 `aria-label`，复杂表格用 `<th scope>` |
| 隐藏内容正确 | 视觉隐藏用 `.sr-only` class，完全隐藏用 `aria-hidden="true"` |
| 焦点管理 | Modal 打开/关闭正确移动焦点 |
| 语言声明 | `<html lang="zh-CN">` 且多语言内容用 `lang` 标注 |

```css
/* 视觉隐藏但屏幕阅读器可读的 class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 聚焦时恢复可见（用于 Skip Link 等） */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: inherit;
}
```

---

## 5. 设计系统搭建清单

### 5.1 从零搭建设计系统的步骤

**这是什么：** 一套经过验证的设计系统搭建路径，从最基础的 Token 到最终的可复用模板，共 5 个层级。

**为什么按这个顺序：** 每一层依赖前一层的输出，跳级搭建会导致后期大量返工。这是从 Material Design、Ant Design、Carbon 等成熟设计系统中提炼的共性路径。

```
Layer 0: 审计与策略
    ↓
Layer 1: Design Token（设计令牌）
    ↓
Layer 2: Foundation（设计基础）
    ↓
Layer 3: Components（组件库）
    ↓
Layer 4: Patterns（模式与组合）
    ↓
Layer 5: Templates（页面模板）
```

### 5.2 逐层详细清单

#### Layer 0: 审计与策略

```
□ 产品审计
  □ 收集所有现有界面截图
  □ 标注重复的 UI 模式
  □ 统计现有颜色值数量（通常企业项目有 50~200 个不同色值）
  □ 统计字体大小数量
  □ 标记不一致的间距和对齐

□ 技术审计
  □ 确定前端框架（React / Vue / Angular / 多框架）
  □ 确定 CSS 方案（CSS Modules / Tailwind / CSS-in-JS / SCSS）
  □ 确定组件分发方式（Monorepo / NPM 包 / 内部仓库）
  □ 确定浏览器和设备支持范围
  □ 确定无障碍合规等级（AA 或 AAA）

□ 团队对齐
  □ 确定设计系统团队（至少 1 设计 + 1 前端）
  □ 确定命名规范（BEM / Atomic / 自定义）
  □ 确定版本策略（Semver）
  □ 确定贡献流程（RFC → Review → Merge）
```

#### Layer 1: Design Token

```
□ 颜色 Token
  □ 定义品牌主色及 50~900 色阶
  □ 定义辅色（Secondary）及色阶
  □ 定义中性色（Neutral）及色阶
  □ 定义语义色（Success / Warning / Error / Info）
  □ 定义文字颜色层级（Primary / Secondary / Tertiary / Inverse）
  □ 定义背景颜色层级（Primary / Secondary / Tertiary / Elevated）
  □ 定义边框颜色层级（Default / Strong / Focus / Error）
  □ 定义交互状态色（Hover / Pressed / Selected / Disabled）

□ 间距 Token
  □ 确定基准网格（推荐 4px）
  □ 定义 space-1 到 space-32 全系列
  □ 定义语义间距别名（xs / sm / md / lg / xl / 2xl）
  □ 定义方向间距（inline / stack / inset）

□ 字体 Token
  □ 选定字体族（Sans / Serif / Mono）
  □ 定义字体大小阶梯（xs 到 7xl）
  □ 定义字重阶梯（light / regular / medium / semibold / bold）
  □ 定义行高阶梯（none / tight / normal / relaxed / loose）
  □ 定义字间距（tighter / tight / normal / wide / wider）
  □ 组合排版预设（Display / Heading / Body / Caption / Label）

□ 其他 Token
  □ 圆角（none / xs / sm / md / lg / xl / full）
  □ 阴影（xs / sm / md / lg / xl / 2xl / inner）
  □ 边框（宽度 / 样式 / 语义组合）
  □ 层级 Z-index（dropdown / sticky / modal / popover / tooltip / toast）
  □ 动效时长（fast / normal / slow）
  □ 缓动曲线（standard / decelerate / accelerate / productive / expressive）
  □ 透明度（hover / pressed / disabled / overlay）

□ Token 工程化
  □ 建立 Token JSON 源文件（推荐 Style Dictionary 格式）
  □ 配置 Token 转换管线（→ CSS Variables / → Tailwind Config / → JS Constants）
  □ 输出亮色 + 暗色两套 Token
  □ 编写 Token 使用文档
```

#### Layer 2: Foundation（设计基础）

```
□ 网格系统
  □ 定义列数（12 列或 16 列）
  □ 定义断点（sm / md / lg / xl / 2xl）
  □ 定义 Gutter 宽度
  □ 定义 Margin 规则
  □ 编写响应式布局工具类

□ 图标系统
  □ 选定图标风格（Outline / Filled / Dual-tone）
  □ 确定图标尺寸规范（16 / 20 / 24 / 32px）
  □ 建立图标命名规范
  □ 配置 SVG 优化和打包流程
  □ 创建图标使用组件（Icon Component）

□ 动效系统
  □ 定义动效原则（功能性 > 装饰性）
  □ 定义时长规范（微交互 100~200ms / 过渡 200~400ms / 复杂动画 300~500ms）
  □ 定义缓动函数（入场 / 退场 / 标准）
  □ 编写常用动效预设（fade / slide / scale / collapse）

□ 主题系统
  □ 实现 CSS Variables 亮暗切换
  □ 实现品牌 Token 覆盖机制
  □ 提供 ThemeProvider 组件（React / Vue）
  □ 验证主题切换无闪屏
  □ 编写主题扩展指南
```

#### Layer 3: Components（组件库）

按使用频率分优先级（P0 立即需要 → P2 按需添加）：

```
□ P0 — 核心组件（Day 1 必须）
  □ Button（按钮）：Primary / Secondary / Ghost / Danger / Disabled / Loading / Icon
  □ Input（输入框）：Text / Password / Number / Textarea / Clearable
  □ Select（选择器）：单选 / 多选 / 搜索 / 远程
  □ Checkbox（复选框）：默认 / 不确定态 / 禁用
  □ Radio（单选框）：默认 / 按钮样式 / 禁用
  □ Switch（开关）
  □ Icon（图标组件）
  □ Typography（排版组件）：Text / Title / Paragraph / Link

□ P0 — 布局组件
  □ Layout（布局）：Container / Row / Col / Flex / Grid
  □ Space（间距组件）
  □ Divider（分割线）

□ P1 — 常用组件
  □ Modal / Dialog（对话框）
  □ Drawer（抽屉）
  □ Dropdown（下拉菜单）
  □ Tooltip（文字提示）
  □ Popover（气泡卡片）
  □ Table（表格）：排序 / 筛选 / 分页 / 固定列
  □ Form（表单）：校验 / 布局 / 联动
  □ Tabs（选项卡）
  □ Breadcrumb（面包屑）
  □ Pagination（分页）
  □ Tag / Badge（标签 / 徽标）
  □ Avatar（头像）
  □ Card（卡片）
  □ Alert（警告提示）
  □ Message / Toast（全局消息）
  □ Notification（通知提醒）
  □ Loading / Spinner（加载）
  □ Skeleton（骨架屏）
  □ Empty State（空状态）

□ P2 — 高级组件
  □ DatePicker（日期选择）
  □ TimePicker（时间选择）
  □ Upload（上传）
  □ Tree（树形组件）
  □ Transfer（穿梭框）
  □ Cascader（级联选择）
  □ ColorPicker（颜色选择）
  □ Slider（滑块）
  □ Rate（评分）
  □ Steps（步骤条）
  □ Timeline（时间线）
  □ Carousel（轮播）
  □ Collapse / Accordion（折叠面板）
  □ Image（图片预览 / 懒加载）
  □ VirtualList（虚拟滚动列表）
```

**每个组件的交付标准：**
```
□ 功能实现
  □ 所有 Props / 变体 已实现
  □ 受控 + 非受控模式
  □ 事件回调完整
  □ 键盘导航可用
  □ ARIA 属性完整
  □ 主题 Token 接入
  □ 亮色 + 暗色适配

□ 代码质量
  □ TypeScript 类型完整
  □ Props 有默认值
  □ JSDoc / TSDoc 注释
  □ 单元测试覆盖率 >= 80%
  □ 无障碍测试通过

□ 文档
  □ 组件说明
  □ Props API 文档
  □ 交互示例（至少 3 个）
  □ Do / Don't 用法指南
```

#### Layer 4: Patterns（模式与组合）

```
□ 表单模式
  □ 登录/注册表单
  □ 搜索栏 + 筛选器
  □ 多步骤表单（Wizard）
  □ 行内编辑
  □ 批量编辑

□ 数据展示模式
  □ 列表 + 搜索 + 筛选 + 分页
  □ 卡片网格（Card Grid）
  □ 详情页 + 侧栏
  □ 数据对比（Side by Side）
  □ 空状态 + 引导

□ 导航模式
  □ 顶部导航栏
  □ 侧边导航栏
  □ 面包屑 + 返回
  □ 选项卡导航
  □ 分步导航

□ 反馈模式
  □ 表单验证与错误提示
  □ 操作确认（二次确认弹窗）
  □ 进度与加载
  □ 成功/失败状态页
  □ 通知推送
```

#### Layer 5: Templates（页面模板）

```
□ 布局模板
  □ 后台管理（Sidebar + Header + Content）
  □ 仪表盘（Dashboard Grid）
  □ 文档/内容 站点（Header + Content + TOC）
  □ 营销/落地页（Hero + Features + CTA）
  □ 设置页面（Tabs + Form）

□ 页面模板
  □ 登录/注册
  □ 列表页（Table / Card Grid）
  □ 详情页
  □ 编辑/创建页
  □ 404 / 500 错误页
  □ 空状态引导页
  □ 个人中心/设置页
```

### 5.3 文档结构推荐

```
design-system-docs/
├── getting-started/
│   ├── introduction.md        # 设计系统介绍与价值观
│   ├── installation.md        # 安装与配置指南
│   ├── quick-start.md         # 快速上手教程
│   └── contributing.md        # 贡献指南
│
├── foundations/
│   ├── design-tokens.md       # Token 体系说明
│   ├── colors.md              # 颜色系统
│   ├── typography.md          # 排版系统
│   ├── spacing.md             # 间距系统
│   ├── grid-layout.md         # 网格与布局
│   ├── iconography.md         # 图标规范
│   ├── motion.md              # 动效规范
│   └── theming.md             # 主题化指南
│
├── components/
│   ├── overview.md            # 组件总览与状态
│   ├── button.md              # 每个组件一个文档
│   ├── input.md
│   ├── ...
│   └── [component-name].md    # 统一结构：描述 → API → 示例 → Do/Don't
│
├── patterns/
│   ├── forms.md               # 表单模式
│   ├── data-display.md        # 数据展示模式
│   ├── navigation.md          # 导航模式
│   ├── feedback.md            # 反馈模式
│   └── empty-states.md        # 空状态设计
│
├── accessibility/
│   ├── overview.md            # 无障碍总览
│   ├── color-contrast.md      # 颜色对比度
│   ├── keyboard-nav.md        # 键盘导航
│   ├── screen-readers.md      # 屏幕阅读器
│   └── checklist.md           # 无障碍检查清单
│
├── resources/
│   ├── figma-library.md       # Figma 组件库链接
│   ├── design-tokens.json     # Token 源文件
│   └── changelog.md           # 更新日志
│
└── templates/
    ├── admin-layout.md        # 后台布局模板
    ├── dashboard.md           # 仪表盘模板
    ├── auth-pages.md          # 登录注册模板
    └── error-pages.md         # 错误页面模板
```

### 5.4 组件文档统一模板

每个组件文档建议遵循以下统一结构：

```markdown
# [ComponentName] 组件名

> 一句话描述组件的用途和核心价值。

## 何时使用
- 使用场景 1
- 使用场景 2
- 不适用场景（用 xxx 代替）

## 交互示例
[嵌入可交互 Demo，至少覆盖 3 种常用场景]

## API

### Props
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| ...  | ...  | ...    | ...  |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| ...    | ...  | ...  |

### Slots (Vue) / Children (React)
| 名称 | 说明 |
|------|------|
| ...  | ...  |

## 设计规范
- 尺寸规范（含标注图）
- 颜色应用
- 间距规范
- 状态说明（Default / Hover / Active / Focus / Disabled / Error）

## 无障碍
- 键盘操作说明
- ARIA 属性说明
- 屏幕阅读器行为

## Do / Don't
✅ Do: 正确用法和示例
❌ Don't: 错误用法和说明

## 设计 Token
[该组件使用的 Token 列表]

## 更新日志
- v1.1.0: 新增 xxx 功能
- v1.0.0: 初始版本
```

---

## 附录：Token JSON 源文件格式参考（Style Dictionary）

```json
{
  "color": {
    "primary": {
      "50":  { "value": "#EFF6FF", "type": "color" },
      "100": { "value": "#DBEAFE", "type": "color" },
      "200": { "value": "#BFDBFE", "type": "color" },
      "300": { "value": "#93C5FD", "type": "color" },
      "400": { "value": "#60A5FA", "type": "color" },
      "500": { "value": "#3B82F6", "type": "color", "description": "Primary brand color" },
      "600": { "value": "#2563EB", "type": "color" },
      "700": { "value": "#1D4ED8", "type": "color" },
      "800": { "value": "#1E40AF", "type": "color" },
      "900": { "value": "#1E3A8A", "type": "color" }
    },
    "semantic": {
      "success": { "value": "{color.green.500}", "type": "color" },
      "warning": { "value": "{color.amber.500}", "type": "color" },
      "error":   { "value": "{color.red.500}", "type": "color" },
      "info":    { "value": "{color.primary.500}", "type": "color" }
    },
    "bg": {
      "primary":   { "value": "#FFFFFF", "type": "color", "darkValue": "#0F172A" },
      "secondary": { "value": "#F9FAFB", "type": "color", "darkValue": "#1E293B" },
      "tertiary":  { "value": "#F3F4F6", "type": "color", "darkValue": "#334155" }
    },
    "text": {
      "primary":   { "value": "#111827", "type": "color", "darkValue": "#F1F5F9" },
      "secondary": { "value": "#6B7280", "type": "color", "darkValue": "#94A3B8" },
      "tertiary":  { "value": "#9CA3AF", "type": "color", "darkValue": "#64748B" }
    }
  },
  "space": {
    "1":  { "value": "4px",  "type": "dimension" },
    "2":  { "value": "8px",  "type": "dimension" },
    "3":  { "value": "12px", "type": "dimension" },
    "4":  { "value": "16px", "type": "dimension" },
    "5":  { "value": "20px", "type": "dimension" },
    "6":  { "value": "24px", "type": "dimension" },
    "8":  { "value": "32px", "type": "dimension" },
    "10": { "value": "40px", "type": "dimension" },
    "12": { "value": "48px", "type": "dimension" },
    "16": { "value": "64px", "type": "dimension" }
  },
  "font": {
    "size": {
      "xs":   { "value": "0.75rem",  "type": "dimension" },
      "sm":   { "value": "0.875rem", "type": "dimension" },
      "base": { "value": "1rem",     "type": "dimension" },
      "lg":   { "value": "1.125rem", "type": "dimension" },
      "xl":   { "value": "1.25rem",  "type": "dimension" },
      "2xl":  { "value": "1.5rem",   "type": "dimension" },
      "3xl":  { "value": "1.875rem", "type": "dimension" },
      "4xl":  { "value": "2.25rem",  "type": "dimension" }
    },
    "weight": {
      "regular":  { "value": "400", "type": "fontWeight" },
      "medium":   { "value": "500", "type": "fontWeight" },
      "semibold": { "value": "600", "type": "fontWeight" },
      "bold":     { "value": "700", "type": "fontWeight" }
    },
    "lineHeight": {
      "none":    { "value": "1",     "type": "number" },
      "tight":   { "value": "1.25",  "type": "number" },
      "normal":  { "value": "1.5",   "type": "number" },
      "relaxed": { "value": "1.625", "type": "number" },
      "loose":   { "value": "2",     "type": "number" }
    }
  },
  "radius": {
    "none": { "value": "0px",    "type": "dimension" },
    "sm":   { "value": "4px",    "type": "dimension" },
    "md":   { "value": "6px",    "type": "dimension" },
    "lg":   { "value": "8px",    "type": "dimension" },
    "xl":   { "value": "12px",   "type": "dimension" },
    "full": { "value": "9999px", "type": "dimension" }
  },
  "shadow": {
    "sm": {
      "value": "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
      "type": "boxShadow"
    },
    "md": {
      "value": "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
      "type": "boxShadow"
    },
    "lg": {
      "value": "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      "type": "boxShadow"
    }
  }
}
```

---

> 本知识库最后更新：2026-03-24
> 本文档作为 Claude 设计系统知识的参考源，可直接引用其中的 Token 定义、架构模式、无障碍标准来输出专业的设计系统方案。
