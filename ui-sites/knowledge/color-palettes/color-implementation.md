## 四、CSS 变量模板

以下为通用 CSS Custom Properties 模板，可直接复制使用。

### 亮色主题模板（以 B01 稳重蓝调为例）

```css
:root {
  /* === 品牌色 === */
  --color-primary: #1E40AF;
  --color-primary-light: #3B82F6;
  --color-primary-dark: #1E3A8A;
  --color-primary-50: #EFF6FF;   /* 极浅底色 */
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-500: #3B82F6;  /* 标准 */
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;

  /* === 辅助色 === */
  --color-secondary: #3B82F6;
  --color-accent: #F59E0B;
  --color-accent-light: #FCD34D;
  --color-accent-dark: #D97706;

  /* === 语义色 === */
  --color-success: #059669;
  --color-success-light: #D1FAE5;
  --color-warning: #D97706;
  --color-warning-light: #FEF3C7;
  --color-error: #DC2626;
  --color-error-light: #FEE2E2;
  --color-info: #2563EB;
  --color-info-light: #DBEAFE;

  /* === 中性色 === */
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;       /* 卡片、弹窗背景 */
  --color-surface-variant: #F1F5F9; /* 次级卡片 */
  --color-border: #E2E8F0;
  --color-border-light: #F1F5F9;
  --color-divider: #E2E8F0;

  /* === 文字色 === */
  --color-text: #1E293B;          /* 正文 */
  --color-text-secondary: #64748B; /* 辅助文字 */
  --color-text-tertiary: #94A3B8;  /* 占位符、禁用 */
  --color-text-inverse: #FFFFFF;   /* 深色背景上的白字 */
  --color-text-on-primary: #FFFFFF; /* Primary 按钮上的文字 */

  /* === 阴影 === */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* === 圆角 === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* === 过渡 === */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### 暗色主题模板（以 D01 深空灰为例）

```css
[data-theme="dark"],
.dark {
  --color-primary: #818CF8;        /* 暗色模式下 Primary 提亮 */
  --color-primary-light: #A5B4FC;
  --color-primary-dark: #6366F1;
  --color-primary-50: #1E1B4B;
  --color-primary-100: #312E81;
  --color-primary-500: #6366F1;
  --color-primary-600: #818CF8;

  --color-secondary: #818CF8;
  --color-accent: #34D399;
  --color-accent-light: #065F46;

  --color-success: #34D399;
  --color-success-light: #064E3B;
  --color-warning: #FBBF24;
  --color-warning-light: #451A03;
  --color-error: #F87171;
  --color-error-light: #450A0A;
  --color-info: #60A5FA;
  --color-info-light: #172554;

  --color-background: #111827;
  --color-surface: #1F2937;
  --color-surface-variant: #374151;
  --color-border: #374151;
  --color-border-light: #4B5563;
  --color-divider: #374151;

  --color-text: #F9FAFB;
  --color-text-secondary: #9CA3AF;
  --color-text-tertiary: #6B7280;
  --color-text-inverse: #111827;
  --color-text-on-primary: #FFFFFF;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
}
```

### 渐变专用变量

```css
:root {
  /* 渐变方案 G01 - 极光蓝紫 */
  --gradient-aurora: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);

  /* 渐变方案 G02 - 日出暖光 */
  --gradient-sunrise: linear-gradient(135deg, #F97316 0%, #EC4899 100%);

  /* 渐变方案 G03 - 深海渐变 */
  --gradient-deepsea: linear-gradient(135deg, #0EA5E9 0%, #2DD4BF 100%);

  /* 渐变方案 G04 - 霓虹暗夜 */
  --gradient-neon: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%);

  /* 通用渐变应用 */
  --gradient-primary: var(--gradient-aurora);
  --gradient-hero: var(--gradient-aurora);      /* Hero Section 背景 */
  --gradient-card: var(--gradient-aurora);       /* 特色卡片 */
  --gradient-button: var(--gradient-aurora);     /* 渐变按钮 */
}
```

---

## 五、Tailwind CSS 配置示例

### tailwind.config.js — 完整配色扩展

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 或 'media'
  theme: {
    extend: {
      colors: {
        // === B01 稳重蓝调 ===
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // secondary
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',  // primary
          900: '#1E3A8A',
          950: '#172554',
        },
        accent: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',  // accent
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          variant: '#F1F5F9',
          dark: '#1F2937',
          'dark-variant': '#374151',
        },
        // 语义色
        success: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
          dark: '#064E3B',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          dark: '#451A03',
        },
        error: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          dark: '#450A0A',
        },
      },
      // 渐变快捷
      backgroundImage: {
        'gradient-aurora':  'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
        'gradient-deepsea': 'linear-gradient(135deg, #0EA5E9 0%, #2DD4BF 100%)',
        'gradient-neon':    'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
      },
      // 阴影
      boxShadow: {
        'card':    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'card-dark':    '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'card-dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
```

