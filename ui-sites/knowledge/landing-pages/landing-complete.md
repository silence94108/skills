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
