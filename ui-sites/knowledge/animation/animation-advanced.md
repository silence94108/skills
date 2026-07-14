## 8. Lottie 动画使用指南

### 8.1 概述

Lottie 是 Airbnb 开源的轻量级动画渲染方案。设计师在 Adobe After Effects 中制作动画，使用 Bodymovin 插件导出为 JSON，前端直接播放。dotLottie 是 LottieFiles 推出的压缩格式（`.lottie`），比 JSON 小 10 倍。

### 8.2 安装与集成

```bash
# React（推荐 dotLottie 最新方案）
npm install @lottiefiles/dotlottie-react

# Vue
npm install @lottiefiles/dotlottie-vue

# 传统 lottie-web（仍可用，但推荐 dotLottie）
npm install lottie-web
```

### 8.3 React 使用

```tsx
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState, useCallback } from 'react';

// 基础用法
function BasicLottie() {
  return (
    <DotLottieReact
      src="/animations/loading.lottie"
      loop
      autoplay
      style={{ width: 200, height: 200 }}
    />
  );
}

// 完整控制
function ControlledLottie() {
  const [dotLottie, setDotLottie] = useState(null);

  const dotLottieRefCallback = useCallback((instance) => {
    setDotLottie(instance);
  }, []);

  const play = () => dotLottie?.play();
  const pause = () => dotLottie?.pause();
  const stop = () => dotLottie?.stop();
  const setSpeed = (speed) => dotLottie?.setSpeed(speed);
  const goToFrame = (frame) => dotLottie?.setFrame(frame);

  return (
    <div>
      <DotLottieReact
        src="/animations/interactive.lottie"
        dotLottieRefCallback={dotLottieRefCallback}
        autoplay={false}
        loop={false}
        // 播放模式：forward, reverse, bounce, reverse-bounce
        playMode="forward"
        // 可选：hover 时自动播放
        // playOnHover
      />
      <div className="controls">
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
        <button onClick={() => setSpeed(2)}>2x Speed</button>
      </div>
    </div>
  );
}

// Hover 播放（适合图标动画）
function LottieIcon() {
  return (
    <DotLottieReact
      src="/animations/icon-arrow.lottie"
      playOnHover
      style={{ width: 32, height: 32 }}
    />
  );
}

// 传统 lottie-web 用法
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

function LottieWebExample() {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg', // svg, canvas, html
      loop: true,
      autoplay: true,
      path: '/animations/loading.json',
      // 或使用 animationData: importedJsonData
    });

    return () => animRef.current?.destroy();
  }, []);

  return <div ref={containerRef} style={{ width: 200, height: 200 }} />;
}
```

### 8.4 Vue 使用

```vue
<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { ref, onMounted } from 'vue';

const dotLottie = ref(null);

function onPlayerReady(instance) {
  dotLottie.value = instance;
}

function playAnimation() {
  dotLottie.value?.play();
}
</script>

<template>
  <!-- 基础用法 -->
  <DotLottieVue
    src="/animations/success.lottie"
    :loop="true"
    :autoplay="true"
    :style="{ width: '200px', height: '200px' }"
  />

  <!-- 受控用法 -->
  <DotLottieVue
    src="/animations/interactive.lottie"
    :autoplay="false"
    @ready="onPlayerReady"
  />
  <button @click="playAnimation">播放</button>
</template>
```

```vue
<!-- 传统 lottie-web Vue 用法 -->
<script setup>
import lottie from 'lottie-web';
import { ref, onMounted, onUnmounted } from 'vue';

const containerRef = ref(null);
let animation = null;

onMounted(() => {
  animation = lottie.loadAnimation({
    container: containerRef.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/animations/loading.json',
  });
});

onUnmounted(() => {
  animation?.destroy();
});
</script>

<template>
  <div ref="containerRef" class="lottie-container" />
</template>
```

### 8.5 常见使用场景

| 场景 | 推荐格式 | 渲染器 | 说明 |
|------|---------|--------|------|
| **Loading 加载** | `.lottie` | canvas | 循环播放，保持轻量 |
| **空状态** | `.lottie` | svg | 循环或单次，清晰矢量 |
| **成功/失败反馈** | `.lottie` | svg | 单次播放，高质量 |
| **引导页/Onboarding** | `.lottie` | svg | 分段控制播放 |
| **图标动画** | `.lottie` | svg | hover 触发，轻量 |
| **启动画面/Splash** | `.lottie` | canvas | 单次播放后消失 |
| **节日/活动氛围** | `.lottie` | canvas | 时间限定，可移除 |
| **按钮确认** | `.lottie` | svg | 单次，如"提交"到"完成" |

