## 一、常见 Web 页面布局模式

### 1. 经典三栏布局 (Classic Three-Column)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│                  Header / Nav                │
├──────────┬────────────────────┬──────────────┤
│          │                    │              │
│  Left    │      Main          │    Right     │
│  Sidebar │      Content       │    Sidebar   │
│  (200px) │      (auto)        │    (240px)   │
│          │                    │              │
├──────────┴────────────────────┴──────────────┤
│                   Footer                     │
└──────────────────────────────────────────────┘
```

**适用场景：** 门户网站、新闻站点、内容聚合平台。左栏放导航/分类，中间放主体内容，右栏放推荐/广告/辅助信息。适用于信息密度高、需要多维度导航的页面。

**CSS/Tailwind 代码骨架：**

```html
<!-- Tailwind 实现 -->
<div class="min-h-screen flex flex-col">
  <header class="h-16 bg-white shadow-sm sticky top-0 z-50">
    <!-- Nav -->
  </header>

  <div class="flex-1 flex">
    <aside class="w-[200px] shrink-0 border-r bg-gray-50">
      <!-- Left Sidebar -->
    </aside>
    <main class="flex-1 min-w-0 p-6">
      <!-- Main Content -->
    </main>
    <aside class="w-[240px] shrink-0 border-l bg-gray-50">
      <!-- Right Sidebar -->
    </aside>
  </div>

  <footer class="h-20 bg-gray-900 text-white">
    <!-- Footer -->
  </footer>
</div>
```

```css
/* 纯 CSS Grid 实现 */
.layout-three-column {
  display: grid;
  grid-template-columns: 200px 1fr 240px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "left   main   right"
    "footer footer footer";
  min-height: 100vh;
}
.layout-three-column > header { grid-area: header; }
.layout-three-column > .sidebar-left { grid-area: left; }
.layout-three-column > main { grid-area: main; }
.layout-three-column > .sidebar-right { grid-area: right; }
.layout-three-column > footer { grid-area: footer; }

/* 响应式：平板及以下折叠为单栏 */
@media (max-width: 768px) {
  .layout-three-column {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "left"
      "right"
      "footer";
  }
}
```

---

### 2. 圣杯布局 (Holy Grail Layout)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│                   Header                     │
├──────────┬────────────────────┬──────────────┤
│          │                    │              │
│   Nav    │    Main Content    │    Aside     │
│  (nav)   │   (优先渲染)       │   (aside)    │
│          │                    │              │
├──────────┴────────────────────┴──────────────┤
│                   Footer                     │
└──────────────────────────────────────────────┘
```
> 关键区别：HTML 源码中 Main Content 在前，确保内容优先加载。

**适用场景：** SEO 敏感的内容型网站，需要主内容优先出现在 DOM 中。博客、文章详情页、文档站点。

**CSS/Tailwind 代码骨架：**

```html
<!-- HTML 结构：main 在源码中排第一 -->
<div class="min-h-screen flex flex-col">
  <header class="h-16 bg-white shadow">Header</header>

  <div class="flex-1 flex flex-col md:flex-row">
    <!-- Main content 在 DOM 中优先 -->
    <main class="flex-1 order-2 p-6 min-w-0">
      Main Content
    </main>
    <nav class="w-full md:w-[200px] order-1 shrink-0 bg-slate-50 p-4">
      Navigation
    </nav>
    <aside class="w-full md:w-[220px] order-3 shrink-0 bg-slate-50 p-4">
      Aside
    </aside>
  </div>

  <footer class="h-20 bg-gray-900 text-white">Footer</footer>
</div>
```

```css
/* CSS Grid 圣杯布局 */
.holy-grail {
  display: grid;
  grid-template:
    "header header header" auto
    "nav    main   aside"  1fr
    "footer footer footer" auto
    / 200px 1fr 220px;
  min-height: 100vh;
}
.holy-grail > header { grid-area: header; }
.holy-grail > nav    { grid-area: nav; }
.holy-grail > main   { grid-area: main; }
.holy-grail > aside  { grid-area: aside; }
.holy-grail > footer { grid-area: footer; }
```

---

### 3. F 型布局 (F-Pattern Layout)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│ ████████████████████████████████████████████ │  ← 顶部水平扫描带
│ ████████████████████████████████████████████ │
├──────────────────────────────────────────────┤
│ █████████████████████                        │  ← 第二水平扫描带
│ █████████████████████                        │
├──────────────────────────────────────────────┤
│ ████████                                     │  ← 左侧垂直扫描
│ ████████                                     │
│ ████████                                     │
│ ████████                                     │
│ ████████                                     │
└──────────────────────────────────────────────┘
```
> 基于 Nielsen Norman Group 眼动研究，用户浏览内容型页面时呈 F 字形扫描。

**适用场景：** 文字密集型页面、搜索结果页、博客列表、文档页。将最重要的信息放在 F 字形的热区内。

**CSS/Tailwind 代码骨架：**

```html
<div class="max-w-4xl mx-auto px-4 py-8 space-y-8">
  <!-- 顶部水平扫描区：全宽，最醒目 -->
  <section class="w-full">
    <h1 class="text-3xl md:text-4xl font-bold leading-tight">
      页面主标题 — 用户第一眼看到
    </h1>
    <p class="mt-3 text-lg text-gray-600 max-w-3xl">
      摘要描述信息，覆盖整个水平扫描区域
    </p>
  </section>

  <!-- 第二水平扫描带：约 60-70% 宽度 -->
  <section class="w-full md:w-[70%]">
    <h2 class="text-xl font-semibold">重要子标题</h2>
    <p class="mt-2 text-gray-700">核心内容段落...</p>
  </section>

  <!-- 左侧垂直扫描：列表/条目 -->
  <section class="space-y-4">
    <article class="flex gap-4 items-start">
      <div class="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
      <div>
        <h3 class="font-medium">条目标题</h3>
        <p class="text-sm text-gray-600">简短描述...</p>
      </div>
    </article>
    <!-- 重复更多条目 -->
  </section>
