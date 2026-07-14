## 七、中文字体推荐与搭配

### 核心中文 Web 字体

| 字体名称 | 英文名 | 分类 | 来源 | 特点 |
|---------|--------|------|------|------|
| 思源黑体 | Noto Sans SC | 黑体 / Sans | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+SC) | Google + Adobe 联合开发，覆盖全部 CJK 字符，7 字重，Web Font 首选 |
| 思源宋体 | Noto Serif SC | 宋体 / Serif | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Serif+SC) | 同族衬线版本，7 字重，适合文学、出版类正文 |
| 霞鹜文楷 | LXGW WenKai | 楷体 | [GitHub](https://github.com/lxgw/LxgwWenKai) | 基于日本 Fontworks Klee One，楷体风格，文化感强 |
| 霞鹜文楷屏幕阅读版 | LXGW WenKai Screen | 楷体 | [GitHub](https://github.com/lxgw/LxgwWenKai) | 针对屏幕阅读优化的变体，笔画更清晰 |
| 霞鹜新晰黑 | LXGW Neo XiHei | 黑体 | [GitHub](https://github.com/lxgw/LxgwNeoXiHei) | 开源黑体，适合 UI |
| 得意黑 | Smiley Sans | 黑体 | [GitHub](https://github.com/atelier-anchor/smiley-sans) | 斜体黑体，个性鲜明，适合标题和品牌 |
| 未来荧黑 | Warp Gothic | 黑体 | [GitHub](https://github.com/welai/glow-sans) | 基于思源黑体改造，更现代的视觉风格 |

### 系统预装中文字体

| 系统 | 黑体 | 宋体 |
|------|------|------|
| macOS | PingFang SC（苹方）| Songti SC（宋体-简） |
| Windows | Microsoft YaHei（微软雅黑）| SimSun（中易宋体） |
| Linux | Noto Sans CJK SC | Noto Serif CJK SC |
| Android | Noto Sans SC | — |
| iOS | PingFang SC | — |

### 中英文搭配推荐

| 场景 | 英文标题 | 中文标题 | 英文正文 | 中文正文 |
|------|---------|---------|---------|---------|
| **科技产品 UI** | Inter Bold | Noto Sans SC Bold | Inter Regular | Noto Sans SC Regular |
| **企业官网** | Montserrat Bold | Noto Sans SC Bold | Source Sans 3 Regular | Noto Sans SC Regular |
| **文化 / 文学** | Playfair Display Bold | Noto Serif SC Bold | Lora Regular | Noto Serif SC Regular |
| **创意品牌** | Space Grotesk Bold | 得意黑 | Inter Regular | Noto Sans SC Regular |
| **教育平台** | Merriweather Bold | LXGW WenKai Bold | Open Sans Regular | LXGW WenKai Regular |
| **古风 / 传统** | EB Garamond Bold | LXGW WenKai Bold | EB Garamond Regular | LXGW WenKai Regular |
| **新闻媒体** | Roboto Condensed Bold | Noto Sans SC Bold | Roboto Regular | Noto Sans SC Regular |

### 中文 Web Font 加载优化

```html
<!-- 思源黑体 via Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">

<!-- 思源宋体 via Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap" rel="stylesheet">

<!-- 霞鹜文楷 via CDN (分包加载，大幅减少首屏体积) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-web@latest/style.css">

<!-- 或通过 npm 安装 -->
<!-- npm install lxgw-wenkai-web -->
```

```css
/* 使用 font-display: swap 确保中文字体加载前有 fallback */
@font-face {
  font-family: 'Noto Sans SC';
  src: url('/fonts/NotoSansSC-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
  unicode-range: U+4E00-9FFF, U+3400-4DBF, U+F900-FAFF; /* CJK 范围 */
}
```

### 中文排版特殊注意事项

1. **字重映射**：中文字体的 "Regular" 通常对应英文 400，"Bold" 对应 700。但中文字体因笔画复杂度，细字重（100-300）的可读性远低于英文，正文至少使用 Regular (400)。
2. **字号下限**：中文字符结构复杂，最小字号建议 12px（0.75rem），低于此值笔画会模糊不清。
3. **中英混排间距**：中英文之间建议添加 1/4 em 空隙（可通过 CSS `word-spacing` 或 JavaScript 自动插入）。
4. **行宽控制**：中文正文每行字数推荐 25-35 个字符（约 `max-width: 42em`），超过 40 字阅读疲劳显著增加。
5. **标点挤压**：连续标点（如 `。"` `，"`）应启用标点挤压（CSS `font-feature-settings: "halt"`）或使用支持 OpenType 的字体。

---

## 八、垂直韵律与排版网格

### 基线网格（Baseline Grid）

建立一致的垂直韵律，让所有文本元素在同一网格上对齐：

```css
:root {
  --grid-unit: 4px;  /* 基础网格单位 */
  --baseline: 8px;   /* 基线间距 = 2 * grid-unit */
}

/* 正文行高对齐到基线网格 */
/* 16px * 1.5 = 24px = 3 * 8px baseline */
body {
  font-size: 1rem;
  line-height: 1.5; /* 24px, 3 baseline units */
}

/* 间距使用基线倍数 */
p {
  margin-bottom: 24px; /* 3 baseline units */
}

h1 {
  font-size: 3.052rem; /* 48.83px */
  line-height: 1.23;   /* ~60px ≈ 7.5 baseline units */
  margin-bottom: 16px; /* 2 baseline units */
}

h2 {
  font-size: 1.953rem; /* 31.25px */
  line-height: 1.28;   /* ~40px = 5 baseline units */
  margin-bottom: 16px;
}
```

### 行宽（Measure）参考

| 内容类型 | 推荐字符数/行 | CSS 参考宽度 |
|---------|-------------|-------------|
| 英文正文 | 50-75 字符 | `max-width: 65ch` |
| 中文正文 | 25-35 字符 | `max-width: 42em` |
| 侧边栏短文 | 20-40 字符 | `max-width: 30ch` |
| 超宽标题 | 不限 | `max-width: 20ch`（自然换行） |

---

## 九、实用速查表

### 字重命名对照

| 数值 | 名称 | 典型用途 |
|------|------|---------|
| 100 | Thin | 装饰性大标题 |
| 200 | ExtraLight | 装饰性标题 |
| 300 | Light | 副标题、引用 |
| 400 | **Regular** | **正文、默认** |
| 500 | Medium | 强调文本、小标题 |
| 600 | **SemiBold** | **小标题、导航** |
| 700 | **Bold** | **标题** |
| 800 | ExtraBold | Hero 标题 |
| 900 | Black | Display / 品牌标题 |

### 排版元素对照表

| 元素 | 字号 Token | 字重 | 行高 | 字间距 | Tailwind 类 |
|------|-----------|------|------|--------|------------|
| Display Title | `5xl` - `6xl` | 700-900 | 1.1 | -0.025em | `text-5xl font-bold leading-tight tracking-tighter` |
| H1 | `4xl` | 700 | 1.1 | -0.02em | `text-4xl font-bold leading-tight tracking-tight` |
| H2 | `3xl` | 600-700 | 1.2 | -0.015em | `text-3xl font-semibold leading-snug tracking-tight` |
| H3 | `2xl` | 600 | 1.25 | -0.01em | `text-2xl font-semibold leading-snug` |
| H4 | `xl` | 500-600 | 1.3 | 0 | `text-xl font-medium leading-snug` |
| H5 | `lg` | 500 | 1.3 | 0 | `text-lg font-medium leading-snug` |
| Body | `base` | 400 | 1.6 | 0 | `text-base leading-normal` |
| Body Large | `lg` | 400 | 1.6 | 0 | `text-lg leading-normal` |
| Small / Caption | `sm` | 400 | 1.4 | 0.015em | `text-sm leading-snug tracking-wide` |
| Overline | `xs` | 600 | 1.4 | 0.08em | `text-xs font-semibold uppercase tracking-widest` |
| Button | `sm` - `base` | 500-600 | 1 | 0.03em | `text-sm font-medium leading-none tracking-wide` |
| Code | `sm` | 400 | 1.5 | 0 | `font-mono text-sm leading-normal` |

### 常用字体对分类索引

**Geometric Sans（几何无衬线）**
Inter, Montserrat, Poppins, Albert Sans, DM Sans, Sora, Manrope

**Humanist Sans（人文无衬线）**
Source Sans 3, Open Sans, Lato, Nunito, Karla, Barlow, Roboto

**Transitional Serif（过渡衬线）**
Lora, Merriweather, Libre Baskerville, Bitter

**Old-Style Serif（旧式衬线）**
EB Garamond, Playfair Display

**Modern Serif（现代衬线）**
DM Serif Display

**Slab Serif（粗衬线）**
Arvo, Roboto Slab, IBM Plex Serif

**Condensed（窄体）**
Roboto Condensed, Oswald, Bebas Neue, Barlow Condensed

**Monospaced（等宽）**
JetBrains Mono, Fira Code, Space Mono, IBM Plex Mono, Source Code Pro

**Script / Handwritten（手写体）**
Caveat, Dancing Script, Courgette, Sacramento

**Display（展示体）**
Fraunces, Playfair Display (large sizes), DM Serif Display

---

## 附录：字体加载性能检查清单

- [ ] 使用 WOFF2 格式（压缩率最高）
- [ ] 添加 `font-display: swap`（避免 FOIT）
- [ ] Preconnect Google Fonts CDN
- [ ] 仅加载需要的字重（通常 Regular + Medium + Bold 三个即可）
- [ ] 中文字体使用分包加载（subset）或 CDN
- [ ] 设置合理的 font-family fallback stack
- [ ] Variable Font 优先（单文件覆盖多字重）
- [ ] 测试 CLS（Cumulative Layout Shift）确保字体切换不跳动
- [ ] 关键字体使用 `<link rel="preload">` 预加载
