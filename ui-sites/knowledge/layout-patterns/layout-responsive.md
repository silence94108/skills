## 三、响应式断点规范

### 断点定义

```
Mobile:  320px  - 480px   (小屏手机 → 大屏手机)
Tablet:  481px  - 768px   (竖屏平板 → 横屏平板)
Laptop:  769px  - 1024px  (小笔记本 → 标准笔记本)
Desktop: 1025px - 1440px  (标准桌面 → 大桌面)
Wide:    1441px+          (超宽屏 / 外接显示器)
```

### Tailwind 断点配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '480px',       // 大屏手机
      'sm': '640px',       // 小平板 (Tailwind 默认)
      'md': '768px',       // 平板
      'lg': '1024px',      // 笔记本
      'xl': '1280px',      // 桌面
      '2xl': '1440px',     // 大桌面
      '3xl': '1920px',     // 超宽屏（按需）
    }
  }
}
```

### Tailwind 响应式写法

```html
<!-- Mobile First：默认写移动端样式，逐步增强 -->

<!-- 网格列数 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

<!-- 文字大小 -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">

<!-- 间距 -->
<section class="px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-24">

<!-- 显示/隐藏 -->
<div class="block md:hidden">Mobile Menu</div>
<div class="hidden md:flex">Desktop Nav</div>

<!-- Flex 方向 -->
<div class="flex flex-col md:flex-row gap-6">

<!-- 宽度 -->
<aside class="w-full md:w-64 lg:w-72 shrink-0">
```

### CSS Media Query 写法

```css
/* ===== Mobile First（推荐） ===== */