</div>
```

---

### 4. Z 型布局 (Z-Pattern Layout)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│  ①Logo/品牌 ──────────────────→ ②CTA/导航   │
│                    ╲                         │
│                      ╲                       │
│                        ╲                     │
│                          ╲                   │
│  ③核心卖点 ──────────────────→ ④最终CTA      │
└──────────────────────────────────────────────┘
```
> Z 型动线：左上 → 右上 → 左下 → 右下，适合引导用户完成特定动作。

**适用场景：** Landing Page、产品推广页、注册页。页面内容少但需要强引导时效果最佳。

**CSS/Tailwind 代码骨架：**

```html
<div class="min-h-screen flex flex-col">
  <!-- Z 顶部横线：① → ② -->
  <header class="flex items-center justify-between px-8 py-6">
    <div class="text-2xl font-bold">① Brand Logo</div>
    <nav class="flex items-center gap-6">
      <a href="#" class="text-gray-600 hover:text-gray-900">Features</a>
      <a href="#" class="text-gray-600 hover:text-gray-900">Pricing</a>
      <button class="px-5 py-2 bg-blue-600 text-white rounded-lg">
        ② Sign Up
      </button>
    </nav>
  </header>

  <!-- Z 对角线区域：视觉引导 -->
  <main class="flex-1 flex items-center">
    <div class="w-full max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
      <!-- Z 左下：③ 核心卖点 -->
      <div class="space-y-6">
        <h1 class="text-5xl font-bold leading-tight">
          ③ 核心价值主张
        </h1>
        <p class="text-xl text-gray-600">
          简洁有力的副标题描述
        </p>
        <!-- Z 右下落点：④ 最终 CTA -->
        <button class="px-8 py-4 bg-blue-600 text-white text-lg rounded-xl
                       hover:bg-blue-700 transition-colors">
          ④ Get Started Free →
        </button>
      </div>
      <div class="aspect-square bg-gray-100 rounded-2xl">
        <!-- Hero 插图/视频 -->
      </div>
    </div>
  </main>
</div>
```

---

### 5. Bento Grid 布局 (Bento Box Layout)

**结构示意图：**
```
┌──────────────────┬──────────┬──────────┐
│                  │          │          │
│     Large Card   │  Medium  │  Small   │
│     (2x2)        │  (1x2)   │  (1x1)  │
│                  │          ├──────────┤
│                  │          │  Small   │
│                  │          │  (1x1)   │
├──────────┬───────┴──────────┴──────────┤
│  Medium  │          Wide Card          │
│  (1x1)   │          (3x1)             │
├──────────┼──────────┬──────────────────┤
│  Small   │  Small   │     Medium       │
│  (1x1)   │  (1x1)   │     (2x1)       │
└──────────┴──────────┴──────────────────┘
```
> 灵感来源于 Apple 产品页面，通过不等大卡片创造视觉节奏。

**适用场景：** 产品特性展示页、作品集、功能介绍页、Dashboard 概览。Apple、Linear、Vercel 等品牌大量使用。

**CSS/Tailwind 代码骨架：**

```html
<!-- Tailwind Bento Grid -->
<section class="max-w-6xl mx-auto px-4 py-16">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
    <!-- 大卡片 2x2 -->
    <div class="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600
                rounded-3xl p-8 text-white flex flex-col justify-end">
      <h3 class="text-2xl font-bold">核心功能</h3>
      <p class="mt-2 text-white/80">简短描述</p>
    </div>

    <!-- 中卡片 1x2 -->
    <div class="row-span-2 bg-gray-100 rounded-3xl p-6 flex flex-col justify-between">
      <div class="w-10 h-10 bg-blue-100 rounded-xl"></div>
      <div>
        <h4 class="font-semibold">功能 A</h4>
        <p class="text-sm text-gray-500 mt-1">描述</p>
      </div>
    </div>

    <!-- 小卡片 1x1 -->
    <div class="bg-gray-100 rounded-3xl p-6 flex items-center justify-center">
      <span class="text-3xl font-bold">99%</span>
    </div>

    <!-- 小卡片 1x1 -->
    <div class="bg-black rounded-3xl p-6 text-white flex items-end">
      <span class="font-medium">功能 B</span>
    </div>

    <!-- 宽卡片 3x1 -->
    <div class="col-span-2 md:col-span-3 bg-gradient-to-r from-gray-100 to-gray-50
                rounded-3xl p-8 flex items-center gap-6">
      <div class="w-16 h-16 bg-green-100 rounded-2xl shrink-0"></div>
      <div>
        <h4 class="font-semibold text-lg">横向展示内容</h4>
        <p class="text-gray-500 mt-1">适合长描述或统计信息展示</p>
      </div>
    </div>

    <!-- 剩余小卡片 -->
    <div class="bg-amber-50 rounded-3xl p-6">
      <span class="text-sm font-medium text-amber-700">指标</span>
    </div>
  </div>
</section>
```

```css
/* CSS Grid Bento（精确控制版） */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 180px;
  gap: 16px;
}
.bento-grid .card-large   { grid-column: span 2; grid-row: span 2; }
.bento-grid .card-wide    { grid-column: span 3; }
.bento-grid .card-tall    { grid-row: span 2; }
.bento-grid .card-medium  { grid-column: span 2; }

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px;
  }
  .bento-grid .card-wide { grid-column: span 2; }
}
```

---

