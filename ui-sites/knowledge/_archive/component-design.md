# UI 组件设计规范知识库

> 📦 来源：[Ant Design](https://ant.design) · [Material Design 3](https://m3.material.io) · [Atlassian Design](https://atlassian.design) · [Carbon Design](https://carbondesignsystem.com) · [Fluent UI](https://fluent2.microsoft.design) · [Chakra UI](https://chakra-ui.com) · [Radix UI](https://www.radix-ui.com) · [Shadcn/ui](https://ui.shadcn.com) · [Headless UI](https://headlessui.com) · [daisyUI](https://daisyui.com) · [Element Plus](https://element-plus.org) · [Naive UI](https://www.naiveui.com) · [Vuetify](https://vuetifyjs.com) · [Arco Design](https://arco.design) · [Mantine](https://mantine.dev)

---

## 一、基础设计系统

### 1.1 圆角系统

| Token | 值 | 适用场景 |
|-------|-----|---------|
| `none` | `0px` | 表格单元格、分割线 |
| `sm` | `2px` | 小型元素（Badge、Tag） |
| `md` | `6px` | 按钮、输入框、卡片（默认） |
| `lg` | `8-12px` | 大卡片、弹窗、面板 |
| `xl` | `16px` | 浮层、Popover、大圆角卡片 |
| `full` | `9999px` | 药丸按钮、头像、全圆角 |

```css
:root {
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### 1.2 阴影系统

| Token | box-shadow | 适用场景 |
|-------|-----------|---------|
| `sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | 按钮、输入框 |
| `md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | 卡片、下拉菜单 |
| `lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | 弹窗、Popover |
| `xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modal、全屏面板 |

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

### 1.3 组件间距系统

```
组件内部间距（Padding）
├── 紧凑型：  8px (py-2 px-3)
├── 默认型：  12px (py-3 px-4)
└── 宽松型：  16px (py-4 px-6)

组件间间距（Gap）
├── 紧密关联：  8px  (gap-2)   — 同组表单元素
├── 一般关联：  16px (gap-4)   — 不同字段间
├── 区块间隔：  24px (gap-6)   — 表单分组间
└── 大区块间隔：32px (gap-8)   — 页面 Section 间

表单元素间距
├── Label → Input：   4-8px
├── Input → Help text：4px
├── Input → Error：    4px
├── Field → Field：    16-24px
└── Group → Group：    24-32px
```

---

## 二、15 种核心组件规范

---

### 2.1 Button 按钮

**设计规范**

| 尺寸 | 高度 | 内边距 | 字号 | 圆角 |
|------|------|-------|------|------|
| `sm` | 32px | 4px 12px | 14px | var(--radius-md) |
| `md` | 36-40px | 6px 16px | 14px | var(--radius-md) |
| `lg` | 44-48px | 8px 24px | 16px | var(--radius-md) |

**变体类型**

| 变体 | 背景 | 文字 | 边框 | 场景 |
|------|------|------|------|------|
| Primary | `--color-primary` | white | none | 主操作，每屏最多 1 个 |
| Secondary | transparent | `--color-primary` | 1px solid | 次级操作 |
| Ghost | transparent | `--color-text` | 1px solid gray | 辅助操作 |
| Danger | `--color-error` | white | none | 删除、危险操作 |
| Link | transparent | `--color-primary` | none | 内联链接式操作 |
| Icon | transparent | `--color-text` | none | 图标按钮（正方形） |

**状态**

```css
/* Default */
.btn-primary { background: var(--color-primary); }
/* Hover — 亮度降低或加深 */
.btn-primary:hover { background: var(--color-primary-600); }
/* Active — 进一步加深 */
.btn-primary:active { background: var(--color-primary-700); transform: scale(0.98); }
/* Focus — 焦点环 */
.btn-primary:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
/* Disabled — 降低透明度 */
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
/* Loading — 显示 spinner */
.btn-primary.loading { pointer-events: none; opacity: 0.8; }
```

**Tailwind 示例**

```html
<!-- Primary Button -->
<button class="inline-flex items-center justify-center h-10 px-4 text-sm font-medium
  text-white bg-blue-600 rounded-md
  hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98]
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors duration-150">
  按钮文字