### 8.6 性能与优化建议

- **文件体积**：单个 Lottie JSON 控制在 50KB 以内，dotLottie 可更小
- **帧率**：UI 动画 30fps 够用，品牌动画可用 60fps
- **复杂度**：避免大量 path 节点、模糊效果、3D 图层
- **渲染器选择**：
  - `svg` — 最佳质量、可缩放、DOM 元素可交互，适合小尺寸和少量实例
  - `canvas` — 最佳性能、低内存、适合多实例和大尺寸
  - `html` — 可以用 DOM，但兼容性最差，不推荐
- **懒加载**：非首屏的 Lottie 动画应在进入视口时再加载

---

## 9. 性能优化

### 9.1 核心原则：只动 transform 和 opacity

浏览器渲染管道分为五步：

```
JavaScript → Style → Layout → Paint → Composite
```

| 属性类型 | 触发阶段 | 性能 | 示例 |
|---------|---------|------|------|
| 布局属性 | Layout + Paint + Composite | 最差 | `width`, `height`, `top`, `left`, `margin`, `padding` |
| 绘制属性 | Paint + Composite | 一般 | `color`, `background`, `border-color`, `box-shadow` |
| 合成属性 | Composite only | 最佳 | `transform`, `opacity`, `filter` |

**铁律：所有频繁运行的动画只使用 `transform`（translate, scale, rotate）和 `opacity`。**

```css
/* ❌ 不好：触发 Layout */
.bad-animation {
  transition: width 300ms, left 300ms, margin-top 300ms;
}

/* ❌ 一般：触发 Paint */
.okay-animation {
  transition: background-color 300ms, box-shadow 300ms;
}

/* ✅ 最佳：只触发 Composite */
.good-animation {
  transition: transform 300ms, opacity 300ms;
}
```

### 9.2 will-change 使用规范

`will-change` 告知浏览器"这个元素即将变化"，浏览器会提前为其创建独立的 GPU 图层。

```css
/* ✅ 正确：在 hover 父元素时预告子元素将变化 */
.card:hover .card-image {
  will-change: transform;
}

.card-image {
  transition: transform 300ms var(--ease-emphasized);
}

/* ✅ 正确：仅在动画期间应用 */
.modal.animating {
  will-change: transform, opacity;
}

/* ❌ 错误：永久性 will-change，浪费 GPU 内存 */
.every-element {
  will-change: transform; /* 不要这样做！ */
}

/* ❌ 错误：对太多属性使用 */
.over-optimized {
  will-change: transform, opacity, color, background, border, box-shadow;
}
```

JavaScript 中动态管理 `will-change`：

```javascript
// 在动画开始前添加，结束后移除
function animateElement(el) {
  el.style.willChange = 'transform, opacity';

  el.addEventListener(
    'transitionend',
    () => {
      el.style.willChange = 'auto';
    },
    { once: true }
  );

  // 给浏览器一帧时间来创建图层
  requestAnimationFrame(() => {
    el.classList.add('animate');
  });
}
```

### 9.3 GPU 加速技巧

```css
/* 强制创建 GPU 图层（现代浏览器推荐 will-change 替代） */
.gpu-layer {
  /* 方案 1：推荐 */
  will-change: transform;

  /* 方案 2：传统 hack（仍有效） */
  transform: translateZ(0);

  /* 方案 3：传统 hack */
  transform: translate3d(0, 0, 0);

  /* 方案 4：backface-visibility hack */
  backface-visibility: hidden;
}
```

### 9.4 硬件加速可动画属性清单

截至 2025 年，以下属性在主流浏览器中默认硬件加速：

| 属性 | Chrome | Firefox | Safari | 说明 |
|------|--------|---------|--------|------|
| `transform` | 是 | 是 | 是 | 包括 translate, scale, rotate, skew |
| `opacity` | 是 | 是 | 是 | 最安全的动画属性 |
| `filter` | 是 | 是 | 是 | blur, brightness, contrast 等 |
| `backdrop-filter` | 是 | 是 | 是 | 背景滤镜 |
| `clip-path` | 是 | 部分 | 是 | Chrome 111+ 硬件加速 |
| `background-color` | 即将 | 否 | 否 | Chrome 正在推进 |

### 9.5 动画调度：requestAnimationFrame

