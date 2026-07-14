## 4. 入场与退场动画模式

### 4.1 Fade（淡入淡出）

最常用、最安全的基础动画。适合几乎所有场景。

#### CSS 实现

```css
/* 淡入 */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms var(--ease-emphasized-decelerate);
}

/* 淡出 */
.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 200ms var(--ease-emphasized-accelerate);
}

/* @keyframes 版本 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

#### Framer Motion 实现

```tsx
import { motion, AnimatePresence } from 'motion/react';

function FadeExample({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: [0.05, 0.7, 0.1, 1.0], // emphasized-decelerate
          }}
        >
          Content
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

#### Animate.css 类名

```html
<!-- 入场 -->
<div class="animate__animated animate__fadeIn">Fade In</div>
<div class="animate__animated animate__fadeInUp">Fade In Up</div>
<div class="animate__animated animate__fadeInDown">Fade In Down</div>
<div class="animate__animated animate__fadeInLeft">Fade In Left</div>
<div class="animate__animated animate__fadeInRight">Fade In Right</div>

<!-- 退场 -->
<div class="animate__animated animate__fadeOut">Fade Out</div>
<div class="animate__animated animate__fadeOutUp">Fade Out Up</div>
<div class="animate__animated animate__fadeOutDown">Fade Out Down</div>
```

---

### 4.2 Slide（滑入滑出）

适合侧边栏、抽屉、Toast 通知、导航过渡。

#### CSS 实现

```css
/* 从右滑入 */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 向右滑出 */
@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* 从下滑入（常用于 Mobile Bottom Sheet） */
@keyframes slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.slide-in-right {
  animation: slideInRight 300ms var(--ease-emphasized-decelerate) forwards;
}

.slide-out-right {
  animation: slideOutRight 250ms var(--ease-emphasized-accelerate) forwards;
}

.slide-in-up {
  animation: slideInUp 350ms var(--ease-emphasized-decelerate) forwards;
}
```

#### Framer Motion 实现

```tsx
// 方向可配置的 Slide 组件
const slideVariants = {
  initial: (direction: 'left' | 'right' | 'up' | 'down') => {
    const offset = {
      left: { x: -300, y: 0 },
      right: { x: 300, y: 0 },
      up: { x: 0, y: 300 },
      down: { x: 0, y: -300 },
    };
    return { ...offset[direction], opacity: 0 };
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.05, 0.7, 0.1, 1.0],
    },
  },
  exit: (direction: 'left' | 'right' | 'up' | 'down') => {
    const offset = {
      left: { x: -300, y: 0 },
      right: { x: 300, y: 0 },
      up: { x: 0, y: -300 },
      down: { x: 0, y: 300 },
    };
    return {
      ...offset[direction],
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.3, 0, 0.8, 0.15],
      },
    };
  },
};

function SlidePanel({ isOpen, direction = 'right', children }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      {isOpen && (
        <motion.div
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### 4.3 Scale（缩放）

适合 Modal 弹窗、图片预览、菜单弹出、卡片展开。

#### CSS 实现

```css
/* 从中心缩放入场 */
@keyframes scaleIn {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 缩放退场 */
@keyframes scaleOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.85);
    opacity: 0;
  }
}

/* 从点击位置展开（配合 transform-origin） */
.scale-from-origin {
  transform-origin: var(--origin-x, 50%) var(--origin-y, 50%);
  animation: scaleIn 300ms var(--ease-emphasized-decelerate) forwards;
}

/* Modal 标准入场：缩放 + 淡入 */
.modal-enter {
  animation: scaleIn 250ms var(--ease-emphasized-decelerate) forwards;
}