</button>

<!-- Secondary / Outline -->
<button class="h-10 px-4 text-sm font-medium text-blue-600 bg-transparent
  border border-blue-600 rounded-md
  hover:bg-blue-50 active:bg-blue-100
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
  disabled:opacity-50 transition-colors">
  次级按钮
</button>

<!-- Ghost -->
<button class="h-10 px-4 text-sm font-medium text-gray-700
  border border-gray-300 rounded-md
  hover:bg-gray-50 active:bg-gray-100
  disabled:opacity-50 transition-colors">
  幽灵按钮
</button>

<!-- Danger -->
<button class="h-10 px-4 text-sm font-medium text-white bg-red-600 rounded-md
  hover:bg-red-700 active:bg-red-800
  disabled:opacity-50 transition-colors">
  危险操作
</button>

<!-- Icon Button -->
<button class="inline-flex items-center justify-center w-10 h-10 rounded-md
  text-gray-500 hover:bg-gray-100 active:bg-gray-200
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
  transition-colors">
  <svg class="w-5 h-5"><!-- icon --></svg>
</button>
```

**最佳实践**
- 每屏只有一个 Primary 按钮
- 按钮文案用动词（"保存"而非"确定"）
- 危险操作需二次确认
- 加载状态替换文字为 spinner + "处理中..."

**反模式**
- 在一行内放多个 Primary 按钮
- 用颜色而非语义区分按钮类型
- 禁用状态不给提示原因

---

### 2.2 Input 输入框

**设计规范**

| 属性 | 值 |
|------|-----|
| 高度 | sm: 32px / md: 36-40px / lg: 44px |
| 内边距 | 8px 12px |
| 字号 | 14px |
| 圆角 | var(--radius-md) |
| 边框 | 1px solid var(--color-border) |
| Label 字号 | 14px, font-weight: 500 |

**状态**

```css
/* Default */
.input { border: 1px solid #d1d5db; background: white; }
/* Hover */
.input:hover { border-color: #9ca3af; }
/* Focus */
.input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1); outline: none; }
/* Error */
.input--error { border-color: var(--color-error); }
.input--error:focus { box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1); }
/* Success */
.input--success { border-color: var(--color-success); }
/* Disabled */
.input:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }
```

**Tailwind 示例**

```html
<!-- 基础输入框 -->
<div class="space-y-1">
  <label class="block text-sm font-medium text-gray-700">用户名</label>
  <input type="text" placeholder="请输入用户名"
    class="w-full h-10 px-3 text-sm border border-gray-300 rounded-md
    hover:border-gray-400
    focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:outline-none
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
    transition-colors" />
  <p class="text-xs text-gray-500">用户名长度 3-20 个字符</p>
</div>

<!-- 错误状态 -->
<div class="space-y-1">
  <label class="block text-sm font-medium text-gray-700">邮箱</label>
  <input type="email" value="invalid"
    class="w-full h-10 px-3 text-sm border border-red-500 rounded-md
    focus:ring-3 focus:ring-red-500/10 focus:outline-none" />
  <p class="text-xs text-red-600">请输入有效的邮箱地址</p>
</div>

<!-- 带前缀/后缀 -->
<div class="flex">
  <span class="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50
    border border-r-0 border-gray-300 rounded-l-md">https://</span>
  <input type="text" placeholder="example.com"
    class="flex-1 h-10 px-3 text-sm border border-gray-300 rounded-r-md
    focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:outline-none" />
</div>

<!-- Textarea -->
<textarea rows="4" placeholder="请输入描述..."
  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-y
  focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:outline-none">
