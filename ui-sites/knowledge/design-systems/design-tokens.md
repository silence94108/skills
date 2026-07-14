## 1. Design Token 架构

### 1.1 三层 Token 架构

设计 Token 是设计系统的原子单位，采用三层架构确保可维护性与一致性。

```
┌─────────────────────────────────────────────────────────────┐
│  Global Token（全局 Token）                                   │
│  最底层，存储原始设计值                                         │
│  例：blue-500: #3B82F6, space-4: 16px, font-size-md: 16px    │
├─────────────────────────────────────────────────────────────┤
│  Alias Token（别名 Token / 语义 Token）                        │
│  中间层，赋予语义含义，连接全局与组件                               │
│  例：color-primary: {blue-500}, spacing-md: {space-4}         │
├─────────────────────────────────────────────────────────────┤
│  Component Token（组件 Token）                                 │
│  最上层，组件级别的具体应用                                       │
│  例：button-bg-primary: {color-primary}                       │
│      button-padding-x: {spacing-md}                          │
└─────────────────────────────────────────────────────────────┘
```

**为什么采用三层架构：**
- **全局层** 保证设计值的单一来源（Single Source of Truth）
- **别名层** 实现语义化，使主题切换只需修改映射关系
- **组件层** 保证组件封装性，组件内部修改不影响全局

**为什么这是好主意：**
- 修改一个全局 Token，所有引用它的别名和组件自动更新
- 主题切换只需替换别名层映射，无需逐组件修改
- Material Design 3、Ant Design、Carbon Design 均采用此架构

### 1.2 颜色 Token 命名规范

#### 1.2.1 色阶系统（Color Scale）

每个主色生成 50~900 共 10 个色阶，50 最浅、900 最深。

```css
/* ========================================
   Global Color Tokens — 全局颜色 Token
   ======================================== */

:root {
  /* --- Primary 主色 --- */
  --color-primary-50:  #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;  /* 基准色 */
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;

  /* --- Secondary 辅色 --- */
  --color-secondary-50:  #F5F3FF;
  --color-secondary-100: #EDE9FE;
  --color-secondary-200: #DDD6FE;
  --color-secondary-300: #C4B5FD;
  --color-secondary-400: #A78BFA;
  --color-secondary-500: #8B5CF6;
  --color-secondary-600: #7C3AED;
  --color-secondary-700: #6D28D9;
  --color-secondary-800: #5B21B6;
  --color-secondary-900: #4C1D95;

  /* --- Neutral 中性色 --- */
  --color-neutral-50:  #FAFAFA;
  --color-neutral-100: #F5F5F5;
  --color-neutral-200: #E5E5E5;
  --color-neutral-300: #D4D4D4;
  --color-neutral-400: #A3A3A3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
}
```

#### 1.2.2 语义颜色 Token（Semantic Colors）

```css
/* ========================================
   Alias Color Tokens — 语义颜色 Token
   ======================================== */

:root {
  /* --- 功能语义色 --- */
  --color-success-light:   #DCFCE7;
  --color-success:         #22C55E;
  --color-success-dark:    #15803D;

  --color-warning-light:   #FEF3C7;
  --color-warning:         #F59E0B;
  --color-warning-dark:    #B45309;

  --color-error-light:     #FEE2E2;
  --color-error:           #EF4444;
  --color-error-dark:      #B91C1C;

  --color-info-light:      #DBEAFE;
  --color-info:            #3B82F6;
  --color-info-dark:       #1D4ED8;

  /* --- 表面与背景 --- */
  --color-bg-primary:      #FFFFFF;
  --color-bg-secondary:    var(--color-neutral-50);
  --color-bg-tertiary:     var(--color-neutral-100);
  --color-bg-inverse:      var(--color-neutral-900);

  /* --- 文字 --- */
  --color-text-primary:    var(--color-neutral-900);
  --color-text-secondary:  var(--color-neutral-600);
  --color-text-tertiary:   var(--color-neutral-400);
  --color-text-inverse:    #FFFFFF;
  --color-text-link:       var(--color-primary-600);
  --color-text-link-hover: var(--color-primary-700);

  /* --- 边框 --- */
  --color-border-default:  var(--color-neutral-200);
  --color-border-strong:   var(--color-neutral-400);
  --color-border-focus:    var(--color-primary-500);

  /* --- 交互状态 --- */
  --color-hover:           rgba(0, 0, 0, 0.04);
  --color-pressed:         rgba(0, 0, 0, 0.08);
  --color-selected:        var(--color-primary-50);
  --color-disabled-bg:     var(--color-neutral-100);
  --color-disabled-text:   var(--color-neutral-400);
}
```