### 6. 杂志布局 (Magazine Layout)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│           Featured Article (Full Width)       │
│         ┌─────────────────────────┐          │
│         │      Hero Image         │          │
│         │                         │          │
│         └─────────────────────────┘          │
│         Headline · Author · Date             │
├──────────────┬───────────────────────────────┤
│              │  ┌─────┐  ┌─────┐  ┌─────┐  │
│   Featured   │  │ Art │  │ Art │  │ Art │  │
│   Column     │  │  2  │  │  3  │  │  4  │  │
│   (large)    │  └─────┘  └─────┘  └─────┘  │
│              │  ┌─────┐  ┌─────┐  ┌─────┐  │
│              │  │ Art │  │ Art │  │ Art │  │
│              │  │  5  │  │  6  │  │  7  │  │
│              │  └─────┘  └─────┘  └─────┘  │
├──────────────┴───────────────────────────────┤
│  Quote / Pullout Text (全宽强调)              │
├──────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ More │ │ More │ │ More │ │ More │       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
└──────────────────────────────────────────────┘
```

**适用场景：** 新闻网站、线上杂志、博客主页、内容策展页。强调编辑优先级，用大小差异体现内容权重。

**CSS/Tailwind 代码骨架：**

```html
<div class="max-w-7xl mx-auto px-4 py-8 space-y-12">
  <!-- Featured Hero Article -->
  <article class="relative overflow-hidden rounded-2xl">
    <img src="hero.jpg" alt="" class="w-full h-[480px] object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
    <div class="absolute bottom-0 p-8 text-white">
      <span class="text-sm font-medium uppercase tracking-wider opacity-80">
        Category
      </span>
      <h1 class="text-4xl font-bold mt-2 max-w-2xl">头条文章标题</h1>
      <p class="mt-3 text-white/80 max-w-xl">摘要描述文字...</p>
    </div>
  </article>

  <!-- 主推 + 网格区 -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <!-- 左侧大推荐 -->
    <article class="lg:col-span-5">
      <img src="featured.jpg" alt="" class="w-full aspect-[4/3] object-cover rounded-xl" />
      <h2 class="text-2xl font-bold mt-4">重点推荐文章</h2>
      <p class="text-gray-600 mt-2">详细摘要...</p>
    </article>

    <!-- 右侧小网格 -->
    <div class="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
      <article class="group" v-for="i in 6" :key="i">
        <div class="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
          <img src="" alt="" class="w-full h-full object-cover
                                    group-hover:scale-105 transition-transform duration-300" />
        </div>
        <h3 class="font-medium mt-2 text-sm group-hover:text-blue-600 transition-colors">
          文章标题
        </h3>
      </article>
    </div>
  </div>

  <!-- 引用/Pullout -->
  <blockquote class="text-center py-12 border-y border-gray-200">
    <p class="text-2xl md:text-3xl font-light italic max-w-3xl mx-auto text-gray-700">
      "强调性引用文字放在这里"
    </p>
  </blockquote>
</div>
```

---

### 7. Dashboard 布局 (Admin Dashboard)

**结构示意图：**
```
┌────────┬─────────────────────────────────────┐
│        │        Top Bar / Breadcrumb          │
│  Side  ├──────────┬──────────┬───────────────┤
│  Nav   │  Stat 1  │  Stat 2  │    Stat 3     │
│        ├──────────┴──────────┼───────────────┤
│ ┌────┐ │                     │               │
│ │icon│ │   Main Chart        │   Side Panel  │
│ ├────┤ │   (Large)           │   / Activity  │
│ │icon│ │                     │               │
│ ├────┤ ├─────────────────────┴───────────────┤
│ │icon│ │          Data Table                  │
│ ├────┤ │                                      │
│ │icon│ │                                      │
│ └────┘ │                                      │
└────────┴──────────────────────────────────────┘
```

**适用场景：** 后台管理系统、数据面板、SaaS 产品控制台、CRM、CMS。侧边导航 + 内容区的经典模式。

**CSS/Tailwind 代码骨架：**

```html
<div class="h-screen flex bg-gray-100">
  <!-- 侧边栏 -->
  <aside class="w-16 lg:w-64 bg-gray-900 text-white shrink-0 flex flex-col transition-all">
    <div class="h-16 flex items-center justify-center lg:px-6 border-b border-white/10">
      <span class="hidden lg:block text-lg font-bold">Dashboard</span>
    </div>
    <nav class="flex-1 py-4 space-y-1 px-2 lg:px-3">
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white">
        <svg class="w-5 h-5 shrink-0"><!-- icon --></svg>
        <span class="hidden lg:block text-sm">Overview</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400
                         hover:bg-white/5 hover:text-white transition-colors">
        <svg class="w-5 h-5 shrink-0"><!-- icon --></svg>
        <span class="hidden lg:block text-sm">Analytics</span>
      </a>
      <!-- 更多导航项 -->
    </nav>
  </aside>

  <!-- 主内容区 -->
  <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
    <!-- 顶部栏 -->
    <header class="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
      <h1 class="text-lg font-semibold">Overview</h1>
      <div class="flex items-center gap-4">
        <button class="relative">
          <svg class="w-5 h-5 text-gray-500"><!-- bell icon --></svg>
          <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
    </header>

    <!-- 滚动内容 -->
    <main class="flex-1 overflow-y-auto p-6 space-y-6">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl p-5 shadow-sm">
          <p class="text-sm text-gray-500">Total Revenue</p>
          <p class="text-2xl font-bold mt-1">$48,260</p>
          <p class="text-sm text-green-600 mt-2">+12.5%</p>
        </div>
        <!-- 更多统计卡片 -->
      </div>

      <!-- 图表 + 侧面板 -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="xl:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <!-- Main Chart -->
          <h3 class="font-semibold mb-4">Revenue Overview</h3>
          <div class="h-[300px] bg-gray-50 rounded-lg"><!-- Chart --></div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <!-- Activity Feed -->
          <h3 class="font-semibold mb-4">Recent Activity</h3>
          <div class="space-y-4"><!-- Activity items --></div>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b flex items-center justify-between">
          <h3 class="font-semibold">Recent Orders</h3>
          <button class="text-sm text-blue-600">View All</button>
        </div>
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-left text-gray-500">
            <tr>
              <th class="px-6 py-3 font-medium">Order ID</th>
              <th class="px-6 py-3 font-medium">Customer</th>
              <th class="px-6 py-3 font-medium">Amount</th>
              <th class="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y"><!-- rows --></tbody>
        </table>
      </div>
    </main>
  </div>