</textarea>
```

**最佳实践**
- 始终带 Label，不依赖 placeholder
- 实时验证优于提交后验证
- 错误信息紧跟输入框下方，用红色标注
- 密码框提供可见性切换

**反模式**
- 只用 placeholder 代替 Label
- 在用户还没输完时就报错
- 错误信息位置不一致

---

### 2.3 Card 卡片

**设计规范**

| 属性 | 值 |
|------|-----|
| 内边距 | 16px - 24px |
| 圆角 | var(--radius-lg) 即 8-12px |
| 阴影 | var(--shadow-sm) 默认 / var(--shadow-md) hover |
| 边框 | 1px solid var(--color-border) 或纯阴影 |
| 背景 | white（亮色）/ var(--color-surface) |

**变体**

```html
<!-- 基础卡片 -->
<div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
  <h3 class="text-lg font-semibold text-gray-900">卡片标题</h3>
  <p class="mt-2 text-sm text-gray-600">卡片描述内容</p>
</div>

<!-- 带图片卡片 -->
<div class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
  <img src="..." alt="" class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="text-lg font-semibold text-gray-900">带图卡片</h3>
    <p class="mt-2 text-sm text-gray-600">描述内容</p>
  </div>
</div>

<!-- 交互式卡片（可点击） -->
<div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm
  cursor-pointer transition-all duration-200
  hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5
  active:shadow-sm active:translate-y-0">
  <h3 class="text-lg font-semibold text-gray-900">可点击卡片</h3>
  <p class="mt-2 text-sm text-gray-600">鼠标悬停有上浮效果</p>
</div>

<!-- 统计卡片 -->
<div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
  <p class="text-sm font-medium text-gray-500">总收入</p>
  <p class="mt-2 text-3xl font-bold text-gray-900">¥128,430</p>
  <p class="mt-1 text-sm text-green-600">↑ 12.5% 较上月</p>
</div>
```

**最佳实践**
- 卡片间距统一（通常 16px 或 24px gap）
- 可交互卡片需有 hover 反馈
- 卡片内信息层级清晰（标题 > 描述 > 操作）

**反模式**
- 卡片内塞太多内容
- 不同卡片间距不一致
- 可点击卡片没有 hover 效果

---

### 2.4 Modal / Dialog 弹窗

**设计规范**

| 属性 | 值 |
|------|-----|
| 宽度 | sm: 400px / md: 540px / lg: 720px / full: 90vw |
| 内边距 | 24px |
| 圆角 | var(--radius-lg) 12px |
| 阴影 | var(--shadow-xl) |
| 遮罩 | rgba(0,0,0,0.5) 或 backdrop-blur |
| z-index | 50 |

**Tailwind 示例**

```html
<!-- 遮罩层 -->
<div class="fixed inset-0 z-50 flex items-center justify-center">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"></div>

  <!-- Dialog -->
  <div class="relative z-10 w-full max-w-md mx-4 bg-white rounded-xl shadow-xl
    animate-in fade-in zoom-in-95 duration-200" role="dialog" aria-modal="true">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">弹窗标题</h2>
      <button class="p-1 text-gray-400 hover:text-gray-600 rounded-md
        hover:bg-gray-100 transition-colors" aria-label="关闭">
        <svg class="w-5 h-5"><!-- X icon --></svg>
      </button>
    </div>

    <!-- Body -->
    <div class="px-6 py-4">
      <p class="text-sm text-gray-600">弹窗内容区域</p>
    </div>

    <!-- Footer -->
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
      <button class="h-9 px-4 text-sm text-gray-700 border border-gray-300
        rounded-md hover:bg-gray-50 transition-colors">取消</button>
      <button class="h-9 px-4 text-sm text-white bg-blue-600
        rounded-md hover:bg-blue-700 transition-colors">确认</button>
    </div>
  </div>
