# 样式美化

> 更新时间：2024-3-4



## 主题目录(必看)

::: tip 说明
要修改样式，建议还是按此方式，无论怎样修改都不影响源文件
:::

在 `.vitepress` 中新建文件夹 `theme`，看目录

```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ index.mts 或者 index.ts
│  └─ index.md
└─ node_modules
```

然后在 `theme` 目录下新建 `index.mts` 并填入如下代码


```ts
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
}
```




## 主题美化


### 主题色

在 `theme` 目录下新建 `style` 文件夹，然后新建 `index.css` 并填入如下代码

```md{7-8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ var.css
│  └─ index.md
└─ node_modules
```

```css
/* index.css */
@import './var.css';
```

然后再新建 `var.css` 并填入如下代码

```css
/* var.css */
:root {
  --vp-c-brand-1: #18794e;
  --vp-c-brand-2: #299764;
  --vp-c-brand-3: #30a46c;
}

.dark {
  --vp-c-brand-1: #3dd68c;
  --vp-c-brand-2: #30a46c;
  --vp-c-brand-3: #298459;
}
/* 以前的vp-c-brand已弃用 */
```

然后将修改好的样式引入 `index.ts`

这样就修改回了绿色


```ts{2}
import DefaultTheme from 'vitepress/theme'
import './style/index.css' // [!code focus]

export default {
  extends: DefaultTheme,
}
```

还有一种方法，就是直接在首页 `index.md` 中插入代码

```md
<style>
:root {
  --vp-c-brand-1: #18794e;
  --vp-c-brand-2: #299764;
  --vp-c-brand-3: #30a46c;
}

.dark {
  --vp-c-brand-1: #3dd68c;
  --vp-c-brand-2: #30a46c;
  --vp-c-brand-3: #298459;
}
</style>
```


---



### H1标题颜色

::: warning 当然
同理，你也可以改H2-H6的标题，不过我感觉没必要，太花里胡哨了
:::

最简单的修改就是，比如改成红色

```css
/* .vitepress\theme\style\var.css */
h1 {
  color: red;
}
```

但是这样并不太好看，我们可以弄一个渐变色

```css
/* .vitepress\theme\style\var.css */
h1 {
  background: -webkit-linear-gradient(-45deg, #e43498 5%, #5ad7dd 15%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

```

::: tip 说明
background: 采用了一个线性渐变

background-clip: 使文本的背景颜色与渐变效果相同

text-fill-color：将文字透明
:::




---


### 链接下划线

新版本更新后，文字跳转链接就多了一个下划线

不习惯的可以修改，我们在 `var.css` 中添加下面代码就行了

```css
/* var.css */
.vp-doc a {
    text-decoration: none;
}
```

[参考：MDN Web Docs 社区](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)




---


### Badge颜色

最初教程编写的版本是 `beta.5` ，容器的颜色有边框的，很好看

版本更新迭代，现在这 `tip` `warning` `danger` 颜色真的想吐槽，好丑！

::: details 原css文件路径
```
node_modules\vitepress\dist\client\theme-default\styles\components\custom-block.css

node_modules\vitepress\dist\client\theme-default\styles\vars.css
```
:::

```css
/* .vitepress\theme\style\var.css */
/* 提示框背景颜色 */
:root {
  --vp-custom-block-tip-bg: var(--vp-c-green-soft);
}

/* 提示框 */
.custom-block.tip {
  border-color: var(--vp-c-green-2);
}

/* 警告框 */
.custom-block.warning {
  /* border-color: #d97706; */
  border-color: var(--vp-c-yellow-2);
}

/* 危险框 */
.custom-block.danger {
  /* border-color: #f43f5e; */
  border-color: var(--vp-c-red-2);
}

```

看看效果

::: tip 提示
改为边框+绿色
:::


::: warning 警告
改为边框+橘色
:::

::: danger 危险
改为边框+红色
:::


---



### 引用颜色

在Markdown中我们常用的引用符号 `>`，在Vitepress中是一个灰色样式，我们可以稍微改动一下

```css
/* .vitepress\theme\style\var.css */
/* 引用块 */
.vp-doc blockquote {
  border-radius: 5px;
  padding: 10px 16px;
  background-color: var(--vp-badge-danger-bg);
  position: relative;
  border-left: 4px solid #e95f59;
}
```

输入：

```md
> 更新时间：2024年
```

输出：

> 更新时间：2024年


---

### 视图过渡

请先了解过 [组件的使用](./components.md) 后再来看 

可以扩展默认主题以在切换颜色模式时提供自定义过渡动画。例如：

::: details 点我查看详细代码
```vue
<!-- .vitepress/theme/Layout.vue -->

<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
```
:::



效果：