```javascript
// ❌ 不好：用 setInterval 驱动动画
setInterval(() => {
  element.style.transform = `translateX(${pos++}px)`;
}, 16);

// ✅ 正确：用 requestAnimationFrame
function animate() {
  element.style.transform = `translateX(${pos++}px)`;
  if (pos < target) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);

// ✅ 最佳：直接用 CSS transition / animation 或 Web Animations API
element.animate(
  [
    { transform: 'translateX(0)' },
    { transform: 'translateX(300px)' },
  ],
  {
    duration: 500,
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
    fill: 'forwards',
  }
);
```

### 9.6 减少重排（Reflow）的技巧

```javascript
// ❌ 不好：交替读写导致强制同步布局
items.forEach((item) => {
  const height = item.offsetHeight; // 读
  item.style.height = height + 10 + 'px'; // 写
  // 下一次循环再读时浏览器被迫同步计算布局
});

// ✅ 正确：批量读、批量写
const heights = items.map((item) => item.offsetHeight); // 批量读
items.forEach((item, i) => {
  item.style.height = heights[i] + 10 + 'px'; // 批量写
});

// ✅ 更好：使用 GSAP 或 Framer Motion 自动处理批量更新
```

### 9.7 大量元素动画优化

```javascript
// GSAP — 大量粒子/元素动画
// 使用 GSAP 的 quickTo 进行高频更新
const xTo = gsap.quickTo('.cursor', 'x', {
  duration: 0.3,
  ease: 'power3.out',
});
const yTo = gsap.quickTo('.cursor', 'y', {
  duration: 0.3,
  ease: 'power3.out',
});

document.addEventListener('mousemove', (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});

// 虚拟化 + 动画：只对可见元素做动画
// 结合 react-window / vue-virtual-scroller + Intersection Observer
```

### 9.8 性能检测工具

| 工具 | 用途 | 使用方式 |
|------|------|---------|
| Chrome DevTools → Performance | 检测帧率、Layout 触发 | F12 → Performance → Record |
| Chrome DevTools → Rendering | 查看 Paint 区域、GPU 图层 | F12 → More Tools → Rendering → Paint flashing |
| Chrome DevTools → Layers | 查看合成图层 | F12 → More Tools → Layers |
| Lighthouse | 性能评分与建议 | F12 → Lighthouse |
| GSAP DevTools | GSAP 动画调试 | `GSDevTools.create()` |
| Framer Motion DevTools | Motion 动画调试 | Chrome Extension |

---

## 10. Theatre.js 高级动画编排

### 10.1 概述

Theatre.js 是面向"创意开发者"的动画编排工具。核心特点是附带一个可视化时间轴编辑器（Studio），可以在浏览器中实时调整关键帧、缓动曲线，导出后用于生产环境。

### 10.2 核心概念

| 概念 | 说明 |
|------|------|
| **Project** | 最顶层容器，包含所有 Sheet |
| **Sheet** | 一个动画场景，包含 Objects 和 Sequence |
| **Sheet Object** | 可动画化的对象，定义可编辑的属性 |
| **Sequence** | 时间轴，控制 Sheet 中所有 Object 的关键帧 |
| **Studio** | 开发时可视化编辑器，生产环境中移除 |

### 10.3 基础用法（HTML/React）

```bash
# 安装
npm install @theatre/core @theatre/studio @theatre/r3f
```

```tsx
// React 中使用 Theatre.js
import { getProject, types } from '@theatre/core';
import studio from '@theatre/studio';
import { useEffect, useRef } from 'react';

// 仅开发环境初始化 Studio
if (process.env.NODE_ENV === 'development') {
  studio.initialize();
}

// 创建 Project 和 Sheet
const project = getProject('My Animation');
const sheet = project.sheet('Scene 1');

function AnimatedBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    // 创建 Sheet Object，定义可动画属性
    const obj = sheet.object('Box', {
      position: {
        x: types.number(0, { range: [-500, 500] }),
        y: types.number(0, { range: [-500, 500] }),
      },
      rotation: types.number(0, { range: [0, 360] }),
      scale: types.number(1, { range: [0.1, 3] }),
      opacity: types.number(1, { range: [0, 1] }),
      color: types.rgba({ r: 0.2, g: 0.4, b: 1, a: 1 }),
    });

    // 监听值变化，应用到 DOM
    const unsubscribe = obj.onValuesChange((values) => {
      if (!boxRef.current) return;
      const el = boxRef.current;
      el.style.transform = `
        translate(${values.position.x}px, ${values.position.y}px)
        rotate(${values.rotation}deg)
        scale(${values.scale})
      `;
      el.style.opacity = values.opacity;
      const { r, g, b, a } = values.color;
      el.style.background = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
    });

    return () => unsubscribe();
  }, []);

  return <div ref={boxRef} className="animated-box" />;
}

// 播放控制
function playSequence() {
  sheet.sequence.play({
    iterationCount: 1,    // 播放次数，Infinity 为无限
    range: [0, 3],        // 播放范围（秒）
    rate: 1,              // 播放速率
    direction: 'normal',  // normal, reverse, alternate
  });
}

// 与滚动联动
function scrollControlled() {
  window.addEventListener('scroll', () => {
    const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    // sequence.position 设置当前时间点
    sheet.sequence.position = progress * sheet.sequence.pointer.length;
  });
}
```