.modal-exit {
  animation: scaleOut 200ms var(--ease-emphasized-accelerate) forwards;
}
```

#### Framer Motion 实现

```tsx
function ScaleModal({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          {/* Modal 主体 */}
          <motion.div
            className="modal"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

### 4.4 Rotate（旋转）

适合图标状态变换、卡片翻转、刷新指示器。

#### CSS 实现

```css
/* 图标旋转切换（如 hamburger → close） */
.icon-rotate {
  transition: transform 300ms var(--ease-emphasized);
}

.icon-rotate.active {
  transform: rotate(180deg);
}

/* 卡片 3D 翻转 */
.card-flip-container {
  perspective: 1000px;
}

.card-flip {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 600ms var(--ease-emphasized);
}

.card-flip.flipped {
  transform: rotateY(180deg);
}

.card-flip .front,
.card-flip .back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.card-flip .back {
  transform: rotateY(180deg);
}

/* 旋转入场 */
@keyframes rotateIn {
  from {
    transform: rotate(-200deg) scale(0);
    opacity: 0;
  }
  to {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}
```

#### Framer Motion 实现

```tsx
// 卡片翻转
function FlipCard({ isFlipped, front, back }) {
  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.2, 0, 0, 1],
        }}
        style={{ transformStyle: 'preserve3d' }}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <motion.div
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            inset: 0,
            rotateY: 180,
          }}
        >
          {back}
        </motion.div>
      </motion.div>
    </div>
  );
}
```

---

### 4.5 组合动画模式

实际项目中入场退场通常组合多种变换：

```tsx
// Framer Motion — 经典 Modal 组合
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.05, 0.7, 0.1, 1.0],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2,
      ease: [0.3, 0, 0.8, 0.15],
    },
  },
};

// GSAP — 组合入场
const tl = gsap.timeline();
tl.from('.hero-title', {
  y: 60,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
})
.from('.hero-subtitle', {
  y: 40,
  opacity: 0,
  duration: 0.5,
  ease: 'power3.out',
}, '-=0.3') // 与上一个动画重叠 0.3s
.from('.hero-cta', {
  scale: 0.8,
  opacity: 0,
  duration: 0.4,
  ease: 'back.out(1.7)',
}, '-=0.2');
```

---

## 5. 滚动动画模式

### 5.1 Intersection Observer（原生方案）

适合"进入视口时触发一次"的入场动画。

```javascript
/**
 * 通用滚动入场动画工具
 * 使用 Intersection Observer API 检测元素进入视口
 */
class ScrollAnimator {
  constructor(options = {}) {
    this.threshold = options.threshold || 0.15;
    this.rootMargin = options.rootMargin || '0px 0px -50px 0px';
    this.once = options.once !== false; // 默认只触发一次

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersect(entries),
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin,
      }
    );
  }

  observe(elements) {
    if (typeof elements === 'string') {
      elements = document.querySelectorAll(elements);
    }
    elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (this.once) {
          this.observer.unobserve(entry.target);
        }
      } else if (!this.once) {
        entry.target.classList.remove('is-visible');
      }
    });
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// 使用
const animator = new ScrollAnimator({ threshold: 0.2 });
animator.observe('[data-animate]');
```

```css
/* 配套 CSS */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s var(--ease-emphasized-decelerate),
              transform 0.5s var(--ease-emphasized-decelerate);
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 不同方向变体 */
[data-animate="fade-up"] {
  transform: translateY(30px);
}

[data-animate="fade-down"] {
  transform: translateY(-30px);
}

[data-animate="fade-left"] {
  transform: translateX(-30px);
}

[data-animate="fade-right"] {
  transform: translateX(30px);
}

[data-animate="scale"] {
  transform: scale(0.9);
}

[data-animate].is-visible {
  transform: translate(0) scale(1);
}

/* 交错入场延迟 */
[data-animate-delay="1"] { transition-delay: 0.1s; }
[data-animate-delay="2"] { transition-delay: 0.2s; }
[data-animate-delay="3"] { transition-delay: 0.3s; }
[data-animate-delay="4"] { transition-delay: 0.4s; }
```

```html
<!-- HTML 用法 -->
<div data-animate="fade-up">第一个元素</div>
<div data-animate="fade-up" data-animate-delay="1">第二个元素</div>
<div data-animate="fade-up" data-animate-delay="2">第三个元素</div>
<div data-animate="scale">缩放入场</div>
```

### 5.2 Framer Motion 滚动动画

#### whileInView — 进入视口触发

```tsx
import { motion } from 'motion/react';

// 基础用法
function ScrollReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        ease: [0.05, 0.7, 0.1, 1.0],
      }}
    >
      {children}
    </motion.div>
  );
}

// 带交错的列表
function ScrollRevealList({ items }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.05, 0.7, 0.1, 1.0],
              },
            },
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

#### useScroll — 滚动进度联动

```tsx
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

// 页面级滚动进度条
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="progress-bar"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--color-primary)',
        zIndex: 9999,
      }}
    />
  );
}