### 使用示例

```html
<!-- Primary 按钮 -->
<button class="bg-brand-800 hover:bg-brand-700 text-white px-6 py-2 rounded-lg transition-colors">
  立即开始
</button>

<!-- Accent CTA -->
<button class="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors">
  免费试用
</button>

<!-- 渐变 Hero -->
<section class="bg-gradient-aurora text-white py-20">
  <h1 class="text-4xl font-bold">欢迎使用</h1>
</section>

<!-- 卡片 -->
<div class="bg-surface shadow-card rounded-xl p-6 dark:bg-surface-dark dark:shadow-card-dark">
  <h3 class="text-brand-800 dark:text-brand-400 font-semibold">标题</h3>
  <p class="text-gray-600 dark:text-gray-400 mt-2">描述文字</p>
</div>

<!-- 语义状态 -->
<span class="bg-success-light text-success px-3 py-1 rounded-full text-sm">成功</span>
<span class="bg-error-light text-error px-3 py-1 rounded-full text-sm">错误</span>
<span class="bg-warning-light text-warning px-3 py-1 rounded-full text-sm">警告</span>
```

---

## 六、快速选色决策树

根据项目需求快速定位合适的配色方案：

```
项目是什么类型？
├─ 企业/B2B/金融
│   ├─ 需要极度稳重 → B02 (金融沉稳)
│   ├─ 标准企业蓝 → B01 (稳重蓝调)
│   └─ 灰色系专业 → B03 (商务灰蓝)
│
├─ 科技/开发者/AI
│   ├─ 暗色为主 → T02 (赛博霓虹)
│   ├─ 亮色为主 → T01 (极客蓝紫)
│   └─ 数据密集 → T03 (清冷科技)
│
├─ 电商/消费品
│   ├─ 食品/餐饮 → W01 (暖阳杏调)
│   ├─ 美妆/女性 → W02 (玫瑰柔雾)
│   ├─ 手工/家居 → W03 (大地暖棕)
│   ├─ 户外/环保 → N01 (森林清晨)
│   └─ 促销/活力 → V02 (日落橙红)
│
├─ 内容/博客/Portfolio
│   ├─ 极简黑白 → M01 (纯净灰白)
│   ├─ 文艺暖调 → M02 (暖灰奶油)
│   └─ 技术文档 → M03 (冷调灰蓝)
│
├─ 暗色主题需求
│   ├─ 代码/开发 → D01 (深空灰)
│   ├─ 奢侈/高端 → D02 (暗夜金)
│   ├─ 金融数据 → D03 (暗色翠调)
│   └─ 娱乐/游戏 → D04 (暗紫星空)
│
├─ 需要渐变效果
│   ├─ AI/创意 → G01 (极光蓝紫)
│   ├─ 社交/活力 → G02 (日出暖光)
│   ├─ 健康/自然 → G03 (深海渐变)
│   └─ 电竞/潮流 → G04 (霓虹暗夜)
│
└─ 儿童/教育/社交
    ├─ 活泼多彩 → V01 (彩虹糖果)
    ├─ 运动活力 → V03 (电光蓝绿)
    └─ 自然清新 → N03 (春日花园)
```