</div>
```

**最佳实践**
- 支持 ESC 关闭、点击遮罩关闭
- Focus trap：焦点锁定在弹窗内
- 打开时 body 禁止滚动
- 关闭按钮始终可见

**反模式**
- 弹窗中套弹窗
- 没有关闭手段
- 内容过多需要滚动（应考虑用页面代替）

---

### 2.5 Navigation 导航

**顶部导航栏**

```html
<nav class="sticky top-0 z-40 w-full h-16 bg-white border-b border-gray-200">
  <div class="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
    <!-- Logo -->
    <a href="/" class="text-xl font-bold text-gray-900">Logo</a>

    <!-- Nav Links -->
    <div class="hidden md:flex items-center gap-1">
      <a href="#" class="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50
        rounded-md">首页</a>
      <a href="#" class="px-3 py-2 text-sm font-medium text-gray-700
        hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">产品</a>
      <a href="#" class="px-3 py-2 text-sm font-medium text-gray-700
        hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">关于</a>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button class="h-9 px-4 text-sm text-white bg-blue-600 rounded-md
        hover:bg-blue-700 transition-colors">登录</button>
    </div>
  </div>
</nav>
```

**侧边栏导航**

```html
<aside class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200">
  <!-- Logo -->
  <div class="flex items-center h-16 px-6 border-b border-gray-200">
    <span class="text-lg font-bold">Dashboard</span>
  </div>

  <!-- Menu -->
  <nav class="p-4 space-y-1">
    <!-- Active Item -->
    <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium
      text-blue-600 bg-blue-50 rounded-md">
      <svg class="w-5 h-5"><!-- icon --></svg>
      概览
    </a>
    <!-- Normal Item -->
    <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium
      text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
      <svg class="w-5 h-5"><!-- icon --></svg>
      数据分析
    </a>
  </nav>
</aside>
```

**面包屑**

```html
<nav class="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
  <a href="/" class="text-gray-500 hover:text-gray-700">首页</a>
  <span class="text-gray-400">/</span>
  <a href="/products" class="text-gray-500 hover:text-gray-700">产品</a>
  <span class="text-gray-400">/</span>
  <span class="text-gray-900 font-medium">产品详情</span>
</nav>
```

**Tab 导航**

```html
<div class="border-b border-gray-200">
  <nav class="flex gap-0 -mb-px" role="tablist">
    <button role="tab" aria-selected="true"
      class="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
      基本信息
    </button>
    <button role="tab" aria-selected="false"
      class="px-4 py-3 text-sm font-medium text-gray-500
      hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent
      transition-colors">
      安全设置
    </button>
  </nav>
</div>
```

---

### 2.6 Table 表格

```html
<div class="overflow-x-auto border border-gray-200 rounded-lg">
  <table class="w-full text-sm">
    <thead>
      <tr class="bg-gray-50 border-b border-gray-200">
        <th class="px-4 py-3 text-left font-medium text-gray-500">
          <div class="flex items-center gap-1 cursor-pointer hover:text-gray-700">
            名称
            <svg class="w-4 h-4"><!-- sort icon --></svg>
          </div>
        </th>
        <th class="px-4 py-3 text-left font-medium text-gray-500">状态</th>
        <th class="px-4 py-3 text-right font-medium text-gray-500">操作</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3 text-gray-900 font-medium">项目名称</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center px-2 py-0.5 text-xs font-medium
            text-green-700 bg-green-50 rounded-full">进行中</span>
        </td>
        <td class="px-4 py-3 text-right">
          <button class="text-blue-600 hover:text-blue-800 text-sm">编辑</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**最佳实践**
- 表头固定（sticky header）
- 水平溢出时可横向滚动
- 行 hover 高亮
- 操作列右对齐

---

### 2.7 Form 表单

**布局模式**

```
垂直布局（推荐移动端）：
┌──────────────┐
│ Label        │
│ [Input     ] │
│ Help text    │
└──────────────┘

水平布局（桌面端）：
┌────────┬────────────┐
│ Label  │ [Input   ] │
│        │ Help text  │
└────────┴────────────┘
Label 宽度：通常 100-140px
```