### 10.4 与其他库协作

```javascript
// Theatre.js + GSAP 共享 RAF 循环
import { createRafDriver } from '@theatre/core';

// 创建自定义 RAF 驱动器
const rafDriver = createRafDriver({ name: 'SharedRAF' });

// 在 GSAP 的 ticker 中驱动 Theatre.js
gsap.ticker.add((time) => {
  rafDriver.tick(time * 1000); // Theatre.js 用毫秒
});

// 创建 Project 时使用这个 driver
const project = getProject('Synced Animation', {
  rafDriver,
});
```

### 10.5 生产环境部署

```javascript
// 1. 在 Studio 中编辑好动画后，导出 state
// Studio UI → Export → 保存为 state.json

// 2. 生产环境加载 state，不加载 Studio
import projectState from './state.json';
const project = getProject('My Animation', { state: projectState });

// 3. 条件导入 Studio（仅开发环境）
if (process.env.NODE_ENV === 'development') {
  import('@theatre/studio').then((studio) => {
    studio.default.initialize();
  });
}
```

---

## 附录 A：Animate.css 完整类名速查

### 入场动画

| 类型 | 类名 |
|------|------|
| **Fade** | `fadeIn`, `fadeInDown`, `fadeInDownBig`, `fadeInLeft`, `fadeInLeftBig`, `fadeInRight`, `fadeInRightBig`, `fadeInUp`, `fadeInUpBig`, `fadeInTopLeft`, `fadeInTopRight`, `fadeInBottomLeft`, `fadeInBottomRight` |
| **Slide** | `slideInDown`, `slideInLeft`, `slideInRight`, `slideInUp` |
| **Bounce** | `bounceIn`, `bounceInDown`, `bounceInLeft`, `bounceInRight`, `bounceInUp` |
| **Zoom** | `zoomIn`, `zoomInDown`, `zoomInLeft`, `zoomInRight`, `zoomInUp` |
| **Back** | `backInDown`, `backInLeft`, `backInRight`, `backInUp` |
| **Rotate** | `rotateIn`, `rotateInDownLeft`, `rotateInDownRight`, `rotateInUpLeft`, `rotateInUpRight` |
| **Flip** | `flipInX`, `flipInY` |
| **Lightspeed** | `lightSpeedInRight`, `lightSpeedInLeft` |
| **Roll** | `rollIn` |

### 退场动画

| 类型 | 类名 |
|------|------|
| **Fade** | `fadeOut`, `fadeOutDown`, `fadeOutDownBig`, `fadeOutLeft`, `fadeOutLeftBig`, `fadeOutRight`, `fadeOutRightBig`, `fadeOutUp`, `fadeOutUpBig`, `fadeOutTopLeft`, `fadeOutTopRight`, `fadeOutBottomRight`, `fadeOutBottomLeft` |
| **Slide** | `slideOutDown`, `slideOutLeft`, `slideOutRight`, `slideOutUp` |
| **Bounce** | `bounceOut`, `bounceOutDown`, `bounceOutLeft`, `bounceOutRight`, `bounceOutUp` |
| **Zoom** | `zoomOut`, `zoomOutDown`, `zoomOutLeft`, `zoomOutRight`, `zoomOutUp` |
| **Back** | `backOutDown`, `backOutLeft`, `backOutRight`, `backOutUp` |
| **Rotate** | `rotateOut`, `rotateOutDownLeft`, `rotateOutDownRight`, `rotateOutUpLeft`, `rotateOutUpRight` |
| **Flip** | `flipOutX`, `flipOutY` |
| **Lightspeed** | `lightSpeedOutRight`, `lightSpeedOutLeft` |
| **Roll** | `rollOut` |