/* Base: Mobile (320px+) */
.container {
  width: 100%;
  padding: 0 16px;
}
.hero-title { font-size: 2rem; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container { padding: 0 32px; }
  .hero-title { font-size: 3rem; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Laptop (1024px+) */
@media (min-width: 1024px) {
  .container { max-width: 960px; margin: 0 auto; }
  .hero-title { font-size: 3.5rem; }
  .grid { grid-template-columns: repeat(3, 1fr); }
  .sidebar { display: block; }
}

/* Desktop (1280px+) */
@media (min-width: 1280px) {
  .container { max-width: 1200px; }
  .hero-title { font-size: 4rem; }
  .grid { grid-template-columns: repeat(4, 1fr); }
}

/* Wide (1440px+) */
@media (min-width: 1440px) {
  .container { max-width: 1320px; }
}

/* ===== 特殊查询 ===== */

/* 触控设备 */
@media (hover: none) and (pointer: coarse) {
  .tooltip { display: none; }
  button { min-height: 44px; min-width: 44px; }
}

/* 高分屏 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo { background-image: url('logo@2x.png'); }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0a0a0a;
    --text-primary: #fafafa;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* 容器查询（现代方案） */
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### 各断点布局策略速查表

| 维度 | Mobile (320-480) | Tablet (481-768) | Laptop (769-1024) | Desktop (1025-1440) | Wide (1441+) |
|------|------------------|------------------|--------------------|--------------------|-------------|
| 栏数 | 1 栏 | 2 栏 | 2-3 栏 | 3-4 栏 | 4-6 栏 |
| 导航 | 汉堡菜单 | 汉堡/Tab 栏 | 水平导航 | 水平导航 | 水平导航 |
| 侧栏 | 隐藏/抽屉 | 隐藏/抽屉 | 折叠侧栏 | 展开侧栏 | 展开侧栏 |
| 字号 (H1) | 1.75-2rem | 2.25-2.5rem | 2.5-3rem | 3-3.5rem | 3.5-4.5rem |
| 字号 (body) | 0.875-1rem | 1rem | 1rem | 1-1.125rem | 1.125rem |
| 间距 (Section) | 48-64px | 64-80px | 80-96px | 96-128px | 128px+ |
| 图片 | 全宽 | 全宽/半宽 | 自适应 | 固定比例 | 固定比例 |
| Touch 目标 | >= 44px | >= 44px | >= 36px | 无限制 | 无限制 |

---

## 四、白空间与间距原则

### 1. 白空间的三个层次

```
┌─────────────────────────────────────────────────────┐
│  Macro Whitespace (宏观白空间)                        │
│  Section 之间、页面级留白                              │
│  64px - 128px                                       │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  Meso Whitespace (中观白空间)                 │    │
│  │  组件之间、卡片与卡片之间                       │    │
│  │  24px - 48px                                │    │
│  │                                             │    │
│  │  ┌────────────────────────────────────┐     │    │
│  │  │  Micro Whitespace (微观白空间)      │     │    │
│  │  │  文字行间距、图标与文字间距           │     │    │
│  │  │  4px - 16px                        │     │    │
│  │  └────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### 2. 间距使用原则

**接近性原则 (Law of Proximity)：** 相关的元素间距要小，不相关的元素间距要大。

```
✅ 正确                           ❌ 错误
┌─────────────┐                  ┌─────────────┐
│ Title       │ 4px              │ Title       │
│ Subtitle    │ ← 相关，间距小    │             │ 16px
│             │ 24px             │ Subtitle    │ ← 间距都一样
│ Description │ ← 不太相关，间距大│             │ 16px
│             │                  │ Description │
└─────────────┘                  └─────────────┘
```

**呼吸感原则：** 内容密度越高，需要的留白越多。

```css
/* 密集数据型页面 — 增加留白 */
.data-section {
  padding: 48px 32px;      /* 更大内边距 */
  line-height: 1.75;        /* 更大行高 */
}

/* 简洁展示型页面 — 留白本身就是设计 */
.minimal-section {
  padding: 96px 64px;       /* 大量留白 */
  line-height: 1.6;
}
```

### 3. 一致性间距系统

```css
:root {
  /* 间距 Token */
  --space-xs:  4px;    /* 0.25rem */
  --space-sm:  8px;    /* 0.5rem  */
  --space-md:  16px;   /* 1rem    */
  --space-lg:  24px;   /* 1.5rem  */
  --space-xl:  32px;   /* 2rem    */
  --space-2xl: 48px;   /* 3rem    */
  --space-3xl: 64px;   /* 4rem    */
  --space-4xl: 96px;   /* 6rem    */

  /* 语义化间距 */
  --space-inline:    8px;     /* 行内元素间 */
  --space-stack:     16px;    /* 垂直堆叠间 */
  --space-inset:     24px;    /* 容器内边距 */
  --space-section:   64px;    /* Section 间距 */
  --space-page:      96px;    /* 页面级间距 */
}
```

### 4. 行高与文字间距

```css
/* 行高推荐值 */
h1, h2     { line-height: 1.1 - 1.2; } /* 大标题：紧凑 */
h3, h4     { line-height: 1.25 - 1.35; }
body, p    { line-height: 1.5 - 1.75; }  /* 正文：舒适阅读 */
.caption   { line-height: 1.4; }

/* 段落间距 */
p + p      { margin-top: 1em; }          /* 段落之间 1em */
h2 + p     { margin-top: 0.5em; }        /* 标题与首段 0.5em */

/* 字间距（中文通常不需要调整，英文标题可适当增加） */
.heading-english { letter-spacing: -0.02em; } /* 大标题可负值 */
.uppercase-label { letter-spacing: 0.05em; }  /* 大写标签加宽 */
```

---

## 五、视觉层次与信息架构模式

### 1. 视觉层次金字塔

```
                  ▲
                 ╱ ╲
                ╱   ╲
               ╱ L1  ╲        Level 1: 主标题 / Hero
              ╱  最醒目 ╲       - 最大字号、最重颜色/对比度
             ╱─────────╲      - 用户 2 秒内必须看到
            ╱           ╲
           ╱    L2       ╲    Level 2: 子标题 / 关键信息
          ╱  次要焦点     ╲    - 次大字号、略低对比度
         ╱─────────────────╲  - 用户 5 秒内阅读
        ╱                   ╲
       ╱       L3            ╲ Level 3: 正文 / 描述
      ╱      辅助内容          ╲ - 标准字号、中等对比度
     ╱─────────────────────────╲
    ╱                           ╲
   ╱          L4                 ╲ Level 4: 元信息 / 注释
  ╱         辅助 & 装饰           ╲ - 小字号、低对比度
 ╱─────────────────────────────────╲
```

**Tailwind 层次实现：**

```html
<!-- Level 1: 主焦点 -->
<h1 class="text-4xl md:text-6xl font-bold text-gray-950 tracking-tight">
  主标题
</h1>

<!-- Level 2: 次要焦点 -->
<h2 class="text-2xl md:text-3xl font-semibold text-gray-800">
  子标题
</h2>

<!-- Level 3: 正文内容 -->
<p class="text-base md:text-lg text-gray-600 leading-relaxed">
  正文描述
</p>

<!-- Level 4: 辅助信息 -->
<span class="text-xs text-gray-400 font-medium uppercase tracking-wider">
  元信息
</span>
```

### 2. 视觉重量工具

| 工具 | 增加视觉重量 | 降低视觉重量 |
|------|------------|------------|
| 尺寸 | 更大 | 更小 |
| 颜色 | 饱和/深色 | 淡色/灰色 |
| 字重 | Bold / Black | Light / Regular |
| 对比度 | 高对比 | 低对比 |
| 间距 | 周围更多留白（凸显） | 紧凑排列 |
| 位置 | 页面上方 / 中心 | 边缘 / 底部 |
| 装饰 | 背景色块、边框、阴影 | 无装饰 |

### 3. 信息架构模式

**倒金字塔模式（适用于内容/新闻页）：**
```
┌──────────────────────────────────────────┐
│  最重要的结论/标题（用户可能只看这里）    │  ← 必读
├──────────────────────────────────────────┤
│  支撑细节、数据、引用                    │  ← 深入了解
├──────────────────────────────────────────┤
│  背景信息、相关链接、附加资源            │  ← 可选阅读
└──────────────────────────────────────────┘
```

**渐进式披露模式（适用于产品/功能页）：**
```
Step 1: 展示核心价值（Hero）
         ↓ Scroll / Click
Step 2: 解释如何工作（Features）
         ↓ Scroll / Click
Step 3: 提供证据（Social Proof、Testimonials）
         ↓ Scroll / Click
Step 4: 消除顾虑（FAQ、Pricing）
         ↓ Scroll / Click
Step 5: 引导行动（CTA）
```

**Hub & Spoke 模式（适用于 Dashboard/Portal）：**
```
                    ┌──────────┐
                    │   Hub    │
              ┌─────│  (首页)  │─────┐
              │     └────┬─────┘     │
              │          │           │
        ┌─────┴──┐  ┌────┴────┐  ┌──┴──────┐
        │ Spoke1 │  │ Spoke2  │  │ Spoke3  │
        │ (详情) │  │ (详情)  │  │ (详情)  │
        └────────┘  └─────────┘  └─────────┘
```

### 4. CTA（行动召唤）层次

```
Primary CTA   →  最醒目，实心按钮，品牌主色
                  class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium"

Secondary CTA →  次要，轮廓按钮或浅色底
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl"

Tertiary CTA  →  最弱，纯文本链接
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
```

**CTA 布局规则：**
- 每个视口中最多 1 个 Primary CTA
- Primary 和 Secondary 可以并排出现
- Tertiary 用于辅助操作（如 "了解更多"、"查看详情"）
- 移动端 CTA 应为全宽或至少 min-width: 200px

### 5. 视觉扫描辅助

```css
/* 分割线 — 区分内容区域 */
.divider {
  border-top: 1px solid var(--color-border, #e5e7eb);
  margin: 32px 0;
}

/* 背景色交替 — 区分 Section */
section:nth-child(even) {
  background-color: var(--color-bg-subtle, #f9fafb);
}

/* 标签/Badge — 快速识别分类 */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}
.badge-blue { background: #eff6ff; color: #2563eb; }
.badge-green { background: #f0fdf4; color: #16a34a; }
.badge-amber { background: #fffbeb; color: #d97706; }

/* 卡片悬浮 — 引导交互 */
.interactive-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.interactive-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}
```

### 6. 排版节奏（Typographic Rhythm）

**推荐字号阶梯（基于 1.25 Major Third 比例）：**

```
Display:  3.5rem (56px)  → Tailwind: text-[56px] 或 text-6xl
H1:       2.5rem (40px)  → Tailwind: text-4xl
H2:       2rem   (32px)  → Tailwind: text-3xl
H3:       1.5rem (24px)  → Tailwind: text-2xl
H4:       1.25rem(20px)  → Tailwind: text-xl
Body:     1rem   (16px)  → Tailwind: text-base
Small:    0.875rem(14px) → Tailwind: text-sm
Caption:  0.75rem(12px)  → Tailwind: text-xs
```

```css
/* CSS 自定义属性实现排版系统 */
:root {
  --font-display: 3.5rem;
  --font-h1: 2.5rem;
  --font-h2: 2rem;
  --font-h3: 1.5rem;
  --font-h4: 1.25rem;
  --font-body: 1rem;
  --font-small: 0.875rem;
  --font-caption: 0.75rem;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

---

## 附录：布局模式快速选择指南

| 页面类型 | 推荐布局 | 备选 |
|----------|---------|------|
| 品牌官网首页 | 全屏 Hero + 单页滚动 | Z 型布局 |
| 产品 Landing Page | Z 型布局 | 粘性滚动 |
| SaaS 产品页 | 粘性滚动 + Bento Grid | 堆叠卡片 |
| 博客/文章列表 | 卡片网格 / 杂志布局 | F 型布局 |
| 文章详情 | 侧边栏 + 内容 | 圣杯布局 |
| 电商列表 | 筛选 + 网格 | 瀑布流 |
| Dashboard | Dashboard 布局 | 侧边栏 + 内容 |
| 作品集 | 瀑布流 / Bento Grid | 横向滚动 |
| 登录注册 | 分屏布局 | 居中卡片 |
| 文档站点 | 侧边栏 + 内容 | 圣杯布局 |
| 公司介绍 | 时间线 + 分屏 | 全屏 Hero |
| 定价页 | 卡片网格（3 栏） | Bento Grid |

---

> 本知识库持续更新，覆盖主流 Web 布局模式与最佳实践。使用时直接搜索关键词或按页面类型查阅推荐布局。