---

## 附录：配色方案速查索引

| 编号 | 名称 | 风格 | Primary | Background | 适用场景 |
|------|------|------|---------|------------|---------|
| B01 | 稳重蓝调 | 企业商务 | `#1E40AF` | `#F8FAFC` | 企业官网、SaaS 后台 |
| B02 | 金融沉稳 | 企业商务 | `#1B3A5C` | `#FAFBFC` | 银行、投资理财 |
| B03 | 商务灰蓝 | 企业商务 | `#475569` | `#FFFFFF` | 律所、咨询、ERP |
| T01 | 极客蓝紫 | 科技现代 | `#4F46E5` | `#F5F3FF` | AI 产品、开发者工具 |
| T02 | 赛博霓虹 | 科技现代 | `#8B5CF6` | `#0F0E17` | 游戏、Web3、加密 |
| T03 | 清冷科技 | 科技现代 | `#0284C7` | `#F0F9FF` | 云平台、监控 |
| N01 | 森林清晨 | 清新自然 | `#166534` | `#F0FDF4` | 环保、有机食品 |
| N02 | 海风轻拂 | 清新自然 | `#0D9488` | `#F0FDFA` | 旅游、度假 |
| N03 | 春日花园 | 清新自然 | `#65A30D` | `#FEFCE8` | 花店、母婴 |
| W01 | 暖阳杏调 | 温暖柔和 | `#EA580C` | `#FFF7ED` | 餐饮、咖啡馆 |
| W02 | 玫瑰柔雾 | 温暖柔和 | `#BE185D` | `#FFF1F2` | 美妆、婚庆 |
| W03 | 大地暖棕 | 温暖柔和 | `#92400E` | `#FFFBEB` | 咖啡、手工艺 |
| D01 | 深空灰 | 暗色高级 | `#6366F1` | `#111827` | 代码编辑器、音乐 |
| D02 | 暗夜金 | 暗色高级 | `#D97706` | `#18181B` | 奢侈品、高端餐厅 |
| D03 | 暗色翠调 | 暗色高级 | `#10B981` | `#0C1222` | FinTech、股票交易 |
| D04 | 暗紫星空 | 暗色高级 | `#A855F7` | `#1A1025` | 音乐流媒体、NFT |
| V01 | 彩虹糖果 | 活力明亮 | `#7C3AED` | `#FFFFFF` | 儿童教育、社交 |
| V02 | 日落橙红 | 活力明亮 | `#DC2626` | `#FFFBEB` | 外卖、促销 |
| V03 | 电光蓝绿 | 活力明亮 | `#0891B2` | `#ECFEFF` | 运动、电竞 |
| M01 | 纯净灰白 | 极简中性 | `#111827` | `#FFFFFF` | Portfolio、摄影 |
| M02 | 暖灰奶油 | 极简中性 | `#292524` | `#FAFAF9` | 杂志、文学博客 |
| M03 | 冷调灰蓝 | 极简中性 | `#334155` | `#F8FAFC` | 技术文档、设计系统 |
| G01 | 极光蓝紫 | 渐变趋势 | `#6366F1` | `#FAFAFE` | AI Landing Page |
| G02 | 日出暖光 | 渐变趋势 | `#F97316` | `#FFFFFF` | 社交媒体、活动页 |
| G03 | 深海渐变 | 渐变趋势 | `#0EA5E9` | `#F0F9FF` | 健康科技、冥想 |
| G04 | 霓虹暗夜 | 渐变趋势 | `#EC4899` | `#0A0A0A` | 电竞、潮牌 |

---

> 使用建议：选定方案后，复制对应的 CSS 变量模板，将 hex 值替换为目标方案的颜色即可快速启动项目。配合 Tailwind 配置可实现更高效的开发体验。
