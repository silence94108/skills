## 3. 主题化架构

### 3.1 亮色 / 暗色主题切换实现

**这是什么：** 通过 CSS Variables + 类名切换的方案实现亮暗主题无缝切换，无需重载页面。

**为什么这样做：** CSS Variables 方案性能最优（浏览器原生支持，无 JS 运行时开销），兼容性好（支持所有现代浏览器），且与 Tailwind dark mode 完美配合。

#### 3.1.1 CSS Variables 完整定义

```css
/* ========================================
   theme-tokens.css
   亮色 / 暗色 主题 Token 定义
   ======================================== */

/* --- 亮色主题（默认） --- */
:root,
[data-theme="light"] {
  /* 品牌色 */
  --color-primary-50:  #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;

  /* 表面 */
  --color-bg-primary:    #FFFFFF;
  --color-bg-secondary:  #F9FAFB;
  --color-bg-tertiary:   #F3F4F6;
  --color-bg-elevated:   #FFFFFF;
  --color-bg-inverse:    #111827;

  /* 文字 */
  --color-text-primary:   #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary:  #9CA3AF;
  --color-text-inverse:   #FFFFFF;

  /* 边框 */
  --color-border-default: #E5E7EB;
  --color-border-strong:  #D1D5DB;
  --color-border-focus:   #3B82F6;

  /* 阴影 */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* 语义色 */
  --color-success:       #22C55E;
  --color-success-light: #DCFCE7;
  --color-warning:       #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-error:         #EF4444;
  --color-error-light:   #FEE2E2;
  --color-info:          #3B82F6;
  --color-info-light:    #DBEAFE;

  /* 遮罩 */
  --color-overlay: rgba(0, 0, 0, 0.5);
}

/* --- 暗色主题 --- */
[data-theme="dark"] {
  /* 品牌色（暗色模式下适度提亮，保证可读性） */
  --color-primary-50:  #172554;
  --color-primary-100: #1E3A8A;
  --color-primary-200: #1E40AF;
  --color-primary-300: #1D4ED8;
  --color-primary-400: #2563EB;
  --color-primary-500: #3B82F6;
  --color-primary-600: #60A5FA;
  --color-primary-700: #93C5FD;
  --color-primary-800: #BFDBFE;
  --color-primary-900: #DBEAFE;

  /* 表面（Carbon Gray 90/100 参考） */
  --color-bg-primary:    #0F172A;
  --color-bg-secondary:  #1E293B;
  --color-bg-tertiary:   #334155;
  --color-bg-elevated:   #1E293B;
  --color-bg-inverse:    #F8FAFC;

  /* 文字 */
  --color-text-primary:   #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-tertiary:  #64748B;
  --color-text-inverse:   #0F172A;

  /* 边框 */
  --color-border-default: #334155;
  --color-border-strong:  #475569;
  --color-border-focus:   #60A5FA;

  /* 阴影（暗色模式阴影加深） */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);

  /* 语义色（暗色模式稍调亮度） */
  --color-success:       #4ADE80;
  --color-success-light: #14532D;
  --color-warning:       #FBBF24;
  --color-warning-light: #78350F;
  --color-error:         #F87171;
  --color-error-light:   #7F1D1D;
  --color-info:          #60A5FA;
  --color-info-light:    #1E3A8A;

  /* 遮罩 */
  --color-overlay: rgba(0, 0, 0, 0.7);
}
```

#### 3.1.2 JavaScript 主题切换逻辑

```javascript
/**
 * theme-manager.js
 * 主题管理器 — 支持 light / dark / system 三种模式
 */

const THEME_STORAGE_KEY = 'user-theme-preference';

/**
 * 获取系统偏好主题
 */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * 应用主题到 DOM
 * @param {'light' | 'dark'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // 同步 Tailwind dark mode class（如果使用 class 策略）
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // 更新 meta theme-color（影响浏览器地址栏颜色）
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      theme === 'dark' ? '#0F172A' : '#FFFFFF'
    );
  }
}

/**
 * 设置主题偏好
 * @param {'light' | 'dark' | 'system'} preference
 */
function setTheme(preference) {
  localStorage.setItem(THEME_STORAGE_KEY, preference);

  const effectiveTheme =
    preference === 'system' ? getSystemTheme() : preference;
  applyTheme(effectiveTheme);
}

/**
 * 初始化主题（页面加载时调用）
 */
function initTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) || 'system';
  const effectiveTheme =
    stored === 'system' ? getSystemTheme() : stored;
  applyTheme(effectiveTheme);

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const current = localStorage.getItem(THEME_STORAGE_KEY);
      if (current === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
}

// 尽早初始化，避免闪屏
initTheme();
```

