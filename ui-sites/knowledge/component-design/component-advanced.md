## 五、组件动效规范

> 参考来源：animation.md 知识库 · Framer Motion · Material Design 3

### 5.1 状态过渡时长

| 交互类型 | 时长 | 缓动函数 |
|---------|------|---------|
| Hover 进入/离开 | 150ms | `ease-out` |
| Active 按下 | 100ms | `ease-in` |
| Focus 获取 | 100ms | `ease-out` |
| 下拉菜单展开 | 200ms | `cubic-bezier(0.2, 0, 0, 1)` |
| 下拉菜单收起 | 150ms | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| Modal 进入 | 250ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Modal 退出 | 200ms | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| Toast 滑入 | 300ms | `cubic-bezier(0.2, 0, 0, 1)` |
| Toast 滑出 | 200ms | `ease-in` |
| Tab 切换 | 200ms | `ease-in-out` |
| Tooltip 显示 | 200ms (含 100ms 延迟) | `ease-out` |

### 5.2 组件动画 Tailwind 实现

```css
/* 统一的组件过渡基类 */
.transition-base {
  @apply transition-colors duration-150 ease-out;
}
.transition-transform {
  @apply transition-all duration-200 ease-out;
}
.transition-opacity {
  @apply transition-opacity duration-200 ease-in-out;
}
```

**下拉菜单动画**

```html
<!-- 展开 -->
<div class="origin-top-left animate-in fade-in-0 zoom-in-95 duration-200">
  <!-- menu content -->
</div>

<!-- Tailwind 手动实现 -->
<div class="transition-all duration-200
  data-[state=open]:opacity-100 data-[state=open]:scale-100
  data-[state=closed]:opacity-0 data-[state=closed]:scale-95">
</div>
```

**Modal 动画**

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/50 transition-opacity duration-300
  data-[state=open]:opacity-100 data-[state=closed]:opacity-0"></div>

<!-- Dialog -->
<div class="transition-all duration-250
  data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=open]:translate-y-0
  data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=closed]:translate-y-4">
</div>
```

**Toast 滑入动画**

```css
@keyframes toast-slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes toast-slide-out {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
.toast-enter { animation: toast-slide-in 300ms cubic-bezier(0.2, 0, 0, 1); }
.toast-exit { animation: toast-slide-out 200ms ease-in forwards; }
```

**按钮点击 Ripple 效果**

```css
.btn-ripple {
  position: relative;
  overflow: hidden;
}
.btn-ripple::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: transform 0.4s ease-out, opacity 0.3s;
}
.btn-ripple:active::after {
  transform: scale(2.5);
  opacity: 1;
  transition: 0s;
}
```

---

## 六、响应式组件适配

> 参考来源：layout-patterns.md · mobile-ui.md

### 6.1 断点下的组件调整

| 组件 | Mobile (< 640px) | Tablet (640-1024px) | Desktop (> 1024px) |
|------|-----------------|-------------------|-------------------|
| **Button** | 全宽 `w-full` | 自适应宽度 | 自适应宽度 |
| **Input** | 全宽 | 全宽 | 设定 max-width |
| **Card** | 单列堆叠 | 2 列网格 | 3-4 列网格 |
| **Modal** | 全屏 `h-full w-full rounded-none` | 居中 `max-w-md` | 居中 `max-w-lg` |
| **Table** | 卡片列表模式 或 横向滚动 | 横向滚动 | 正常表格 |
| **Navigation** | 底部 Tab Bar / Hamburger | 侧边栏可折叠 | 完整侧边栏 |
| **Toast** | 顶部全宽 | 右上角 | 右上角 |
| **Dropdown** | 全屏 Bottom Sheet | 正常下拉 | 正常下拉 |
| **Tabs** | 横向可滚动 | 正常展示 | 正常展示 |

### 6.2 移动端 Table → 卡片列表

```html
<!-- 桌面端：正常表格 -->
<table class="hidden md:table w-full">
  <thead>...</thead>
  <tbody>...</tbody>
</table>

<!-- 移动端：卡片列表 -->
<div class="md:hidden space-y-4">
  <div class="p-4 bg-white rounded-lg border border-gray-200">
    <div class="flex justify-between items-start">
      <div>
        <p class="font-medium text-gray-900">项目名称</p>
        <p class="text-sm text-gray-500 mt-1">2024-01-15</p>
      </div>
      <span class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50
        rounded-full">进行中</span>
    </div>
    <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
      <p class="text-sm text-gray-600">负责人：张三</p>
      <button class="text-sm text-blue-600">详情 →</button>
    </div>
  </div>