#### 1.2.3 组件级颜色 Token

```css
/* ========================================
   Component Color Tokens — 组件颜色 Token
   ======================================== */

:root {
  /* --- Button --- */
  --button-primary-bg:           var(--color-primary-500);
  --button-primary-bg-hover:     var(--color-primary-600);
  --button-primary-bg-active:    var(--color-primary-700);
  --button-primary-text:         var(--color-text-inverse);
  --button-secondary-bg:         transparent;
  --button-secondary-border:     var(--color-border-default);
  --button-secondary-text:       var(--color-text-primary);
  --button-danger-bg:            var(--color-error);
  --button-danger-bg-hover:      var(--color-error-dark);
  --button-disabled-bg:          var(--color-disabled-bg);
  --button-disabled-text:        var(--color-disabled-text);

  /* --- Input --- */
  --input-bg:                    var(--color-bg-primary);
  --input-border:                var(--color-border-default);
  --input-border-hover:          var(--color-border-strong);
  --input-border-focus:          var(--color-border-focus);
  --input-border-error:          var(--color-error);
  --input-text:                  var(--color-text-primary);
  --input-placeholder:           var(--color-text-tertiary);

  /* --- Card --- */
  --card-bg:                     var(--color-bg-primary);
  --card-border:                 var(--color-border-default);
  --card-shadow:                 var(--shadow-sm);

  /* --- Badge --- */
  --badge-success-bg:            var(--color-success-light);
  --badge-success-text:          var(--color-success-dark);
  --badge-warning-bg:            var(--color-warning-light);
  --badge-warning-text:          var(--color-warning-dark);
  --badge-error-bg:              var(--color-error-light);
  --badge-error-text:            var(--color-error-dark);
  --badge-info-bg:               var(--color-info-light);
  --badge-info-text:             var(--color-info-dark);
}
```

### 1.3 间距 Token（Spacing）

基于 **4px 基准网格（4px Base Grid）**，这是业界共识（Material Design、Carbon、Fluent UI 均采用）。