// 元素级视差效果
function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    // offset 含义：
    // 'start end' — 元素顶部到达视口底部时 progress=0
    // 'end start' — 元素底部到达视口顶部时 progress=1
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, opacity }}
      />
    </div>
  );
}

// 水平滚动联动
function HorizontalScroll({ children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <div ref={containerRef} style={{ height: '300vh' }}>
      <div style={{ position: 'sticky', top: 0, overflow: 'hidden' }}>
        <motion.div style={{ x, display: 'flex' }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
```

### 5.3 GSAP ScrollTrigger

GSAP ScrollTrigger 功能最强大，适合复杂的滚动联动叙事。

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// 基础：进入视口触发
gsap.from('.section-title', {
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 80%',     // 元素顶部到达视口 80% 位置时触发
    end: 'top 30%',       // 元素顶部到达视口 30% 位置时结束
    toggleActions: 'play none none none',
    // toggleActions: 'onEnter onLeave onEnterBack onLeaveBack'
    // 可选值：play, pause, resume, reset, restart, complete, reverse, none
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
});

// 进阶：Scrub 模式（动画进度 = 滚动进度）
gsap.to('.parallax-bg', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,    // true = 即时联动, 数字 = 缓动秒数
  },
  y: 200,
  ease: 'none',   // scrub 模式下通常用 linear
});

// 进阶：Pin 模式（固定元素）
gsap.to('.horizontal-track', {
  scrollTrigger: {
    trigger: '.horizontal-section',
    start: 'top top',
    end: () => `+=${document.querySelector('.horizontal-track').scrollWidth}`,
    pin: true,           // 固定 trigger 元素
    scrub: 1,            // 1 秒缓动
    anticipatePin: 1,    // 预判固定，减少跳动
  },
  x: () => -(document.querySelector('.horizontal-track').scrollWidth - window.innerWidth),
  ease: 'none',
});

// 进阶：时间轴 + ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.story-section',
    start: 'top top',
    end: '+=3000',       // 滚动 3000px 完成整个时间轴
    pin: true,
    scrub: 1,
  },
});

tl.from('.step-1', { opacity: 0, y: 50 })
  .from('.step-2', { opacity: 0, x: -50 })
  .from('.step-3', { opacity: 0, scale: 0.8 })
  .to('.step-1', { opacity: 0, y: -50 })
  .from('.step-4', { opacity: 0, y: 50 });

// 交错入场 + ScrollTrigger
gsap.from('.card', {
  scrollTrigger: {
    trigger: '.card-grid',
    start: 'top 75%',
  },
  y: 40,
  opacity: 0,
  duration: 0.5,
  stagger: {
    amount: 0.6,    // 总交错时间
    grid: [3, 3],   // 网格模式
    from: 'start',  // 起点：start, center, end, edges, random
  },
  ease: 'power2.out',
});

// React 中使用 GSAP ScrollTrigger
import { useEffect, useRef } from 'react';

function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.animate-item', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    }, ref);

    return () => ctx.revert(); // 清理
  }, []);

  return ref;
}
```

### 5.4 Vue 滚动动画

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 自定义 useInView 组合函数
function useInView(options = {}) {
  const elementRef = ref(null);
  const isInView = ref(false);
  let observer = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        isInView.value = entry.isIntersecting;
        if (entry.isIntersecting && options.once) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    if (elementRef.value) {
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { elementRef, isInView };
}

const { elementRef: sectionRef, isInView } = useInView({
  once: true,
  threshold: 0.2,
});
</script>

<template>
  <section
    ref="sectionRef"
    :class="['scroll-section', { 'is-visible': isInView }]"
  >
    <h2 class="scroll-title">标题</h2>
    <p class="scroll-desc">描述文字</p>
  </section>
</template>

<style scoped>
.scroll-section .scroll-title,
.scroll-section .scroll-desc {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s cubic-bezier(0.05, 0.7, 0.1, 1.0),
              transform 0.5s cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

.scroll-section .scroll-desc {
  transition-delay: 0.15s;
}

.scroll-section.is-visible .scroll-title,
.scroll-section.is-visible .scroll-desc {
  opacity: 1;
  transform: translateY(0);
}
</style>
```

```vue
<!-- Vue + GSAP ScrollTrigger -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.card-item', {
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, containerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div ref="containerRef">
    <div v-for="i in 6" :key="i" class="card-item">
      Card {{ i }}
    </div>
  </div>
</template>
```

---

## 6. 微交互模式

### 6.1 按钮点击反馈

```css
/* 方案 A：缩放反馈（最常用） */
.btn-press {
  transition: transform 150ms var(--ease-standard),
              box-shadow 150ms var(--ease-standard);
  will-change: transform;
}

.btn-press:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-press:active {
  transform: scale(0.97) translateY(0);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  transition-duration: 80ms;
}

/* 方案 B：Material Design Ripple */
.btn-ripple {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.btn-ripple::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--ripple-x, 50%) var(--ripple-y, 50%),
    rgba(255, 255, 255, 0.3) 0%,
    transparent 60%
  );
  transform: scale(0);
  opacity: 0;
  transition: transform 500ms var(--ease-standard),
              opacity 300ms var(--ease-standard);
}

.btn-ripple:active::after {
  transform: scale(2.5);
  opacity: 1;
  transition-duration: 0ms;
}
```

```tsx
// Framer Motion — 按钮交互
function InteractiveButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        y: -1,
        transition: { duration: 0.2, ease: [0.2, 0, 0, 1] },
      }}
      whileTap={{
        scale: 0.97,
        transition: { duration: 0.1 },
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
```

### 6.2 Hover 效果

```css
/* 卡片悬浮 */
.card-hover {
  transition: transform 250ms var(--ease-emphasized),
              box-shadow 250ms var(--ease-emphasized);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1),
              0 2px 6px rgba(0, 0, 0, 0.06);
}

/* 图片缩放 hover */
.img-zoom-container {
  overflow: hidden;
  border-radius: 8px;
}

.img-zoom-container img {
  transition: transform 400ms var(--ease-emphasized);
}

.img-zoom-container:hover img {
  transform: scale(1.06);
}

/* 链接下划线动画 */
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms var(--ease-emphasized);
}

.link-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* 按钮背景滑入 */
.btn-bg-slide {
  position: relative;
  z-index: 0;
  overflow: hidden;
}

.btn-bg-slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-primary);
  transform: translateX(-101%);
  transition: transform 300ms var(--ease-emphasized);
  z-index: -1;
}