</div>
```

### 6.3 移动端 Modal → 全屏 / Bottom Sheet

```html
<!-- 桌面端：居中弹窗 -->
<div class="hidden md:flex fixed inset-0 items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
    <!-- dialog content -->
  </div>
</div>

<!-- 移动端：Bottom Sheet 风格 -->
<div class="md:hidden fixed inset-0 z-50">
  <div class="fixed inset-0 bg-black/50" />
  <div class="fixed bottom-0 inset-x-0 bg-white rounded-t-2xl
    max-h-[85vh] overflow-y-auto
    animate-in slide-in-from-bottom duration-300">
    <!-- 拖拽指示条 -->
    <div class="flex justify-center pt-3 pb-2">
      <div class="w-10 h-1 bg-gray-300 rounded-full"></div>
    </div>
    <!-- dialog content -->
  </div>
</div>
```

---

## 七、组件颜色语义规范

> 参考来源：color-palettes.md · design-systems.md

### 7.1 语义色 Token

```css
:root {
  /* Primary — 主操作、链接、焦点 */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-active: #1e40af;
  --color-primary-bg: #eff6ff;

  /* Success — 成功、完成、正向 */
  --color-success: #16a34a;
  --color-success-hover: #15803d;
  --color-success-bg: #f0fdf4;

  /* Warning — 警告、注意 */
  --color-warning: #d97706;
  --color-warning-hover: #b45309;
  --color-warning-bg: #fffbeb;

  /* Error / Danger — 错误、危险、删除 */
  --color-error: #dc2626;
  --color-error-hover: #b91c1c;
  --color-error-bg: #fef2f2;

  /* Info — 信息、提示 */
  --color-info: #2563eb;
  --color-info-bg: #eff6ff;

  /* Neutral — 文字、边框、背景 */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-tertiary: #9ca3af;
  --color-text-disabled: #d1d5db;
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;
  --color-bg-page: #f9fafb;
  --color-bg-card: #ffffff;
  --color-bg-hover: #f3f4f6;
  --color-bg-active: #e5e7eb;
}
```

### 7.2 组件状态色使用规范

| 组件状态 | 背景变化 | 边框变化 | 文字变化 |
|---------|---------|---------|---------|
| Default | 原色 | 原色 | 原色 |
| Hover | 加深 5-10% | 加深 | 不变 |
| Active | 加深 10-15% | 加深 | 不变 |
| Focus | 不变 | primary + ring | 不变 |
| Disabled | 降低至 50% 透明度 | 降低至 50% | 降低至 50% |
| Loading | 降低至 80% 透明度 | 不变 | 替换为 spinner |

**Tailwind 状态类模板**

```html
<!-- 完整的交互状态类集合 -->
<button class="
  bg-blue-600 text-white border border-transparent
  hover:bg-blue-700
  active:bg-blue-800 active:scale-[0.98]
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  aria-busy:opacity-80 aria-busy:cursor-wait
  transition-all duration-150
">
  按钮
</button>
```

---

## 八、组件排版规范

> 参考来源：typography.md

### 8.1 组件内字号体系

| 用途 | 字号 | 字重 | 行高 | Tailwind |
|------|------|------|------|---------|
| 组件标题（Modal/Card 标题） | 18px | 600 | 1.4 | `text-lg font-semibold` |
| 组件正文 | 14px | 400 | 1.5 | `text-sm` |
| 辅助文字（Help text/描述） | 12-13px | 400 | 1.4 | `text-xs text-gray-500` |
| Label | 14px | 500 | 1.4 | `text-sm font-medium` |
| 按钮文字 sm | 13-14px | 500 | 1 | `text-sm font-medium` |
| 按钮文字 md | 14px | 500 | 1 | `text-sm font-medium` |
| 按钮文字 lg | 16px | 500 | 1 | `text-base font-medium` |
| Badge/Tag 文字 | 12px | 500 | 1 | `text-xs font-medium` |
| Tooltip 文字 | 12px | 400 | 1.4 | `text-xs` |
| 表头 | 12-13px | 500 | 1.4 | `text-xs font-medium text-gray-500` |
| 表格正文 | 14px | 400 | 1.5 | `text-sm text-gray-900` |
| Placeholder | 14px | 400 | — | `text-sm text-gray-400` |

### 8.2 组件内图标尺寸

| 组件尺寸 | 图标大小 | Tailwind |
|---------|---------|---------|
| Small (32px) | 16px | `w-4 h-4` |
| Medium (36-40px) | 20px | `w-5 h-5` |
| Large (44-48px) | 24px | `w-6 h-6` |
| 独立图标按钮 | 与组件高度匹配 | 按钮 `w-10 h-10`，图标 `w-5 h-5` |

---

## 九、无障碍组件 Checklist

> 参考来源：design-systems.md

| 组件 | ARIA 角色/属性 | 键盘操作 |
|------|---------------|---------|
| **Button** | `role="button"` (原生 `<button>` 自带) | `Enter/Space` 触发 |
| **Input** | `aria-label` 或关联 `<label>`, `aria-invalid`, `aria-describedby` | Tab 聚焦 |
| **Modal** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | `Esc` 关闭, Focus Trap |
| **Dropdown** | `role="menu"`, `role="menuitem"`, `aria-expanded` | `Arrow Up/Down` 导航, `Enter` 选择, `Esc` 关闭 |
| **Tab** | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` | `Arrow Left/Right` 切换 |
| **Tooltip** | `role="tooltip"`, 触发元素 `aria-describedby` | `Esc` 关闭 |
| **Toast** | `role="alert"` 或 `role="status"`, `aria-live="polite"` | 自动朗读 |
| **Progress** | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | — |
| **Avatar** | 有意义时加 `alt`, 装饰性加 `alt=""` | — |
| **Table** | `<th scope="col/row">`, `aria-sort` | Tab 在交互元素间移动 |