```css
/* ========================================
   Spacing Tokens — 间距 Token
   基于 4px 网格系统
   ======================================== */

:root {
  --space-0:   0px;       /* 0   */
  --space-0-5: 2px;       /* 0.5 */
  --space-1:   4px;       /* 1   — 基准单位 */
  --space-1-5: 6px;       /* 1.5 */
  --space-2:   8px;       /* 2   */
  --space-2-5: 10px;      /* 2.5 */
  --space-3:   12px;      /* 3   */
  --space-3-5: 14px;      /* 3.5 */
  --space-4:   16px;      /* 4   — 常用基础间距 */
  --space-5:   20px;      /* 5   */
  --space-6:   24px;      /* 6   */
  --space-7:   28px;      /* 7   */
  --space-8:   32px;      /* 8   */
  --space-9:   36px;      /* 9   */
  --space-10:  40px;      /* 10  */
  --space-11:  44px;      /* 11  */
  --space-12:  48px;      /* 12  */
  --space-14:  56px;      /* 14  */
  --space-16:  64px;      /* 16  */
  --space-20:  80px;      /* 20  */
  --space-24:  96px;      /* 24  */
  --space-28:  112px;     /* 28  */
  --space-32:  128px;     /* 32  */
}

/* --- 语义间距别名 --- */
:root {
  --spacing-xs:    var(--space-1);    /*  4px — 紧凑元素间距 */
  --spacing-sm:    var(--space-2);    /*  8px — 相关元素间距 */
  --spacing-md:    var(--space-4);    /* 16px — 标准内间距 */
  --spacing-lg:    var(--space-6);    /* 24px — 区块间距 */
  --spacing-xl:    var(--space-8);    /* 32px — 大区块间距 */
  --spacing-2xl:   var(--space-12);   /* 48px — 页面级间距 */
  --spacing-3xl:   var(--space-16);   /* 64px — 大型页面级间距 */

  /* --- 组件级间距 --- */
  --spacing-inline-xs:  var(--space-1);   /* 行内紧凑 */
  --spacing-inline-sm:  var(--space-2);   /* 行内小 */
  --spacing-inline-md:  var(--space-3);   /* 行内中 */
  --spacing-inline-lg:  var(--space-4);   /* 行内大 */
  --spacing-stack-xs:   var(--space-1);   /* 堆叠紧凑 */
  --spacing-stack-sm:   var(--space-2);   /* 堆叠小 */
  --spacing-stack-md:   var(--space-4);   /* 堆叠中 */
  --spacing-stack-lg:   var(--space-6);   /* 堆叠大 */
  --spacing-inset-xs:   var(--space-1);   /* 内嵌紧凑 */
  --spacing-inset-sm:   var(--space-2);   /* 内嵌小 */
  --spacing-inset-md:   var(--space-4);   /* 内嵌中 */
  --spacing-inset-lg:   var(--space-6);   /* 内嵌大 */
}
```

### 1.4 字体 Token（Typography）

```css
/* ========================================
   Typography Tokens — 字体 Token
   ======================================== */

:root {
  /* --- Font Family --- */
  --font-family-sans:  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                       'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC',
                       'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --font-family-serif: Georgia, 'Noto Serif SC', 'Source Han Serif SC',
                       'Times New Roman', serif;
  --font-family-mono:  'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono',
                       'Source Code Pro', Menlo, Monaco, Consolas, monospace;

  /* --- Font Size --- */
  --font-size-xs:    0.75rem;   /* 12px */
  --font-size-sm:    0.875rem;  /* 14px */
  --font-size-base:  1rem;      /* 16px — 基准 */
  --font-size-lg:    1.125rem;  /* 18px */
  --font-size-xl:    1.25rem;   /* 20px */
  --font-size-2xl:   1.5rem;    /* 24px */
  --font-size-3xl:   1.875rem;  /* 30px */
  --font-size-4xl:   2.25rem;   /* 36px */
  --font-size-5xl:   3rem;      /* 48px */
  --font-size-6xl:   3.75rem;   /* 60px */
  --font-size-7xl:   4.5rem;    /* 72px */

  /* --- Font Weight --- */
  --font-weight-thin:       100;
  --font-weight-extralight: 200;
  --font-weight-light:      300;
  --font-weight-regular:    400;
  --font-weight-medium:     500;
  --font-weight-semibold:   600;
  --font-weight-bold:       700;
  --font-weight-extrabold:  800;
  --font-weight-black:      900;

  /* --- Line Height --- */
  --line-height-none:    1;
  --line-height-tight:   1.25;
  --line-height-snug:    1.375;
  --line-height-normal:  1.5;    /* 正文推荐 */
  --line-height-relaxed: 1.625;
  --line-height-loose:   2;

  /* --- Letter Spacing --- */
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight:   -0.025em;
  --letter-spacing-normal:   0em;
  --letter-spacing-wide:     0.025em;
  --letter-spacing-wider:    0.05em;
  --letter-spacing-widest:   0.1em;
}

/* --- 排版组合 Token（Typography Presets） --- */
:root {
  /* Display */
  --typo-display-lg-size:    var(--font-size-7xl);
  --typo-display-lg-weight:  var(--font-weight-bold);
  --typo-display-lg-leading: var(--line-height-none);
  --typo-display-lg-spacing: var(--letter-spacing-tighter);

  --typo-display-md-size:    var(--font-size-5xl);
  --typo-display-md-weight:  var(--font-weight-bold);
  --typo-display-md-leading: var(--line-height-none);
  --typo-display-md-spacing: var(--letter-spacing-tighter);

  --typo-display-sm-size:    var(--font-size-4xl);
  --typo-display-sm-weight:  var(--font-weight-bold);
  --typo-display-sm-leading: var(--line-height-tight);
  --typo-display-sm-spacing: var(--letter-spacing-tight);

  /* Heading */
  --typo-h1-size:    var(--font-size-3xl);
  --typo-h1-weight:  var(--font-weight-bold);
  --typo-h1-leading: var(--line-height-tight);

  --typo-h2-size:    var(--font-size-2xl);
  --typo-h2-weight:  var(--font-weight-semibold);
  --typo-h2-leading: var(--line-height-snug);

  --typo-h3-size:    var(--font-size-xl);
  --typo-h3-weight:  var(--font-weight-semibold);
  --typo-h3-leading: var(--line-height-snug);

  --typo-h4-size:    var(--font-size-lg);
  --typo-h4-weight:  var(--font-weight-semibold);
  --typo-h4-leading: var(--line-height-normal);

  /* Body */
  --typo-body-lg-size:    var(--font-size-lg);
  --typo-body-lg-weight:  var(--font-weight-regular);
  --typo-body-lg-leading: var(--line-height-relaxed);

  --typo-body-md-size:    var(--font-size-base);
  --typo-body-md-weight:  var(--font-weight-regular);
  --typo-body-md-leading: var(--line-height-normal);

  --typo-body-sm-size:    var(--font-size-sm);
  --typo-body-sm-weight:  var(--font-weight-regular);
  --typo-body-sm-leading: var(--line-height-normal);

  /* Caption / Label */
  --typo-caption-size:    var(--font-size-xs);
  --typo-caption-weight:  var(--font-weight-regular);
  --typo-caption-leading: var(--line-height-normal);

  --typo-label-size:    var(--font-size-sm);
  --typo-label-weight:  var(--font-weight-medium);
  --typo-label-leading: var(--line-height-normal);
  --typo-label-spacing: var(--letter-spacing-wide);
}
```