![](https://vitepress.dev/appearance-toggle-transition.webp)

有关视图过渡动画的更多详细信息，请参阅 [Chrome 文档](https://developer.chrome.com/docs/web-platform/view-transitions/)。





## 其他美化

太多了，可以参照源文件来进行修改

::: tip 说明
主色调都是引用的indigo，你也可以去换`indigo`，反正怎么改都可以
:::


```
node_modules\vitepress\dist\client\theme-default\styles\var.css
```

::: details 点我查看源代码

```css
/**
 * Colors: Solid
 * -------------------------------------------------------------------------- */

:root {
  --vp-c-white: #ffffff;
  --vp-c-black: #000000;

  --vp-c-neutral: var(--vp-c-black);
  --vp-c-neutral-inverse: var(--vp-c-white);
}

.dark {
  --vp-c-neutral: var(--vp-c-white);
  --vp-c-neutral-inverse: var(--vp-c-black);
}

/**
 * Colors: Palette
 *
 * The primitive colors used for accent colors. These colors are referenced
 * by functional colors such as "Text", "Background", or "Brand".
 *
 * Each colors have exact same color scale system with 3 levels of solid
 * colors with different brightness, and 1 soft color.
 *
 * - `XXX-1`: The most solid color used mainly for colored text. It must
 *   satisfy the contrast ratio against when used on top of `XXX-soft`.
 *
 * - `XXX-2`: The color used mainly for hover state of the button.
 *
 * - `XXX-3`: The color for solid background, such as bg color of the button.
 *    It must satisfy the contrast ratio with pure white (#ffffff) text on
 *    top of it.
 *
 * - `XXX-soft`: The color used for subtle background such as custom container
 *    or badges. It must satisfy the contrast ratio when putting `XXX-1` colors
 *    on top of it.
 *
 *    The soft color must be semi transparent alpha channel. This is crucial
 *    because it allows adding multiple "soft" colors on top of each other
 *    to create a accent, such as when having inline code block inside
 *    custom containers.
 * -------------------------------------------------------------------------- */

:root {
  --vp-c-gray-1: #dddde3;
  --vp-c-gray-2: #e4e4e9;
  --vp-c-gray-3: #ebebef;
  --vp-c-gray-soft: rgba(142, 150, 170, 0.14);

  --vp-c-indigo-1: #3451b2;
  --vp-c-indigo-2: #3a5ccc;
  --vp-c-indigo-3: #5672cd;
  --vp-c-indigo-soft: rgba(100, 108, 255, 0.14);

  --vp-c-green-1: #18794e;
  --vp-c-green-2: #299764;
  --vp-c-green-3: #30a46c;
  --vp-c-green-soft: rgba(16, 185, 129, 0.14);

  --vp-c-yellow-1: #915930;
  --vp-c-yellow-2: #946300;
  --vp-c-yellow-3: #9f6a00;
  --vp-c-yellow-soft: rgba(234, 179, 8, 0.14);

  --vp-c-red-1: #b8272c;
  --vp-c-red-2: #d5393e;
  --vp-c-red-3: #e0575b;
  --vp-c-red-soft: rgba(244, 63, 94, 0.14);

  --vp-c-sponsor: #db2777;
}

.dark {
  --vp-c-gray-1: #515c67;
  --vp-c-gray-2: #414853;
  --vp-c-gray-3: #32363f;
  --vp-c-gray-soft: rgba(101, 117, 133, 0.16);

  --vp-c-indigo-1: #a8b1ff;
  --vp-c-indigo-2: #5c73e7;
  --vp-c-indigo-3: #3e63dd;
  --vp-c-indigo-soft: rgba(100, 108, 255, 0.16);

  --vp-c-green-1: #3dd68c;
  --vp-c-green-2: #30a46c;
  --vp-c-green-3: #298459;
  --vp-c-green-soft: rgba(16, 185, 129, 0.16);

  --vp-c-yellow-1: #f9b44e;
  --vp-c-yellow-2: #da8b17;
  --vp-c-yellow-3: #a46a0a;
  --vp-c-yellow-soft: rgba(234, 179, 8, 0.16);

  --vp-c-red-1: #f66f81;
  --vp-c-red-2: #f14158;
  --vp-c-red-3: #b62a3c;
  --vp-c-red-soft: rgba(244, 63, 94, 0.16);
}

/**
 * Colors: Background
 *
 * - `bg`: The bg color used for main screen.
 *
 * - `bg-alt`: The alternative bg color used in places such as "sidebar",
 *   or "code block".
 *
 * - `bg-elv`: The elevated bg color. This is used at parts where it "floats",
 *   such as "dialog".
 *
 * - `bg-soft`: The bg color to slightly distinguish some components from
 *   the page. Used for things like "carbon ads" or "table".
 * -------------------------------------------------------------------------- */

:root {
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f6f6f7;
  --vp-c-bg-elv: #ffffff;
  --vp-c-bg-soft: #f6f6f7;
}

.dark {
  --vp-c-bg: #1b1b1f;
  --vp-c-bg-alt: #161618;
  --vp-c-bg-elv: #202127;
  --vp-c-bg-soft: #202127;
}

/**
 * Colors: Borders
 *
 * - `divider`: This is used for separators. This is used to divide sections
 *   within the same components, such as having separator on "h2" heading.
 *
 * - `border`: This is designed for borders on interactive components.
 *   For example this should be used for a button outline.
 *
 * - `gutter`: This is used to divide components in the page. For example
 *   the header and the lest of the page.
 * -------------------------------------------------------------------------- */

:root {
  --vp-c-border: #c2c2c4;
  --vp-c-divider: #e2e2e3;
  --vp-c-gutter: #e2e2e3;
}

.dark {
  --vp-c-border: #3c3f44;
  --vp-c-divider: #2e2e32;
  --vp-c-gutter: #000000;
}

/**
 * Colors: Text
 *
 * - `text-1`: Used for primary text.
 *
 * - `text-2`: Used for muted texts, such as "inactive menu" or "info texts".
 *
 * - `text-3`: Used for subtle texts, such as "placeholders" or "caret icon".
 * -------------------------------------------------------------------------- */

:root {
  --vp-c-text-1: rgba(60, 60, 67);
  --vp-c-text-2: rgba(60, 60, 67, 0.78);
  --vp-c-text-3: rgba(60, 60, 67, 0.56);
}

.dark {
  --vp-c-text-1: rgba(255, 255, 245, 0.86);
  --vp-c-text-2: rgba(235, 235, 245, 0.6);
  --vp-c-text-3: rgba(235, 235, 245, 0.38);
}

/**
 * Colors: Function
 *
 * - `default`: The color used purely for subtle indication without any
 *   special meanings attached to it such as bg color for menu hover state.
 *
 * - `brand`: Used for primary brand colors, such as link text, button with
 *   brand theme, etc.
 *
 * - `tip`: Used to indicate useful information. The default theme uses the
 *   brand color for this by default.
 *
 * - `warning`: Used to indicate warning to the users. Used in custom
 *   container, badges, etc.
 *
 * - `danger`: Used to show error, or dangerous message to the users. Used
 *   in custom container, badges, etc.
 *
 * To understand the scaling system, refer to "Colors: Palette" section.
 * -------------------------------------------------------------------------- */

:root {
  --vp-c-default-1: var(--vp-c-gray-1);
  --vp-c-default-2: var(--vp-c-gray-2);
  --vp-c-default-3: var(--vp-c-gray-3);
  --vp-c-default-soft: var(--vp-c-gray-soft);

  --vp-c-brand-1: var(--vp-c-indigo-1);
  --vp-c-brand-2: var(--vp-c-indigo-2);
  --vp-c-brand-3: var(--vp-c-indigo-3);
  --vp-c-brand-soft: var(--vp-c-indigo-soft);

  /* DEPRECATED: Use `--vp-c-brand-1` instead. */
  --vp-c-brand: var(--vp-c-brand-1);

  --vp-c-tip-1: var(--vp-c-brand-1);
  --vp-c-tip-2: var(--vp-c-brand-2);
  --vp-c-tip-3: var(--vp-c-brand-3);
  --vp-c-tip-soft: var(--vp-c-brand-soft);

  --vp-c-warning-1: var(--vp-c-yellow-1);
  --vp-c-warning-2: var(--vp-c-yellow-2);
  --vp-c-warning-3: var(--vp-c-yellow-3);
  --vp-c-warning-soft: var(--vp-c-yellow-soft);

  --vp-c-danger-1: var(--vp-c-red-1);
  --vp-c-danger-2: var(--vp-c-red-2);
  --vp-c-danger-3: var(--vp-c-red-3);
  --vp-c-danger-soft: var(--vp-c-red-soft);
}

/**
 * Typography
 * -------------------------------------------------------------------------- */

:root {
  --vp-font-family-base: 'Chinese Quotes', 'Inter var', 'Inter', ui-sans-serif,
    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Helvetica, Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --vp-font-family-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
}

/**
 * Shadows
 * -------------------------------------------------------------------------- */

:root {
  --vp-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  --vp-shadow-2: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);
  --vp-shadow-3: 0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08);
  --vp-shadow-4: 0 14px 44px rgba(0, 0, 0, 0.12), 0 3px 9px rgba(0, 0, 0, 0.12);
  --vp-shadow-5: 0 18px 56px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.16);
}

/**
 * Z-indexes
 * -------------------------------------------------------------------------- */

:root {
  --vp-z-index-footer: 10;
  --vp-z-index-local-nav: 20;
  --vp-z-index-nav: 30;
  --vp-z-index-layout-top: 40;
  --vp-z-index-backdrop: 50;
  --vp-z-index-sidebar: 60;
}

/**
 * Icons
 * -------------------------------------------------------------------------- */

:root {
  --vp-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
  --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E");
}

/**
 * Layouts
 * -------------------------------------------------------------------------- */

:root {
  --vp-layout-max-width: 1440px;
}

/**
 * Component: Header Anchor
 * -------------------------------------------------------------------------- */

:root {
  --vp-header-anchor-symbol: '#';
}

/**
 * Component: Code
 * -------------------------------------------------------------------------- */

:root {
  --vp-code-line-height: 1.7;
  --vp-code-font-size: 0.875em;
  --vp-code-color: var(--vp-c-brand-1);
  --vp-code-link-color: var(--vp-c-brand-1);
  --vp-code-link-hover-color: var(--vp-c-brand-2);
  --vp-code-bg: var(--vp-c-default-soft);

  --vp-code-block-color: var(--vp-c-text-2);
  --vp-code-block-bg: var(--vp-c-bg-alt);
  --vp-code-block-divider-color: var(--vp-c-gutter);

  --vp-code-lang-color: var(--vp-c-text-3);

  --vp-code-line-highlight-color: var(--vp-c-default-soft);
  --vp-code-line-number-color: var(--vp-c-text-3);

  --vp-code-line-diff-add-color: var(--vp-c-green-soft);
  --vp-code-line-diff-add-symbol-color: var(--vp-c-green-1);

  --vp-code-line-diff-remove-color: var(--vp-c-red-soft);
  --vp-code-line-diff-remove-symbol-color: var(--vp-c-red-1);

  --vp-code-line-warning-color: var(--vp-c-yellow-soft);
  --vp-code-line-error-color: var(--vp-c-red-soft);

  --vp-code-copy-code-border-color: var(--vp-c-divider);
  --vp-code-copy-code-bg: var(--vp-c-bg-soft);
  --vp-code-copy-code-hover-border-color: var(--vp-c-divider);
  --vp-code-copy-code-hover-bg: var(--vp-c-bg);
  --vp-code-copy-code-active-text: var(--vp-c-text-2);
  --vp-code-copy-copied-text-content: 'Copied';

  --vp-code-tab-divider: var(--vp-code-block-divider-color);
  --vp-code-tab-text-color: var(--vp-c-text-2);
  --vp-code-tab-bg: var(--vp-code-block-bg);
  --vp-code-tab-hover-text-color: var(--vp-c-text-1);
  --vp-code-tab-active-text-color: var(--vp-c-text-1);
  --vp-code-tab-active-bar-color: var(--vp-c-brand-1);
}

/**
 * Component: Button
 * -------------------------------------------------------------------------- */

:root {
  --vp-button-brand-border: transparent;
  --vp-button-brand-text: var(--vp-c-white);
  --vp-button-brand-bg: var(--vp-c-brand-3);
  --vp-button-brand-hover-border: transparent;
  --vp-button-brand-hover-text: var(--vp-c-white);
  --vp-button-brand-hover-bg: var(--vp-c-brand-2);
  --vp-button-brand-active-border: transparent;
  --vp-button-brand-active-text: var(--vp-c-white);
  --vp-button-brand-active-bg: var(--vp-c-brand-1);

  --vp-button-alt-border: transparent;
  --vp-button-alt-text: var(--vp-c-text-1);
  --vp-button-alt-bg: var(--vp-c-default-3);
  --vp-button-alt-hover-border: transparent;
  --vp-button-alt-hover-text: var(--vp-c-text-1);
  --vp-button-alt-hover-bg: var(--vp-c-default-2);
  --vp-button-alt-active-border: transparent;
  --vp-button-alt-active-text: var(--vp-c-text-1);
  --vp-button-alt-active-bg: var(--vp-c-default-1);

  --vp-button-sponsor-border: var(--vp-c-text-2);
  --vp-button-sponsor-text: var(--vp-c-text-2);
  --vp-button-sponsor-bg: transparent;
  --vp-button-sponsor-hover-border: var(--vp-c-sponsor);
  --vp-button-sponsor-hover-text: var(--vp-c-sponsor);
  --vp-button-sponsor-hover-bg: transparent;
  --vp-button-sponsor-active-border: var(--vp-c-sponsor);
  --vp-button-sponsor-active-text: var(--vp-c-sponsor);
  --vp-button-sponsor-active-bg: transparent;
}

/**
 * Component: Custom Block
 * -------------------------------------------------------------------------- */

:root {
  --vp-custom-block-font-size: 14px;
  --vp-custom-block-code-font-size: 13px;

  --vp-custom-block-info-border: transparent;
  --vp-custom-block-info-text: var(--vp-c-text-1);
  --vp-custom-block-info-bg: var(--vp-c-default-soft);
  --vp-custom-block-info-code-bg: var(--vp-c-default-soft);

  --vp-custom-block-tip-border: transparent;
  --vp-custom-block-tip-text: var(--vp-c-text-1);
  --vp-custom-block-tip-bg: var(--vp-c-brand-soft);
  --vp-custom-block-tip-code-bg: var(--vp-c-brand-soft);

  --vp-custom-block-warning-border: transparent;
  --vp-custom-block-warning-text: var(--vp-c-text-1);
  --vp-custom-block-warning-bg: var(--vp-c-warning-soft);
  --vp-custom-block-warning-code-bg: var(--vp-c-warning-soft);

  --vp-custom-block-danger-border: transparent;
  --vp-custom-block-danger-text: var(--vp-c-text-1);
  --vp-custom-block-danger-bg: var(--vp-c-danger-soft);
  --vp-custom-block-danger-code-bg: var(--vp-c-danger-soft);

  --vp-custom-block-details-border: var(--vp-custom-block-info-border);
  --vp-custom-block-details-text: var(--vp-custom-block-info-text);
  --vp-custom-block-details-bg: var(--vp-custom-block-info-bg);
  --vp-custom-block-details-code-bg: var(--vp-custom-block-info-code-bg);
}

/**
 * Component: Input
 * -------------------------------------------------------------------------- */

:root {
  --vp-input-border-color: var(--vp-c-border);
  --vp-input-bg-color: var(--vp-c-bg-alt);

  --vp-input-switch-bg-color: var(--vp-c-gray-soft);
}

/**
 * Component: Nav
 * -------------------------------------------------------------------------- */

:root {
  --vp-nav-height: 64px;
  --vp-nav-bg-color: var(--vp-c-bg);
  --vp-nav-screen-bg-color: var(--vp-c-bg);
  --vp-nav-logo-height: 24px;
}

.hide-nav {
  --vp-nav-height: 0px;
}

.hide-nav .VPSidebar {
  --vp-nav-height: 22px;
}

/**
 * Component: Local Nav
 * -------------------------------------------------------------------------- */

:root {
  --vp-local-nav-bg-color: var(--vp-c-bg);
}

/**
 * Component: Sidebar
 * -------------------------------------------------------------------------- */

:root {
  --vp-sidebar-width: 272px;
  --vp-sidebar-bg-color: var(--vp-c-bg-alt);
}

/**
 * Colors Backdrop
 * -------------------------------------------------------------------------- */

:root {
  --vp-backdrop-bg-color: rgba(0, 0, 0, 0.6);
}

/**
 * Component: Home
 * -------------------------------------------------------------------------- */

:root {
  --vp-home-hero-name-color: var(--vp-c-brand-1);
  --vp-home-hero-name-background: transparent;

  --vp-home-hero-image-background-image: none;
  --vp-home-hero-image-filter: none;
}

/**
 * Component: Badge
 * -------------------------------------------------------------------------- */

:root {
  --vp-badge-info-border: transparent;
  --vp-badge-info-text: var(--vp-c-text-2);
  --vp-badge-info-bg: var(--vp-c-default-soft);

  --vp-badge-tip-border: transparent;
  --vp-badge-tip-text: var(--vp-c-brand-1);
  --vp-badge-tip-bg: var(--vp-c-brand-soft);

  --vp-badge-warning-border: transparent;
  --vp-badge-warning-text: var(--vp-c-warning-1);
  --vp-badge-warning-bg: var(--vp-c-warning-soft);

  --vp-badge-danger-border: transparent;
  --vp-badge-danger-text: var(--vp-c-danger-1);
  --vp-badge-danger-bg: var(--vp-c-danger-soft);
}

/**
 * Component: Carbon Ads
 * -------------------------------------------------------------------------- */

:root {
  --vp-carbon-ads-text-color: var(--vp-c-text-1);
  --vp-carbon-ads-poweredby-color: var(--vp-c-text-2);
  --vp-carbon-ads-bg-color: var(--vp-c-bg-soft);
  --vp-carbon-ads-hover-text-color: var(--vp-c-brand-1);
  --vp-carbon-ads-hover-poweredby-color: var(--vp-c-text-1);
}

/**
  * Component: Local Search
  * -------------------------------------------------------------------------- */

:root {
  --vp-local-search-bg: var(--vp-c-bg);
  --vp-local-search-result-bg: var(--vp-c-bg);
  --vp-local-search-result-border: var(--vp-c-divider);
  --vp-local-search-result-selected-bg: var(--vp-c-bg);
  --vp-local-search-result-selected-border: var(--vp-c-brand-1);
  --vp-local-search-highlight-bg: var(--vp-c-brand-1);
  --vp-local-search-highlight-text: var(--vp-c-neutral-inverse);
}

```
:::



---


### 链接图标

在 [Vuejs官网的快速上手](https://cn.vuejs.org/guide/quick-start.html) 中 链接前有个图标，怎么做到呢

在 `var.css` 中添加代码

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ link.css
│  └─ index.md
└─ node_modules
```

分别添加了 [油管](https://www.youtube.com/) 和 [B站](https://www.bilibili.com/) 的链接图标

::: details 使用说明
多个链接，分别添加即可

`content` 可使用Emoji，自行修改好位置即可
:::

```css{2,4}
/* .vitepress\theme\style\link.css */
.vp-doc a[href^="https://www.youtube.com/"]:before,[href^="https://www.bilibili.com/"]:before
{
  content: '➹';
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 10px;
  vertical-align: middle;
  position: relative;
  top: -2px;
  color: var(--vp-c-green-1);
  font-size: 13px;
  border: 3px solid var(--vp-c-green-1);
  margin-right: 8px;
  margin-left: 4px;
  line-height: 15px;
  padding-left: 1.5px;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress\theme\style\index.css */
@import './link.css';
```


输入：

```md
油管链接图标：[Youtube](https://www.youtube.com/)

B站链接图标：[哔哩哔哩](https://www.bilibili.com/)
```

输出：

油管链接图标：[Youtube](https://www.youtube.com/)

B站链接图标：[哔哩哔哩](https://www.bilibili.com/)


---






### 链接卡片 

::: tip 说明
方法参考自 [vuejs官网](https://cn.vuejs.org/guide/introduction.html) 的 [中文仓库](https://github.com/vuejs-translations/docs-zh-cn)
:::

在 `.vitepress\theme\style\` 目录新建一个 `linkcard.css` 文件


```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ linkcard.css
│  └─ index.md
└─ node_modules
```

粘贴如下代码，保存


```css
/* .vitepress\theme\style\linkcard.css */

/* 卡片背景 */
.linkcard {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
  transition: color 0.5s, background-color 0.5s;
}

/* 卡片鼠标悬停 */
.linkcard:hover {
  background-color: var(--vp-c-yellow-soft);
}

/* 链接样式 */
.linkcard a {
  display: flex;
  align-items: center;
}

/* 描述链接文字 */
.linkcard .description {
  flex: 1;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: var(--vp-c-text-1);
  margin: 0 0 0 16px;
  transition: color 0.5s;
}

/* 描述链接文字2 */
.linkcard .description span {
  font-size: 14px;
}

/* logo图片 */
.linkcard .logo img {
  width: 80px;
  object-fit: contain;
}

/* 链接下划线去除 */
.vp-doc a {
  text-decoration: none;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress\theme\style\index.css */
@import './linkcard.css';
```


输入：

```md
<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://vitepress.yiov.top/logo.png" />
    </div>
  </a>
</div>
```

输出：

<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://vitepress.yiov.top/logo.png" />
    </div>
  </a>
</div>



---


### 代码组风格

将代码组改成Mac风格，三个小圆点

在 `.vitepress\theme\style\` 目录新建一个 `vp-code-group.css` 文件


```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ vp-code-group.css
│  └─ index.md
└─ node_modules
```

粘贴如下代码，保存


```css
/* .vitepress\theme\style\vp-code-group.css */

/* 代码块tab */
.vp-code-group .tabs {
    padding-top: 30px;
}

/* 代码块tab-顶部小圆点 */
.vp-code-group .tabs::before {
    background: #fc625d;
    border-radius: 50%;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    content: ' ';
    height: 12px;
    width: 12px;
    left: 12px;
    margin-top: -20px;
    position: absolute;
}


/* 代码组 */
.vp-code-group {
    color: var(--vp-c-black-soft);
    border-radius: 8px;
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

```

然后在 `index.css` 中引入生效

```css
/* .vitepress\theme\style\index.css */
@import './vp-code-group.css';
```

输入：

````md
::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

:::
````



输出：


::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```
:::

修改默认单个代码块，就会影响到代码组

如果你想单个使用，在 `code-group` 只写入一组即可


输入：

````md
::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```
:::
````

输出：

::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```
:::


---


### 代码精简

当我们的内容多了，在 `config.mts` 中配置导航和侧边栏，翻就要半天了


所以那就来个简化导航栏，其他同理

在 `.vitepress` 目录新建 `config` 文件夹，并新建 `index.ts` 文件


```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ configs      <- 配置文件夹
│  │     └─ index.ts
│  └─ index.md
└─ node_modules
```

然后复制粘贴到 `index.ts` 并保存下面代码

```ts
/* configs/index.ts */
export * from './nav'
```


然后再新建 `nav.ts` 文件

```md{7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ configs      
│  │     └─ index.ts
│  │     └─ nav.ts     <- 导航配置
│  └─ index.md
└─ node_modules
```

同样复制粘贴并保存

```ts
/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: 'VitePress', link: 'https://vitepress.dev/' },
  {
    text: '1.0.0-rc.**',
    items: [
      { text: '更新日志', link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md' },
      { text: '贡献', link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md' },
      ],
  },
]
```


最后我们回到 `config.mts` 中引入配置

```ts{3,8-9}
import { defineConfig } from 'vitepress'

import { nav } from './configs'

export default defineConfig({
  //主题配置
  themeConfig: {
    //导航栏
    nav,
  }
})
```









## 徽章

也可以叫徽标，无论文档还是github项目都会见到这种

![](https://vuepress.yiov.top/assets/vuepress-37-83d44ec7.png)

官网：https://shields.io/

选择要生成的徽标，生成后，选择Markdown格式即可，旁边都有示例不难

::: tip 其他徽标
https://badgen.net/

https://forthebadge.com/

https://badge.fury.io/
:::


### 组成

由三部分组成：标签、消息和颜色，其中标签可以不写，但消息和颜色必须存在！

格式：`label-message-color`(由左至右)

* label：标签

* message：消息

* color：颜色

---

### 实操

在输入框输入 `any text-you like-blue`

::: tip 说明
用 `_` 或 `%20`表示空格，`-` 分隔内容

如果你想要输入一个真的 `-` ，那么用两个 `--` 来表示一个真的 `-`
:::

生成链接：https://img.shields.io/badge/any_text-you_like-blue

输入：

```md
![](https://img.shields.io/badge/any_text-you_like-blue)
```

输出：

![](https://img.shields.io/badge/any_text-you_like-blue)


如果不写标签，只写消息和颜色的话，输入 `just_do_it-8A2BE2`


生成链接：https://img.shields.io/badge/just_do_it-8A2BE2

输入：

```md
![](https://img.shields.io/badge/just_do_it-8A2BE2)
```

输出：

![](https://img.shields.io/badge/just_do_it-8A2BE2)


点击输入框下面的 `Show optional parameters` 展开更多详细信息

我随机填了一些信息，logo可以使用 [Simple Icons](https://simpleicons.org/)

生成链接：https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=red

输入：

```md
![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)
```

输出：

![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)


静态徽章做跳转的话，可以直接使用markdown格式

```md
[![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)](https://shields.io/badges)
```

效果：
[![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)](https://shields.io/badges)


::: warning 关于其他动态徽章
可以参照官网，挨个摸索并不难上手
:::


---

### 效果演示

::: tip 更多徽章样式
https://github.com/Ileriayo/markdown-badges

https://github.com/Envoy-VC/awesome-badges
:::

::: details 这里引用 [查尔斯](https://blog.charles7c.top/about/me) 的页面展示
```md
#### 后端技术栈

<p>
  <img src="https://img.shields.io/badge/-Spring-6DB33F?logo=Spring&logoColor=FFF" alt="Spring" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=Spring-Boot&logoColor=FFF" alt="Spring Boot" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MySQL-4479A1?logo=MySQL&logoColor=FFF" alt="MySQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MariaDB-A9A9A9?logo=MariaDB&logoColor=003545" alt="MariaDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PostgreSQL-C0C0C0?logo=PostgreSQL&logoColor=4169E1" alt="PostgreSQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Oracle-C0C0C0?logo=Oracle&logoColor=F80000" alt="Oracle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Microsoft%20SQL%20Server-D3D3D3?logo=Microsoft-SQL-Server&logoColor=CC2927" alt="Microsoft SQL Server" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Redis-DC382D?logo=Redis&logoColor=FFF" alt="Redis" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MongoDB-47A248?logo=MongoDB&logoColor=FFF" alt="MongoDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-RabbitMQ-FF6600?logo=RabbitMQ&logoColor=FFF" alt="RabbitMQ" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Solr-D9411E?logo=Apache-Solr&logoColor=FFF" alt="Solr" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ElasticSearch-005571?logo=ElasticSearch&logoColor=FFF" alt="ElasticSearch" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Logstash-A9A9A9?logo=Logstash&logoColor=005571" alt="Logstash" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kibana-A9A9A9?logo=Kibana&logoColor=005571" alt="Kibana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kafka-C0C0C0?logo=Apache-Kafka&logoColor=231F20" alt="Kafka" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Consul-F24C53?logo=Consul&logoColor=FFF" alt="Consul" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tomcat-F8DC75?logo=Apache-Tomcat&logoColor=000" alt="Tomcat" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JUnit5-25A162?logo=JUnit5&logoColor=FFF" alt="JUnit5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Liquibase-2962FF?logo=Liquibase&logoColor=FFF" alt="Liquibase" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Maven-C71A36?logo=Apache-Maven&logoColor=FFF" alt="Maven" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gradle-D3D3D3?logo=Gradle&logoColor=02303A" alt="Gradle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Security-6DB33F?logo=Spring-Security&logoColor=FFF" alt="Spring Security" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Hibernate-59666C?logo=Hibernate&logoColor=FFF" alt="Hibernate" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JSON-000?logo=JSON&logoColor=FFF" alt="JSON" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JWT-000?logo=JSON-Web-Tokens&logoColor=FFF" alt="JWT" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Java-F78C40?logo=OpenJDK&logoColor=FFF" alt="Java" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Python-A9A9A9?logo=Python&logoColor=3776AB" alt="Python" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android-C0C0C0?logo=Android&logoColor=3DDC84" alt="Android" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Go-DCDCDC?logo=Go&logoColor=00ADD8" alt="Go" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GraphQL-FFF?logo=GraphQL&logoColor=E10098" alt="GraphQL" style="display: inline-block;" />&nbsp;
</p>

#### 前端技术栈

<p>
  <img src="https://img.shields.io/badge/-Vue3-C0C0C0?logo=Vue.js&logoColor=4FC08D" alt="Vue3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-TypeScript-C0C0C0?logo=TypeScript&logoColor=3178C6" alt="TypeScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ant%20Design-C0C0C0?logo=Ant-Design&logoColor=0170FE" alt="Ant Design" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Node.js-D3D3D3?logo=Node.js&logoColor=339933" alt="Node.js" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Vite-D3D3D3?logo=Vite&logoColor=646CFF" alt="Vite" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Webpack-D3D3D3?logo=Webpack&logoColor=8DD6F9" alt="Webpack" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-NPM-C0C0C0?logo=npm&logoColor=CB3837" alt="NPM" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Axios-C0C0C0?logo=Axios&logoColor=5A29E4" alt="Axios" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-C0C0C0?logo=ESLint&logoColor=4B32C3" alt="ESLint" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-jQuery-0769AD?logo=jQuery&logoColor=FFF" alt="jQuery" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Bootstrap-7952B3?logo=Bootstrap&logoColor=FFF" alt="BootStrap" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ECharts-C0C0C0?logo=Apache-ECharts&logoColor=AA344D" alt="ECharts" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JavaScript-A9A9A9?logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-HTML5-A9A9A9?logo=HTML5&logoColor=E34F26" alt="HTML5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CSS3-A9A9A9?logo=CSS3&logoColor=1572B6" alt="CSS3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tailwind%20CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4" alt="Tailwind CSS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Less-D3D3D3?logo=Less&logoColor=1D365D" alt="Less" style="display: inline-block;" />&nbsp;
</p>

#### DevOps

<p>
  <img src="https://img.shields.io/badge/-Git-F05032?logo=Git&logoColor=FFF" alt="Git" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub-181717?logo=GitHub&logoColor=FFF" alt="GitHub" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gitee-C71D23?logo=Gitee&logoColor=FFF" alt="Gitee" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitLab-FC6D26?logo=GitLab&logoColor=FFF" alt="gitlab" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Actions-2088FF?logo=GitHub-Actions&logoColor=FFF" alt="GitHub Actions" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Jenkins-D24939?logo=Jenkins&logoColor=000" alt="Jenkins" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-SonarQube-A9A9A9?logo=SonarQube&logoColor=4E9BCD" alt="SonarQube" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Docker-2496ED?logo=Docker&logoColor=FFF" alt="Docker" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Harbor-FFF?logo=Harbor&logoColor=60B932" alt="Harbor" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kubernetes-326CE5?logo=Kubernetes&logoColor=FFF" alt="Kubernetes" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CentOS-262577?logo=CentOS&logoColor=FFF" alt="CentOS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ubuntu-E95420?logo=Ubuntu&logoColor=FFF" alt="Ubuntu" style="display: inline-block;" />&nbsp;
</p>

#### 运维技术栈

<p>
  <img src="https://img.shields.io/badge/-阿里云-FF6A00?logo=Alibaba-Cloud&logoColor=FFF" alt="阿里云" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Nginx-009639?logo=Nginx&logoColor=FFF" alt="Nginx" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VMware-607078?logo=VMware&logoColor=FFF" alt="VMware" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Prometheus-C0C0C0?logo=Prometheus&logoColor=E6522C" alt="Prometheus" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Grafana-DCDCDC?logo=Grafana&logoColor=F46800" alt="Grafana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ansible-FFF?logo=Ansible&logoColor=EE0000" alt="Ansible" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Lua-FFF?&logo=Lua&logoColor=2C2D72" alt="Lua" style="display: inline-block;" />&nbsp;
</p>

#### 测试技术栈

<p>
  <img src="https://img.shields.io/badge/-Postman-FF6C37?logo=Postman&logoColor=FFF" alt="Postman" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JMeter-D3D3D3?logo=Apache-JMeter&logoColor=D22128" alt="JMeter" style="display: inline-block;" />&nbsp;
</p>

#### 开发工具

<p>
  <img src="https://img.shields.io/badge/-Intellij%20IDEA-000?logo=Intellij-IDEA&logoColor=FFF" alt="Intellij IDEA" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Eclipse-2C2255?logo=Eclipse&logoColor=FFF" alt="Eclipse" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WebStorm-000?logo=WebStorm&logoColor=FFF" alt="WebStorm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PyCharm-C0C0C0?logo=PyCharm&logoColor=000" alt="PyCharm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android%20Studio-C0C0C0?logo=Android-Studio&logoColor=3DDC84" alt="Android Studio" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VSCode-C0C0C0?logo=Visual-Studio-Code&logoColor=007ACC" alt="VSCode" style="display: inline-block;" />&nbsp;
</p>

#### 其他

<p>
  <img src="https://img.shields.io/badge/-Markdown-000?logo=Markdown&logoColor=FFF" alt="Markdown" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WordPress-21759B?logo=WordPress&logoColor=FFF" alt="WordPress" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Pages-222?logo=GitHub-Pages&logoColor=FFF" alt="GitHub Pages" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Adobe%20Photoshop-A9A9A9?logo=Adobe-Photoshop&logoColor=31A8FF" alt="Adobe Photoshop" style="display: inline-block;" />&nbsp;
</p>
```
:::



效果：

#### 后端技术栈

<p>
  <img src="https://img.shields.io/badge/-Spring-6DB33F?logo=Spring&logoColor=FFF" alt="Spring" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=Spring-Boot&logoColor=FFF" alt="Spring Boot" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MySQL-4479A1?logo=MySQL&logoColor=FFF" alt="MySQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MariaDB-A9A9A9?logo=MariaDB&logoColor=003545" alt="MariaDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PostgreSQL-C0C0C0?logo=PostgreSQL&logoColor=4169E1" alt="PostgreSQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Oracle-C0C0C0?logo=Oracle&logoColor=F80000" alt="Oracle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Microsoft%20SQL%20Server-D3D3D3?logo=Microsoft-SQL-Server&logoColor=CC2927" alt="Microsoft SQL Server" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Redis-DC382D?logo=Redis&logoColor=FFF" alt="Redis" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MongoDB-47A248?logo=MongoDB&logoColor=FFF" alt="MongoDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-RabbitMQ-FF6600?logo=RabbitMQ&logoColor=FFF" alt="RabbitMQ" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Solr-D9411E?logo=Apache-Solr&logoColor=FFF" alt="Solr" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ElasticSearch-005571?logo=ElasticSearch&logoColor=FFF" alt="ElasticSearch" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Logstash-A9A9A9?logo=Logstash&logoColor=005571" alt="Logstash" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kibana-A9A9A9?logo=Kibana&logoColor=005571" alt="Kibana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kafka-C0C0C0?logo=Apache-Kafka&logoColor=231F20" alt="Kafka" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Consul-F24C53?logo=Consul&logoColor=FFF" alt="Consul" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tomcat-F8DC75?logo=Apache-Tomcat&logoColor=000" alt="Tomcat" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JUnit5-25A162?logo=JUnit5&logoColor=FFF" alt="JUnit5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Liquibase-2962FF?logo=Liquibase&logoColor=FFF" alt="Liquibase" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Maven-C71A36?logo=Apache-Maven&logoColor=FFF" alt="Maven" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gradle-D3D3D3?logo=Gradle&logoColor=02303A" alt="Gradle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Security-6DB33F?logo=Spring-Security&logoColor=FFF" alt="Spring Security" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Hibernate-59666C?logo=Hibernate&logoColor=FFF" alt="Hibernate" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JSON-000?logo=JSON&logoColor=FFF" alt="JSON" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JWT-000?logo=JSON-Web-Tokens&logoColor=FFF" alt="JWT" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Java-F78C40?logo=OpenJDK&logoColor=FFF" alt="Java" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Python-A9A9A9?logo=Python&logoColor=3776AB" alt="Python" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android-C0C0C0?logo=Android&logoColor=3DDC84" alt="Android" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Go-DCDCDC?logo=Go&logoColor=00ADD8" alt="Go" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GraphQL-FFF?logo=GraphQL&logoColor=E10098" alt="GraphQL" style="display: inline-block;" />&nbsp;
</p>

#### 前端技术栈

<p>
  <img src="https://img.shields.io/badge/-Vue3-C0C0C0?logo=Vue.js&logoColor=4FC08D" alt="Vue3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-TypeScript-C0C0C0?logo=TypeScript&logoColor=3178C6" alt="TypeScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ant%20Design-C0C0C0?logo=Ant-Design&logoColor=0170FE" alt="Ant Design" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Node.js-D3D3D3?logo=Node.js&logoColor=339933" alt="Node.js" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Vite-D3D3D3?logo=Vite&logoColor=646CFF" alt="Vite" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Webpack-D3D3D3?logo=Webpack&logoColor=8DD6F9" alt="Webpack" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-NPM-C0C0C0?logo=npm&logoColor=CB3837" alt="NPM" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Axios-C0C0C0?logo=Axios&logoColor=5A29E4" alt="Axios" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-C0C0C0?logo=ESLint&logoColor=4B32C3" alt="ESLint" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-jQuery-0769AD?logo=jQuery&logoColor=FFF" alt="jQuery" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Bootstrap-7952B3?logo=Bootstrap&logoColor=FFF" alt="BootStrap" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ECharts-C0C0C0?logo=Apache-ECharts&logoColor=AA344D" alt="ECharts" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JavaScript-A9A9A9?logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-HTML5-A9A9A9?logo=HTML5&logoColor=E34F26" alt="HTML5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CSS3-A9A9A9?logo=CSS3&logoColor=1572B6" alt="CSS3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tailwind%20CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4" alt="Tailwind CSS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Less-D3D3D3?logo=Less&logoColor=1D365D" alt="Less" style="display: inline-block;" />&nbsp;
</p>

#### DevOps

<p>
  <img src="https://img.shields.io/badge/-Git-F05032?logo=Git&logoColor=FFF" alt="Git" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub-181717?logo=GitHub&logoColor=FFF" alt="GitHub" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gitee-C71D23?logo=Gitee&logoColor=FFF" alt="Gitee" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitLab-FC6D26?logo=GitLab&logoColor=FFF" alt="gitlab" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Actions-2088FF?logo=GitHub-Actions&logoColor=FFF" alt="GitHub Actions" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Jenkins-D24939?logo=Jenkins&logoColor=000" alt="Jenkins" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-SonarQube-A9A9A9?logo=SonarQube&logoColor=4E9BCD" alt="SonarQube" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Docker-2496ED?logo=Docker&logoColor=FFF" alt="Docker" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Harbor-FFF?logo=Harbor&logoColor=60B932" alt="Harbor" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kubernetes-326CE5?logo=Kubernetes&logoColor=FFF" alt="Kubernetes" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CentOS-262577?logo=CentOS&logoColor=FFF" alt="CentOS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ubuntu-E95420?logo=Ubuntu&logoColor=FFF" alt="Ubuntu" style="display: inline-block;" />&nbsp;
</p>

#### 运维技术栈

<p>
  <img src="https://img.shields.io/badge/-阿里云-FF6A00?logo=Alibaba-Cloud&logoColor=FFF" alt="阿里云" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Nginx-009639?logo=Nginx&logoColor=FFF" alt="Nginx" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VMware-607078?logo=VMware&logoColor=FFF" alt="VMware" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Prometheus-C0C0C0?logo=Prometheus&logoColor=E6522C" alt="Prometheus" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Grafana-DCDCDC?logo=Grafana&logoColor=F46800" alt="Grafana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ansible-FFF?logo=Ansible&logoColor=EE0000" alt="Ansible" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Lua-FFF?&logo=Lua&logoColor=2C2D72" alt="Lua" style="display: inline-block;" />&nbsp;
</p>

#### 测试技术栈

<p>
  <img src="https://img.shields.io/badge/-Postman-FF6C37?logo=Postman&logoColor=FFF" alt="Postman" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JMeter-D3D3D3?logo=Apache-JMeter&logoColor=D22128" alt="JMeter" style="display: inline-block;" />&nbsp;
</p>

#### 开发工具

<p>
  <img src="https://img.shields.io/badge/-Intellij%20IDEA-000?logo=Intellij-IDEA&logoColor=FFF" alt="Intellij IDEA" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Eclipse-2C2255?logo=Eclipse&logoColor=FFF" alt="Eclipse" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WebStorm-000?logo=WebStorm&logoColor=FFF" alt="WebStorm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PyCharm-C0C0C0?logo=PyCharm&logoColor=000" alt="PyCharm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android%20Studio-C0C0C0?logo=Android-Studio&logoColor=3DDC84" alt="Android Studio" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VSCode-C0C0C0?logo=Visual-Studio-Code&logoColor=007ACC" alt="VSCode" style="display: inline-block;" />&nbsp;
</p>

#### 其他

<p>
  <img src="https://img.shields.io/badge/-Markdown-000?logo=Markdown&logoColor=FFF" alt="Markdown" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WordPress-21759B?logo=WordPress&logoColor=FFF" alt="WordPress" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Pages-222?logo=GitHub-Pages&logoColor=FFF" alt="GitHub Pages" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Adobe%20Photoshop-A9A9A9?logo=Adobe-Photoshop&logoColor=31A8FF" alt="Adobe Photoshop" style="display: inline-block;" />&nbsp;
</p>



## Github美化

个人介绍页面，如何高大上

新建一个 `自己的账户名` 的仓库，然后参照下面的教程

https://github.com/vn7n24fzkq/github-profile-summary-cards

https://github.com/star-history/star-history

https://github.com/anuraghazra/github-readme-stats