### 注意力吸引动画

| 类名 |
|------|
| `bounce`, `flash`, `pulse`, `rubberBand`, `shakeX`, `shakeY`, `headShake`, `swing`, `tada`, `wobble`, `jello`, `heartBeat` |

### 使用方式

```html
<!-- 基础 -->
<div class="animate__animated animate__fadeIn">内容</div>

<!-- 自定义时长 -->
<div class="animate__animated animate__fadeIn animate__faster">更快</div>
<!-- animate__slow: 2s, animate__slower: 3s -->
<!-- animate__fast: 800ms, animate__faster: 500ms -->

<!-- 自定义延迟 -->
<div class="animate__animated animate__fadeIn animate__delay-1s">延迟 1s</div>
<!-- animate__delay-2s, animate__delay-3s, animate__delay-4s, animate__delay-5s -->

<!-- 自定义重复 -->
<div class="animate__animated animate__bounce animate__repeat-2">重复 2 次</div>
<!-- animate__repeat-2, animate__repeat-3, animate__infinite -->

<!-- 通过 CSS 变量精确控制 -->
<div
  class="animate__animated animate__fadeIn"
  style="--animate-duration: 350ms; --animate-delay: 100ms"
>
  精确控制
</div>
```

---

## 附录 B：GSAP 缓动速查

```
GSAP 内置缓动格式: "easeName.easeType"
easeType: in, out, inOut
```

| 缓动名 | 特点 | 常用变体 |
|--------|------|---------|
| `none` / `linear` | 线性，无加减速 | `"none"` |
| `power1` | 微弱加减速（= quad） | `power1.out` |
| `power2` | 中等加减速（= cubic） | `power2.out` |
| `power3` | 强加减速（= quart） | `power3.out` |
| `power4` | 极强加减速（= quint） | `power4.out` |
| `back` | 过冲回弹 | `back.out(1.7)` |
| `elastic` | 弹性振荡 | `elastic.out(1, 0.3)` |
| `bounce` | 落地弹跳 | `bounce.out` |
| `circ` | 圆弧加减速 | `circ.out` |
| `expo` | 指数加减速 | `expo.out` |
| `sine` | 正弦柔和 | `sine.inOut` |
| `steps` | 阶梯跳跃 | `steps(12)` |
| `slow` | 慢开始慢结束 | `slow(0.7, 0.7, false)` |

---

## 附录 C：速决策表

根据场景快速选择动效方案：

| 场景 | 推荐方案 | 缓动 | 时长 |
|------|---------|------|------|
| 按钮 hover | CSS `transition` | `ease-emphasized` | 200ms |
| 按钮点击 | CSS `transition` | `ease-standard` | 100ms |
| Modal 弹出 | Framer Motion / CSS | `emphasized-decelerate` + spring | 300ms |
| Modal 关闭 | Framer Motion / CSS | `emphasized-accelerate` | 200ms |
| 下拉菜单展开 | CSS `transition` | `emphasized-decelerate` | 200ms |
| 侧边栏滑入 | Framer Motion / GSAP | `emphasized-decelerate` | 350ms |
| Toast 弹出 | CSS `@keyframes` | `back.out` / overshoot | 300ms |
| 列表交错入场 | Framer Motion / GSAP | `power3.out` | 400ms total |
| 滚动进入视口 | Intersection Observer | `emphasized-decelerate` | 500ms |
| 滚动视差 | GSAP ScrollTrigger | `none` (scrub) | — |
| 页面转场 | Framer Motion / Vue Transition | `emphasized` | 350ms |
| Loading 状态 | Lottie / CSS | `linear` | 循环 |
| 成功反馈 | Lottie / SVG path | spring | 500ms |
| 错误抖动 | CSS `@keyframes` | sharp | 400ms |
| 品牌动画 | Lottie / Theatre.js | 自定义 | 800-1200ms |
| 数字递增 | Framer Motion / GSAP | `power2.out` | 1000-2000ms |
| Tab 切换 | CSS `transition` | `sharp` | 200ms |
| Switch 切换 | Framer Motion layout | spring(500, 30) | — |
| 图标变形 | Framer Motion / SVG | `emphasized` | 300ms |
| 拖拽 | Framer Motion / GSAP | spring | — |
| 3D 翻转 | CSS perspective | `emphasized` | 600ms |
| 水平滚动 | GSAP ScrollTrigger pin | `none` | — |
| 复杂叙事动画 | Theatre.js + GSAP | 可视化编辑 | — |