### 1.5 圆角 Token（Border Radius）

```css
/* ========================================
   Border Radius Tokens — 圆角 Token
   ======================================== */

:root {
  --radius-none:   0px;
  --radius-xs:     2px;
  --radius-sm:     4px;    /* 小型元素：Tag, Badge */
  --radius-md:     6px;    /* 中型元素：Input, Select */
  --radius-lg:     8px;    /* 大型元素：Card, Dialog */
  --radius-xl:     12px;   /* 特大元素：Modal, Sheet */
  --radius-2xl:    16px;   /* 超大：弹窗、底部面板 */
  --radius-3xl:    24px;   /* 药丸形按钮的基础 */
  --radius-full:   9999px; /* 圆形：Avatar, 药丸形 */
}

/* --- 组件级圆角 --- */
:root {
  --radius-button:      var(--radius-md);
  --radius-button-pill: var(--radius-full);
  --radius-input:       var(--radius-md);
  --radius-card:        var(--radius-lg);
  --radius-dialog:      var(--radius-xl);
  --radius-tooltip:     var(--radius-sm);
  --radius-badge:       var(--radius-sm);
  --radius-avatar:      var(--radius-full);
  --radius-thumbnail:   var(--radius-md);
}
```

### 1.6 阴影 Token（Box Shadow / Elevation）

参考 Material Design 的 Elevation 系统和 Ant Design 的阴影规范。