</div>
```

---

### 8. 侧边栏 + 内容布局 (Sidebar + Content)

**结构示意图：**
```
┌────────────────┬─────────────────────────────┐
│                │                             │
│   Sidebar      │        Content              │
│   Navigation   │                             │
│                │   ┌─────────────────────┐   │
│   · Item 1     │   │   Content Block     │   │
│   · Item 2     │   │                     │   │
│   · Item 3     │   └─────────────────────┘   │
│     ↳ Sub 1    │                             │
│     ↳ Sub 2    │   ┌─────────────────────┐   │
│   · Item 4     │   │   Content Block     │   │
│                │   └─────────────────────┘   │
│                │                             │
└────────────────┴─────────────────────────────┘
```

**适用场景：** 文档站点（如 VitePress、Docusaurus）、设置页面、邮件客户端、文件管理器。适合层级导航 + 详情浏览的双面板模式。

**CSS/Tailwind 代码骨架：**

```html
<div class="flex h-screen">
  <!-- 可折叠侧边栏 -->
  <aside class="w-72 bg-white border-r overflow-y-auto shrink-0
                hidden md:block">
    <div class="p-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
        Documentation
      </h2>
      <nav class="space-y-1">
        <a href="#" class="block px-3 py-2 rounded-lg bg-blue-50 text-blue-700
                          text-sm font-medium">
          Getting Started
        </a>
        <a href="#" class="block px-3 py-2 rounded-lg text-gray-700
                          hover:bg-gray-100 text-sm transition-colors">
          Installation
        </a>
        <!-- 带子菜单 -->
        <div>
          <button class="w-full flex items-center justify-between px-3 py-2
                         rounded-lg text-gray-700 hover:bg-gray-100 text-sm">
            <span>Configuration</span>
            <svg class="w-4 h-4"><!-- chevron --></svg>
          </button>
          <div class="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
            <a href="#" class="block py-1.5 text-sm text-gray-500 hover:text-gray-900">
              Basic Config
            </a>
            <a href="#" class="block py-1.5 text-sm text-gray-500 hover:text-gray-900">
              Advanced
            </a>
          </div>
        </div>
      </nav>
    </div>
  </aside>

  <!-- 内容区 -->
  <main class="flex-1 overflow-y-auto">
    <div class="max-w-3xl mx-auto px-8 py-12">
      <h1 class="text-3xl font-bold">Getting Started</h1>
      <div class="mt-6 prose prose-gray max-w-none">
        <!-- Markdown 渲染内容 -->
      </div>
    </div>
  </main>
</div>
```

---

### 9. 全屏 Hero 布局 (Full-Screen Hero)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│  Nav (透明/固定)                              │
├──────────────────────────────────────────────┤
│                                              │
│                                              │
│          Background Image / Video            │
│                                              │
│              ┌────────────────┐              │
│              │  Heading       │              │
│              │  Subheading    │              │
│              │  [ CTA Button ]│              │
│              └────────────────┘              │
│                                              │
│                  ↓ Scroll                     │
│                                              │
└──────────────────────────────────────────────┘
│                                              │
│          Below-the-fold Content              │
│                                              │
```

**适用场景：** 品牌官网首页、产品发布页、活动页、创意 Agency 官网。第一屏就需要建立强烈视觉冲击力的页面。

**CSS/Tailwind 代码骨架：**

```html
<!-- 导航固定在 Hero 上方 -->
<nav class="fixed top-0 left-0 right-0 z-50 px-8 py-4
            flex items-center justify-between
            bg-transparent text-white transition-all duration-300"
     :class="{ 'bg-white/95 text-gray-900 shadow-sm backdrop-blur-md': scrolled }">
  <div class="text-xl font-bold">Brand</div>
  <div class="flex items-center gap-6">
    <a href="#" class="text-sm hover:opacity-70 transition-opacity">About</a>
    <a href="#" class="text-sm hover:opacity-70 transition-opacity">Work</a>
    <button class="px-4 py-2 border border-current rounded-full text-sm
                   hover:bg-white hover:text-gray-900 transition-colors">
      Contact
    </button>
  </div>
</nav>

<!-- Full-screen Hero -->
<section class="relative h-screen flex items-center justify-center overflow-hidden">
  <!-- 背景 -->
  <div class="absolute inset-0">
    <img src="hero-bg.jpg" alt=""
         class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <!-- 内容 -->
  <div class="relative z-10 text-center text-white px-4 max-w-4xl">
    <h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
      Create Something<br/>Extraordinary
    </h1>
    <p class="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
      一行优雅的副标题描述
    </p>
    <div class="mt-10 flex items-center justify-center gap-4">
      <button class="px-8 py-4 bg-white text-gray-900 rounded-full font-medium
                     hover:bg-gray-100 transition-colors">
        Get Started
      </button>
      <button class="px-8 py-4 border border-white/50 text-white rounded-full
                     font-medium hover:bg-white/10 transition-colors">
        Learn More
      </button>
    </div>
  </div>

  <!-- 底部滚动提示 -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
    </svg>
  </div>
</section>
```

---

### 10. 卡片网格布局 (Card Grid)

**结构示意图：**
```
┌──────────┬──────────┬──────────┬──────────┐
│ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │
│ │ Img  │ │ │ Img  │ │ │ Img  │ │ │ Img  │ │
│ ├──────┤ │ ├──────┤ │ ├──────┤ │ ├──────┤ │
│ │Title │ │ │Title │ │ │Title │ │ │Title │ │
│ │Desc  │ │ │Desc  │ │ │Desc  │ │ │Desc  │ │
│ │Meta  │ │ │Meta  │ │ │Meta  │ │ │Meta  │ │
│ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘ │
├──────────┼──────────┼──────────┼──────────┤
│ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │
│ │ Img  │ │ │ Img  │ │ │ Img  │ │ │ Img  │ │
│ ├──────┤ │ ├──────┤ │ ├──────┤ │ ├──────┤ │
│ │Title │ │ │Title │ │ │Title │ │ │Title │ │
│ │Desc  │ │ │Desc  │ │ │Desc  │ │ │Desc  │ │
│ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘ │
└──────────┴──────────┴──────────┴──────────┘
```