```html
<!-- 垂直表单 -->
<form class="space-y-6 max-w-md">
  <div class="space-y-1.5">
    <label class="block text-sm font-medium text-gray-700">
      邮箱 <span class="text-red-500">*</span>
    </label>
    <input type="email" required
      class="w-full h-10 px-3 text-sm border border-gray-300 rounded-md
      focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:outline-none" />
  </div>

  <div class="space-y-1.5">
    <label class="block text-sm font-medium text-gray-700">密码</label>
    <input type="password"
      class="w-full h-10 px-3 text-sm border border-gray-300 rounded-md
      focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:outline-none" />
    <p class="text-xs text-gray-500">至少 8 个字符，包含大小写字母和数字</p>
  </div>

  <button type="submit"
    class="w-full h-10 text-sm font-medium text-white bg-blue-600 rounded-md
    hover:bg-blue-700 transition-colors">
    注册
  </button>
</form>
```

---

### 2.8 Toast / Notification 提示

**设计规范**

| 属性 | 值 |
|------|-----|
| 位置 | 右上角（桌面）/ 顶部居中（移动端） |
| 宽度 | 320-400px |
| 内边距 | 12px 16px |
| 圆角 | var(--radius-lg) |
| 自动关闭 | 3-5 秒（错误类除外） |

```html
<!-- Success Toast -->
<div class="flex items-start gap-3 p-4 bg-white border border-gray-200
  rounded-lg shadow-lg max-w-sm" role="alert">
  <div class="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5">
    <svg><!-- check icon --></svg>
  </div>
  <div class="flex-1">
    <p class="text-sm font-medium text-gray-900">保存成功</p>
    <p class="mt-1 text-xs text-gray-500">更改已保存</p>
  </div>
  <button class="flex-shrink-0 text-gray-400 hover:text-gray-600">
    <svg class="w-4 h-4"><!-- X icon --></svg>
  </button>
</div>

<!-- Error Toast -->
<div class="flex items-start gap-3 p-4 bg-red-50 border border-red-200
  rounded-lg shadow-lg max-w-sm" role="alert">
  <div class="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5">
    <svg><!-- error icon --></svg>
  </div>
  <div class="flex-1">
    <p class="text-sm font-medium text-red-800">操作失败</p>
    <p class="mt-1 text-xs text-red-600">请检查网络连接后重试</p>
  </div>
</div>

<!-- Warning Toast -->
<div class="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200
  rounded-lg shadow-lg max-w-sm" role="alert">
  <div class="flex-shrink-0 w-5 h-5 text-yellow-500 mt-0.5">
    <svg><!-- warning icon --></svg>
  </div>
  <div class="flex-1">
    <p class="text-sm font-medium text-yellow-800">注意</p>
    <p class="mt-1 text-xs text-yellow-600">你的存储空间即将用尽</p>
  </div>
</div>

<!-- Info Toast -->
<div class="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200
  rounded-lg shadow-lg max-w-sm" role="alert">
  <div class="flex-shrink-0 w-5 h-5 text-blue-500 mt-0.5">
    <svg><!-- info icon --></svg>
  </div>
  <div class="flex-1">
    <p class="text-sm font-medium text-blue-800">提示</p>
    <p class="mt-1 text-xs text-blue-600">新版本已发布，请刷新页面</p>
  </div>
</div>
```

---

### 2.9 Avatar 头像

```html
<!-- 尺寸变体 -->
<div class="flex items-center gap-3">
  <!-- xs: 24px -->
  <img class="w-6 h-6 rounded-full object-cover" src="..." alt="" />
  <!-- sm: 32px -->
  <img class="w-8 h-8 rounded-full object-cover" src="..." alt="" />
  <!-- md: 40px -->
  <img class="w-10 h-10 rounded-full object-cover" src="..." alt="" />
  <!-- lg: 48px -->
  <img class="w-12 h-12 rounded-full object-cover" src="..." alt="" />
  <!-- xl: 64px -->
  <img class="w-16 h-16 rounded-full object-cover" src="..." alt="" />
</div>

<!-- 文字头像（无图片时 fallback） -->
<div class="inline-flex items-center justify-center w-10 h-10 rounded-full
  bg-blue-100 text-blue-600 text-sm font-medium">
  张
</div>

<!-- 头像组（叠加） -->
<div class="flex -space-x-2">
  <img class="w-8 h-8 rounded-full border-2 border-white object-cover" src="..." alt="" />
  <img class="w-8 h-8 rounded-full border-2 border-white object-cover" src="..." alt="" />
  <img class="w-8 h-8 rounded-full border-2 border-white object-cover" src="..." alt="" />
  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full
    border-2 border-white bg-gray-100 text-xs font-medium text-gray-600">+5</div>
</div>

<!-- 带状态指示 -->
<div class="relative inline-block">
  <img class="w-10 h-10 rounded-full object-cover" src="..." alt="" />
  <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white
    rounded-full"></span>
</div>
```

