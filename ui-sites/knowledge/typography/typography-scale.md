## 二、Type Scale 比例参考

Type Scale（字体大小比例）是排版系统的数学基础。选择一个基准字号（base size）和一个比率（ratio），通过乘法递推得出全套字号。

### 比例总览

| 比例名称 | 比率值 | 对比强度 | 推荐场景 |
|---------|--------|---------|---------|
| Minor Second | 1.067 | 极低 | 信息密集的数据表格、仪表盘 |
| **Major Second** | **1.125** | 低 | 后台管理 UI、工具型应用 |
| **Minor Third** | **1.200** | 中低 | 通用 Web 应用、博客（推荐起步） |
| **Major Third** | **1.250** | 中 | 企业官网、落地页（最常用） |
| **Perfect Fourth** | **1.333** | 中高 | 杂志式排版、品牌网站 |
| Augmented Fourth | 1.414 | 高 | 创意展示、作品集 |
| Perfect Fifth | 1.500 | 高 | 海报风格、展览页面 |
| **Golden Ratio** | **1.618** | 极高 | 奢侈品牌、艺术项目 |

### 完整字号表（基准 16px）

以下列出每个比例从 `xs` 到 `6xl` 的完整字号计算结果：

#### Major Second（1.125）— 适合信息密集 UI

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.125^2 | 12.64px | **12.64px** |
| `sm` | base / 1.125 | 14.22px | **14.22px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.125 | 18px | **18px** |
| `xl` | base * 1.125^2 | 20.25px | **20.25px** |
| `2xl` | base * 1.125^3 | 22.78px | **22.78px** |
| `3xl` | base * 1.125^4 | 25.63px | **25.63px** |
| `4xl` | base * 1.125^5 | 28.83px | **28.83px** |
| `5xl` | base * 1.125^6 | 32.44px | **32.44px** |
| `6xl` | base * 1.125^7 | 36.49px | **36.49px** |

#### Minor Third（1.200）— 通用推荐

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.2^2 | 11.11px | **11.11px** |
| `sm` | base / 1.2 | 13.33px | **13.33px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.2 | 19.2px | **19.20px** |
| `xl` | base * 1.2^2 | 23.04px | **23.04px** |
| `2xl` | base * 1.2^3 | 27.65px | **27.65px** |
| `3xl` | base * 1.2^4 | 33.18px | **33.18px** |
| `4xl` | base * 1.2^5 | 39.81px | **39.81px** |
| `5xl` | base * 1.2^6 | 47.78px | **47.78px** |
| `6xl` | base * 1.2^7 | 57.33px | **57.33px** |

#### Major Third（1.250）— 最常用

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.25^2 | 10.24px | **10.24px** |
| `sm` | base / 1.25 | 12.8px | **12.80px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.25 | 20px | **20px** |
| `xl` | base * 1.25^2 | 25px | **25px** |
| `2xl` | base * 1.25^3 | 31.25px | **31.25px** |
| `3xl` | base * 1.25^4 | 39.06px | **39.06px** |
| `4xl` | base * 1.25^5 | 48.83px | **48.83px** |
| `5xl` | base * 1.25^6 | 61.04px | **61.04px** |
| `6xl` | base * 1.25^7 | 76.29px | **76.29px** |

#### Perfect Fourth（1.333）— 杂志式排版

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.333^2 | 9.00px | **9.00px** |
| `sm` | base / 1.333 | 12.00px | **12.00px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.333 | 21.33px | **21.33px** |
| `xl` | base * 1.333^2 | 28.43px | **28.43px** |
| `2xl` | base * 1.333^3 | 37.90px | **37.90px** |
| `3xl` | base * 1.333^4 | 50.52px | **50.52px** |
| `4xl` | base * 1.333^5 | 67.34px | **67.34px** |
| `5xl` | base * 1.333^6 | 89.76px | **89.76px** |
| `6xl` | base * 1.333^7 | 119.66px | **119.66px** |