.btn-bg-slide:hover::before {
  transform: translateX(0);
}

.btn-bg-slide:hover {
  color: white;
}
```

```tsx
// Framer Motion — 高级 hover
function HoverCard({ children }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: {
            y: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          },
          hover: {
            y: -6,
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            transition: {
              duration: 0.3,
              ease: [0.2, 0, 0, 1],
            },
          },
        }}
      >
        {children}
        <motion.div
          className="card-arrow"
          variants={{
            rest: { x: 0, opacity: 0.5 },
            hover: { x: 4, opacity: 1 },
          }}
        >
          →
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
```

### 6.3 加载状态

```css
/* 脉冲骨架屏 */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s var(--ease-linear) infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 旋转加载器 */
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 三点跳动 */
.dots-loading {
  display: flex;
  gap: 4px;
}

.dots-loading span {
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: dot-bounce 1.4s ease-in-out infinite;
}

.dots-loading span:nth-child(2) { animation-delay: 0.16s; }
.dots-loading span:nth-child(3) { animation-delay: 0.32s; }

@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* 按钮加载态 */
.btn-loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
```

```tsx
// Framer Motion — 加载动画
function LoadingDots() {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-primary)',
          }}
          animate={{
            scale: [0.6, 1, 0.6],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
```

### 6.4 成功与错误反馈

```css
/* 成功 — 对勾 SVG 路径动画 */
.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: checkmark-circle-draw 600ms var(--ease-emphasized-decelerate) forwards;
}

.checkmark-check {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: checkmark-check-draw 300ms var(--ease-emphasized-decelerate) 400ms forwards;
}

@keyframes checkmark-circle-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes checkmark-check-draw {
  to { stroke-dashoffset: 0; }
}

/* 成功弹跳容器 */
@keyframes success-bounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.15); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.success-icon {
  animation: success-bounce 500ms var(--ease-emphasized-decelerate) forwards;
}

