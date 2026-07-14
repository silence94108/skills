# UI 动效与动画设计知识库

> **来源**
> 本文档知识精华提炼自以下权威动效资源：
> - [Framer Motion (Motion)](https://motion.dev/) — React 声明式动画库（现更名 Motion，最新 v12+）
> - [GSAP (GreenSock)](https://gsap.com/) — 高性能 JavaScript 动画平台（v3.14+，已免费商用）
> - [LottieFiles](https://lottiefiles.com/) — Lottie/dotLottie 动画资源与播放器生态
> - [Animate.css](https://animate.style/) — 跨浏览器 CSS 动画类名库
> - [Theatre.js](https://www.theatrejs.com/) — 可视化时间轴动画编排工具
> - [Cubic Bezier](https://cubic-bezier.com/) — 贝塞尔曲线可视化调试工具
> - [Material Design 3 Motion](https://m3.material.io/styles/motion/overview) — Google 材质运动设计规范
> - [Disney 12 Principles](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation) — 迪士尼动画十二原则

---

## 目录

1. [UI 动效基本原则（迪士尼 12 原则 UI 适配版）](#1-ui-动效基本原则)
2. [缓动函数速查表](#2-缓动函数速查表)
3. [时长规范](#3-时长规范)
4. [入场与退场动画模式](#4-入场与退场动画模式)
5. [滚动动画模式](#5-滚动动画模式)
6. [微交互模式](#6-微交互模式)
7. [页面转场模式](#7-页面转场模式)
8. [Lottie 动画使用指南](#8-lottie-动画使用指南)
9. [性能优化](#9-性能优化)
10. [Theatre.js 高级动画编排](#10-theatrejs-高级动画编排)

---

## 1. UI 动效基本原则

迪士尼动画十二原则由 Ollie Johnston 和 Frank Thomas 在《The Illusion of Life: Disney Animation》（1981）中提出。以下是每条原则在 UI/UX 设计中的适配应用：

### 1.1 挤压与拉伸（Squash & Stretch）

**原始含义**：赋予物体重量感和弹性。

**UI 适配**：按钮点击时的微缩放反馈、下拉刷新控件的弹性回弹、卡片拖拽时的形变暗示。

```css
/* 按钮点击挤压效果 */
.btn-squash:active {
  transform: scale(0.95, 1.05);
  transition: transform 120ms cubic-bezier(0.2, 0, 0, 1);
}

.btn-squash {
  transition: transform 200ms cubic-bezier(0.05, 0.7, 0.1, 1.0);
}
```

**设计要点**：UI 中的挤压拉伸幅度要极其克制（2%-8%），避免卡通感过重。

---

### 1.2 预备动作（Anticipation）

**原始含义**：在主动作前加入准备动作，让观众产生预期。

**UI 适配**：按钮 hover 时的微上浮暗示即将触发的操作、菜单展开前图标的微旋转、删除前的左滑渐露红色背景。

```css
/* hover 预备上浮 */
.card-anticipate {
  transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
}

.card-anticipate:hover {
  transform: translateY(-4px);
}

/* 删除按钮滑出预备 */
.delete-reveal {
  transform: translateX(0);
  transition: transform 300ms cubic-bezier(0.05, 0.7, 0.1, 1.0);
}
```

**设计要点**：预备动作的时长应短于主动作，通常不超过 100ms。

---

### 1.3 舞台调度（Staging）

**原始含义**：通过构图引导观众注意力到关键区域。

**UI 适配**：Modal 弹出时背景模糊暗化、Toast 通知从特定方向滑入引导视线、一次只展示一个核心操作（FAB 按钮的展开动画）。

```css
/* Modal 背景暗化 - 舞台调度 */
.backdrop {
  background: rgba(0, 0, 0, 0);
  transition: background 300ms cubic-bezier(0.2, 0, 0, 1);
  backdrop-filter: blur(0px);
}

.backdrop.active {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
```

**设计要点**：同一时刻只突出一个核心视觉焦点。避免多个元素同时争抢注意力。

---

### 1.4 直接动作与姿态对姿态（Straight Ahead & Pose to Pose）

**原始含义**：逐帧绘制 vs 先画关键帧再补间。

**UI 适配**：
- **Pose to Pose（关键帧）**= CSS `@keyframes` / Framer Motion `keyframes` — 定义起止状态，浏览器补间
- **Straight Ahead（逐帧）**= Lottie 动画 / Canvas 动画 — 每帧精确控制

**设计要点**：大多数 UI 动效用关键帧方式即可，精细品牌动画（logo、引导页）可用 Lottie 逐帧。

---

### 1.5 跟随与重叠（Follow Through & Overlapping Action）

**原始含义**：物体停止后的惯性运动，以及不同部分的错时运动。

**UI 适配**：列表项的交错入场（stagger）、侧边栏关闭时内部元素先淡出再整体滑走、下拉菜单的子项依次弹入。

```tsx
// Framer Motion — 列表交错入场
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.05, 0.7, 0.1, 1.0],
    },
  },
};

function StaggerList({ items }) {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.label}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

```javascript
// GSAP — 交错入场
gsap.from('.list-item', {
  y: 30,
  opacity: 0,
  duration: 0.4,
  stagger: 0.08,
  ease: 'power2.out',
});
```

**设计要点**：stagger 间隔建议 50-120ms，总体动画时长不超过 600ms。元素越多，间隔应越短。

---

### 1.6 缓入缓出（Slow In & Slow Out / Easing）

**原始含义**：运动起止阶段减速，中间加速，模拟真实物理。

**UI 适配**：这是 UI 动效的核心原则，几乎所有过渡都应使用缓动曲线。线性运动只用于进度条、加载旋转等场景。

**设计要点**：详见下方 [缓动函数速查表](#2-缓动函数速查表)。

---

### 1.7 弧线运动（Arcs）

**原始含义**：自然运动遵循弧线轨迹而非直线。

**UI 适配**：FAB 展开菜单项沿弧线散开、Shared Element Transition 沿曲线路径移动、通知从右上角沿弧线滑出。

```css
/* 弧线运动 - 使用 offset-path */
.arc-motion {
  offset-path: path('M 0 0 Q 150 -80 300 0');
  animation: arc-move 500ms cubic-bezier(0.2, 0, 0, 1) forwards;
}

@keyframes arc-move {
  from { offset-distance: 0%; }
  to { offset-distance: 100%; }
}
```

**设计要点**：路径动画多用于品牌表达，常规 UI 中的直线运动加缓动已足够。

---

### 1.8 次要动作（Secondary Action）

**原始含义**：用辅助动作强化主要动作。

**UI 适配**：按钮点击时的涟漪（ripple）效果、提交成功时图标的弹跳 + 背景闪绿、表单校验失败时输入框抖动 + 红色边框渐现。

```css
/* Material Design 涟漪效果 */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple-effect 600ms ease-out;
}

@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

**设计要点**：次要动作绝不应喧宾夺主，时长和幅度都应小于主动作。

---

### 1.9 时间节奏（Timing）

**原始含义**：帧数决定速度感和情绪。

**UI 适配**：详见下方 [时长规范](#3-时长规范)。关键原则——越小的元素动画越快，越大的区域变化越慢。

---

### 1.10 夸张（Exaggeration）

**原始含义**：适度夸大动作增强表现力。

**UI 适配**：错误抖动（shake）动画比真实抖动幅度略大、成功打勾时的缩放回弹比物理弹性稍强、空状态插画的呼吸动效。

```css
/* 夸张的错误抖动 */
@keyframes shake-error {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}

.input-error {
  animation: shake-error 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
```

**设计要点**：UI 中的夸张要极度克制。微交互夸张度不超过 10-20%，否则显得浮夸。

---

### 1.11 立体感（Solid Drawing）

**原始含义**：三维空间中的重量感和体积感。

**UI 适配**：卡片的阴影层次暗示 Z 轴深度、3D 翻转过渡、按下按钮时阴影减小暗示按压深度。

```css
/* 卡片悬浮的立体层次 */
.card-solid {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
              transform 200ms cubic-bezier(0.2, 0, 0, 1);
}

.card-solid:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.card-solid:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  transform: translateY(0);
}
```

**设计要点**：结合 box-shadow 和 transform 构建一致的 Z 轴深度系统。

---

### 1.12 吸引力（Appeal）

**原始含义**：角色的魅力和辨识度。

**UI 适配**：品牌独特的 loading 动画（用 Lottie）、个性化的页面转场效果、有温度的空状态动画。

**设计要点**：吸引力动画是品牌差异化的利器，但不应影响核心交互效率。常驻动画保持微妙，一次性动画（如 onboarding）可以更丰富。

---

## 2. 缓动函数速查表

### 2.1 CSS 内置缓动

| 名称 | cubic-bezier 值 | 适用场景 |
|------|----------------|---------|
| `linear` | `cubic-bezier(0, 0, 1, 1)` | 进度条、旋转加载、颜色循环 |
| `ease` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 通用默认，大多数简单过渡 |
| `ease-in` | `cubic-bezier(0.42, 0, 1, 1)` | 元素退出屏幕（加速离开） |
| `ease-out` | `cubic-bezier(0, 0, 0.58, 1)` | 元素进入屏幕（减速到达） |
| `ease-in-out` | `cubic-bezier(0.42, 0, 0.58, 1)` | 在屏幕内移动（两端减速） |

### 2.2 Material Design 3 缓动

M3 运动系统定义了语义化的缓动 Token，按表达力分两族：

#### Emphasized 族（强调/表现性动画）

| Token 名称 | cubic-bezier 值 | 适用场景 |
|-----------|----------------|---------|
| `md.sys.motion.easing.emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | 主要过渡，大部分 M3 组件动画 |
| `md.sys.motion.easing.emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` | 元素入场（减速进入） |
| `md.sys.motion.easing.emphasized-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | 元素出场（加速离开） |

#### Standard 族（标准/功能性动画）

| Token 名称 | cubic-bezier 值 | 适用场景 |
|-----------|----------------|---------|
| `md.sys.motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | 标准功能性过渡 |
| `md.sys.motion.easing.standard-decelerate` | `cubic-bezier(0, 0, 0, 1)` | 功能性入场动画 |
| `md.sys.motion.easing.standard-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` | 功能性退场动画 |

#### Legacy Material Design 2 缓动（参考）

| 名称 | cubic-bezier 值 | 说明 |
|------|----------------|------|
| Standard (M2) | `cubic-bezier(0.4, 0, 0.2, 1)` | M2 默认缓动 |
| Decelerate (M2) | `cubic-bezier(0.0, 0, 0.2, 1)` | M2 入场 |
| Accelerate (M2) | `cubic-bezier(0.4, 0, 1, 1)` | M2 退场 |

### 2.3 弹性缓动（Spring / Bounce）

弹性动画不能用 `cubic-bezier` 精确表达（因为曲线值可超过 0-1 范围），推荐使用 Framer Motion 的 spring 物理引擎或 GSAP 的弹性缓动。

#### Framer Motion Spring 预设

```tsx
// 轻弹 — 适合小元素 hover/tap 反馈
const lightSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.5,
};

// 标准弹 — 适合卡片、Modal 入场
const standardSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 1,
};

// 慢弹 — 适合大面积页面过渡
const heavySpring = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
  mass: 1.5,
};

// 果冻弹 — 适合成功反馈、趣味性 UI
const bouncySpring = {
  type: 'spring',
  stiffness: 500,
  damping: 15,
  mass: 1,
};

// 使用方式
<motion.div
  animate={{ scale: 1 }}
  initial={{ scale: 0 }}
  transition={standardSpring}
/>
```

#### GSAP 弹性缓动

```javascript
// GSAP 弹性预设
gsap.to('.element', {
  scale: 1,
  duration: 0.6,
  ease: 'elastic.out(1, 0.5)',
  // 参数：(amplitude, period)
  // amplitude — 弹跳幅度（默认 1）
  // period — 弹跳频率（默认 0.3，越大越慢）
});

// GSAP 回弹
gsap.to('.element', {
  y: 0,
  duration: 0.6,
  ease: 'bounce.out',
});

// GSAP 后退弹出
gsap.to('.element', {
  scale: 1,
  duration: 0.5,
  ease: 'back.out(1.7)',
  // 参数：过冲量（默认 1.7）
});
```

#### CSS 近似弹性（有限精度）

```css
/* 近似 bounce（CSS 不原生支持 spring，需要 @keyframes 模拟） */
@keyframes bounce-in {
  0%   { transform: scale(0); opacity: 0; }
  50%  { transform: scale(1.08); }
  70%  { transform: scale(0.96); }
  85%  { transform: scale(1.02); }
  100% { transform: scale(1); opacity: 1; }
}

.bounce-in {
  animation: bounce-in 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* 近似 elastic — back 效果 */
.back-in {
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 2.4 自定义常用曲线

以下是经过实践检验的高频自定义曲线：

| 名称 | cubic-bezier 值 | 特点与适用场景 |
|------|----------------|--------------|
| **Sharp** | `cubic-bezier(0.4, 0, 0.6, 1)` | 干脆利落，适合快速切换、Tab 切换 |
| **Standard** | `cubic-bezier(0.4, 0, 0.2, 1)` | 经典标准曲线（同 M2 Standard） |
| **Emphasized** | `cubic-bezier(0.2, 0, 0, 1)` | 富有表现力的入场（同 M3 Emphasized） |
| **Smooth** | `cubic-bezier(0.45, 0, 0.55, 1)` | 极度柔和的对称缓动 |
| **Snap** | `cubic-bezier(0.1, 0, 0.2, 1)` | 快速响应 + 柔和着陆 |
| **Overshoot** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 轻微过冲回弹，用于弹出元素 |
| **Anticipate** | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | 蓄力 + 过冲，用于趣味性 UI |
| **Apple Ease** | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Apple 风格柔和流畅 |
| **iOS Spring (approx)** | `cubic-bezier(0.36, 0.66, 0.04, 1)` | 接近 iOS 系统弹性 |

### 2.5 CSS 变量化缓动系统

推荐在项目中建立统一的缓动变量体系：

```css
:root {
  /* --- 基础缓动 --- */
  --ease-linear: cubic-bezier(0, 0, 1, 1);
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* --- M3 Emphasized 族 --- */
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1.0);
  --ease-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);

  /* --- M3 Standard 族 --- */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-standard-decelerate: cubic-bezier(0, 0, 0, 1);
  --ease-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);

  /* --- 功能性 --- */
  --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
  --ease-snap: cubic-bezier(0.1, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* --- 时长 Token --- */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
}
```

---

## 3. 时长规范

### 3.1 核心原则

- **面积越大，时长越长**：小图标变化 100ms，全屏转场 400ms+
- **距离越远，时长越长**：原地缩放短于跨屏滑移
- **出场通常短于入场**：用户关注"来"而非"去"

### 3.2 时长速查表

| 类别 | 时长范围 | 具体场景 | 参考值 |
|------|---------|---------|--------|
| **即时反馈** | 50-100ms | 按钮高亮、checkbox 切换、ripple 起始 | 80ms |
| **微交互** | 100-200ms | tooltip 显隐、dropdown 开合、icon 变形 | 150ms |
| **标准过渡** | 200-400ms | Modal 弹出、侧边栏展开、卡片翻转、Tab 内容切换 | 250-300ms |
| **强调过渡** | 300-500ms | 页面转场、Shared Element Transition、大面积展开 | 400ms |
| **复杂动画** | 400-700ms | 多步骤交错动画、列表全部载入、引导流程 | 500-600ms |
| **品牌动画** | 700-1200ms | 启动画面 Lottie、成就解锁、首次引导 | 800-1000ms |

### 3.3 Material Design 3 时长 Token

M3 定义了 16 个时长级别，常用的有：

| Token | 值 | 适用 |
|-------|-----|------|
| `md.sys.motion.duration.short1` | 50ms | 选中状态切换 |
| `md.sys.motion.duration.short2` | 100ms | 微反馈 |
| `md.sys.motion.duration.short3` | 150ms | 菜单展开 |
| `md.sys.motion.duration.short4` | 200ms | 标准组件过渡 |
| `md.sys.motion.duration.medium1` | 250ms | 卡片翻转 |
| `md.sys.motion.duration.medium2` | 300ms | 面板展开 |
| `md.sys.motion.duration.medium3` | 350ms | 对话框 |
| `md.sys.motion.duration.medium4` | 400ms | 导航栏切换 |
| `md.sys.motion.duration.long1` | 450ms | 页面级过渡 |
| `md.sys.motion.duration.long2` | 500ms | 复杂过渡 |
| `md.sys.motion.duration.long3` | 550ms | 多步交错 |
| `md.sys.motion.duration.long4` | 600ms | 全屏转场 |
| `md.sys.motion.duration.extra-long1` | 700ms | 复杂品牌动画 |
| `md.sys.motion.duration.extra-long2` | 800ms | 启动动画 |
| `md.sys.motion.duration.extra-long3` | 900ms | 首次体验 |
| `md.sys.motion.duration.extra-long4` | 1000ms | 特殊品牌展示 |

### 3.4 无障碍：prefers-reduced-motion

始终尊重用户的减少动画偏好：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// Framer Motion 自动支持
// 在 MotionConfig 中全局设置
import { MotionConfig } from 'motion/react';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* reducedMotion: "user" 自动遵循系统设置 */}
      {/* reducedMotion: "always" 强制禁用 */}
      {/* reducedMotion: "never" 忽略（不推荐） */}
      <YourApp />
    </MotionConfig>
  );
}
```

```javascript
// JavaScript 检测
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// GSAP 中应用
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(20); // 极速完成而非禁用
}
```

---

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