```css
/* ========================================
   Shadow / Elevation Tokens — 阴影 Token
   ======================================== */

:root {
  --shadow-none: none;

  /* Level 1 — 轻微浮起：Card 默认态 */
  --shadow-xs:
    0 1px 2px 0 rgba(0, 0, 0, 0.05);

  /* Level 2 — 小浮起：Card hover、Dropdown */
  --shadow-sm:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);

  /* Level 3 — 中浮起：Popover、Select dropdown */
  --shadow-md:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);

  /* Level 4 — 大浮起：Modal、Drawer */
  --shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* Level 5 — 最大浮起：Notification、全屏 Dialog */
  --shadow-xl:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);

  --shadow-2xl:
    0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* --- 内阴影 --- */
  --shadow-inner:
    inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);

  /* --- Focus Ring — 焦点环 --- */
  --shadow-focus-ring:
    0 0 0 2px var(--color-bg-primary),
    0 0 0 4px var(--color-primary-500);
}

/* --- 组件级阴影 --- */
:root {
  --shadow-card:          var(--shadow-xs);
  --shadow-card-hover:    var(--shadow-md);
  --shadow-dropdown:      var(--shadow-md);
  --shadow-popover:       var(--shadow-md);
  --shadow-modal:         var(--shadow-lg);
  --shadow-drawer:        var(--shadow-lg);
  --shadow-notification:  var(--shadow-xl);
  --shadow-tooltip:       var(--shadow-sm);
}
```

### 1.7 边框 Token（Border）

```css
/* ========================================
   Border Tokens — 边框 Token
   ======================================== */

:root {
  /* --- 边框宽度 --- */
  --border-width-none:   0px;
  --border-width-thin:   1px;
  --border-width-medium: 2px;
  --border-width-thick:  3px;
  --border-width-heavy:  4px;

  /* --- 边框样式 --- */
  --border-style-solid:  solid;
  --border-style-dashed: dashed;
  --border-style-dotted: dotted;

  /* --- 语义边框 --- */
  --border-default:      var(--border-width-thin) var(--border-style-solid) var(--color-border-default);
  --border-strong:       var(--border-width-thin) var(--border-style-solid) var(--color-border-strong);
  --border-focus:        var(--border-width-medium) var(--border-style-solid) var(--color-border-focus);
  --border-error:        var(--border-width-thin) var(--border-style-solid) var(--color-error);
  --border-success:      var(--border-width-thin) var(--border-style-solid) var(--color-success);
  --border-dashed:       var(--border-width-thin) var(--border-style-dashed) var(--color-border-default);

  /* --- 分割线 --- */
  --divider-color:       var(--color-neutral-200);
  --divider-weight:      var(--border-width-thin);
}
```

### 1.8 Tailwind CSS 配置完整示例