**适用场景：** 电商产品列表、博客文章列表、课程目录、团队成员展示、作品集展示。最通用的内容展示方式之一。

**CSS/Tailwind 代码骨架：**

```html
<!-- 自适应卡片网格 -->
<section class="max-w-7xl mx-auto px-4 py-12">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- 单张卡片 -->
    <article class="group bg-white rounded-2xl overflow-hidden shadow-sm
                    hover:shadow-lg transition-shadow duration-300">
      <!-- 图片区域 -->
      <div class="aspect-[4/3] overflow-hidden bg-gray-100">
        <img src="product.jpg" alt=""
             class="w-full h-full object-cover
                    group-hover:scale-105 transition-transform duration-500" />
      </div>
      <!-- 内容区域 -->
      <div class="p-5">
        <span class="text-xs font-medium text-blue-600 uppercase tracking-wider">
          Category
        </span>
        <h3 class="mt-2 font-semibold text-gray-900 line-clamp-2
                   group-hover:text-blue-600 transition-colors">
          卡片标题文字
        </h3>
        <p class="mt-2 text-sm text-gray-500 line-clamp-2">
          简短描述信息...
        </p>
        <!-- 底部元信息 -->
        <div class="mt-4 pt-4 border-t flex items-center justify-between text-xs text-gray-400">
          <span>2024-01-15</span>
          <span>5 min read</span>
        </div>
      </div>
    </article>
    <!-- 更多卡片... -->
  </div>
</section>
```

```css
/* CSS Grid 自适应（无媒体查询） */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

---

### 11. 瀑布流布局 (Masonry / Waterfall)

**结构示意图：**
```
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│      │  │      │  │      │  │      │
│  A   │  │  B   │  │      │  │  D   │
│      │  │      │  │  C   │  │      │
│      │  └──────┘  │      │  └──────┘
└──────┘  ┌──────┐  │      │  ┌──────┐
┌──────┐  │      │  └──────┘  │      │
│  E   │  │  F   │  ┌──────┐  │  G   │
│      │  │      │  │  H   │  │      │
└──────┘  │      │  │      │  │      │
┌──────┐  │      │  │      │  │      │
│  I   │  └──────┘  └──────┘  └──────┘
│      │  ┌──────┐  ┌──────┐  ┌──────┐
│      │  │  J   │  │  K   │  │  L   │
└──────┘  └──────┘  └──────┘  └──────┘
```
> 每列中元素高度不等，按列排列填充，形成错落有致的视觉效果。

**适用场景：** 图片画廊（Pinterest 风格）、设计作品展示、社交媒体瀑布流、灵感收集墙。

**CSS/Tailwind 代码骨架：**

```html
<!-- 方案一：CSS columns（纯 CSS，简单高效） -->
<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
  <div class="break-inside-avoid">
    <div class="bg-white rounded-xl overflow-hidden shadow-sm">
      <img src="photo-1.jpg" alt="" class="w-full" />
      <div class="p-4">
        <p class="text-sm text-gray-600">描述文字</p>
      </div>
    </div>
  </div>
  <!-- 更多瀑布流项 -->
</div>

<!-- 方案二：CSS Grid masonry（现代浏览器） -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
     style="grid-template-rows: masonry;">
  <div class="rounded-xl overflow-hidden">
    <img src="photo.jpg" alt="" class="w-full" />
  </div>
  <!-- 更多项目 -->
</div>
```

```css
/* 方案三：多列瀑布流精确控制 */
.masonry {
  columns: 4;
  column-gap: 16px;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 1024px) { .masonry { columns: 3; } }
@media (max-width: 768px)  { .masonry { columns: 2; } }
@media (max-width: 480px)  { .masonry { columns: 1; } }

/* 方案四：JS 辅助的 Grid 瀑布流（精确高度控制） */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px; /* 最小行高单元 */
  gap: 16px;
}
/* JS 计算每个 item 应该 span 多少行 */
/* item.style.gridRowEnd = `span ${Math.ceil(height / 10 + 1)}` */
```

---

### 12. 时间线布局 (Timeline)

**结构示意图：**
```
          ┌──────────────┐
          │   Header     │
          └──────┬───────┘
                 │
      ┌──────────┼──────────┐
      │          │          │
      │    ●─────┤          │
      │    │     │          │
      │ ┌──┴──┐  │          │
      │ │ 2024│  │          │
      │ │Event│  │          │
      │ └─────┘  │          │
      │          │          │
      │          ├─────●    │
      │          │     │    │
      │          │  ┌──┴──┐ │
      │          │  │ 2023│ │
      │          │  │Event│ │
      │          │  └─────┘ │
      │    ●─────┤          │
      │    │     │          │
      │ ┌──┴──┐  │          │
      │ │ 2022│  │          │
      │ │Event│  │          │
      │ └─────┘  │          │
      │          │          │
      └──────────┼──────────┘
                 │
          ┌──────┴───────┐
          │   Footer     │
          └──────────────┘