### 3.2 品牌化定制（Brand Token 覆盖）

**这是什么：** 通过覆盖 Token 变量实现品牌换肤，一套代码支持多个品牌。

```css
/* ========================================
   brand-override.css
   品牌 Token 覆盖层
   ======================================== */

/* --- 品牌 A：科技蓝 --- */
[data-brand="tech-blue"] {
  --color-primary-50:  #EFF6FF;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --radius-button:     var(--radius-md);
  --font-family-sans:  'Inter', var(--font-family-sans);
}

/* --- 品牌 B：活力橙 --- */
[data-brand="vibrant-orange"] {
  --color-primary-50:  #FFF7ED;
  --color-primary-500: #F97316;
  --color-primary-600: #EA580C;
  --color-primary-700: #C2410C;
  --radius-button:     var(--radius-full);  /* 药丸形按钮 */
  --font-family-sans:  'Poppins', var(--font-family-sans);
}

/* --- 品牌 C：优雅紫 --- */
[data-brand="elegant-purple"] {
  --color-primary-50:  #FAF5FF;
  --color-primary-500: #A855F7;
  --color-primary-600: #9333EA;
  --color-primary-700: #7E22CE;
  --radius-button:     var(--radius-none);  /* 直角按钮 */
  --font-family-sans:  'DM Sans', var(--font-family-sans);
}
```

### 3.3 React 主题切换组件

```tsx
// ThemeProvider.tsx — React 主题上下文

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  effectiveTheme: EffectiveTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'user-theme-preference';

function getSystemTheme(): EffectiveTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolveTheme(mode: ThemeMode): EffectiveTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || defaultMode;
  });

  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>(() =>
    resolveTheme(mode),
  );

  // 应用主题到 DOM
  useEffect(() => {
    const theme = resolveTheme(mode);
    setEffectiveTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [mode]);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'system') {
        const theme = getSystemTheme();
        setEffectiveTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mode]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(effectiveTheme === 'light' ? 'dark' : 'light');
  }, [effectiveTheme, setMode]);

  return (
    <ThemeContext.Provider value={{ mode, effectiveTheme, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 3.4 Vue 主题切换组合式函数

```vue
<!-- useTheme.ts — Vue 3 Composable -->
<script lang="ts">
// composables/useTheme.ts

import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';

type ThemeMode = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'user-theme-preference';

function getSystemTheme(): EffectiveTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// 全局状态（跨组件共享）
const mode = ref<ThemeMode>(
  (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'system'
);

export function useTheme() {
  const effectiveTheme = computed<EffectiveTheme>(() =>
    mode.value === 'system' ? getSystemTheme() : mode.value
  );

  // 同步到 DOM
  watchEffect(() => {
    const theme = effectiveTheme.value;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  });

  // 监听系统偏好
  let mediaQuery: MediaQueryList;
  const handler = () => {
    // 触发 computed 重算
    if (mode.value === 'system') {
      // 强制触发响应式更新
      mode.value = 'system';
    }
  };

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handler);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handler);
  });

  function setMode(newMode: ThemeMode) {
    mode.value = newMode;
    localStorage.setItem(STORAGE_KEY, newMode);
  }

  function toggleTheme() {
    setMode(effectiveTheme.value === 'light' ? 'dark' : 'light');
  }

  return {
    mode,
    effectiveTheme,
    setMode,
    toggleTheme,
  };
}
</script>
```

```vue
<!-- ThemeToggle.vue — 主题切换按钮组件 -->
<template>
  <div class="theme-toggle" role="radiogroup" aria-label="选择主题">
    <button
      v-for="option in options"
      :key="option.value"
      :class="['theme-toggle__btn', { active: mode === option.value }]"
      :aria-checked="mode === option.value"
      role="radio"
      @click="setMode(option.value)"
    >
      <span class="theme-toggle__icon" v-html="option.icon" />
      <span class="theme-toggle__label">{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { mode, setMode } = useTheme();

const options = [
  { value: 'light' as const, label: '浅色', icon: '&#9728;' },
  { value: 'dark' as const,  label: '深色', icon: '&#9790;' },
  { value: 'system' as const, label: '跟随系统', icon: '&#9881;' },
];
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-lg);
}

.theme-toggle__btn {
  display: flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1-5) var(--space-3);
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 200ms ease;
}

.theme-toggle__btn:hover {
  color: var(--color-text-primary);
}

.theme-toggle__btn.active {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}
</style>
```

---

