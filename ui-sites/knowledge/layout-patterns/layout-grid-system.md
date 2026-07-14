## 二、网格系统规范

### 1. 12 栏网格系统

```
 Margin │ Col │ Gutter │ Col │ Gutter │ ... │ Col │ Margin
 ◄──────►     ◄────────►     ◄────────►     ◄─────► ◄──────►
   M     1col     G     1col     G    ...   1col     M

 M = Margin（页面边距）
 G = Gutter（栏间距）
 总宽度 = M + 12 * Col + 11 * G + M
```

**各断点推荐值：**

| 断点 | 总宽度 | Margin (M) | Gutter (G) | 列宽 (Col) |
|------|--------|------------|------------|-----------|
| Mobile (360px) | 100% | 16px | 16px | auto |
| Tablet (768px) | 100% | 32px | 24px | auto |
| Laptop (1024px) | 960px | auto(居中) | 24px | 56px |
| Desktop (1280px) | 1200px | auto(居中) | 24px | 73px |
| Wide (1440px) | 1320px | auto(居中) | 32px | 76px |

**Tailwind 实现：**

```html
<!-- 12 栏容器 -->
<div class="max-w-[1320px] mx-auto px-4 md:px-8">
  <div class="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
    <!-- 占 4 栏 -->
    <div class="col-span-12 md:col-span-6 lg:col-span-4">Column</div>
    <!-- 占 8 栏 -->
    <div class="col-span-12 md:col-span-6 lg:col-span-8">Column</div>
  </div>
</div>
```

```css
/* 纯 CSS 12 栏网格 */
.container {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 768px) { .container { padding: 0 32px; } }

.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}
@media (min-width: 768px) { .grid-12 { gap: 24px; } }
@media (min-width: 1024px) { .grid-12 { gap: 24px; } }
@media (min-width: 1440px) { .grid-12 { gap: 32px; } }

/* 常用栏位工具类 */
.col-1  { grid-column: span 1; }
.col-2  { grid-column: span 2; }
.col-3  { grid-column: span 3; }  /* 1/4 */
.col-4  { grid-column: span 4; }  /* 1/3 */
.col-6  { grid-column: span 6; }  /* 1/2 */
.col-8  { grid-column: span 8; }  /* 2/3 */
.col-9  { grid-column: span 9; }  /* 3/4 */
.col-12 { grid-column: span 12; } /* 全宽 */
```

### 2. CSS Grid 最佳实践

```css
/* ✅ 自适应网格（推荐） */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* ✅ 命名区域（复杂布局时使用） */
.named-grid {
  display: grid;
  grid-template:
    "header header" auto
    "sidebar main"  1fr
    "footer footer" auto
    / 280px 1fr;
}

/* ✅ subgrid（子元素对齐父网格） */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.card-grid > .card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* image + title + meta 对齐 */
}

/* ✅ 容器查询 + Grid */
@container (min-width: 600px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 3. Flexbox 最佳实践

```css
/* ✅ 居中（最简洁写法） */
.center {
  display: flex;
  place-items: center;      /* align-items + justify-items */
  /* 或者 */
  display: grid;
  place-items: center;
}

/* ✅ 均分但允许换行 */
.flex-wrap-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.flex-wrap-grid > * {
  flex: 1 1 280px; /* 最小 280px，自动均分 */
}

/* ✅ 粘性底部（Sticky Footer） */
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page-layout > main { flex: 1; }

/* ✅ 间距自动分配 */
.header-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header-nav .logo { margin-right: auto; } /* logo 在左，其余在右 */
```

### 4. 间距系统（4px 基准）

```
间距刻度（4px Base-4 Scale）：

4px   → 0.25rem  → Tailwind: 1    │ 最小间距，图标与文字
8px   → 0.5rem   → Tailwind: 2    │ 紧凑元素间距
12px  → 0.75rem  → Tailwind: 3    │ 小间距
16px  → 1rem     → Tailwind: 4    │ 基础间距（段落间、卡片内边距）
20px  → 1.25rem  → Tailwind: 5    │ 中等间距
24px  → 1.5rem   → Tailwind: 6    │ 组件间隔
32px  → 2rem     → Tailwind: 8    │ 区块内间距
40px  → 2.5rem   → Tailwind: 10   │ 较大间距
48px  → 3rem     → Tailwind: 12   │ 大区块间隔
64px  → 4rem     → Tailwind: 16   │ 页面级区块间隔
80px  → 5rem     → Tailwind: 20   │ 主要区块间距
96px  → 6rem     → Tailwind: 24   │ 最大间距（Section 间）
128px → 8rem     → Tailwind: 32   │ 超大间距
```

**使用场景速查表：**

| 间距值 | Tailwind | 使用场景 |
|--------|----------|---------|
| 4px | p-1, m-1 | 图标与标签间距、紧密排列元素 |
| 8px | p-2, gap-2 | 按钮内图标间距、标签组间距 |
| 12px | p-3, gap-3 | 小型卡片内边距、列表项间距 |
| 16px | p-4, gap-4 | 通用内边距、输入框 padding、卡片间隔 |
| 24px | p-6, gap-6 | 卡片内边距（推荐）、内容区间距 |
| 32px | p-8, gap-8 | 大卡片/面板内边距、主体内容边距 |
| 48px | py-12 | Section 顶部/底部内边距（移动端） |
| 64px | py-16 | Section 间距（桌面端） |
| 96px | py-24 | 大型 Section 间距、页面首尾间距 |

---