```

**适用场景：** 公司历程、产品路线图、项目进度展示、个人履历、版本更新日志。

**CSS/Tailwind 代码骨架：**

```html
<div class="max-w-4xl mx-auto px-4 py-16">
  <!-- 时间线容器 -->
  <div class="relative">
    <!-- 中心线 -->
    <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200
                md:-translate-x-0.5"></div>

    <!-- 时间线节点 -->
    <div class="space-y-12">
      <!-- 左侧事件 -->
      <div class="relative flex items-start md:justify-end md:pr-[calc(50%+2rem)]
                  pl-12 md:pl-0">
        <!-- 圆点 -->
        <div class="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-blue-600
                    border-4 border-white shadow
                    md:-translate-x-1.5 translate-y-1.5"></div>
        <!-- 内容卡片 -->
        <div class="bg-white rounded-xl p-6 shadow-sm border max-w-md w-full">
          <time class="text-sm font-medium text-blue-600">2024年3月</time>
          <h3 class="mt-2 font-bold text-lg">事件标题</h3>
          <p class="mt-2 text-gray-600 text-sm">事件描述内容...</p>
        </div>
      </div>

      <!-- 右侧事件 -->
      <div class="relative flex items-start md:pl-[calc(50%+2rem)]
                  pl-12 md:pl-[calc(50%+2rem)]">
        <div class="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-green-600
                    border-4 border-white shadow
                    md:-translate-x-1.5 translate-y-1.5"></div>
        <div class="bg-white rounded-xl p-6 shadow-sm border max-w-md w-full">
          <time class="text-sm font-medium text-green-600">2023年11月</time>
          <h3 class="mt-2 font-bold text-lg">事件标题</h3>
          <p class="mt-2 text-gray-600 text-sm">事件描述内容...</p>
        </div>
      </div>

      <!-- 交替继续... -->
    </div>
  </div>
</div>
```

---

### 13. 分屏布局 (Split Screen)

**结构示意图：**
```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│                      │                      │
│    Left Panel        │    Right Panel       │
│    (Image/Visual)    │    (Content/Form)    │
│                      │                      │
│                      │     Heading          │
│                      │     Description      │
│                      │     [ CTA ]          │
│                      │                      │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

**适用场景：** 登录/注册页、产品对比页、作品集、About 页面。视觉 + 内容的平衡展示。

**CSS/Tailwind 代码骨架：**

```html
<div class="min-h-screen flex flex-col lg:flex-row">
  <!-- 左侧视觉面板 -->
  <div class="w-full lg:w-1/2 h-[40vh] lg:h-screen relative bg-gray-900
              lg:sticky lg:top-0">
    <img src="visual.jpg" alt=""
         class="absolute inset-0 w-full h-full object-cover opacity-80" />
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 lg:bg-gradient-to-r" />
    <div class="relative z-10 h-full flex items-end lg:items-center p-8 lg:p-16">
      <div class="text-white">
        <h2 class="text-3xl lg:text-5xl font-bold">Brand</h2>
        <p class="mt-3 text-white/70 max-w-md">简短品牌标语</p>
      </div>
    </div>
  </div>

  <!-- 右侧内容面板 -->
  <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold">Welcome back</h1>
      <p class="mt-3 text-gray-600">请登录你的账户</p>

      <form class="mt-8 space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input type="email"
                 class="w-full px-4 py-3 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        outline-none transition-shadow" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input type="password"
                 class="w-full px-4 py-3 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        outline-none transition-shadow" />
        </div>
        <button class="w-full py-3 bg-blue-600 text-white font-medium rounded-xl
                       hover:bg-blue-700 transition-colors">
          Sign In
        </button>
      </form>
    </div>
  </div>
</div>
```

---

### 14. 粘性滚动布局 (Sticky Scroll / Scroll-Linked)

**结构示意图：**
```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│   Sticky Panel       │   Scrolling          │
│   (fixed position)   │   Content            │
│                      │                      │
│   ┌──────────────┐   │   ┌──────────────┐   │
│   │ Visual that  │   │   │  Section 1   │   │
│   │ changes on   │   │   │  (active)    │   │
│   │ scroll       │   │   └──────────────┘   │
│   └──────────────┘   │   ┌──────────────┐   │
│                      │   │  Section 2   │   │
│                      │   │              │   │
│                      │   └──────────────┘   │
│                      │   ┌──────────────┐   │
│                      │   │  Section 3   │   │
│                      │   └──────────────┘   │
└──────────────────────┴──────────────────────┘
```

**适用场景：** 产品特性分步展示、教程/指南页、Storytelling 页面。Apple 产品页、Stripe 定价页常用此模式，用户滚动时左侧图片/动画随之切换。

**CSS/Tailwind 代码骨架：**

