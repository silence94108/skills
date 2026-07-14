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

