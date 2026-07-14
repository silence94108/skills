# 设计系统知识库（Design Systems Knowledge Base）

> 📦 来源：本文档知识精华提炼自以下权威设计系统：
> - [Material Design 3 (Google)](https://m3.material.io/)
> - [Ant Design (蚂蚁集团)](https://ant.design/)
> - [Atlassian Design System](https://atlassian.design/)
> - [Carbon Design System (IBM)](https://carbondesignsystem.com/)
> - [Fluent UI (Microsoft)](https://fluent2.microsoft.design/)

---

## 目录

1. [Design Token 架构](#1-design-token-架构)
2. [五大设计系统对比分析](#2-五大设计系统对比分析)
3. [主题化架构](#3-主题化架构)
4. [无障碍（Accessibility）标准](#4-无障碍accessibility标准)
5. [设计系统搭建清单](#5-设计系统搭建清单)

---

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

## 2. 五大设计系统对比分析

### 2.1 总览对比表

| 维度 | Material Design 3 | Ant Design | Atlassian Design | Carbon Design | Fluent UI |
|------|-------------------|-----------|-----------------|---------------|-----------|
| **所属公司** | Google | 蚂蚁集团 | Atlassian | IBM | Microsoft |
| **定位** | 通用消费级应用 | 企业级中后台 | B2B 协作产品 | 企业级+数据密集型 | 跨平台生态 |
| **Token 架构** | Reference → System → Component | Seed → Map → Alias | 主题化 Token | Global → Contextual → Component | Global → Alias → Component |
| **主题能力** | Dynamic Color (Material You) | ConfigProvider + CSS Variables | Theme Token 覆盖 | Carbon Themes (White/G10/G90/G100) | FluentProvider + Theme |
| **网格系统** | 12 列响应式 | 24 列 Flex Grid | 12 列 | 16 列 2x Grid | 12 列响应式 |
| **暗色模式** | 原生支持 | v5 原生支持 | 原生支持 | 4 个主题梯度 | 原生支持 |
| **设计工具** | Figma Material Theme Builder | Kitchen (Sketch) / AntD Figma | Figma UI Kit | Figma Carbon Kit | Figma Fluent UI Kit |
| **无障碍标准** | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA+ | WCAG 2.1 AA |
| **前端框架** | Web Components / Compose / Flutter | React / Vue / Angular | React | React / Vue / Angular / Svelte | React / Web Components |
| **国际化** | 内建 RTL | 内建 62+ 语言 | 内建 i18n | 内建 i18n | 内建 i18n |
| **特色能力** | Dynamic Color 自适应取色 | ProComponents 开箱即用 | B2B 最佳实践 | 数据可视化规范 | 跨平台一致体验 |

### 2.2 Material Design 3（Google）

**这是什么：** Google 的第三代设计系统，核心理念是 Material You，通过 Dynamic Color 让界面色彩随用户壁纸动态调整。

**核心设计原则：**
1. **Material You** — 个性化优先，设备和用户特征影响视觉呈现
2. **Adaptive Design** — 不同设备和屏幕尺寸自适应布局
3. **Accessible by Default** — 无障碍不是附加项，而是基础

**Dynamic Color 系统：**
```
用户壁纸图片
    ↓ 算法提取 5 个关键色调（HCT 色彩空间）
    ↓
生成 5 组 Tonal Palette（每组 13 个色调）
    ↓
映射到 29 个 System Color Role
    ├── Primary / On Primary / Primary Container / On Primary Container
    ├── Secondary / On Secondary / Secondary Container / On Secondary Container
    ├── Tertiary / On Tertiary / Tertiary Container / On Tertiary Container
    ├── Error / On Error / Error Container / On Error Container
    ├── Surface / On Surface / Surface Variant / On Surface Variant
    ├── Outline / Outline Variant
    ├── Background / On Background
    └── Inverse Primary / Inverse Surface / Inverse On Surface
```

**HCT 色彩空间（Hue-Chroma-Tone）：** Material Design 3 独创的色彩空间，相比 HSL 更符合人眼感知，确保在不同 tone 下颜色感知一致。

**组件规范要点：**
- **形状系统（Shape）**：6 个形状类别（None → Extra Small → Small → Medium → Large → Extra Large → Full）
- **状态层（State Layer）**：Hover 8% 不透明度、Focused 10%、Pressed 10%、Dragged 16%
- **动效（Motion）**：标准 Duration 300ms，强调 Duration 500ms，缓动函数使用 Emphasized Easing

**适用场景：** 消费级应用、需要强品牌表达、跨 Google 生态、移动端优先的产品。

### 2.3 Ant Design（蚂蚁集团）

**这是什么：** 蚂蚁集团出品的企业级设计系统，是中文社区最广泛使用的 React/Vue 组件库，以效率和规范著称。

**四大设计价值观：**
1. **自然（Natural）** — 减少认知负担，符合直觉
2. **确定性（Certain）** — 减少不确定性，用设计引导用户
3. **意义感（Meaningful）** — 设计为用户创造真实价值
4. **成长性（Growing）** — 系统可持续演进

**Token 架构（v5）：**
```
Seed Token（种子 Token，4 个核心变量）
    ├── colorPrimary: '#1677ff'
    ├── borderRadius: 6
    ├── colorSuccess: '#52c41a'
    └── ...（约 30+ Seed Tokens）
        ↓ 梯度算法自动派生
Map Token（梯度 Token，约 300+）
    ├── colorPrimaryBg: '#e6f4ff'
    ├── colorPrimaryBgHover: '#bae0ff'
    ├── ...（含 hover、active、border 等状态色）
        ↓
Alias Token（别名 Token，约 500+）
    ├── colorBgContainer: '#ffffff'
    ├── colorText: 'rgba(0, 0, 0, 0.88)'
    └── ...
        ↓
Component Token（组件 Token，各组件独立）
    ├── Button.primaryColor: '#fff'
    ├── Input.activeBorderColor: '#1677ff'
    └── ...
```

**ProComponents（开箱即用的高级组件）：**
- **ProTable** — 高级表格，内置搜索、分页、列配置
- **ProForm** — 高级表单，支持分步、弹窗、侧栏等模式
- **ProLayout** — 后台布局，侧栏 + 顶栏 + 面包屑开箱即用
- **ProCard** — 高级卡片，支持折叠、分组、内嵌操作
- **ProDescriptions** — 详情展示，数据与编辑无缝切换

**国际化能力：**
- 内建 62+ 种语言包
- ConfigProvider 统一注入
- 日期组件支持 dayjs / date-fns / moment
- RTL（从右到左）布局支持

**适用场景：** 企业级中后台、管理系统、数据密集型操作界面、中文技术团队。

### 2.4 Atlassian Design System

**这是什么：** Atlassian 为旗下产品（Jira, Confluence, Trello, Bitbucket 等）打造的统一设计系统，专注 B2B 协作场景。

**核心设计原则：**
1. **Bold（大胆）** — 清晰的视觉层次，大胆的设计决策
2. **Optimistic（乐观）** — 积极正面的用户体验
3. **Practical（务实）** — 功能优先，不过度装饰
4. **Team-first（团队优先）** — 为协作场景设计

**B2B 设计最佳实践（从 Atlassian 提炼）：**

| 实践 | 说明 |
|------|------|
| 信息密度可调 | 提供 Compact / Comfortable / Spacious 三种密度 |
| 权限感知 UI | 根据用户权限动态显示/隐藏操作 |
| 批量操作优先 | 列表场景必须支持多选+批量操作 |
| 上下文保持 | 侧栏/浮层编辑，避免页面跳转 |
| 渐进式披露 | 高级功能收纳在"更多"中，不干扰常规流程 |
| 实时协作提示 | 多人同时编辑时的冲突提示和在线状态 |
| 快捷键体系 | 高频操作配备键盘快捷键 |
| 空状态引导 | 空数据时提供创建引导，而非空白 |

**Token 特色：**
- 所有 Token 严格语义化，禁止直接使用色值
- 提供 `color.text.brand`、`color.background.warning.bold` 等语义命名
- 间距使用 `space.050`（4px）到 `space.600`（48px）的标准化体系

**适用场景：** B2B SaaS 产品、项目管理工具、协作型工作平台、需要处理复杂数据关系的应用。

### 2.5 Carbon Design System（IBM）

**这是什么：** IBM 开源的企业级设计系统，以严谨的网格系统和业界领先的数据可视化规范著称。

**设计原则：**
1. **人本主义（Human-centered）** — 以用户需求而非技术限制驱动
2. **多样包容（Inclusive）** — 无障碍和多元化深植系统
3. **统一生态（Unified ecosystem）** — IBM 全产品线一致体验

**2x Grid 系统（16 列）：**
```
Carbon 的网格基于 mini-unit（8px），采用 16 列系统：

┌─────────────────────────────────────────────┐
│  margin  │  16 列内容区（含 gutter）  │  margin  │
│          │  每列含 16px gutter          │          │
│          │  断点自适应列数               │          │
└─────────────────────────────────────────────┘

断点定义：
- sm:  320px  — 4 列,   margin 0
- md:  672px  — 8 列,   margin 16px
- lg:  1056px — 16 列,  margin 16px
- xl:  1312px — 16 列,  margin 16px
- max: 1584px — 16 列,  margin 24px

子网格（Subgrid）：
- Wide Grid:   16 列, gutter 32px（默认）
- Narrow Grid: 16 列, gutter 16px（紧凑布局）
- Condensed:   16 列, gutter 1px（数据密集型）
```

**数据可视化规范（Carbon Charts）：**

| 规范 | 说明 |
|------|------|
| 调色板 | 14 组分类色，每组 5 个色阶，确保色盲可辨识 |
| 比例 | 图表推荐宽高比 16:9 或 4:3 |
| 标注 | 数据标签优先级：直接标注 > 工具提示 > 图例 |
| 网格线 | 使用浅色虚线，不抢夺数据视觉权重 |
| 空状态 | 无数据时使用骨架屏占位，不留空白 |
| 加载 | 数据加载使用渐进式骨架屏 |
| 响应式 | 图表必须响应式，小屏幕降级为简化视图 |
| 无障碍 | 颜色+形状双编码，不仅靠颜色传达信息 |

**四层主题梯度：**
```
White  → 最亮（默认背景 #ffffff）
Gray 10 (G10) → 浅灰（背景 #f4f4f4）
Gray 90 (G90) → 深灰（背景 #262626）
Gray 100 (G100) → 最暗（背景 #161616）
```

**适用场景：** 企业级仪表盘、数据可视化平台、AI/ML 产品界面、需要严格网格规范的复杂应用。

### 2.6 Fluent UI（Microsoft）

**这是什么：** Microsoft 的跨平台设计系统（Fluent 2），覆盖 Windows、Web、iOS、Android、macOS，追求"无缝融入平台又保持品牌一致"。

**Fluent 2 设计语言核心：**
1. **依存性（Familiar）** — 用户在不同平台间无缝切换
2. **流动性（Fluid）** — 界面元素自然流动，响应设备特性
3. **聚焦性（Focused）** — 突出关键信息，减少视觉噪音

**跨平台一致性策略：**

```
                      ┌─ Windows (WinUI 3)
                      ├─ Web (React)
Fluent Design Token ──├─ iOS (SwiftUI)
     (统一 Token 层)   ├─ Android (Jetpack Compose)
                      ├─ macOS (AppKit / SwiftUI)
                      └─ Cross-platform (React Native)

策略：
- Token 层完全统一（色彩、间距、字体比例）
- 组件行为一致（交互逻辑、状态流转相同）
- 视觉细节适配平台（圆角、阴影、动效遵循原生平台规范）
```

**核心 Token 特色：**
- **Brand Ramp** — 品牌色 10 级渐变（Brand 10 ~ Brand 160），自动生成
- **Neutral Ramp** — 中性色精细渐变，含前景/背景/描边多用途
- **Compound Components** — 组件套娃组合模式（如 Menu = MenuTrigger + MenuList + MenuItem）

**适用场景：** 跨平台应用、Microsoft 生态集成、企业级办公协作工具、需要在 Windows/Web/Mobile 保持一致体验的产品。

---

## 3. 主题化架构

### 3.1 亮色 / 暗色主题切换实现

**这是什么：** 通过 CSS Variables + 类名切换的方案实现亮暗主题无缝切换，无需重载页面。

**为什么这样做：** CSS Variables 方案性能最优（浏览器原生支持，无 JS 运行时开销），兼容性好（支持所有现代浏览器），且与 Tailwind dark mode 完美配合。

#### 3.1.1 CSS Variables 完整定义

```css
/* ========================================
   theme-tokens.css
   亮色 / 暗色 主题 Token 定义
   ======================================== */

/* --- 亮色主题（默认） --- */
:root,
[data-theme="light"] {
  /* 品牌色 */
  --color-primary-50:  #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;

  /* 表面 */
  --color-bg-primary:    #FFFFFF;
  --color-bg-secondary:  #F9FAFB;
  --color-bg-tertiary:   #F3F4F6;
  --color-bg-elevated:   #FFFFFF;
  --color-bg-inverse:    #111827;

  /* 文字 */
  --color-text-primary:   #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary:  #9CA3AF;
  --color-text-inverse:   #FFFFFF;

  /* 边框 */
  --color-border-default: #E5E7EB;
  --color-border-strong:  #D1D5DB;
  --color-border-focus:   #3B82F6;

  /* 阴影 */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* 语义色 */
  --color-success:       #22C55E;
  --color-success-light: #DCFCE7;
  --color-warning:       #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-error:         #EF4444;
  --color-error-light:   #FEE2E2;
  --color-info:          #3B82F6;
  --color-info-light:    #DBEAFE;

  /* 遮罩 */
  --color-overlay: rgba(0, 0, 0, 0.5);
}

/* --- 暗色主题 --- */
[data-theme="dark"] {
  /* 品牌色（暗色模式下适度提亮，保证可读性） */
  --color-primary-50:  #172554;
  --color-primary-100: #1E3A8A;
  --color-primary-200: #1E40AF;
  --color-primary-300: #1D4ED8;
  --color-primary-400: #2563EB;
  --color-primary-500: #3B82F6;
  --color-primary-600: #60A5FA;
  --color-primary-700: #93C5FD;
  --color-primary-800: #BFDBFE;
  --color-primary-900: #DBEAFE;

  /* 表面（Carbon Gray 90/100 参考） */
  --color-bg-primary:    #0F172A;
  --color-bg-secondary:  #1E293B;
  --color-bg-tertiary:   #334155;
  --color-bg-elevated:   #1E293B;
  --color-bg-inverse:    #F8FAFC;

  /* 文字 */
  --color-text-primary:   #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-tertiary:  #64748B;
  --color-text-inverse:   #0F172A;

  /* 边框 */
  --color-border-default: #334155;
  --color-border-strong:  #475569;
  --color-border-focus:   #60A5FA;

  /* 阴影（暗色模式阴影加深） */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);

  /* 语义色（暗色模式稍调亮度） */
  --color-success:       #4ADE80;
  --color-success-light: #14532D;
  --color-warning:       #FBBF24;
  --color-warning-light: #78350F;
  --color-error:         #F87171;
  --color-error-light:   #7F1D1D;
  --color-info:          #60A5FA;
  --color-info-light:    #1E3A8A;

  /* 遮罩 */
  --color-overlay: rgba(0, 0, 0, 0.7);
}
```

#### 3.1.2 JavaScript 主题切换逻辑

```javascript
/**
 * theme-manager.js
 * 主题管理器 — 支持 light / dark / system 三种模式
 */

const THEME_STORAGE_KEY = 'user-theme-preference';

/**
 * 获取系统偏好主题
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * 应用主题到 DOM
 * @param {'light' | 'dark'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // 同步 Tailwind dark mode class（如果使用 class 策略）
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // 更新 meta theme-color（影响浏览器地址栏颜色）
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      theme === 'dark' ? '#0F172A' : '#FFFFFF'
    );
  }
}

/**
 * 设置主题偏好
 * @param {'light' | 'dark' | 'system'} preference
 */
function setTheme(preference) {
  localStorage.setItem(THEME_STORAGE_KEY, preference);

  const effectiveTheme =
    preference === 'system' ? getSystemTheme() : preference;
  applyTheme(effectiveTheme);
}

/**
 * 初始化主题（页面加载时调用）
 */
function initTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) || 'system';
  const effectiveTheme =
    stored === 'system' ? getSystemTheme() : stored;
  applyTheme(effectiveTheme);

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const current = localStorage.getItem(THEME_STORAGE_KEY);
      if (current === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
}

// 尽早初始化，避免闪屏
initTheme();
```

### 3.2 品牌化定制（Brand Token 覆盖）

**这是什么：** 通过覆盖 Token 变量实现品牌换肤，一套代码支持多个品牌。

```css
/* ========================================
   brand-override.css
   品牌 Token 覆盖层
   ======================================== */

/* --- 品牌 A：科技蓝 --- */
[data-brand="tech-blue"] {
  --color-primary-50:  #EFF6FF;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --radius-button:     var(--radius-md);
  --font-family-sans:  'Inter', var(--font-family-sans);
}

/* --- 品牌 B：活力橙 --- */
[data-brand="vibrant-orange"] {
  --color-primary-50:  #FFF7ED;
  --color-primary-500: #F97316;
  --color-primary-600: #EA580C;
  --color-primary-700: #C2410C;
  --radius-button:     var(--radius-full);  /* 药丸形按钮 */
  --font-family-sans:  'Poppins', var(--font-family-sans);
}

/* --- 品牌 C：优雅紫 --- */
[data-brand="elegant-purple"] {
  --color-primary-50:  #FAF5FF;
  --color-primary-500: #A855F7;
  --color-primary-600: #9333EA;
  --color-primary-700: #7E22CE;
  --radius-button:     var(--radius-none);  /* 直角按钮 */
  --font-family-sans:  'DM Sans', var(--font-family-sans);
}
```

### 3.3 React 主题切换组件

```tsx
// ThemeProvider.tsx — React 主题上下文

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  effectiveTheme: EffectiveTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'user-theme-preference';

function getSystemTheme(): EffectiveTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolveTheme(mode: ThemeMode): EffectiveTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || defaultMode;
  });

  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>(() =>
    resolveTheme(mode),
  );

  // 应用主题到 DOM
  useEffect(() => {
    const theme = resolveTheme(mode);
    setEffectiveTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [mode]);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'system') {
        const theme = getSystemTheme();
        setEffectiveTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mode]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(effectiveTheme === 'light' ? 'dark' : 'light');
  }, [effectiveTheme, setMode]);

  return (
    <ThemeContext.Provider value={{ mode, effectiveTheme, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 3.4 Vue 主题切换组合式函数

```vue
<!-- useTheme.ts — Vue 3 Composable -->
<script lang="ts">
// composables/useTheme.ts

import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';

type ThemeMode = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'user-theme-preference';

function getSystemTheme(): EffectiveTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// 全局状态（跨组件共享）
const mode = ref<ThemeMode>(
  (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'system'
);

export function useTheme() {
  const effectiveTheme = computed<EffectiveTheme>(() =>
    mode.value === 'system' ? getSystemTheme() : mode.value
  );

  // 同步到 DOM
  watchEffect(() => {
    const theme = effectiveTheme.value;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });

  // 监听系统偏好
  let mediaQuery: MediaQueryList;
  const handler = () => {
    // 触发 computed 重算
    if (mode.value === 'system') {
      // 强制触发响应式更新
      mode.value = 'system';
    }
  };

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handler);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handler);
  });

  function setMode(newMode: ThemeMode) {
    mode.value = newMode;
    localStorage.setItem(STORAGE_KEY, newMode);
  }

  function toggleTheme() {
    setMode(effectiveTheme.value === 'light' ? 'dark' : 'light');
  }

  return {
    mode,
    effectiveTheme,
    setMode,
    toggleTheme,
  };
}
</script>
```

```vue
<!-- ThemeToggle.vue — 主题切换按钮组件 -->
<template>
  <div class="theme-toggle" role="radiogroup" aria-label="选择主题">
    <button
      v-for="option in options"
      :key="option.value"
      :class="['theme-toggle__btn', { active: mode === option.value }]"
      :aria-checked="mode === option.value"
      role="radio"
      @click="setMode(option.value)"
    >
      <span class="theme-toggle__icon" v-html="option.icon" />
      <span class="theme-toggle__label">{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { mode, setMode } = useTheme();

const options = [
  { value: 'light' as const, label: '浅色', icon: '&#9728;' },
  { value: 'dark' as const,  label: '深色', icon: '&#9790;' },
  { value: 'system' as const, label: '跟随系统', icon: '&#9881;' },
];
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-lg);
}

.theme-toggle__btn {
  display: flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1-5) var(--space-3);
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 200ms ease;
}

.theme-toggle__btn:hover {
  color: var(--color-text-primary);
}

.theme-toggle__btn.active {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}
</style>
```

---

## 4. 无障碍（Accessibility）标准

### 4.1 WCAG 2.1 AA 必须满足的条件

**这是什么：** Web Content Accessibility Guidelines (WCAG) 2.1 是 W3C 发布的 Web 无障碍国际标准。AA 级别是行业基准，所有五大设计系统均以此为最低要求。

**为什么必须满足：** 法律合规（ADA、EAA）、用户覆盖面（全球 15% 人口有某种形式的残障）、SEO 加分、整体产品质量提升。

#### WCAG 2.1 AA 核心要求清单

| 原则 | 编号 | 要求 | 说明 |
|------|------|------|------|
| **可感知** | 1.1.1 | 非文本内容提供替代文字 | 所有 `<img>` 必须有 `alt`，装饰性图片用 `alt=""` |
| | 1.2.1 | 音频/视频提供字幕或文字稿 | 预录媒体必须有字幕 |
| | 1.3.1 | 信息与关系可通过代码确定 | 使用语义化 HTML（`<h1>-<h6>`, `<nav>`, `<main>` 等） |
| | 1.3.2 | 有意义的阅读顺序 | DOM 顺序与视觉顺序一致 |
| | 1.3.4 | 不限制内容方向 | 不锁定横屏或竖屏 |
| | 1.4.1 | 不仅靠颜色传达信息 | 错误状态要有图标+文字，不能只变红 |
| | 1.4.3 | 文本对比度至少 4.5:1 | 普通文本（< 18px 或 < 14px bold） |
| | 1.4.3 | 大文本对比度至少 3:1 | 大文本（>= 18px 或 >= 14px bold） |
| | 1.4.4 | 文本可放大到 200% 不丢失内容 | 使用 `rem` / `em` 而非 `px` 定义字体 |
| | 1.4.11 | UI 组件对比度至少 3:1 | 输入框边框、图标按钮等 |
| | 1.4.12 | 文本间距可自定义 | 不因 line-height/letter-spacing 调整而破坏布局 |
| **可操作** | 2.1.1 | 所有功能可通过键盘操作 | 无需鼠标即可完成所有操作 |
| | 2.1.2 | 无键盘陷阱 | Tab 不会困在某个组件中出不来 |
| | 2.4.1 | 提供跳过导航的机制 | "Skip to main content" 链接 |
| | 2.4.2 | 页面有描述性标题 | `<title>` 标签有意义 |
| | 2.4.3 | 焦点顺序有意义 | Tab 顺序符合逻辑 |
| | 2.4.6 | 标签和标题描述性 | 表单 label 准确描述用途 |
| | 2.4.7 | 焦点指示器可见 | 禁止 `outline: none` 除非有替代焦点样式 |
| | 2.5.3 | 可见标签匹配可访问名称 | 按钮文字与 `aria-label` 一致 |
| **可理解** | 3.1.1 | 页面语言可确定 | `<html lang="zh-CN">` |
| | 3.2.1 | 聚焦不引起上下文变化 | 焦点到达不自动跳转页面 |
| | 3.2.2 | 输入不引起意外上下文变化 | 选择下拉不自动提交表单 |
| | 3.3.1 | 输入错误有明确提示 | 错误信息指明具体问题 |
| | 3.3.2 | 输入有标签或说明 | 每个表单域有关联的 label |
| **健壮性** | 4.1.1 | HTML 标记正确 | 无重复 ID、标签正确闭合 |
| | 4.1.2 | 自定义组件有名称、角色、值 | 使用 ARIA 属性补充语义 |

### 4.2 颜色对比度详细要求

```
对比度计算公式：
(L1 + 0.05) / (L2 + 0.05)
其中 L1 是较亮颜色的相对亮度，L2 是较暗颜色的相对亮度

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
元素类型              │ AA 标准    │ AAA 标准
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
普通文本 (< 18px)     │ >= 4.5:1  │ >= 7:1
大文本 (>= 18px)      │ >= 3:1    │ >= 4.5:1
粗体文本 (>= 14px bold)│ >= 3:1    │ >= 4.5:1
UI 组件 & 图形         │ >= 3:1    │ —
非活动组件             │ 无要求    │ 无要求
纯装饰元素             │ 无要求    │ 无要求
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

推荐的安全色彩组合（亮色模式）：
- 正文文字：#111827 on #FFFFFF → 对比度 16.8:1 ✅
- 次要文字：#6B7280 on #FFFFFF → 对比度 5.0:1  ✅
- 占位文字：#9CA3AF on #FFFFFF → 对比度 2.9:1  ❌（需加深到 #6B7280）
- 链接文字：#2563EB on #FFFFFF → 对比度 6.3:1  ✅
- 按钮文字：#FFFFFF on #3B82F6 → 对比度 4.0:1  ⚠️（临界，建议用 600）
- 按钮文字：#FFFFFF on #2563EB → 对比度 6.3:1  ✅（推荐）
```

### 4.3 键盘导航规范

#### 4.3.1 全局导航键

| 按键 | 行为 |
|------|------|
| `Tab` | 向前移动焦点到下一个可聚焦元素 |
| `Shift + Tab` | 向后移动焦点到上一个可聚焦元素 |
| `Enter` / `Space` | 激活当前聚焦的按钮或链接 |
| `Escape` | 关闭当前浮层（Dialog, Dropdown, Popover） |
| `F6` | 在页面的 landmark 区域间切换 |

#### 4.3.2 组件级键盘规范

```
┌─────────────────────────────────────────────────────────────┐
│ Modal / Dialog                                               │
│ - 打开时焦点移至 Dialog 内第一个可聚焦元素                      │
│ - Tab 在 Dialog 内循环（焦点陷阱）                              │
│ - Escape 关闭                                                │
│ - 关闭后焦点返回触发器元素                                      │
├─────────────────────────────────────────────────────────────┤
│ Dropdown / Select                                            │
│ - Enter / Space 打开下拉                                     │
│ - 上下方向键导航选项                                           │
│ - Enter 选中当前项                                            │
│ - Escape 关闭下拉                                            │
│ - Home / End 跳到首项/末项                                    │
│ - 输入字符快速定位                                             │
├─────────────────────────────────────────────────────────────┤
│ Tabs 选项卡                                                  │
│ - Tab 聚焦到选项卡组                                          │
│ - 左右方向键在 Tab 间切换                                      │
│ - Enter / Space 激活当前 Tab（若非自动激活模式）                 │
│ - Home / End 跳到首个/末个 Tab                                │
├─────────────────────────────────────────────────────────────┤
│ Tree View 树形组件                                            │
│ - 上下方向键在节点间移动                                       │
│ - 右方向键展开/进入子节点                                      │
│ - 左方向键折叠/返回父节点                                      │
│ - Enter 激活当前节点                                          │
│ - * 展开所有同级节点                                           │
├─────────────────────────────────────────────────────────────┤
│ Data Grid / Table                                            │
│ - 方向键在单元格间移动                                         │
│ - Enter 编辑当前单元格                                        │
│ - Escape 取消编辑                                            │
│ - Ctrl + Home / End 跳到首行首列/末行末列                      │
│ - Page Up / Down 滚动翻页                                    │
└─────────────────────────────────────────────────────────────┘
```

#### 4.3.3 焦点样式规范

```css
/* ========================================
   Focus Styles — 焦点样式规范
   ======================================== */

/*
 * 原则：
 * 1. 永远不要使用 outline: none 而不提供替代焦点样式
 * 2. 焦点环必须有 >= 3:1 对比度
 * 3. 使用 :focus-visible 代替 :focus 以区分键盘和鼠标操作
 */

/* 全局焦点环重置 */
*:focus {
  outline: none;
}

/* 仅在键盘操作时显示焦点环 */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* 暗色背景上的焦点环 */
.dark-surface *:focus-visible,
[data-theme="dark"] *:focus-visible {
  outline-color: var(--color-primary-400);
}

/* 输入框焦点 — 使用 box-shadow 替代 outline 以支持圆角 */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: var(--shadow-focus-ring);
}

/* 按钮焦点 */
button:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Skip Link — 跳过导航 */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: top 200ms ease;
}

.skip-link:focus {
  top: 16px;
}
```

### 4.4 ARIA 属性使用指南

#### 4.4.1 ARIA 核心原则

```
第一法则：如果能用原生 HTML 实现，就不要用 ARIA。

<button> 比 <div role="button" tabindex="0"> 更好
<nav>    比 <div role="navigation"> 更好
<input type="checkbox"> 比 <div role="checkbox" aria-checked="true"> 更好
```

#### 4.4.2 常用 ARIA 属性速查

```html
<!-- ===== Landmark Roles（页面地标） ===== -->
<header role="banner">           <!-- 页头，通常自动识别 -->
<nav role="navigation">          <!-- 导航区 -->
<main role="main">               <!-- 主内容区 -->
<aside role="complementary">     <!-- 侧边栏 -->
<footer role="contentinfo">      <!-- 页脚 -->
<form role="search">             <!-- 搜索区域 -->

<!-- ===== Live Regions（动态通知） ===== -->
<!-- 用于通知屏幕阅读器内容更新 -->
<div aria-live="polite">         <!-- 等当前播报完成后通知 -->
<div aria-live="assertive">      <!-- 立即打断当前播报 -->
<div role="alert">               <!-- 等同 aria-live="assertive" -->
<div role="status">              <!-- 等同 aria-live="polite" -->

<!-- ===== Widget Attributes（组件属性） ===== -->

<!-- 展开/折叠 -->
<button aria-expanded="false" aria-controls="panel-1">
  展开详情
</button>
<div id="panel-1" hidden>
  详情内容...
</div>

<!-- 弹出层 -->
<button aria-haspopup="dialog" aria-expanded="false">
  打开对话框
</button>

<!-- 选中状态 -->
<div role="checkbox" aria-checked="true" tabindex="0">
  已勾选
</div>
<div role="checkbox" aria-checked="mixed" tabindex="0">
  部分勾选（三态）
</div>

<!-- 禁用状态 -->
<button aria-disabled="true">
  不可点击（仍可聚焦，屏幕阅读器可读取）
</button>

<!-- 当前页面/选项标记 -->
<a href="/home" aria-current="page">首页</a>
<li role="option" aria-selected="true">选项 A</li>

<!-- 描述与标注 -->
<input
  type="email"
  aria-label="邮箱地址"
  aria-describedby="email-help email-error"
/>
<p id="email-help">请输入有效的邮箱地址</p>
<p id="email-error" role="alert">邮箱格式不正确</p>

<!-- 加载状态 -->
<div aria-busy="true" aria-live="polite">
  正在加载数据...
</div>

<!-- 必填字段 -->
<input type="text" aria-required="true" />

<!-- 值范围 -->
<div
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-valuetext="50%"
  tabindex="0"
></div>
```

#### 4.4.3 常见 ARIA 模式组合

```html
<!-- ===== Modal Dialog ===== -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">确认删除</h2>
  <p id="dialog-desc">此操作不可撤销，确定要删除吗？</p>
  <button>取消</button>
  <button>确认删除</button>
</div>

<!-- ===== Tabs ===== -->
<div role="tablist" aria-label="项目设置">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">
    基本信息
  </button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
    高级设置
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  基本信息内容...
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  高级设置内容...
</div>

<!-- ===== Combobox / Autocomplete ===== -->
<div role="combobox" aria-expanded="true" aria-haspopup="listbox" aria-owns="listbox-1">
  <input
    type="text"
    aria-autocomplete="list"
    aria-controls="listbox-1"
    aria-activedescendant="option-2"
  />
</div>
<ul role="listbox" id="listbox-1">
  <li role="option" id="option-1">北京</li>
  <li role="option" id="option-2" aria-selected="true">上海</li>
  <li role="option" id="option-3">广州</li>
</ul>

<!-- ===== Breadcrumb ===== -->
<nav aria-label="面包屑导航">
  <ol role="list">
    <li><a href="/">首页</a></li>
    <li><a href="/projects">项目</a></li>
    <li><a href="/projects/123" aria-current="page">项目详情</a></li>
  </ol>
</nav>

<!-- ===== Toast / Notification ===== -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="toast"
>
  保存成功
</div>

<!-- ===== Progress Bar ===== -->
<div
  role="progressbar"
  aria-valuenow="65"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="文件上传进度"
>
  <div style="width: 65%"></div>
</div>
```

### 4.5 屏幕阅读器兼容性清单

| 检查项 | 方法 |
|--------|------|
| 页面标题有意义 | `<title>` 包含当前页面描述 |
| 语义化 HTML 结构 | 使用 `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` |
| 标题层级正确 | `<h1>` 到 `<h6>` 不跳级（不直接从 h1 到 h3） |
| 图片有替代文字 | 信息性图片用 `alt="描述"`，装饰性图片用 `alt=""` |
| 表单有关联标签 | `<label for="id">` 或 `aria-label` / `aria-labelledby` |
| 错误信息可读取 | 错误消息使用 `role="alert"` 或 `aria-live="assertive"` |
| 动态内容有通知 | 使用 `aria-live` 区域通知内容更新 |
| 链接文字有意义 | 避免"点击这里"，用"查看订单详情" |
| 表格有标题 | `<caption>` 或 `aria-label`，复杂表格用 `<th scope>` |
| 隐藏内容正确 | 视觉隐藏用 `.sr-only` class，完全隐藏用 `aria-hidden="true"` |
| 焦点管理 | Modal 打开/关闭正确移动焦点 |
| 语言声明 | `<html lang="zh-CN">` 且多语言内容用 `lang` 标注 |

```css
/* 视觉隐藏但屏幕阅读器可读的 class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 聚焦时恢复可见（用于 Skip Link 等） */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: inherit;
}
```

---

## 5. 设计系统搭建清单

### 5.1 从零搭建设计系统的步骤

**这是什么：** 一套经过验证的设计系统搭建路径，从最基础的 Token 到最终的可复用模板，共 5 个层级。

**为什么按这个顺序：** 每一层依赖前一层的输出，跳级搭建会导致后期大量返工。这是从 Material Design、Ant Design、Carbon 等成熟设计系统中提炼的共性路径。

```
Layer 0: 审计与策略
    ↓
Layer 1: Design Token（设计令牌）
    ↓
Layer 2: Foundation（设计基础）
    ↓
Layer 3: Components（组件库）
    ↓
Layer 4: Patterns（模式与组合）
    ↓
Layer 5: Templates（页面模板）
```

### 5.2 逐层详细清单

#### Layer 0: 审计与策略

```
□ 产品审计
  □ 收集所有现有界面截图
  □ 标注重复的 UI 模式
  □ 统计现有颜色值数量（通常企业项目有 50~200 个不同色值）
  □ 统计字体大小数量
  □ 标记不一致的间距和对齐

□ 技术审计
  □ 确定前端框架（React / Vue / Angular / 多框架）
  □ 确定 CSS 方案（CSS Modules / Tailwind / CSS-in-JS / SCSS）
  □ 确定组件分发方式（Monorepo / NPM 包 / 内部仓库）
  □ 确定浏览器和设备支持范围
  □ 确定无障碍合规等级（AA 或 AAA）

□ 团队对齐
  □ 确定设计系统团队（至少 1 设计 + 1 前端）
  □ 确定命名规范（BEM / Atomic / 自定义）
  □ 确定版本策略（Semver）
  □ 确定贡献流程（RFC → Review → Merge）
```

#### Layer 1: Design Token

```
□ 颜色 Token
  □ 定义品牌主色及 50~900 色阶
  □ 定义辅色（Secondary）及色阶
  □ 定义中性色（Neutral）及色阶
  □ 定义语义色（Success / Warning / Error / Info）
  □ 定义文字颜色层级（Primary / Secondary / Tertiary / Inverse）
  □ 定义背景颜色层级（Primary / Secondary / Tertiary / Elevated）
  □ 定义边框颜色层级（Default / Strong / Focus / Error）
  □ 定义交互状态色（Hover / Pressed / Selected / Disabled）

□ 间距 Token
  □ 确定基准网格（推荐 4px）
  □ 定义 space-1 到 space-32 全系列
  □ 定义语义间距别名（xs / sm / md / lg / xl / 2xl）
  □ 定义方向间距（inline / stack / inset）

□ 字体 Token
  □ 选定字体族（Sans / Serif / Mono）
  □ 定义字体大小阶梯（xs 到 7xl）
  □ 定义字重阶梯（light / regular / medium / semibold / bold）
  □ 定义行高阶梯（none / tight / normal / relaxed / loose）
  □ 定义字间距（tighter / tight / normal / wide / wider）
  □ 组合排版预设（Display / Heading / Body / Caption / Label）

□ 其他 Token
  □ 圆角（none / xs / sm / md / lg / xl / full）
  □ 阴影（xs / sm / md / lg / xl / 2xl / inner）
  □ 边框（宽度 / 样式 / 语义组合）
  □ 层级 Z-index（dropdown / sticky / modal / popover / tooltip / toast）
  □ 动效时长（fast / normal / slow）
  □ 缓动曲线（standard / decelerate / accelerate / productive / expressive）
  □ 透明度（hover / pressed / disabled / overlay）

□ Token 工程化
  □ 建立 Token JSON 源文件（推荐 Style Dictionary 格式）
  □ 配置 Token 转换管线（→ CSS Variables / → Tailwind Config / → JS Constants）
  □ 输出亮色 + 暗色两套 Token
  □ 编写 Token 使用文档
```

#### Layer 2: Foundation（设计基础）

```
□ 网格系统
  □ 定义列数（12 列或 16 列）
  □ 定义断点（sm / md / lg / xl / 2xl）
  □ 定义 Gutter 宽度
  □ 定义 Margin 规则
  □ 编写响应式布局工具类

□ 图标系统
  □ 选定图标风格（Outline / Filled / Dual-tone）
  □ 确定图标尺寸规范（16 / 20 / 24 / 32px）
  □ 建立图标命名规范
  □ 配置 SVG 优化和打包流程
  □ 创建图标使用组件（Icon Component）

□ 动效系统
  □ 定义动效原则（功能性 > 装饰性）
  □ 定义时长规范（微交互 100~200ms / 过渡 200~400ms / 复杂动画 300~500ms）
  □ 定义缓动函数（入场 / 退场 / 标准）
  □ 编写常用动效预设（fade / slide / scale / collapse）

□ 主题系统
  □ 实现 CSS Variables 亮暗切换
  □ 实现品牌 Token 覆盖机制
  □ 提供 ThemeProvider 组件（React / Vue）
  □ 验证主题切换无闪屏
  □ 编写主题扩展指南
```

#### Layer 3: Components（组件库）

按使用频率分优先级（P0 立即需要 → P2 按需添加）：

```
□ P0 — 核心组件（Day 1 必须）
  □ Button（按钮）：Primary / Secondary / Ghost / Danger / Disabled / Loading / Icon
  □ Input（输入框）：Text / Password / Number / Textarea / Clearable
  □ Select（选择器）：单选 / 多选 / 搜索 / 远程
  □ Checkbox（复选框）：默认 / 不确定态 / 禁用
  □ Radio（单选框）：默认 / 按钮样式 / 禁用
  □ Switch（开关）
  □ Icon（图标组件）
  □ Typography（排版组件）：Text / Title / Paragraph / Link

□ P0 — 布局组件
  □ Layout（布局）：Container / Row / Col / Flex / Grid
  □ Space（间距组件）
  □ Divider（分割线）

□ P1 — 常用组件
  □ Modal / Dialog（对话框）
  □ Drawer（抽屉）
  □ Dropdown（下拉菜单）
  □ Tooltip（文字提示）
  □ Popover（气泡卡片）
  □ Table（表格）：排序 / 筛选 / 分页 / 固定列
  □ Form（表单）：校验 / 布局 / 联动
  □ Tabs（选项卡）
  □ Breadcrumb（面包屑）
  □ Pagination（分页）
  □ Tag / Badge（标签 / 徽标）
  □ Avatar（头像）
  □ Card（卡片）
  □ Alert（警告提示）
  □ Message / Toast（全局消息）
  □ Notification（通知提醒）
  □ Loading / Spinner（加载）
  □ Skeleton（骨架屏）
  □ Empty State（空状态）

□ P2 — 高级组件
  □ DatePicker（日期选择）
  □ TimePicker（时间选择）
  □ Upload（上传）
  □ Tree（树形组件）
  □ Transfer（穿梭框）
  □ Cascader（级联选择）
  □ ColorPicker（颜色选择）
  □ Slider（滑块）
  □ Rate（评分）
  □ Steps（步骤条）
  □ Timeline（时间线）
  □ Carousel（轮播）
  □ Collapse / Accordion（折叠面板）
  □ Image（图片预览 / 懒加载）
  □ VirtualList（虚拟滚动列表）
```

**每个组件的交付标准：**
```
□ 功能实现
  □ 所有 Props / 变体 已实现
  □ 受控 + 非受控模式
  □ 事件回调完整
  □ 键盘导航可用
  □ ARIA 属性完整
  □ 主题 Token 接入
  □ 亮色 + 暗色适配

□ 代码质量
  □ TypeScript 类型完整
  □ Props 有默认值
  □ JSDoc / TSDoc 注释
  □ 单元测试覆盖率 >= 80%
  □ 无障碍测试通过

□ 文档
  □ 组件说明
  □ Props API 文档
  □ 交互示例（至少 3 个）
  □ Do / Don't 用法指南
```

#### Layer 4: Patterns（模式与组合）

```
□ 表单模式
  □ 登录/注册表单
  □ 搜索栏 + 筛选器
  □ 多步骤表单（Wizard）
  □ 行内编辑
  □ 批量编辑

□ 数据展示模式
  □ 列表 + 搜索 + 筛选 + 分页
  □ 卡片网格（Card Grid）
  □ 详情页 + 侧栏
  □ 数据对比（Side by Side）
  □ 空状态 + 引导

□ 导航模式
  □ 顶部导航栏
  □ 侧边导航栏
  □ 面包屑 + 返回
  □ 选项卡导航
  □ 分步导航

□ 反馈模式
  □ 表单验证与错误提示
  □ 操作确认（二次确认弹窗）
  □ 进度与加载
  □ 成功/失败状态页
  □ 通知推送
```

#### Layer 5: Templates（页面模板）

```
□ 布局模板
  □ 后台管理（Sidebar + Header + Content）
  □ 仪表盘（Dashboard Grid）
  □ 文档/内容 站点（Header + Content + TOC）
  □ 营销/落地页（Hero + Features + CTA）
  □ 设置页面（Tabs + Form）

□ 页面模板
  □ 登录/注册
  □ 列表页（Table / Card Grid）
  □ 详情页
  □ 编辑/创建页
  □ 404 / 500 错误页
  □ 空状态引导页
  □ 个人中心/设置页
```

### 5.3 文档结构推荐

```
design-system-docs/
├── getting-started/
│   ├── introduction.md        # 设计系统介绍与价值观
│   ├── installation.md        # 安装与配置指南
│   ├── quick-start.md         # 快速上手教程
│   └── contributing.md        # 贡献指南
│
├── foundations/
│   ├── design-tokens.md       # Token 体系说明
│   ├── colors.md              # 颜色系统
│   ├── typography.md          # 排版系统
│   ├── spacing.md             # 间距系统
│   ├── grid-layout.md         # 网格与布局
│   ├── iconography.md         # 图标规范
│   ├── motion.md              # 动效规范
│   └── theming.md             # 主题化指南
│
├── components/
│   ├── overview.md            # 组件总览与状态
│   ├── button.md              # 每个组件一个文档
│   ├── input.md
│   ├── ...
│   └── [component-name].md    # 统一结构：描述 → API → 示例 → Do/Don't
│
├── patterns/
│   ├── forms.md               # 表单模式
│   ├── data-display.md        # 数据展示模式
│   ├── navigation.md          # 导航模式
│   ├── feedback.md            # 反馈模式
│   └── empty-states.md        # 空状态设计
│
├── accessibility/
│   ├── overview.md            # 无障碍总览
│   ├── color-contrast.md      # 颜色对比度
│   ├── keyboard-nav.md        # 键盘导航
│   ├── screen-readers.md      # 屏幕阅读器
│   └── checklist.md           # 无障碍检查清单
│
├── resources/
│   ├── figma-library.md       # Figma 组件库链接
│   ├── design-tokens.json     # Token 源文件
│   └── changelog.md           # 更新日志
│
└── templates/
    ├── admin-layout.md        # 后台布局模板
    ├── dashboard.md           # 仪表盘模板
    ├── auth-pages.md          # 登录注册模板
    └── error-pages.md         # 错误页面模板
```

### 5.4 组件文档统一模板

每个组件文档建议遵循以下统一结构：

```markdown
# [ComponentName] 组件名

> 一句话描述组件的用途和核心价值。

## 何时使用
- 使用场景 1
- 使用场景 2
- 不适用场景（用 xxx 代替）

## 交互示例
[嵌入可交互 Demo，至少覆盖 3 种常用场景]

## API

### Props
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| ...  | ...  | ...    | ...  |

### Events
| 事件名 | 参数 | 说明 |
|--------|------|------|
| ...    | ...  | ...  |

### Slots (Vue) / Children (React)
| 名称 | 说明 |
|------|------|
| ...  | ...  |

## 设计规范
- 尺寸规范（含标注图）
- 颜色应用
- 间距规范
- 状态说明（Default / Hover / Active / Focus / Disabled / Error）

## 无障碍
- 键盘操作说明
- ARIA 属性说明
- 屏幕阅读器行为

## Do / Don't
✅ Do: 正确用法和示例
❌ Don't: 错误用法和说明

## 设计 Token
[该组件使用的 Token 列表]

## 更新日志
- v1.1.0: 新增 xxx 功能
- v1.0.0: 初始版本
```

---

## 附录：Token JSON 源文件格式参考（Style Dictionary）

```json
{
  "color": {
    "primary": {
      "50":  { "value": "#EFF6FF", "type": "color" },
      "100": { "value": "#DBEAFE", "type": "color" },
      "200": { "value": "#BFDBFE", "type": "color" },
      "300": { "value": "#93C5FD", "type": "color" },
      "400": { "value": "#60A5FA", "type": "color" },
      "500": { "value": "#3B82F6", "type": "color", "description": "Primary brand color" },
      "600": { "value": "#2563EB", "type": "color" },
      "700": { "value": "#1D4ED8", "type": "color" },
      "800": { "value": "#1E40AF", "type": "color" },
      "900": { "value": "#1E3A8A", "type": "color" }
    },
    "semantic": {
      "success": { "value": "{color.green.500}", "type": "color" },
      "warning": { "value": "{color.amber.500}", "type": "color" },
      "error":   { "value": "{color.red.500}", "type": "color" },
      "info":    { "value": "{color.primary.500}", "type": "color" }
    },
    "bg": {
      "primary":   { "value": "#FFFFFF", "type": "color", "darkValue": "#0F172A" },
      "secondary": { "value": "#F9FAFB", "type": "color", "darkValue": "#1E293B" },
      "tertiary":  { "value": "#F3F4F6", "type": "color", "darkValue": "#334155" }
    },
    "text": {
      "primary":   { "value": "#111827", "type": "color", "darkValue": "#F1F5F9" },
      "secondary": { "value": "#6B7280", "type": "color", "darkValue": "#94A3B8" },
      "tertiary":  { "value": "#9CA3AF", "type": "color", "darkValue": "#64748B" }
    }
  },
  "space": {
    "1":  { "value": "4px",  "type": "dimension" },
    "2":  { "value": "8px",  "type": "dimension" },
    "3":  { "value": "12px", "type": "dimension" },
    "4":  { "value": "16px", "type": "dimension" },
    "5":  { "value": "20px", "type": "dimension" },
    "6":  { "value": "24px", "type": "dimension" },
    "8":  { "value": "32px", "type": "dimension" },
    "10": { "value": "40px", "type": "dimension" },
    "12": { "value": "48px", "type": "dimension" },
    "16": { "value": "64px", "type": "dimension" }
  },
  "font": {
    "size": {
      "xs":   { "value": "0.75rem",  "type": "dimension" },
      "sm":   { "value": "0.875rem", "type": "dimension" },
      "base": { "value": "1rem",     "type": "dimension" },
      "lg":   { "value": "1.125rem", "type": "dimension" },
      "xl":   { "value": "1.25rem",  "type": "dimension" },
      "2xl":  { "value": "1.5rem",   "type": "dimension" },
      "3xl":  { "value": "1.875rem", "type": "dimension" },
      "4xl":  { "value": "2.25rem",  "type": "dimension" }
    },
    "weight": {
      "regular":  { "value": "400", "type": "fontWeight" },
      "medium":   { "value": "500", "type": "fontWeight" },
      "semibold": { "value": "600", "type": "fontWeight" },
      "bold":     { "value": "700", "type": "fontWeight" }
    },
    "lineHeight": {
      "none":    { "value": "1",     "type": "number" },
      "tight":   { "value": "1.25",  "type": "number" },
      "normal":  { "value": "1.5",   "type": "number" },
      "relaxed": { "value": "1.625", "type": "number" },
      "loose":   { "value": "2",     "type": "number" }
    }
  },
  "radius": {
    "none": { "value": "0px",    "type": "dimension" },
    "sm":   { "value": "4px",    "type": "dimension" },
    "md":   { "value": "6px",    "type": "dimension" },
    "lg":   { "value": "8px",    "type": "dimension" },
    "xl":   { "value": "12px",   "type": "dimension" },
    "full": { "value": "9999px", "type": "dimension" }
  },
  "shadow": {
    "sm": {
      "value": "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
      "type": "boxShadow"
    },
    "md": {
      "value": "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
      "type": "boxShadow"
    },
    "lg": {
      "value": "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      "type": "boxShadow"
    }
  }
}
```

---

> 本知识库最后更新：2026-03-24
> 本文档作为 Claude 设计系统知识的参考源，可直接引用其中的 Token 定义、架构模式、无障碍标准来输出专业的设计系统方案。
