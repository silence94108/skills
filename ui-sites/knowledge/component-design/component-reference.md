## 三、组件设计速查表

| 组件 | 典型高度 | 圆角 | 常用 Tailwind 类 |
|------|---------|------|-----------------|
| Button sm | 32px | md | `h-8 px-3 text-sm rounded-md` |
| Button md | 36-40px | md | `h-10 px-4 text-sm rounded-md` |
| Button lg | 44-48px | md | `h-12 px-6 text-base rounded-md` |
| Input | 36-40px | md | `h-10 px-3 text-sm rounded-md border` |
| Card | auto | lg | `p-6 rounded-lg border shadow-sm` |
| Modal | auto | xl | `rounded-xl shadow-xl max-w-md` |
| Tag | 24-28px | md/full | `px-2.5 py-1 text-xs rounded-md` |
| Badge | 18-20px | full | `min-w-[18px] h-[18px] text-xs rounded-full` |
| Avatar sm | 32px | full | `w-8 h-8 rounded-full` |
| Avatar md | 40px | full | `w-10 h-10 rounded-full` |
| Tooltip | auto | md | `px-3 py-1.5 text-xs rounded-md bg-gray-900` |
| Toast | auto | lg | `p-4 rounded-lg shadow-lg max-w-sm` |
| Dropdown | auto | lg | `rounded-lg shadow-lg border py-1` |
| Progress | 8px | full | `h-2 rounded-full bg-gray-200` |

---

## 四、设计系统组件尺寸对比

> 参考来源：Ant Design · Material Design 3 · Element Plus · Arco Design · Naive UI

### 4.1 Button 尺寸对比

| 设计系统 | Small | Medium/Default | Large |
|---------|-------|---------------|-------|
| **Ant Design** | 24px (h) / 7px (px) | 32px / 15px | 40px / 15px |
| **Material Design 3** | — | 40px / 24px | — |
| **Element Plus** | 24px / 7px | 32px / 15px | 40px / 19px |
| **Arco Design** | 24px / 7px | 32px / 15px | 36px / 19px |
| **Naive UI** | 28px / 10px | 34px / 14px | 40px / 18px |
| **Chakra UI** | 32px / 12px | 40px / 16px | 48px / 24px |
| **Mantine** | 30px / 14px | 36px / 18px | 42px / 22px |

**结论**：多数设计系统的默认按钮高度在 **32-40px** 之间，推荐使用 **36px** 作为默认值。

### 4.2 Input 尺寸对比

| 设计系统 | Small | Default | Large |
|---------|-------|---------|-------|
| **Ant Design** | 24px | 32px | 40px |
| **Element Plus** | 24px | 32px | 40px |
| **Arco Design** | 24px | 32px | 36px |
| **Naive UI** | 28px | 34px | 40px |
| **Material Design 3** | — | 56px (outlined) | — |
| **Chakra UI** | 32px | 40px | 48px |

**注意**：Material Design 3 的 Input 高度为 56px，明显高于中式设计系统的 32px，选型时注意视觉一致性。

### 4.3 圆角对比

| 设计系统 | 按钮 | 输入框 | 卡片 | 弹窗 |
|---------|------|-------|------|------|
| **Ant Design** | 6px | 6px | 8px | 8px |
| **Material Design 3** | 20px (full) | 4px | 12px | 28px |
| **Element Plus** | 4px | 4px | 4px | 4px |
| **Arco Design** | 2px | 2px | 4px | 4px |
| **Shadcn/ui** | 6px | 6px | 8px | 12px |
| **Naive UI** | 3px | 3px | 3px | 3px |

**结论**：Material Design 圆角最大（20-28px），中式设计系统偏小（2-6px），Shadcn/ui 居中（6-12px）。

---