/* 错误抖动 */
@keyframes error-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

.error-shake {
  animation: error-shake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

/* 错误边框闪烁 */
@keyframes error-border-flash {
  0%, 100% { border-color: #ef4444; }
  50% { border-color: #fca5a5; }
}

.input-error {
  border-color: #ef4444;
  animation: error-shake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97),
             error-border-flash 1s ease-in-out 2;
}
```

```tsx
// Framer Motion — 成功反馈
function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15,
      }}
    >
      <motion.svg
        viewBox="0 0 50 50"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="25" cy="25" r="20"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 0.5, ease: 'easeOut' },
            },
          }}
        />
        <motion.path
          d="M14 27 L22 35 L37 18"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 0.3, delay: 0.4, ease: 'easeOut' },
            },
          }}
        />
      </motion.svg>
    </motion.div>
  );
}

// 错误抖动
function ErrorShake({ children, hasError }) {
  return (
    <motion.div
      animate={
        hasError
          ? { x: [0, -8, 8, -4, 4, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
```

### 6.5 Toggle / Switch 动画

```css
/* iOS 风格 Switch */
.switch {
  width: 52px;
  height: 32px;
  background: #e0e0e0;
  border-radius: 16px;
  padding: 2px;
  cursor: pointer;
  transition: background 200ms var(--ease-standard);
}

.switch.active {
  background: var(--color-primary);
}

.switch-thumb {
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 200ms var(--ease-emphasized);
}

.switch.active .switch-thumb {
  transform: translateX(20px);
}
```

```tsx
// Framer Motion — Switch 带 layout 动画
function ToggleSwitch({ isOn, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 52,
        height: 32,
        background: isOn ? 'var(--color-primary)' : '#e0e0e0',
        borderRadius: 16,
        padding: 2,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: isOn ? 'flex-end' : 'flex-start',
      }}
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        style={{
          width: 28,
          height: 28,
          background: 'white',
          borderRadius: '50%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  );
}
```

---

## 7. 页面转场模式

### 7.1 React 页面转场

#### 方案 A：Framer Motion + AnimatePresence

```tsx
// layout.tsx 或 App.tsx
import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useOutlet } from 'react-router-dom';

// 转场变体定义
const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: [0.2, 0, 0, 1] },
  },
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-30%', opacity: 0 },
    transition: {
      duration: 0.4,
      ease: [0.05, 0.7, 0.1, 1.0],
    },
  },
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-10%', opacity: 0 },
    transition: {
      duration: 0.4,
      ease: [0.05, 0.7, 0.1, 1.0],
    },
  },
  scaleUp: {
    initial: { scale: 0.92, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
    transition: {
      duration: 0.35,
      ease: [0.05, 0.7, 0.1, 1.0],
    },
  },
};

function AnimatedRoutes({ transitionType = 'fade' }) {
  const location = useLocation();
  const outlet = useOutlet();
  const config = pageTransitions[transitionType];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={config.initial}
        animate={config.animate}
        exit={config.exit}
        transition={config.transition}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}
```

#### 方案 B：GSAP 页面转场

```tsx
import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

function PageTransition({ children }) {
  const location = useLocation();
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 入场动画
      gsap.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return <div ref={pageRef}>{children}</div>;
}
```

### 7.2 Vue 页面转场

#### 方案 A：Vue Transition 内置

```vue
<!-- App.vue -->
<template>
  <router-view v-slot="{ Component, route }">
    <Transition
      :name="route.meta.transition || 'fade'"
      mode="out-in"
      appear
    >
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<style>
/* Fade 转场 */
.fade-enter-active {
  transition: opacity 0.3s cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

.fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.3, 0, 0.8, 0.15);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Left 转场 */
.slide-left-enter-active {
  transition: all 0.4s cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.3, 0, 0.8, 0.15);
}