---

### 2.10 Badge 徽章

```html
<!-- 数字徽章 -->
<div class="relative inline-flex">
  <button class="p-2 text-gray-600">
    <svg class="w-6 h-6"><!-- bell icon --></svg>
  </button>
  <span class="absolute -top-1 -right-1 inline-flex items-center justify-center
    min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-red-500
    rounded-full">3</span>
</div>

<!-- 大数字（99+） -->
<span class="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5
  text-xs font-bold text-white bg-red-500 rounded-full">99+</span>

<!-- 点状态徽章 -->
<div class="relative inline-flex">
  <button class="p-2 text-gray-600">
    <svg class="w-6 h-6"><!-- icon --></svg>
  </button>
  <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
</div>

<!-- 文字状态徽章 -->
<span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium
  text-green-700 bg-green-50 border border-green-200 rounded-full">已完成</span>
<span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium
  text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-full">进行中</span>
<span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium
  text-red-700 bg-red-50 border border-red-200 rounded-full">已拒绝</span>
```

---

### 2.11 Tag / Chip 标签

```html
<!-- 基础标签 -->
<span class="inline-flex items-center px-2.5 py-1 text-xs font-medium
  text-blue-700 bg-blue-50 rounded-md">标签</span>

<!-- 可删除标签 -->
<span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium
  text-blue-700 bg-blue-50 rounded-md">
  标签
  <button class="text-blue-400 hover:text-blue-600">
    <svg class="w-3.5 h-3.5"><!-- X icon --></svg>
  </button>
</span>

<!-- 可选择标签（toggle） -->
<button class="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full
  border transition-colors
  [&.active]:bg-blue-600 [&.active]:text-white [&.active]:border-blue-600
  border-gray-300 text-gray-700 hover:bg-gray-50">
  React
</button>

<!-- 带图标标签 -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium
  text-gray-700 bg-gray-100 rounded-md">
  <svg class="w-3.5 h-3.5"><!-- icon --></svg>
  TypeScript
</span>
```

---

### 2.12 Dropdown 下拉菜单

```html
<div class="relative inline-block">
  <!-- Trigger -->
  <button class="inline-flex items-center gap-2 h-10 px-4 text-sm
    border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
    选择选项
    <svg class="w-4 h-4 text-gray-400"><!-- chevron down --></svg>
  </button>

  <!-- Menu -->
  <div class="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200
    rounded-lg shadow-lg z-50 py-1" role="menu">
    <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700
      hover:bg-gray-50 transition-colors" role="menuitem">
      <svg class="w-4 h-4"><!-- icon --></svg>
      编辑
    </button>
    <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700
      hover:bg-gray-50 transition-colors" role="menuitem">
      <svg class="w-4 h-4"><!-- icon --></svg>
      复制
    </button>
    <div class="my-1 border-t border-gray-100"></div>
    <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600
      hover:bg-red-50 transition-colors" role="menuitem">
      <svg class="w-4 h-4"><!-- icon --></svg>
      删除
    </button>
  </div>
</div>
```

---

### 2.13 Tooltip 文字提示