#### Augmented Fourth（1.414）— 创意展示

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.414^2 | 8.00px | **8.00px** |
| `sm` | base / 1.414 | 11.31px | **11.31px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.414 | 22.63px | **22.63px** |
| `xl` | base * 1.414^2 | 32.00px | **32.00px** |
| `2xl` | base * 1.414^3 | 45.25px | **45.25px** |
| `3xl` | base * 1.414^4 | 64.00px | **64.00px** |
| `4xl` | base * 1.414^5 | 90.51px | **90.51px** |
| `5xl` | base * 1.414^6 | 128.00px | **128.00px** |
| `6xl` | base * 1.414^7 | 181.02px | **181.02px** |

#### Perfect Fifth（1.500）— 海报风格

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.5^2 | 7.11px | **7.11px** |
| `sm` | base / 1.5 | 10.67px | **10.67px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.5 | 24px | **24px** |
| `xl` | base * 1.5^2 | 36px | **36px** |
| `2xl` | base * 1.5^3 | 54px | **54px** |
| `3xl` | base * 1.5^4 | 81px | **81px** |
| `4xl` | base * 1.5^5 | 121.5px | **121.50px** |
| `5xl` | base * 1.5^6 | 182.25px | **182.25px** |
| `6xl` | base * 1.5^7 | 273.38px | **273.38px** |

#### Golden Ratio（1.618）— 奢华与艺术

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.618^2 | 6.11px | **6.11px** |
| `sm` | base / 1.618 | 9.89px | **9.89px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.618 | 25.89px | **25.89px** |
| `xl` | base * 1.618^2 | 41.89px | **41.89px** |
| `2xl` | base * 1.618^3 | 67.77px | **67.77px** |
| `3xl` | base * 1.618^4 | 109.66px | **109.66px** |
| `4xl` | base * 1.618^5 | 177.42px | **177.42px** |
| `5xl` | base * 1.618^6 | 287.07px | **287.07px** |
| `6xl` | base * 1.618^7 | 464.47px | **464.47px** |

### Type Scale 选择指南

```
信息密集（Dashboard、表格）  →  Major Second (1.125)
通用 Web 应用                →  Minor Third (1.200)
企业官网 / 着陆页            →  Major Third (1.250) ★ 推荐
杂志 / 编辑排版              →  Perfect Fourth (1.333)
创意作品集                   →  Augmented Fourth (1.414)
海报 / 展示页                →  Perfect Fifth (1.500)
奢侈品 / 艺术项目            →  Golden Ratio (1.618)
```

### CSS Custom Property 实现

```css
:root {
  --type-ratio: 1.25; /* Major Third */
  --type-base: 1rem;  /* 16px */

  --type-xs:  calc(var(--type-base) / var(--type-ratio) / var(--type-ratio));
  --type-sm:  calc(var(--type-base) / var(--type-ratio));
  --type-base-size: var(--type-base);
  --type-lg:  calc(var(--type-base) * var(--type-ratio));
  --type-xl:  calc(var(--type-base) * var(--type-ratio) * var(--type-ratio));
  --type-2xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-3xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-4xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-5xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-6xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
}
```

---

## 三、行高规范

行高（line-height）直接影响文本的可读性和视觉韵律。使用无单位值（unitless），使行高随字号自动缩放。

### 行高参考表

| 用途 | line-height 范围 | 推荐值 | 说明 |
|------|-----------------|--------|------|
| 大标题（Display / H1） | 1.0 - 1.15 | **1.1** | 大字号时字间已有足够空间，紧凑行高增强视觉冲击力 |
| 中标题（H2 / H3） | 1.15 - 1.3 | **1.2** | 保持标题紧凑但多行时不拥挤 |
| 小标题（H4 / H5 / H6） | 1.2 - 1.4 | **1.3** | 小标题可能会换行，需要稍多行间距 |
| **正文 / 长文阅读** | **1.5 - 1.75** | **1.6** | 正文核心区间，1.5 是底线，1.75 适合宽行 |
| 小字 / 辅助文本 | 1.3 - 1.5 | **1.4** | caption、footnote、label 等小字体 |
| UI 元素（按钮、标签） | 1.0 - 1.2 | **1** | 按钮、badge 等紧凑 UI 控件 |
| 代码块 | 1.4 - 1.6 | **1.5** | 等宽字体代码展示 |