.slide-left-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* Slide Up 转场（适合详情页） */
.slide-up-enter-active {
  transition: all 0.4s cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

.slide-up-leave-active {
  transition: all 0.25s cubic-bezier(0.3, 0, 0.8, 0.15);
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}

/* Scale 转场 */
.scale-enter-active {
  transition: all 0.35s cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

.scale-leave-active {
  transition: all 0.25s cubic-bezier(0.3, 0, 0.8, 0.15);
}

.scale-enter-from {
  transform: scale(0.92);
  opacity: 0;
}

.scale-leave-to {
  transform: scale(1.05);
  opacity: 0;
}
</style>
```

```javascript
// router/index.js — 路由 meta 配置转场
const routes = [
  {
    path: '/',
    component: Home,
    meta: { transition: 'fade' },
  },
  {
    path: '/detail/:id',
    component: Detail,
    meta: { transition: 'slide-up' },
  },
  {
    path: '/settings',
    component: Settings,
    meta: { transition: 'slide-left' },
  },
];
```

#### 方案 B：Vue + GSAP 转场

```vue
<template>
  <router-view v-slot="{ Component, route }">
    <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
      mode="out-in"
    >
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<script setup>
import gsap from 'gsap';

function onBeforeEnter(el) {
  gsap.set(el, { opacity: 0, y: 30 });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out',
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: done,
  });
}
</script>
```

### 7.3 Shared Element Transition

跨页面的共享元素过渡（如列表到详情的图片飞跃）：

```tsx
// React — Framer Motion layoutId
// ListPage.tsx
function ListPage() {
  return (
    <div className="grid">
      {items.map((item) => (
        <Link to={`/detail/${item.id}`} key={item.id}>
          <motion.img
            layoutId={`image-${item.id}`}
            src={item.image}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          />
          <motion.h3 layoutId={`title-${item.id}`}>
            {item.title}
          </motion.h3>
        </Link>
      ))}
    </div>
  );
}

// DetailPage.tsx
function DetailPage({ id }) {
  const item = getItem(id);

  return (
    <div>
      <motion.img
        layoutId={`image-${id}`}
        src={item.image}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />
      <motion.h3 layoutId={`title-${id}`}>
        {item.title}
      </motion.h3>
    </div>
  );
}
```

```css
/* CSS View Transitions API（原生，Chrome 111+） */
::view-transition-old(shared-image) {
  animation: fade-out 250ms cubic-bezier(0.3, 0, 0.8, 0.15);
}

::view-transition-new(shared-image) {
  animation: fade-in 350ms cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

.detail-image {
  view-transition-name: shared-image;
}
```

---