**焦点样式标准**

```css
/* 所有可交互组件统一焦点样式 */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Tailwind */
.focus-ring {
  @apply focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600;
}
```

---

## 十、暗色模式组件适配

> 参考来源：design-systems.md · color-palettes.md

### 10.1 暗色模式颜色映射

| 亮色 Token | 亮色值 | → 暗色值 | 说明 |
|-----------|-------|---------|------|
| `--color-bg-page` | `#f9fafb` | `#0f172a` | 页面背景 |
| `--color-bg-card` | `#ffffff` | `#1e293b` | 卡片/组件背景 |
| `--color-bg-hover` | `#f3f4f6` | `#334155` | Hover 背景 |
| `--color-border` | `#e5e7eb` | `#334155` | 边框 |
| `--color-text-primary` | `#111827` | `#f1f5f9` | 主文字 |
| `--color-text-secondary` | `#6b7280` | `#94a3b8` | 次文字 |
| `--color-text-tertiary` | `#9ca3af` | `#64748b` | 辅助文字 |
| `--shadow-md` | `0 4px 6px rgb(0 0 0/0.1)` | `0 4px 6px rgb(0 0 0/0.4)` | 阴影加深 |

### 10.2 Tailwind 暗色模式组件

```html
<!-- 暗色模式卡片 -->
<div class="p-6 bg-white dark:bg-slate-800
  border border-gray-200 dark:border-slate-700
  rounded-lg shadow-sm dark:shadow-slate-900/30">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-slate-100">标题</h3>
  <p class="mt-2 text-sm text-gray-600 dark:text-slate-400">描述</p>
</div>

<!-- 暗色模式输入框 -->
<input class="w-full h-10 px-3 text-sm
  bg-white dark:bg-slate-900
  border border-gray-300 dark:border-slate-600
  text-gray-900 dark:text-slate-100
  placeholder-gray-400 dark:placeholder-slate-500
  rounded-md
  focus:border-blue-500 dark:focus:border-blue-400
  focus:ring-3 focus:ring-blue-500/10 dark:focus:ring-blue-400/20" />

<!-- 暗色模式按钮（Primary 不变，Secondary 需适配） -->
<button class="h-10 px-4 text-sm font-medium
  text-gray-700 dark:text-slate-300
  bg-white dark:bg-slate-800
  border border-gray-300 dark:border-slate-600
  rounded-md
  hover:bg-gray-50 dark:hover:bg-slate-700
  transition-colors">
  次级按钮
</button>

<!-- 暗色模式表格 -->
<table class="w-full text-sm">
  <thead>
    <tr class="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
      <th class="px-4 py-3 text-left font-medium text-gray-500 dark:text-slate-400">名称</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200 dark:divide-slate-700">
    <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50">
      <td class="px-4 py-3 text-gray-900 dark:text-slate-200">内容</td>
    </tr>
  </tbody>
</table>
```

### 10.3 暗色模式 CSS Variables 方案

```css
:root {
  --bg-page: #f9fafb;
  --bg-card: #ffffff;
  --bg-hover: #f3f4f6;
  --border: #e5e7eb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
}

:root.dark {
  --bg-page: #0f172a;
  --bg-card: #1e293b;
  --bg-hover: #334155;
  --border: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
}
```