```html
<!-- CSS-only Tooltip -->
<div class="relative group inline-block">
  <button class="text-gray-500 hover:text-gray-700">
    <svg class="w-5 h-5"><!-- help icon --></svg>
  </button>
  <!-- Tooltip: Top -->
  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
    px-3 py-1.5 text-xs text-white bg-gray-900 rounded-md
    opacity-0 invisible group-hover:opacity-100 group-hover:visible
    transition-all duration-150 whitespace-nowrap pointer-events-none">
    这是提示文字
    <!-- Arrow -->
    <div class="absolute top-full left-1/2 -translate-x-1/2
      border-4 border-transparent border-t-gray-900"></div>
  </div>
</div>
```

**方向**：top（默认）、bottom、left、right
**触发方式**：hover（默认）、click、focus
**延迟**：显示 200ms / 隐藏 100ms

---

### 2.14 Progress 进度条

```html
<!-- 线性进度条 -->
<div class="space-y-1.5">
  <div class="flex justify-between text-sm">
    <span class="text-gray-700">上传进度</span>
    <span class="text-gray-500">75%</span>
  </div>
  <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div class="h-full bg-blue-600 rounded-full transition-all duration-300"
      style="width: 75%"></div>
  </div>
</div>

<!-- 步骤条 -->
<div class="flex items-center">
  <!-- 已完成步骤 -->
  <div class="flex items-center">
    <div class="flex items-center justify-center w-8 h-8 bg-blue-600
      text-white text-sm font-medium rounded-full">
      <svg class="w-4 h-4"><!-- check --></svg>
    </div>
    <span class="ml-2 text-sm font-medium text-blue-600">基本信息</span>
  </div>
  <div class="flex-1 h-0.5 mx-4 bg-blue-600"></div>

  <!-- 当前步骤 -->
  <div class="flex items-center">
    <div class="flex items-center justify-center w-8 h-8 border-2 border-blue-600
      text-blue-600 text-sm font-medium rounded-full">2</div>
    <span class="ml-2 text-sm font-medium text-blue-600">详细设置</span>
  </div>
  <div class="flex-1 h-0.5 mx-4 bg-gray-200"></div>

  <!-- 未完成步骤 -->
  <div class="flex items-center">
    <div class="flex items-center justify-center w-8 h-8 border-2 border-gray-300
      text-gray-400 text-sm font-medium rounded-full">3</div>
    <span class="ml-2 text-sm text-gray-400">完成</span>
  </div>
</div>
```

---

### 2.15 Empty State 空状态

```html
<!-- 标准空状态 -->
<div class="flex flex-col items-center justify-center py-16 px-4 text-center">
  <!-- 插画/图标 -->
  <div class="w-24 h-24 mb-6 text-gray-300">
    <svg><!-- empty illustration --></svg>
  </div>
  <!-- 标题 -->
  <h3 class="text-lg font-medium text-gray-900">暂无数据</h3>
  <!-- 描述 -->
  <p class="mt-2 text-sm text-gray-500 max-w-sm">
    还没有添加任何项目，点击下方按钮创建第一个
  </p>
  <!-- 操作按钮 -->
  <button class="mt-6 inline-flex items-center gap-2 h-10 px-4 text-sm font-medium
    text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
    <svg class="w-4 h-4"><!-- plus icon --></svg>
    创建项目
  </button>
</div>

<!-- 搜索无结果 -->
<div class="flex flex-col items-center justify-center py-12 text-center">
  <div class="w-16 h-16 mb-4 text-gray-300">
    <svg><!-- search icon --></svg>
  </div>
  <h3 class="text-base font-medium text-gray-900">未找到结果</h3>
  <p class="mt-1 text-sm text-gray-500">
    尝试使用不同的关键词搜索
  </p>
</div>

<!-- 错误状态 -->
<div class="flex flex-col items-center justify-center py-12 text-center">
  <div class="w-16 h-16 mb-4 text-red-300">
    <svg><!-- error icon --></svg>
  </div>
  <h3 class="text-base font-medium text-gray-900">加载失败</h3>
  <p class="mt-1 text-sm text-gray-500">请检查网络连接后重试</p>
  <button class="mt-4 h-9 px-4 text-sm text-blue-600 border border-blue-600
    rounded-md hover:bg-blue-50 transition-colors">重新加载</button>
</div>
```