### 行高与字号的关系

```
字号越大 → 行高比例越小（紧凑）
字号越小 → 行高比例越大（疏松）
```

### 行高 CSS 最佳实践

```css
/* 全局基础 */
body {
  line-height: 1.6;  /* 无单位值，自动继承并按比例缩放 */
}

/* 标题层级 */
h1 { line-height: 1.1; }
h2 { line-height: 1.2; }
h3 { line-height: 1.25; }
h4, h5, h6 { line-height: 1.3; }

/* 正文 */
p, li, dd { line-height: 1.6; }

/* 长文阅读优化（如博客正文） */
article p { line-height: 1.75; }

/* 小字 */
small, .caption, .footnote { line-height: 1.4; }

/* UI 控件 */
button, .badge, .tag { line-height: 1; }

/* 代码 */
code, pre { line-height: 1.5; }
```

### 中文排版行高特别说明

中文字符没有 ascender 和 descender（上升部/下降部），字面框（em box）占比更大，因此中文正文通常需要比英文更大的行高：

| 类型 | 英文推荐 | 中文推荐 |
|------|---------|---------|
| 正文 | 1.5 - 1.6 | **1.7 - 2.0** |
| 标题 | 1.1 - 1.3 | **1.3 - 1.5** |
| 小字 | 1.4 | **1.5** |

---

## 四、字间距规范

字间距（letter-spacing / tracking）微调字符间距，直接影响文本的呼吸感和辨识度。

### 字间距参考表

| 用途 | letter-spacing | 说明 |
|------|---------------|------|
| 大标题（Display） | `-0.025em` ~ `-0.015em` | 大字号时字距过宽需收紧 |
| H1 标题 | `-0.02em` | 标题适度收紧 |
| H2 标题 | `-0.015em` | 略微收紧 |
| H3 / H4 标题 | `-0.01em` ~ `0` | 接近默认 |
| **正文** | **`0`（默认）** | 正文不要手动调整 letter-spacing |
| 小字 / Caption | `0.01em` ~ `0.02em` | 小字号适当加宽以提升辨识度 |
| 全大写文本 | `0.05em` ~ `0.1em` | 大写字母间距必须加宽 |
| 按钮文本 | `0.02em` ~ `0.05em` | 略微加宽提升可点击感 |
| 导航链接 | `0.01em` ~ `0.03em` | 适度加宽增加清晰度 |

### 核心原则

```
字号越大 → letter-spacing 越负（收紧）
字号越小 → letter-spacing 越正（加宽）
全大写时 → 必须加宽 letter-spacing
正文不动 → 保持默认值 0
```

### 字间距 CSS 实现

```css
/* 标题收紧 */
h1 { letter-spacing: -0.02em; }
h2 { letter-spacing: -0.015em; }
h3 { letter-spacing: -0.01em; }

/* 正文默认 */
p { letter-spacing: 0; }

/* 小字加宽 */
.caption { letter-spacing: 0.015em; }
.overline { letter-spacing: 0.02em; }

/* 全大写必须加宽 */
.uppercase-label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* 按钮 */
button {
  letter-spacing: 0.03em;
}
```

### 关键提醒

- 始终使用 `em` 单位而非 `px`，确保字间距随字号等比缩放
- 负值 letter-spacing 在小字号上会导致文字粘连，仅用于大标题
- 中文正文一般不调整 letter-spacing，使用默认值即可
- 中文标题如需调整，范围在 `0.05em` ~ `0.15em` 之间加宽（与英文相反）

---

