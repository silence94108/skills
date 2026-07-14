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

