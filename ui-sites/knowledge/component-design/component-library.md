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

