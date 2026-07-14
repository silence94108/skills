# Landing Page 设计模式知识库

> 📦 来源：[Lapa Ninja](https://www.lapa.ninja) · [LandingFolio](https://www.landingfolio.com) · [Landbook](https://land-book.com) · [One Page Love](https://onepagelove.com) · [SaaS Landing Page](https://saaslandingpage.com) · [Awwwards](https://www.awwwards.com) · [Page Flows](https://pageflows.com)

---

## 一、核心区块设计模式

---

### 1.1 Header / Navigation

**变体 A：透明导航（覆盖在 Hero 上）**

```html
<header class="absolute top-0 left-0 right-0 z-50">
  <nav class="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
    <a href="/" class="text-xl font-bold text-white">Logo</a>
    <div class="hidden md:flex items-center gap-8">
      <a href="#features" class="text-sm text-white/80 hover:text-white transition-colors">功能</a>
      <a href="#pricing" class="text-sm text-white/80 hover:text-white transition-colors">定价</a>
      <a href="#faq" class="text-sm text-white/80 hover:text-white transition-colors">FAQ</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="/login" class="text-sm text-white/80 hover:text-white">登录</a>
      <a href="/signup" class="h-9 px-4 inline-flex items-center text-sm font-medium
        text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors">
        免费试用
      </a>
    </div>
  </nav>
</header>
```

**变体 B：固定导航（滚动后有背景）**

```html
<header class="sticky top-0 z-50 w-full border-b border-transparent
  backdrop-blur-md transition-all duration-300
  [&.scrolled]:bg-white/90 [&.scrolled]:border-gray-200 [&.scrolled]:shadow-sm">
  <nav class="flex items-center justify-between max-w-7xl mx-auto px-6 h-16">
    <a href="/" class="text-xl font-bold text-gray-900">Logo</a>
    <div class="hidden md:flex items-center gap-8">
      <a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">功能</a>
      <a href="#" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">定价</a>
    </div>
    <a href="/signup" class="h-9 px-4 inline-flex items-center text-sm font-medium
      text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
      开始使用
    </a>
  </nav>
</header>
```

---

### 1.2 Hero Section

**变体 A：居中英雄（最经典）**

```
┌─────────────────────────────────┐
│        [小标签/徽章]              │
│                                 │
│    大标题 — 一句话价值主张          │
│    副标题 — 简要描述产品价值         │
│                                 │
│    [主CTA按钮]   [次CTA按钮]      │
│                                 │
│       [产品截图/视频预览]           │
│                                 │
└─────────────────────────────────┘
```

```html
<section class="relative pt-32 pb-20 overflow-hidden">
  <!-- 背景装饰 -->
  <div class="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>

  <div class="relative max-w-5xl mx-auto px-6 text-center">
    <!-- 小标签 -->
    <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm
      text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
      <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
      全新 2.0 版本已发布
    </div>

    <!-- 主标题 -->
    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
      让你的团队协作
      <span class="text-blue-600">更高效</span>
    </h1>

    <!-- 副标题 -->
    <p class="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      一站式项目管理工具，帮助团队更好地规划、跟踪和交付项目。
      被全球 10,000+ 团队信赖使用。
    </p>

    <!-- CTA 按钮组 -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
      <a href="/signup" class="h-12 px-8 inline-flex items-center text-base font-medium
        text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-600/25
        hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30
        transition-all duration-200">
        免费开始使用
        <svg class="ml-2 w-4 h-4"><!-- arrow right --></svg>
      </a>
      <a href="/demo" class="h-12 px-8 inline-flex items-center text-base font-medium
        text-gray-700 bg-white border border-gray-300 rounded-lg
        hover:bg-gray-50 transition-colors">
        <svg class="mr-2 w-5 h-5"><!-- play icon --></svg>
        观看演示
      </a>
    </div>

    <!-- 信任信号 -->
    <p class="mt-8 text-sm text-gray-500">
      无需信用卡 · 免费 14 天试用 · 随时取消
    </p>

    <!-- 产品截图 -->
    <div class="mt-16 rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
      <img src="/screenshot.png" alt="产品截图" class="w-full" />
    </div>
  </div>
</section>
```

**变体 B：左文右图**

```html
<section class="pt-32 pb-20">
  <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    <!-- 左侧文字 -->
    <div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        用 AI 自动化<br/>你的工作流
      </h1>
      <p class="mt-6 text-lg text-gray-600 leading-relaxed">
        智能识别重复任务，一键生成自动化流程，节省 80% 手动操作时间。
      </p>
      <div class="flex items-center gap-4 mt-8">
        <a href="/signup" class="h-12 px-6 inline-flex items-center font-medium
          text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          免费试用
        </a>
        <a href="/demo" class="text-blue-600 hover:text-blue-700 font-medium">
          了解更多 →
        </a>
      </div>
      <!-- Logo 墙 -->
      <div class="mt-12">
        <p class="text-sm text-gray-400 mb-4">深受知名企业信赖</p>
        <div class="flex items-center gap-6 opacity-50 grayscale">
          <!-- client logos -->
        </div>
      </div>
    </div>

    <!-- 右侧图片 -->
    <div class="relative">
      <img src="/hero-image.png" alt="" class="w-full rounded-lg shadow-xl" />
    </div>
  </div>
</section>
```

**变体 C：渐变背景**

```html
<section class="relative min-h-screen flex items-center
  bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
  <!-- 噪点纹理叠加 -->
  <div class="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
  <div class="relative max-w-4xl mx-auto px-6 text-center">
    <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight">
      下一代设计工具
    </h1>
    <p class="mt-6 text-xl text-white/70 max-w-2xl mx-auto">
      为现代设计团队打造的协作平台
    </p>
    <a href="/signup" class="mt-10 inline-flex h-14 px-8 items-center text-lg font-medium
      text-indigo-900 bg-white rounded-full
      hover:bg-gray-100 transition-colors shadow-xl">
      立即体验
    </a>
  </div>
</section>
```

---

### 1.3 Feature Section

**变体 A：三列图标网格**

```html
<section class="py-20">
  <div class="max-w-7xl mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold text-gray-900">为什么选择我们</h2>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        一站式解决方案，覆盖产品全生命周期
      </p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Feature Card -->
      <div class="p-6 rounded-xl border border-gray-200 hover:border-blue-200
        hover:shadow-md transition-all duration-200">
        <div class="w-12 h-12 flex items-center justify-center rounded-lg
          bg-blue-50 text-blue-600 mb-4">
          <svg class="w-6 h-6"><!-- icon --></svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">实时协作</h3>
        <p class="mt-2 text-sm text-gray-600 leading-relaxed">
          多人同时编辑，实时同步变更，告别版本冲突。
        </p>
      </div>
      <!-- 重复 2 个卡片... -->
    </div>
  </div>
</section>
```

**变体 B：交替左右布局**

```html
<section class="py-20 space-y-32">
  <!-- Feature 1: 左文右图 -->
  <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    <div>
      <span class="text-sm font-medium text-blue-600">智能分析</span>
      <h3 class="mt-2 text-2xl font-bold text-gray-900">数据驱动的决策</h3>
      <p class="mt-4 text-gray-600 leading-relaxed">
        实时仪表盘，自动生成报告，让数据说话。
      </p>
      <ul class="mt-6 space-y-3">
        <li class="flex items-center gap-3 text-sm text-gray-700">
          <svg class="w-5 h-5 text-green-500 flex-shrink-0"><!-- check --></svg>
          自定义仪表盘
        </li>
        <li class="flex items-center gap-3 text-sm text-gray-700">
          <svg class="w-5 h-5 text-green-500 flex-shrink-0"><!-- check --></svg>
          自动化报告生成
        </li>
      </ul>
    </div>
    <div class="rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <img src="/feature-1.png" alt="" class="w-full" />
    </div>
  </div>

  <!-- Feature 2: 右文左图（反向） -->
  <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    <div class="order-2 md:order-1 rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <img src="/feature-2.png" alt="" class="w-full" />
    </div>
    <div class="order-1 md:order-2">
      <span class="text-sm font-medium text-purple-600">自动化</span>
      <h3 class="mt-2 text-2xl font-bold text-gray-900">一键自动化流程</h3>
      <p class="mt-4 text-gray-600 leading-relaxed">内容描述...</p>
    </div>
  </div>
</section>
```

---

### 1.4 Social Proof / Testimonials

**Logo 墙**

```html
<section class="py-16 border-y border-gray-100">
  <div class="max-w-7xl mx-auto px-6">
    <p class="text-center text-sm text-gray-400 mb-8">被全球领先企业信赖</p>
    <div class="flex items-center justify-center flex-wrap gap-x-12 gap-y-6
      opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
      <!-- 5-8 个 logo -->
      <img src="/logo1.svg" alt="Company 1" class="h-8" />
      <img src="/logo2.svg" alt="Company 2" class="h-8" />
    </div>
  </div>
</section>
```

**推荐卡片**

```html
<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-16">用户怎么说</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <!-- 星级 -->
        <div class="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
        <!-- 引言 -->
        <p class="text-gray-700 leading-relaxed">
          "使用这个产品后，我们团队的效率提升了 40%，强烈推荐！"
        </p>
        <!-- 用户信息 -->
        <div class="flex items-center gap-3 mt-6">
          <img class="w-10 h-10 rounded-full" src="/avatar.jpg" alt="" />
          <div>
            <p class="text-sm font-medium text-gray-900">张三</p>
            <p class="text-xs text-gray-500">某科技公司 CTO</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**数据统计**

```html
<section class="py-16">
  <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <div>
      <p class="text-4xl font-bold text-gray-900">10K+</p>
      <p class="mt-1 text-sm text-gray-500">活跃用户</p>
    </div>
    <div>
      <p class="text-4xl font-bold text-gray-900">99.9%</p>
      <p class="mt-1 text-sm text-gray-500">在线时间</p>
    </div>
    <div>
      <p class="text-4xl font-bold text-gray-900">50+</p>
      <p class="mt-1 text-sm text-gray-500">国家地区</p>
    </div>
    <div>
      <p class="text-4xl font-bold text-gray-900">4.9</p>
      <p class="mt-1 text-sm text-gray-500">用户评分</p>
    </div>
  </div>
</section>
```

---

### 1.5 Pricing Section

```html
<section class="py-20">
  <div class="max-w-5xl mx-auto px-6">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900">简单透明的定价</h2>
      <p class="mt-4 text-gray-600">选择适合你的方案，随时升级或降级</p>
      <!-- 月/年切换 -->
      <div class="inline-flex items-center gap-3 mt-6 p-1 bg-gray-100 rounded-full">
        <button class="px-4 py-1.5 text-sm font-medium text-white bg-gray-900
          rounded-full">月付</button>
        <button class="px-4 py-1.5 text-sm font-medium text-gray-600
          hover:text-gray-900 rounded-full">年付
          <span class="text-xs text-green-600 ml-1">省 20%</span>
        </button>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Free -->
      <div class="p-8 bg-white rounded-2xl border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">免费版</h3>
        <p class="mt-2 text-sm text-gray-500">适合个人和小项目</p>
        <p class="mt-6"><span class="text-4xl font-bold text-gray-900">¥0</span>
          <span class="text-gray-500">/月</span></p>
        <a href="/signup" class="mt-6 w-full h-10 inline-flex items-center justify-center
          text-sm font-medium text-gray-700 border border-gray-300 rounded-lg
          hover:bg-gray-50 transition-colors">开始使用</a>
        <ul class="mt-8 space-y-3">
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-green-500"><!-- check --></svg>最多 3 个项目</li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-green-500"><!-- check --></svg>1GB 存储</li>
        </ul>
      </div>

      <!-- Pro（推荐高亮） -->
      <div class="relative p-8 bg-blue-600 rounded-2xl text-white shadow-xl
        shadow-blue-600/25 scale-105">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1
          text-xs font-medium bg-yellow-400 text-yellow-900 rounded-full">最受欢迎</div>
        <h3 class="text-lg font-semibold">专业版</h3>
        <p class="mt-2 text-sm text-blue-200">适合成长型团队</p>
        <p class="mt-6"><span class="text-4xl font-bold">¥99</span>
          <span class="text-blue-200">/月</span></p>
        <a href="/signup?plan=pro" class="mt-6 w-full h-10 inline-flex items-center
          justify-center text-sm font-medium text-blue-600 bg-white rounded-lg
          hover:bg-blue-50 transition-colors">立即升级</a>
        <ul class="mt-8 space-y-3">
          <li class="flex items-center gap-2 text-sm text-blue-100">
            <svg class="w-4 h-4 text-blue-300"><!-- check --></svg>无限项目</li>
          <li class="flex items-center gap-2 text-sm text-blue-100">
            <svg class="w-4 h-4 text-blue-300"><!-- check --></svg>100GB 存储</li>
          <li class="flex items-center gap-2 text-sm text-blue-100">
            <svg class="w-4 h-4 text-blue-300"><!-- check --></svg>优先支持</li>
        </ul>
      </div>

      <!-- Enterprise -->
      <div class="p-8 bg-white rounded-2xl border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">企业版</h3>
        <p class="mt-2 text-sm text-gray-500">适合大型组织</p>
        <p class="mt-6"><span class="text-4xl font-bold text-gray-900">定制</span></p>
        <a href="/contact" class="mt-6 w-full h-10 inline-flex items-center justify-center
          text-sm font-medium text-gray-700 border border-gray-300 rounded-lg
          hover:bg-gray-50 transition-colors">联系销售</a>
        <ul class="mt-8 space-y-3">
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-green-500"><!-- check --></svg>包含专业版全部功能</li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-green-500"><!-- check --></svg>SSO / SAML</li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4 text-green-500"><!-- check --></svg>专属客户经理</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

---

### 1.6 FAQ Section

```html
<section class="py-20">
  <div class="max-w-3xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">常见问题</h2>
    <div class="space-y-4">
      <!-- FAQ Item（手风琴） -->
      <details class="group p-6 bg-white rounded-xl border border-gray-200
        [&[open]]:shadow-sm transition-shadow">
        <summary class="flex items-center justify-between cursor-pointer
          text-base font-medium text-gray-900 list-none">
          免费试用期过后会自动扣费吗？
          <svg class="w-5 h-5 text-gray-400 transition-transform duration-200
            group-open:rotate-180"><!-- chevron down --></svg>
        </summary>
        <p class="mt-4 text-sm text-gray-600 leading-relaxed">
          不会。免费试用期结束后，你的账户会自动降级为免费版，
          不会产生任何费用。你可以随时选择升级到付费版。
        </p>
      </details>
      <!-- 重复更多 FAQ 项... -->
    </div>
  </div>
</section>
```

---

### 1.7 CTA Section

```html
<!-- 全宽渐变 CTA -->
<section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold text-white">准备好开始了吗？</h2>
    <p class="mt-4 text-lg text-blue-100">
      加入 10,000+ 团队，开启高效协作之旅
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      <a href="/signup" class="h-12 px-8 inline-flex items-center font-medium
        text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-colors
        shadow-lg">
        免费开始使用
      </a>
      <a href="/contact" class="h-12 px-8 inline-flex items-center font-medium
        text-white border border-white/30 rounded-lg
        hover:bg-white/10 transition-colors">
        联系销售团队
      </a>
    </div>
  </div>
</section>
```

---

### 1.8 Footer

```html
<footer class="bg-gray-900 pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
      <!-- 品牌列 -->
      <div class="col-span-2 md:col-span-2">
        <a href="/" class="text-xl font-bold text-white">Logo</a>
        <p class="mt-4 text-sm text-gray-400 max-w-xs leading-relaxed">
          让团队协作更高效的一站式项目管理工具。
        </p>
      </div>
      <!-- 产品 -->
      <div>
        <h4 class="text-sm font-semibold text-white mb-4">产品</h4>
        <ul class="space-y-3">
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">功能</a></li>
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">定价</a></li>
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">更新日志</a></li>
        </ul>
      </div>
      <!-- 公司 -->
      <div>
        <h4 class="text-sm font-semibold text-white mb-4">公司</h4>
        <ul class="space-y-3">
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">关于我们</a></li>
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">博客</a></li>
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">加入我们</a></li>
        </ul>
      </div>
      <!-- 支持 -->
      <div>
        <h4 class="text-sm font-semibold text-white mb-4">支持</h4>
        <ul class="space-y-3">
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">帮助中心</a></li>
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">隐私政策</a></li>
          <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors">服务条款</a></li>
        </ul>
      </div>
    </div>

    <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row
      items-center justify-between gap-4">
      <p class="text-sm text-gray-500">&copy; 2026 Company. All rights reserved.</p>
      <div class="flex items-center gap-4">
        <a href="#" class="text-gray-400 hover:text-white"><svg class="w-5 h-5"><!-- twitter --></svg></a>
        <a href="#" class="text-gray-400 hover:text-white"><svg class="w-5 h-5"><!-- github --></svg></a>
      </div>
    </div>
  </div>
</footer>
```

---

## 二、行业 Landing Page 模板

### 2.1 SaaS 产品页

**推荐区块顺序**：Header → Hero（居中） → Logo 墙 → 功能网格 → 交替功能详情 → 数据统计 → 推荐卡片 → 定价 → FAQ → CTA → Footer

**设计要点**：
- Hero 放产品截图，直接展示界面
- 强调免费试用、无需信用卡
- 定价方案对比清晰，突出推荐方案
- 至少 3 条用户推荐

### 2.2 移动 App 推广页

**推荐区块顺序**：Header → Hero（手机模型展示） → 功能列表 → 截图轮播 → 用户评价 → 下载 CTA → Footer

**设计要点**：
- Hero 展示手机模型 + App 界面
- CTA 用 App Store / Google Play 下载按钮
- 功能展示配合手机截图
- 评价引用 App Store 真实评论

### 2.3 个人 Portfolio

**推荐区块顺序**：Header（简约） → Hero（姓名+职位+一句话介绍） → 项目展示网格 → 技能标签 → 关于我 → 联系方式 → Footer

**设计要点**：
- 个性化设计风格，展示设计品味
- 项目用卡片展示，hover 显示详情
- 联系方式简洁直接
- 可加暗色模式彰显技术能力

### 2.4 活动 / Event 页面

**推荐区块顺序**：Header → Hero（倒计时+日期地点） → 嘉宾/演讲者 → 日程安排 → 赞助商 Logo → 报名 CTA → FAQ → Footer

**设计要点**：
- 首屏显示日期、地点、倒计时
- 嘉宾照片 + 简介增加吸引力
- 日程用时间线或表格展示
- 报名按钮全页面多次出现

### 2.5 电商产品页

**推荐区块顺序**：Header → Hero（产品大图+卖点） → 特色功能 → 产品对比 → 用户评价 → 购买 CTA → FAQ → Footer

**设计要点**：
- 产品图片高清、多角度
- 价格突出显示
- 对比表格帮助决策
- 包含退款保证、发货信息等信任信号

### 2.6 开源项目页

**推荐区块顺序**：Header → Hero（项目名+一句话描述+Star数） → 安装代码块 → 功能亮点 → 代码示例 → Star 增长图 → 贡献者头像 → Sponsor CTA → Footer

**设计要点**：
- 首屏放 `npm install` 或 `git clone` 命令
- 代码示例用语法高亮
- 显示 GitHub Star 数和贡献者
- CTA 引导去 GitHub 仓库

---

## 三、转化率优化（CRO）原则

### 3.1 首屏三要素

| 要素 | 说明 | 示例 |
|------|------|------|
| 价值主张 | 用一句话说清产品为用户解决什么问题 | "让团队协作效率提升 40%" |
| CTA | 明确、具体的行动号召 | "免费开始使用"而非"了解更多" |
| 信任信号 | 降低用户决策门槛 | "无需信用卡 · 14天免费 · 10K+用户" |

### 3.2 CTA 按钮设计最佳实践

- **颜色**：与页面背景形成强对比，通常用品牌主色
- **文案**：用动词开头（"开始"、"获取"、"下载"），避免"提交"、"确认"
- **尺寸**：高度 44-56px，比普通按钮大 20-40%
- **位置**：首屏可见 + 页面底部重复
- **辅助文字**：按钮下方加"无需信用卡"等低承诺文案

### 3.3 视觉引导原则

- 使用 F 型或 Z 型阅读模式组织内容
- 通过大小、颜色、空间创建视觉层次
- 箭头、视线方向引导注意力到 CTA
- 每个 Section 只有一个核心信息

### 3.4 减少摩擦的表单设计

- 表单字段越少越好（注册只要邮箱+密码）
- 支持社交账号登录（Google/GitHub 一键注册）
- 实时验证，不要提交后才报错
- 进度条展示完成度（多步表单）

---

## 四、响应式适配建议

| 断点 | Hero | 功能网格 | 定价 | 推荐卡片 |
|------|------|---------|------|---------|
| Mobile (< 640px) | 单列，图片在文字下方 | 单列堆叠 | 单列滑动 | 单列堆叠 |
| Tablet (640-1024px) | 左右布局或单列 | 2 列 | 2-3 列 | 2 列 |
| Desktop (> 1024px) | 左右布局 | 3 列 | 3 列并排 | 3 列 |

**移动端关键调整**：
- Hero 按钮改为全宽
- Logo 墙改为单行滚动
- 定价卡片改为横向滑动或折叠
- FAQ 默认全部折叠
- 导航收起为 Hamburger Menu

---

## 五、更多 Hero 变体

> 参考来源：animation.md · color-palettes.md

### 5.1 变体 D：视频背景 Hero

```html
<section class="relative min-h-screen flex items-center overflow-hidden">
  <!-- 视频背景 -->
  <video autoplay muted loop playsinline
    class="absolute inset-0 w-full h-full object-cover">
    <source src="/hero-bg.mp4" type="video/mp4" />
  </video>
  <!-- 暗色遮罩 -->
  <div class="absolute inset-0 bg-black/60"></div>

  <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
    <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight">
      让创意变为现实
    </h1>
    <p class="mt-6 text-xl text-white/80 max-w-2xl mx-auto">
      专业的视频制作工具，从拍摄到发布一站搞定
    </p>
    <div class="flex items-center justify-center gap-4 mt-10">
      <a href="/signup" class="h-14 px-8 inline-flex items-center text-lg font-medium
        text-black bg-white rounded-full hover:bg-gray-100
        shadow-xl transition-all">
        开始创作
      </a>
      <button class="w-14 h-14 inline-flex items-center justify-center
        bg-white/20 backdrop-blur-sm rounded-full
        hover:bg-white/30 transition-colors border border-white/30">
        <svg class="w-6 h-6 text-white ml-1"><!-- play icon --></svg>
      </button>
    </div>
  </div>
</section>
```

### 5.2 变体 E：动画粒子/几何背景

```html
<section class="relative pt-32 pb-20 overflow-hidden bg-gray-950">
  <!-- 动画背景（CSS 实现的渐变动画） -->
  <div class="absolute inset-0">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
      bg-purple-500/20 blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full
      bg-blue-500/20 blur-3xl animate-pulse [animation-delay:1s]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-[600px] h-[600px] rounded-full
      bg-indigo-500/10 blur-3xl animate-pulse [animation-delay:2s]"></div>
  </div>

  <!-- 网格线装饰 -->
  <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
    bg-[size:64px_64px]"></div>

  <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm
      text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full">
      Powered by AI
    </div>
    <h1 class="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
      The Future of
      <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
        bg-clip-text text-transparent">
        Design
      </span>
    </h1>
    <p class="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
      AI-powered design assistant that turns your ideas into production-ready code
    </p>
    <div class="flex items-center justify-center gap-4 mt-10">
      <a href="/signup" class="h-12 px-8 inline-flex items-center font-medium
        text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg
        hover:from-purple-500 hover:to-blue-500
        shadow-lg shadow-purple-600/25 transition-all">
        Get Early Access
      </a>
      <a href="/docs" class="h-12 px-8 inline-flex items-center font-medium
        text-gray-300 border border-gray-700 rounded-lg
        hover:bg-gray-800 hover:text-white transition-colors">
        Documentation
      </a>
    </div>
  </div>
</section>
```

---

## 六、更多区块变体

### 6.1 Feature Section：Tab 切换式

```html
<section class="py-20">
  <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">核心功能</h2>

    <!-- Tab 按钮 -->
    <div class="flex justify-center gap-2 mb-12">
      <button class="px-6 py-3 text-sm font-medium text-white bg-gray-900
        rounded-full">项目管理</button>
      <button class="px-6 py-3 text-sm font-medium text-gray-600
        hover:bg-gray-100 rounded-full transition-colors">团队协作</button>
      <button class="px-6 py-3 text-sm font-medium text-gray-600
        hover:bg-gray-100 rounded-full transition-colors">数据分析</button>
    </div>

    <!-- Tab 内容 -->
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 class="text-2xl font-bold text-gray-900">直观的项目管理</h3>
        <p class="mt-4 text-gray-600 leading-relaxed">
          看板、甘特图、列表三种视图自由切换，让项目管理变得简单。
        </p>
        <ul class="mt-6 space-y-4">
          <li class="flex items-start gap-3">
            <div class="w-6 h-6 flex items-center justify-center rounded-full
              bg-blue-100 text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">1</div>
            <div>
              <p class="text-sm font-medium text-gray-900">拖拽排列优先级</p>
              <p class="text-xs text-gray-500 mt-1">直接拖动任务卡片调整顺序</p>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-6 h-6 flex items-center justify-center rounded-full
              bg-blue-100 text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">2</div>
            <div>
              <p class="text-sm font-medium text-gray-900">自动化工作流</p>
              <p class="text-xs text-gray-500 mt-1">设置规则自动分配和通知</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <img src="/feature-tab-1.png" alt="" class="w-full" />
      </div>
    </div>
  </div>
</section>
```

### 6.2 Testimonials：大引用 + 轮播

```html
<section class="py-20 bg-gray-50">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-16">用户评价</h2>

    <!-- 大引用卡片 -->
    <div class="relative">
      <svg class="absolute -top-4 -left-2 w-12 h-12 text-blue-100"
        fill="currentColor"><!-- " quote mark --></svg>
      <blockquote class="relative z-10 text-2xl text-gray-700 leading-relaxed font-light italic">
        "这是我们团队用过的最好的项目管理工具。从试用到全员推广只用了一周时间。
        现在已经完全无法想象没有它的日子了。"
      </blockquote>
      <div class="flex items-center justify-center gap-4 mt-8">
        <img class="w-14 h-14 rounded-full border-2 border-white shadow-md"
          src="/avatar-large.jpg" alt="" />
        <div class="text-left">
          <p class="font-semibold text-gray-900">李明</p>
          <p class="text-sm text-gray-500">TechCorp 产品总监</p>
        </div>
      </div>

      <!-- 轮播指示器 -->
      <div class="flex justify-center gap-2 mt-8">
        <button class="w-2.5 h-2.5 rounded-full bg-blue-600"></button>
        <button class="w-2.5 h-2.5 rounded-full bg-gray-300
          hover:bg-gray-400 transition-colors"></button>
        <button class="w-2.5 h-2.5 rounded-full bg-gray-300
          hover:bg-gray-400 transition-colors"></button>
      </div>
    </div>
  </div>
</section>
```

### 6.3 Footer：带 Newsletter

```html
<footer class="bg-gray-900 pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Newsletter 区 -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-6
      pb-12 mb-12 border-b border-gray-800">
      <div>
        <h3 class="text-lg font-semibold text-white">订阅产品动态</h3>
        <p class="mt-1 text-sm text-gray-400">每周一封，获取最新功能和设计灵感</p>
      </div>
      <form class="flex w-full md:w-auto gap-3">
        <input type="email" placeholder="your@email.com"
          class="flex-1 md:w-64 h-10 px-4 text-sm bg-gray-800 border border-gray-700
          text-white placeholder-gray-500 rounded-lg
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none" />
        <button type="submit" class="h-10 px-5 text-sm font-medium
          text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          订阅
        </button>
      </form>
    </div>

    <!-- Footer Links (同上方 1.8) -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
      <!-- ... -->
    </div>
  </div>
</footer>
```

### 6.4 CTA：带背景图

```html
<section class="relative py-24 overflow-hidden">
  <img src="/cta-bg.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
  <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white">
      今天就开始你的第一个项目
    </h2>
    <p class="mt-4 text-lg text-blue-200">
      5 分钟完成设置，立即投入使用
    </p>
    <a href="/signup" class="mt-8 inline-flex h-14 px-10 items-center text-lg font-medium
      text-blue-900 bg-white rounded-full shadow-2xl
      hover:bg-blue-50 transition-colors">
      免费注册
    </a>
  </div>
</section>
```

### 6.5 FAQ：两栏布局

```html
<section class="py-20">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid md:grid-cols-[1fr_2fr] gap-12">
      <!-- 左侧标题 -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900">常见问题</h2>
        <p class="mt-4 text-gray-600">
          找不到答案？<a href="/contact" class="text-blue-600 hover:underline">联系我们</a>
        </p>
      </div>
      <!-- 右侧 FAQ 列表 -->
      <div class="space-y-4">
        <details class="group p-5 border border-gray-200 rounded-lg
          [&[open]]:bg-gray-50 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer
            text-base font-medium text-gray-900 list-none">
            支持哪些支付方式？
            <svg class="w-5 h-5 text-gray-400 transition-transform
              group-open:rotate-45"><!-- plus icon --></svg>
          </summary>
          <p class="mt-3 text-sm text-gray-600 leading-relaxed">
            我们支持 Visa、Mastercard、支付宝和微信支付。
            企业版还支持银行转账和对公付款。
          </p>
        </details>
        <!-- 更多 FAQ... -->
      </div>
    </div>
  </div>
</section>
```

---

## 七、完整 SaaS Landing Page 代码骨架

> 综合 color-palettes.md（科技现代 T01）+ typography.md（Inter + 思源黑体）+ animation.md（滚动动画）

```html
<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ProductName — 一句话价值主张</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif; }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up { animation: fade-up 0.6s ease-out forwards; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
  </style>
</head>
<body class="bg-white text-gray-900 antialiased">

  <!-- ========== HEADER ========== -->
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
    <nav class="flex items-center justify-between max-w-7xl mx-auto px-6 h-16">
      <a href="/" class="text-xl font-bold">ProductName</a>
      <div class="hidden md:flex items-center gap-8">
        <a href="#features" class="text-sm text-gray-600 hover:text-gray-900">功能</a>
        <a href="#pricing" class="text-sm text-gray-600 hover:text-gray-900">定价</a>
        <a href="#faq" class="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
      </div>
      <div class="flex items-center gap-3">
        <a href="/login" class="text-sm text-gray-600 hover:text-gray-900">登录</a>
        <a href="/signup" class="h-9 px-4 inline-flex items-center text-sm font-medium
          text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
          免费试用
        </a>
      </div>
    </nav>
  </header>

  <!-- ========== HERO ========== -->
  <section class="relative pt-24 pb-20 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white"></div>
    <div class="relative max-w-5xl mx-auto px-6 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm
        text-blue-700 bg-blue-50 border border-blue-200 rounded-full animate-fade-up">
        全新 2.0 版本已发布
      </div>
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight leading-tight
        animate-fade-up delay-100" style="opacity:0">
        让你的团队协作<span class="text-blue-600">更高效</span>
      </h1>
      <p class="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto
        animate-fade-up delay-200" style="opacity:0">
        一站式项目管理工具，被全球 10,000+ 团队信赖使用。
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10
        animate-fade-up delay-300" style="opacity:0">
        <a href="/signup" class="h-12 px-8 inline-flex items-center text-base font-medium
          text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-600/25
          hover:bg-blue-700 transition-all">免费开始使用</a>
        <a href="/demo" class="h-12 px-8 inline-flex items-center text-base font-medium
          text-gray-700 bg-white border border-gray-300 rounded-lg
          hover:bg-gray-50 transition-colors">观看演示</a>
      </div>
      <p class="mt-6 text-sm text-gray-500">无需信用卡 · 免费 14 天试用</p>
      <div class="mt-16 rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
        <img src="/screenshot.png" alt="产品截图" class="w-full" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- ========== LOGOS ========== -->
  <section class="py-12 border-y border-gray-100">
    <div class="max-w-5xl mx-auto px-6">
      <p class="text-center text-sm text-gray-400 mb-6">深受知名企业信赖</p>
      <div class="flex items-center justify-center flex-wrap gap-x-12 gap-y-4
        opacity-50 grayscale">
        <!-- 替换为真实 logo -->
        <div class="h-8 w-24 bg-gray-300 rounded"></div>
        <div class="h-8 w-20 bg-gray-300 rounded"></div>
        <div class="h-8 w-28 bg-gray-300 rounded"></div>
        <div class="h-8 w-24 bg-gray-300 rounded"></div>
        <div class="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  </section>

  <!-- ========== FEATURES GRID ========== -->
  <section id="features" class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold">为什么选择我们</h2>
        <p class="mt-4 text-lg text-gray-600">一站式解决方案</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <!-- 重复 3-6 个 Feature Card -->
        <div class="p-6 rounded-xl border border-gray-200
          hover:shadow-md hover:border-blue-200 transition-all">
          <div class="w-12 h-12 flex items-center justify-center rounded-lg
            bg-blue-50 text-blue-600 mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold">功能名称</h3>
          <p class="mt-2 text-sm text-gray-600">功能描述文字，简洁说明价值。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== STATS ========== -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div><p class="text-4xl font-bold">10K+</p><p class="mt-1 text-sm text-gray-500">活跃用户</p></div>
      <div><p class="text-4xl font-bold">99.9%</p><p class="mt-1 text-sm text-gray-500">在线时间</p></div>
      <div><p class="text-4xl font-bold">50+</p><p class="mt-1 text-sm text-gray-500">国家地区</p></div>
      <div><p class="text-4xl font-bold">4.9</p><p class="mt-1 text-sm text-gray-500">用户评分</p></div>
    </div>
  </section>

  <!-- ========== TESTIMONIALS ========== -->
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-16">用户怎么说</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <!-- 重复 3 个推荐卡片 -->
        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
          <p class="text-gray-700">"推荐引言内容"</p>
          <div class="flex items-center gap-3 mt-6">
            <div class="w-10 h-10 rounded-full bg-gray-200"></div>
            <div><p class="text-sm font-medium">姓名</p><p class="text-xs text-gray-500">职位</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== PRICING ========== -->
  <section id="pricing" class="py-20 bg-gray-50">
    <!-- 同上方 1.5 Pricing Section -->
  </section>

  <!-- ========== FAQ ========== -->
  <section id="faq" class="py-20">
    <!-- 同上方 1.6 FAQ Section -->
  </section>

  <!-- ========== CTA ========== -->
  <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white">准备好开始了吗？</h2>
      <p class="mt-4 text-lg text-blue-100">加入 10,000+ 团队</p>
      <a href="/signup" class="mt-8 inline-flex h-12 px-8 items-center font-medium
        text-blue-700 bg-white rounded-lg shadow-lg
        hover:bg-blue-50 transition-colors">免费开始使用</a>
    </div>
  </section>

  <!-- ========== FOOTER ========== -->
  <!-- 同上方 1.8 Footer -->

</body>
</html>
```

---

## 八、Landing Page 动效建议

> 参考来源：animation.md

### 8.1 推荐动效模式

| 区块 | 动效 | 实现方式 |
|------|------|---------|
| Hero 文字 | 逐行 fade-up | CSS @keyframes + animation-delay |
| Hero 产品图 | 从下方 slide-up + 渐显 | `opacity: 0 → 1` + `translateY(40px → 0)` |
| Feature 卡片 | 滚动进入时 fade-up | Intersection Observer |
| 数据统计 | 数字递增动画 | JS counter animation |
| Logo 墙 | 无限横向滚动 | CSS `@keyframes marquee` |
| 推荐卡片 | 滚动进入时 stagger fade | Intersection Observer + delay |
| 定价卡片 | 月/年切换时滑动过渡 | `transition: all 0.3s` |
| FAQ | 展开/收起平滑高度过渡 | `grid-template-rows: 0fr → 1fr` |
| CTA | 背景渐变缓慢流动 | CSS `background-size: 200%` + animation |

### 8.2 Logo 无限滚动实现

```html
<div class="overflow-hidden">
  <div class="flex gap-12 animate-[marquee_30s_linear_infinite]">
    <!-- 重复两组 logo 实现无缝循环 -->
    <div class="flex gap-12 shrink-0">
      <img src="/logo1.svg" class="h-8" alt="" />
      <img src="/logo2.svg" class="h-8" alt="" />
      <img src="/logo3.svg" class="h-8" alt="" />
      <img src="/logo4.svg" class="h-8" alt="" />
      <img src="/logo5.svg" class="h-8" alt="" />
    </div>
    <div class="flex gap-12 shrink-0" aria-hidden="true">
      <img src="/logo1.svg" class="h-8" alt="" />
      <img src="/logo2.svg" class="h-8" alt="" />
      <img src="/logo3.svg" class="h-8" alt="" />
      <img src="/logo4.svg" class="h-8" alt="" />
      <img src="/logo5.svg" class="h-8" alt="" />
    </div>
  </div>
</div>

<style>
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
```

### 8.3 数字递增动画

```html
<script>
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString() + '+';
  }
  requestAnimationFrame(update);
}

// 滚动到可视区域时触发
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count);
      animateCounter(entry.target, target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
</script>

<!-- 使用 -->
<p class="text-4xl font-bold" data-count="10000">0</p>
```

---

## 九、Landing Page 配色推荐

> 参考来源：color-palettes.md

| 行业 | 推荐配色风格 | 参考方案编号 |
|------|------------|------------|
| SaaS / B2B | 科技现代（蓝紫主调） | T01, T03 |
| 金融 / 保险 | 企业商务（稳重蓝调） | B01, B02 |
| 健康 / 养生 | 清新自然（绿色系） | N01, N03 |
| 电商 / 零售 | 活力明亮（橙红色系） | V01, V02 |
| 创意 / 设计 | 暗色高级（深色底 + 亮色点缀） | D01, D04 |
| 个人 / Portfolio | 极简中性（灰白系） | M01, M02 |
| AI / 技术 | 渐变趋势（紫蓝渐变） | G01, G04 |
| 教育 / 公益 | 温暖柔和（暖色系） | W01, W03 |