**最佳实践**
- 空状态必须有明确的行动引导（CTA）
- 插画/图标不宜过大
- 描述文案简洁有用，告知用户下一步该做什么
- 区分初始空状态、搜索无结果、错误状态

**反模式**
- 只显示一句"暂无数据"没有任何操作
- 空状态和加载状态混淆
- 使用过于复杂的插画分散注意力

---

## 三、组件设计速查表

| 组件 | 典型高度 | 圆角 | 常用 Tailwind 类 |
|------|---------|------|-----------------|
| Button sm | 32px | md | `h-8 px-3 text-sm rounded-md` |
| Button md | 36-40px | md | `h-10 px-4 text-sm rounded-md` |
| Button lg | 44-48px | md | `h-12 px-6 text-base rounded-md` |
| Input | 36-40px | md | `h-10 px-3 text-sm rounded-md border` |
| Card | auto | lg | `p-6 rounded-lg border shadow-sm` |
| Modal | auto | xl | `rounded-xl shadow-xl max-w-md` |
| Tag | 24-28px | md/full | `px-2.5 py-1 text-xs rounded-md` |
| Badge | 18-20px | full | `min-w-[18px] h-[18px] text-xs rounded-full` |
| Avatar sm | 32px | full | `w-8 h-8 rounded-full` |
| Avatar md | 40px | full | `w-10 h-10 rounded-full` |
| Tooltip | auto | md | `px-3 py-1.5 text-xs rounded-md bg-gray-900` |
| Toast | auto | lg | `p-4 rounded-lg shadow-lg max-w-sm` |
| Dropdown | auto | lg | `rounded-lg shadow-lg border py-1` |
| Progress | 8px | full | `h-2 rounded-full bg-gray-200` |

---

## 四、设计系统组件尺寸对比

> 参考来源：Ant Design · Material Design 3 · Element Plus · Arco Design · Naive UI

### 4.1 Button 尺寸对比

| 设计系统 | Small | Medium/Default | Large |
|---------|-------|---------------|-------|
| **Ant Design** | 24px (h) / 7px (px) | 32px / 15px | 40px / 15px |
| **Material Design 3** | — | 40px / 24px | — |
| **Element Plus** | 24px / 7px | 32px / 15px | 40px / 19px |
| **Arco Design** | 24px / 7px | 32px / 15px | 36px / 19px |
| **Naive UI** | 28px / 10px | 34px / 14px | 40px / 18px |
| **Chakra UI** | 32px / 12px | 40px / 16px | 48px / 24px |
| **Mantine** | 30px / 14px | 36px / 18px | 42px / 22px |

**结论**：多数设计系统的默认按钮高度在 **32-40px** 之间，推荐使用 **36px** 作为默认值。

### 4.2 Input 尺寸对比

| 设计系统 | Small | Default | Large |
|---------|-------|---------|-------|
| **Ant Design** | 24px | 32px | 40px |
| **Element Plus** | 24px | 32px | 40px |
| **Arco Design** | 24px | 32px | 36px |
| **Naive UI** | 28px | 34px | 40px |
| **Material Design 3** | — | 56px (outlined) | — |
| **Chakra UI** | 32px | 40px | 48px |

**注意**：Material Design 3 的 Input 高度为 56px，明显高于中式设计系统的 32px，选型时注意视觉一致性。

### 4.3 圆角对比

| 设计系统 | 按钮 | 输入框 | 卡片 | 弹窗 |
|---------|------|-------|------|------|
| **Ant Design** | 6px | 6px | 8px | 8px |
| **Material Design 3** | 20px (full) | 4px | 12px | 28px |
| **Element Plus** | 4px | 4px | 4px | 4px |
| **Arco Design** | 2px | 2px | 4px | 4px |
| **Shadcn/ui** | 6px | 6px | 8px | 12px |
| **Naive UI** | 3px | 3px | 3px | 3px |

**结论**：Material Design 圆角最大（20-28px），中式设计系统偏小（2-6px），Shadcn/ui 居中（6-12px）。

---

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
