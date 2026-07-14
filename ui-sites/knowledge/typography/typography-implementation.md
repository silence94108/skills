## 五、CSS 字体栈模板

### 模板 1：现代 Sans Serif 系统字体栈

```css
/* 当不加载自定义字体时使用，零 HTTP 请求，极致性能 */
body {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    'Noto Sans SC',    /* 中文 fallback */
    'PingFang SC',     /* macOS 中文 */
    'Microsoft YaHei', /* Windows 中文 */
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji';
}
```

### 模板 2：Inter + 中文 fallback

```css
/* 最流行的 UI 字体方案 */
body {
  font-family:
    'Inter',
    'Noto Sans SC',    /* 思源黑体 */
    'PingFang SC',     /* 苹方 */
    'Microsoft YaHei', /* 微软雅黑 */
    system-ui,
    -apple-system,
    sans-serif;
}
```

### 模板 3：衬线字体栈（编辑 / 阅读）

```css
body {
  font-family:
    'Lora',
    'Noto Serif SC',     /* 思源宋体 */
    'Songti SC',         /* macOS 宋体 */
    'SimSun',            /* Windows 宋体 */
    Georgia,
    'Times New Roman',
    serif;
}
```

### 模板 4：等宽字体栈（代码）

```css
code, pre {
  font-family:
    'JetBrains Mono',
    'Fira Code',
    'Source Code Pro',
    'Cascadia Code',
    'SF Mono',
    'Menlo',
    'Consolas',
    'DejaVu Sans Mono',
    monospace;
}
```

### 模板 5：霞鹜文楷 + 经典 Serif

```css
body {
  font-family:
    'LXGW WenKai',        /* 霞鹜文楷 */
    'EB Garamond',
    'Noto Serif SC',
    'Songti SC',
    'SimSun',
    serif;
}
```

### 模板 6：品牌标题 + 正文组合

```css
/* 标题 */
h1, h2, h3, h4, h5, h6 {
  font-family:
    'Montserrat',
    'Noto Sans SC',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
  font-weight: 700;
}

/* 正文 */
body {
  font-family:
    'Source Sans 3',
    'Noto Sans SC',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
  font-weight: 400;
}
```

### Google Fonts 加载最佳实践

```html
<!-- Preconnect 加速连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 只加载需要的字重，Variable Font 优先 -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- 中文字体建议使用 subset 减少体积 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
/* font-display: swap 确保字体加载前使用 fallback */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

---

## 六、Tailwind CSS 配置示例

### Tailwind v4（CSS 优先配置）

```css
/* 在主 CSS 文件中 */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap");
@import "tailwindcss";

@theme {
  /* 字体族 */
  --font-sans: "Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --font-serif: "Lora", "Noto Serif SC", "Songti SC", "SimSun", Georgia, serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace;
  --font-display: "Montserrat", "Noto Sans SC", sans-serif;
  --font-handwriting: "LXGW WenKai", "Caveat", cursive;

  /* Type Scale - Major Third (1.25) */
  --text-xs: 0.64rem;    /* 10.24px */
  --text-sm: 0.8rem;     /* 12.8px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.563rem;   /* 25px */
  --text-2xl: 1.953rem;  /* 31.25px */
  --text-3xl: 2.441rem;  /* 39.06px */
  --text-4xl: 3.052rem;  /* 48.83px */
  --text-5xl: 3.815rem;  /* 61.04px */
  --text-6xl: 4.768rem;  /* 76.29px */

  /* 行高 */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;
  --leading-loose: 2;

  /* 字间距 */
  --tracking-tighter: -0.025em;
  --tracking-tight: -0.015em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### Tailwind v3（tailwind.config.js）

```js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans SC',
          'PingFang SC',
          'Microsoft YaHei',
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          'Lora',
          'Noto Serif SC',
          'Songti SC',
          'SimSun',
          ...defaultTheme.fontFamily.serif,
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Cascadia Code',
          ...defaultTheme.fontFamily.mono,
        ],
        display: ['Montserrat', 'Noto Sans SC', 'sans-serif'],
        handwriting: ['LXGW WenKai', 'Caveat', 'cursive'],
      },

      /* Type Scale - Major Third (1.25), base 16px */
      fontSize: {
        'xs':   ['0.64rem',  { lineHeight: '1.4' }],    /* 10.24px */
        'sm':   ['0.8rem',   { lineHeight: '1.4' }],    /* 12.8px */
        'base': ['1rem',     { lineHeight: '1.6' }],    /* 16px */
        'lg':   ['1.25rem',  { lineHeight: '1.6' }],    /* 20px */
        'xl':   ['1.563rem', { lineHeight: '1.5' }],    /* 25px */
        '2xl':  ['1.953rem', { lineHeight: '1.4' }],    /* 31.25px */
        '3xl':  ['2.441rem', { lineHeight: '1.3' }],    /* 39.06px */
        '4xl':  ['3.052rem', { lineHeight: '1.2' }],    /* 48.83px */
        '5xl':  ['3.815rem', { lineHeight: '1.1' }],    /* 61.04px */
        '6xl':  ['4.768rem', { lineHeight: '1.1' }],    /* 76.29px */
      },

      letterSpacing: {
        tighter: '-0.025em',
        tight:   '-0.015em',
        normal:  '0em',
        wide:    '0.025em',
        wider:   '0.05em',
        widest:  '0.1em',
      },

      lineHeight: {
        none:    '1',
        tight:   '1.1',
        snug:    '1.3',
        normal:  '1.6',
        relaxed: '1.75',
        loose:   '2',
      },
    },
  },
};
```

### Tailwind 排版工具类速查

```html
<!-- 标题 -->
<h1 class="font-display text-5xl font-bold leading-tight tracking-tight">
  Hero Title
</h1>

<!-- 副标题 -->
<h2 class="font-sans text-3xl font-semibold leading-snug tracking-tight">
  Section Heading
</h2>

<!-- 正文 -->
<p class="font-sans text-base leading-normal tracking-normal">
  Body text content here...
</p>

<!-- 小字 -->
<small class="font-sans text-sm leading-snug tracking-wide text-gray-500">
  Caption or helper text
</small>

<!-- 大写标签 -->
<span class="font-sans text-xs font-semibold uppercase tracking-widest">
  Category Label
</span>

<!-- 代码 -->
<code class="font-mono text-sm leading-normal">
  const x = 42;
</code>

<!-- 中文长文阅读 -->
<article class="font-serif text-lg leading-loose tracking-normal">
  这里是中文长文内容...
</article>

<!-- 手写风格装饰 -->
<span class="font-handwriting text-2xl leading-snug">
  温暖的手写文字
</span>
```

---