```html
<section class="relative">
  <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-4 py-24">
    <!-- 左侧粘性面板 -->
    <div class="lg:w-1/2">
      <div class="lg:sticky lg:top-24">
        <div class="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
          <!-- 根据滚动位置切换的内容 -->
          <div class="w-full h-full flex items-center justify-center
                      transition-all duration-700"
               :class="activeSection === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
            <!-- Visual for section 1 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧滚动内容 -->
    <div class="lg:w-1/2 space-y-[50vh]">
      <!-- Section 1 -->
      <div class="min-h-[60vh] flex items-center"
           data-section="0">
        <div>
          <span class="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Step 01
          </span>
          <h3 class="mt-4 text-3xl font-bold">功能标题</h3>
          <p class="mt-4 text-lg text-gray-600 leading-relaxed">
            详细描述文字，解释这个功能的价值...
          </p>
        </div>
      </div>

      <!-- Section 2 -->
      <div class="min-h-[60vh] flex items-center"
           data-section="1">
        <div>
          <span class="text-sm font-semibold text-green-600 uppercase tracking-wider">
            Step 02
          </span>
          <h3 class="mt-4 text-3xl font-bold">第二个功能</h3>
          <p class="mt-4 text-lg text-gray-600 leading-relaxed">
            描述文字...
          </p>
        </div>
      </div>

      <!-- Section 3 -->
      <div class="min-h-[60vh] flex items-center"
           data-section="2">
        <div>
          <span class="text-sm font-semibold text-purple-600 uppercase tracking-wider">
            Step 03
          </span>
          <h3 class="mt-4 text-3xl font-bold">第三个功能</h3>
          <p class="mt-4 text-lg text-gray-600 leading-relaxed">
            描述文字...
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

```javascript
/* 滚动监听逻辑 (Intersection Observer) */
const sections = document.querySelectorAll('[data-section]')
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activeSection.value = parseInt(entry.target.dataset.section)
    }
  })
}, { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' })
sections.forEach(s => observer.observe(s))
```

---

### 15. 全宽横向滚动布局 (Horizontal Scroll)

**结构示意图：**
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────┐  │
│  │          │  │          │  │          │  │          │  │      │  │
│  │  Card 1  │  │  Card 2  │  │  Card 3  │  │  Card 4  │  │ C5   │  │
│  │          │  │          │  │          │  │          │  │      │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────┘  │
│  ◄───────────────────────  scroll  ──────────────────────────────►   │
└──────────────────────────────────────────────────────────────────────┘
```

**适用场景：** 特色项目展示、产品横向浏览、图片画廊、推荐内容轮播。常见于 Netflix 风格的内容行、Awwwards 获奖网站的案例展示区。

**CSS/Tailwind 代码骨架：**

```html
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4 mb-8 flex items-end justify-between">
    <div>
      <h2 class="text-3xl font-bold">Featured Projects</h2>
      <p class="mt-2 text-gray-600">水平滚动浏览</p>
    </div>
    <div class="flex gap-2">
      <button class="w-10 h-10 rounded-full border flex items-center justify-center
                     hover:bg-gray-100 transition-colors">←</button>
      <button class="w-10 h-10 rounded-full border flex items-center justify-center
                     hover:bg-gray-100 transition-colors">→</button>
    </div>
  </div>

  <!-- 横向滚动容器 -->
  <div class="flex gap-6 overflow-x-auto px-4 pb-4
              snap-x snap-mandatory scroll-smooth
              scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300
              [-ms-overflow-style:none] [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden">
    <!-- 左侧留白占位 -->
    <div class="shrink-0 w-[calc((100vw-1280px)/2)]"></div>

    <!-- 卡片 -->
    <article class="shrink-0 w-[350px] snap-start group">
      <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
        <img src="" alt=""
             class="w-full h-full object-cover
                    group-hover:scale-105 transition-transform duration-700" />
      </div>
      <h3 class="mt-4 font-semibold text-lg">项目名称</h3>
      <p class="mt-1 text-sm text-gray-500">描述</p>
    </article>

    <!-- 更多卡片... -->

    <!-- 右侧留白 -->
    <div class="shrink-0 w-8"></div>
  </div>
</section>
```

```css
/* 隐藏滚动条但保留功能 */
.horizontal-scroll {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.horizontal-scroll::-webkit-scrollbar { display: none; }
.horizontal-scroll > * { scroll-snap-align: start; }
```

---

### 16. 堆叠卡片/视差滚动布局 (Stacked Cards / Parallax Sections)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│                                              │
│           Section 1 (Full Viewport)          │  ← 固定
│           Background + Content               │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│           Section 2 (覆盖上方)                │  ← 滚动覆盖
│           Different Background               │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│           Section 3 (覆盖上方)                │  ← 滚动覆盖
│           Final Call to Action               │
│                                              │
└──────────────────────────────────────────────┘
```

**适用场景：** 品牌故事讲述、产品发布页、创意型 Agency 官网、沉浸式体验页。在 Awwwards 获奖作品中极为常见。

**CSS/Tailwind 代码骨架：**

```html
<div class="relative">
  <!-- 固定底层 -->
  <section class="h-screen sticky top-0 flex items-center justify-center
                  bg-gray-900 text-white z-0">
    <div class="text-center">
      <h1 class="text-6xl font-bold">First Section</h1>
      <p class="mt-4 text-xl text-white/60">向下滚动体验</p>
    </div>
  </section>

  <!-- 覆盖层 1 -->
  <section class="relative min-h-screen bg-white rounded-t-[2rem] z-10
                  flex items-center justify-center shadow-2xl">
    <div class="max-w-4xl mx-auto px-8 text-center">
      <h2 class="text-5xl font-bold">Second Section</h2>
      <p class="mt-6 text-xl text-gray-600">这个部分会覆盖上方内容</p>
    </div>
  </section>

  <!-- 覆盖层 2 -->
  <section class="relative min-h-screen bg-blue-600 text-white rounded-t-[2rem] z-20
                  flex items-center justify-center shadow-2xl -mt-8">
    <div class="text-center">
      <h2 class="text-5xl font-bold">Final CTA</h2>
      <button class="mt-8 px-10 py-4 bg-white text-blue-600 font-semibold
                     rounded-full text-lg">
        Get Started
      </button>
    </div>
  </section>
</div>
```

```css
/* 视差速度差效果 */
.parallax-container {
  perspective: 1px;
  overflow-y: auto;
  height: 100vh;
}
.parallax-slow {
  transform: translateZ(-1px) scale(2);
}
.parallax-normal {
  transform: translateZ(0);
}
```

---

### 17. 网格 + 侧栏筛选布局 (Filter + Grid)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│  Search Bar / Filter Tags                    │
├───────────────┬──────────────────────────────┤
│               │  Sort: Latest ▾  |  Grid ▦  │
│   Filters     ├──────────┬──────────┬────────┤
│               │ ┌──────┐ │ ┌──────┐ │┌──────┐│
│  □ Category A │ │ Item │ │ │ Item │ ││ Item ││
│  □ Category B │ │  1   │ │ │  2   │ ││  3   ││
│  □ Category C │ └──────┘ │ └──────┘ │└──────┘│
│               ├──────────┼──────────┼────────┤
│  Price Range  │ ┌──────┐ │ ┌──────┐ │┌──────┐│
│  ○───●────○   │ │ Item │ │ │ Item │ ││ Item ││
│               │ │  4   │ │ │  5   │ ││  6   ││
│  Rating       │ └──────┘ │ └──────┘ │└──────┘│
│  ★★★★☆ & up  ├──────────┴──────────┴────────┤
│               │     Load More / Pagination    │
└───────────────┴──────────────────────────────┘
```

**适用场景：** 电商商品列表页、房产/租赁搜索、工作招聘列表、课程市场。

**CSS/Tailwind 代码骨架：**

```html
<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- 顶部搜索栏 -->
  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <div class="flex-1 relative">
      <input type="text" placeholder="搜索..."
             class="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2
                    focus:ring-blue-500 outline-none" />
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
        <!-- search icon -->
      </svg>
    </div>
    <button class="lg:hidden px-4 py-3 border rounded-xl flex items-center gap-2">
      <svg class="w-5 h-5"><!-- filter icon --></svg>
      Filters
    </button>
  </div>

  <div class="flex gap-8">
    <!-- 侧栏筛选（桌面端） -->
    <aside class="w-64 shrink-0 hidden lg:block">
      <div class="sticky top-24 space-y-6">
        <!-- 分类筛选 -->
        <div>
          <h3 class="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-3">
            Category
          </h3>
          <div class="space-y-2">
            <label class="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" class="rounded border-gray-300
                                           text-blue-600 focus:ring-blue-500" />
              <span class="text-sm text-gray-700">Category A</span>
              <span class="ml-auto text-xs text-gray-400">(128)</span>
            </label>
            <!-- 更多选项 -->
          </div>
        </div>

        <!-- 价格范围 -->
        <div>
          <h3 class="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-3">
            Price Range
          </h3>
          <input type="range" class="w-full accent-blue-600" />
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span><span>$500+</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- 内容网格 -->
    <div class="flex-1 min-w-0">
      <!-- 排序栏 -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm text-gray-500">显示 128 个结果</span>
        <select class="text-sm border rounded-lg px-3 py-1.5">
          <option>最新优先</option>
          <option>价格从低到高</option>
          <option>价格从高到低</option>
        </select>
      </div>
      <!-- 产品网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <!-- 商品卡片 -->
        <article class="bg-white rounded-xl overflow-hidden border
                        hover:shadow-md transition-shadow">
          <div class="aspect-square bg-gray-100 relative">
            <img src="" alt="" class="w-full h-full object-cover" />
            <button class="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full
                          flex items-center justify-center shadow-sm">
              <svg class="w-4 h-4"><!-- heart icon --></svg>
            </button>
          </div>
          <div class="p-4">
            <h3 class="font-medium line-clamp-1">商品名称</h3>
            <p class="mt-1 text-lg font-bold text-blue-600">$99.00</p>
            <div class="mt-2 flex items-center gap-1 text-amber-400 text-xs">
              ★★★★☆ <span class="text-gray-400">(42)</span>
            </div>
          </div>
        </article>
      </div>

      <!-- 分页 -->
      <div class="mt-8 flex justify-center">
        <nav class="flex items-center gap-1">
          <button class="w-10 h-10 rounded-lg border flex items-center justify-center
                         text-sm hover:bg-gray-50">←</button>
          <button class="w-10 h-10 rounded-lg bg-blue-600 text-white text-sm">1</button>
          <button class="w-10 h-10 rounded-lg border text-sm hover:bg-gray-50">2</button>
          <button class="w-10 h-10 rounded-lg border text-sm hover:bg-gray-50">3</button>
          <button class="w-10 h-10 rounded-lg border flex items-center justify-center
                         text-sm hover:bg-gray-50">→</button>
        </nav>
      </div>
    </div>
  </div>
</div>
```

---

### 18. 单页滚动布局 (Single Page / Scroll Sections)

**结构示意图：**
```
┌──────────────────────────────────────────────┐
│  Fixed Nav                    · · · · active │
├──────────────────────────────────────────────┤
│                                              │
│          Section 1: Hero        (100vh)      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          Section 2: About       (100vh)      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          Section 3: Services    (100vh)      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          Section 4: Portfolio   (auto)       │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│          Section 5: Contact     (100vh)      │
│                                              │
└──────────────────────────────────────────────┘
```

**适用场景：** 个人作品集、小型企业官网、活动推广单页、产品介绍页。一页展示所有核心信息，通过锚点导航。

**CSS/Tailwind 代码骨架：**

```html
<div class="scroll-smooth">
  <!-- 固定导航 + 进度指示 -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <span class="font-bold text-lg">Brand</span>
      <div class="hidden md:flex items-center gap-8">
        <a href="#hero" class="text-sm text-gray-500 hover:text-gray-900
                              transition-colors data-[active]:text-blue-600
                              data-[active]:font-medium">Home</a>
        <a href="#about" class="text-sm text-gray-500 hover:text-gray-900">About</a>
        <a href="#services" class="text-sm text-gray-500 hover:text-gray-900">Services</a>
        <a href="#portfolio" class="text-sm text-gray-500 hover:text-gray-900">Work</a>
        <a href="#contact"
           class="px-5 py-2 bg-gray-900 text-white text-sm rounded-full">Contact</a>
      </div>
    </div>
    <!-- 滚动进度条 -->
    <div class="h-0.5 bg-blue-600 transition-all duration-300"
         :style="{ width: scrollProgress + '%' }"></div>
  </nav>

  <!-- 侧边滚动指示器（可选） -->
  <div class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
    <a v-for="section in sections" :key="section.id"
       :href="'#' + section.id"
       class="w-2.5 h-2.5 rounded-full border-2 border-gray-300 transition-all duration-300"
       :class="{ 'bg-blue-600 border-blue-600 scale-125': activeSection === section.id }">
    </a>
  </div>

  <!-- Hero Section -->
  <section id="hero" class="min-h-screen flex items-center justify-center pt-16">
    <div class="text-center px-4">
      <h1 class="text-5xl md:text-7xl font-bold">Hero Title</h1>
      <p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">描述</p>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="min-h-screen flex items-center py-24 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <div class="aspect-square bg-gray-200 rounded-3xl"></div>
      <div>
        <h2 class="text-4xl font-bold">About Us</h2>
        <p class="mt-6 text-lg text-gray-600 leading-relaxed">内容...</p>
      </div>
    </div>
  </section>

  <!-- 更多 sections... -->
</div>
```

```css
/* Scroll Snap（可选，强制对齐到每个 section） */
html {
  scroll-snap-type: y proximity; /* proximity 比 mandatory 更友好 */
  scroll-behavior: smooth;
}
section {
  scroll-snap-align: start;
}
```

---

