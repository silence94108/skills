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