```javascript
// tailwind.config.js — 完整 Design Token 映射配置

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
  darkMode: 'class', // 暗色模式使用 class 策略

  theme: {
    /* ---- 覆盖默认值 ---- */

    // 字体
    fontFamily: {
      sans:  ['var(--font-family-sans)'],
      serif: ['var(--font-family-serif)'],
      mono:  ['var(--font-family-mono)'],
    },

    // 圆角
    borderRadius: {
      'none': '0px',
      'xs':   'var(--radius-xs)',
      'sm':   'var(--radius-sm)',
      'md':   'var(--radius-md)',
      'DEFAULT': 'var(--radius-md)',
      'lg':   'var(--radius-lg)',
      'xl':   'var(--radius-xl)',
      '2xl':  'var(--radius-2xl)',
      '3xl':  'var(--radius-3xl)',
      'full': 'var(--radius-full)',
    },

    // 阴影
    boxShadow: {
      'none':         'none',
      'xs':           'var(--shadow-xs)',
      'sm':           'var(--shadow-sm)',
      'DEFAULT':      'var(--shadow-md)',
      'md':           'var(--shadow-md)',
      'lg':           'var(--shadow-lg)',
      'xl':           'var(--shadow-xl)',
      '2xl':          'var(--shadow-2xl)',
      'inner':        'var(--shadow-inner)',
      'focus-ring':   'var(--shadow-focus-ring)',
    },

    extend: {
      /* ---- 扩展（不覆盖默认） ---- */

      // 颜色
      colors: {
        primary: {
          50:  'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary-500)',
        },
        secondary: {
          50:  'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          DEFAULT: 'var(--color-secondary-500)',
        },
        neutral: {
          50:  'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        success: {
          light:   'var(--color-success-light)',
          DEFAULT: 'var(--color-success)',
          dark:    'var(--color-success-dark)',
        },
        warning: {
          light:   'var(--color-warning-light)',
          DEFAULT: 'var(--color-warning)',
          dark:    'var(--color-warning-dark)',
        },
        error: {
          light:   'var(--color-error-light)',
          DEFAULT: 'var(--color-error)',
          dark:    'var(--color-error-dark)',
        },
        info: {
          light:   'var(--color-info-light)',
          DEFAULT: 'var(--color-info)',
          dark:    'var(--color-info-dark)',
        },
        // 语义表面色
        surface: {
          primary:   'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary:  'var(--color-bg-tertiary)',
          inverse:   'var(--color-bg-inverse)',
        },
      },

      // 间距
      spacing: {
        '0.5': 'var(--space-0-5)',
        '1':   'var(--space-1)',
        '1.5': 'var(--space-1-5)',
        '2':   'var(--space-2)',
        '2.5': 'var(--space-2-5)',
        '3':   'var(--space-3)',
        '3.5': 'var(--space-3-5)',
        '4':   'var(--space-4)',
        '5':   'var(--space-5)',
        '6':   'var(--space-6)',
        '7':   'var(--space-7)',
        '8':   'var(--space-8)',
        '9':   'var(--space-9)',
        '10':  'var(--space-10)',
        '11':  'var(--space-11)',
        '12':  'var(--space-12)',
        '14':  'var(--space-14)',
        '16':  'var(--space-16)',
        '20':  'var(--space-20)',
        '24':  'var(--space-24)',
        '28':  'var(--space-28)',
        '32':  'var(--space-32)',
      },

      // 字体大小
      fontSize: {
        'xs':   ['var(--font-size-xs)',   { lineHeight: 'var(--line-height-normal)' }],
        'sm':   ['var(--font-size-sm)',   { lineHeight: 'var(--line-height-normal)' }],
        'base': ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }],
        'lg':   ['var(--font-size-lg)',   { lineHeight: 'var(--line-height-relaxed)' }],
        'xl':   ['var(--font-size-xl)',   { lineHeight: 'var(--line-height-snug)' }],
        '2xl':  ['var(--font-size-2xl)',  { lineHeight: 'var(--line-height-snug)' }],
        '3xl':  ['var(--font-size-3xl)',  { lineHeight: 'var(--line-height-tight)' }],
        '4xl':  ['var(--font-size-4xl)',  { lineHeight: 'var(--line-height-tight)' }],
        '5xl':  ['var(--font-size-5xl)',  { lineHeight: 'var(--line-height-none)' }],
        '6xl':  ['var(--font-size-6xl)',  { lineHeight: 'var(--line-height-none)' }],
        '7xl':  ['var(--font-size-7xl)',  { lineHeight: 'var(--line-height-none)' }],
      },

      // 过渡
      transitionDuration: {
        'fast':   '100ms',
        'normal': '200ms',
        'slow':   '300ms',
        'slower': '500ms',
      },

      // 动画缓动
      transitionTimingFunction: {
        'ease-productive': 'cubic-bezier(0.2, 0, 0.38, 0.9)',  /* Carbon 生产性动效 */
        'ease-expressive': 'cubic-bezier(0.4, 0.14, 0.3, 1)',  /* Carbon 表现性动效 */
        'ease-standard':   'cubic-bezier(0.2, 0, 0, 1)',       /* Material 标准 */
        'ease-decelerate': 'cubic-bezier(0, 0, 0, 1)',         /* Material 减速 */
        'ease-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)', /* Material 加速 */
      },

      // Z-index 层级
      zIndex: {
        'dropdown':    1000,
        'sticky':      1020,
        'fixed':       1030,
        'backdrop':    1040,
        'modal':       1050,
        'popover':     1060,
        'tooltip':     1070,
        'toast':       1080,
      },
    },
  },

  plugins: [],
};
```

---

