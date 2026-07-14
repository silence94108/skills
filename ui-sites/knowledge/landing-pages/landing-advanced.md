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

