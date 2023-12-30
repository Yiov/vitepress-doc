# VitePress搭建个人导航

> 更新时间：2023-12-30

## 挑选样式(重要)

* @茂茂：[Demo](./mao.md)  丨 [点我直达教程](#茂茂导航)

* @ahua：[Demo](./ahua.md) 丨 [点我直达教程](#ahua导航)

::: warning 注意
根据自己的喜好选择，相应的教程

@ahua666 的好像也是基于茂茂的，不过也很棒
:::



## 茂茂导航

VitePress也能做导航，Amazing！茂神牛批！

* 仓库：https://github.com/maomao1996/vitepress-nav-template

* Demo：https://fe-nav.netlify.app/nav/

::: warning 说明
如果你懒得折腾，直接仓库下 [@茂茂大神](https://github.com/maomao1996/mm-notes) 的用即可
:::



### 自定义布局

在 `docs/.vitepress/theme` 目录下的`index.ts` 文件中加入如下代码

::: tip 说明
因为 `layout: doc` 主要是提供给文档使用的，其页面宽度有限，同时为了更好的样式隔离，为其添加一个 `layoutClass` 方便我们更好的去自定义样式

样式代码，一会我们写到组件中
:::

```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │      └─ index.ts   <-- 主题配置
│  └─ index.md        
└─ package.json
```


```ts{3-4,9-20}
import DefaultTheme from 'vitepress/theme'

import { h } from 'vue'
import { useData } from 'vitepress'

export default {
  extends: DefaultTheme,

  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props)
  },
}
```

:::: details vue如果是报红的状态?
安装 `vue` 即可，已安装的无视！

::: tip 说明
按 `CTRL+C` 退出开发预览模式后安装

安装完成再重新启动
:::

::: code-group
```sh [pmpm]
pnpm add -D vue
```

```sh [yarn]
yarn add -D vue
```

```sh [npm]
npm i -D vue
```

```sh [bun]
bun add -D vue
```
:::
::::




### 自定义组件

::: danger 特别说明
以下文件夹及文件，可以放在任意位置/取名

为了方便查看和管理，我放到了自己习惯的文件夹
:::

在 `.vitepress/theme` 新建 `utils` 文件夹，再新建 `types.ts` 文件

```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme          
│  │     └─ utils       
│  │         └─ types.ts   <-- 我在这
│  │  └─ config.mts
│  └─ index.md       
└─ package.json
```

粘贴如下代码

```ts
/* type.ts */
export interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string }
  badge?:
    | string
    | {
        text?: string
        type?: 'info' | 'tip' | 'warning' | 'danger'
      }
  /** 站点名称 */
  title: string
  /** 站点名称 */
  desc?: string
  /** 站点链接 */
  link: string
}

export interface NavData {
  title: string
  items: NavLink[]
}
```


在 `.vitepress/theme/components` 分别新建 `MNavLink.vue` 和 `MNavLinks.vue` 文件，复制粘贴下面代码保存

```md{6-7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme          
│  │     └─ components      
│  │         └─ MNavLink.vue    <-- 我在这
│  │         └─ MNavLinks.vue   <-- 我在这
│  │  └─ config.mts
│  └─ index.md       
└─ package.json
```

::: code-group

```vue [MNavLink.vue]
<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { slugify } from '@mdit-vue/shared'

import { NavLink } from '../untils/types'

const props = defineProps<{
  noIcon?: boolean
  icon?: NavLink['icon']
  badge?: NavLink['badge']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

const formatTitle = computed(() => {
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
})

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' }
  }
  return props.badge
})
</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="!noIcon">
          <div v-if="svg" class="icon" v-html="svg"></div>
          <div v-else-if="icon && typeof icon === 'string'" class="icon">
            <img
              :src="withBase(icon)"
              :alt="title"
              onerror="this.parentElement.style.display='none'"
            />
          </div>
        </template>
        <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">
          {{ title }}
        </h5>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style lang="scss" scoped>
.m-nav-link {
  --m-nav-icon-box-size: 50px;
  --m-nav-icon-size: 45px;
  --m-nav-box-gap: 12px;

  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s;
  &:hover {
    box-shadow: var(--vp-shadow-2);
    //border-color: var(--vp-c-brand);
    text-decoration: initial;
    background-color: var(--vp-c-bg-soft-up);
    transform: translateY(-5px);
  }

  .box {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: var(--m-nav-box-gap);
    height: 100%;
    color: var(--vp-c-text-1);
    &.has-badge {
      padding-top: calc(var(--m-nav-box-gap) + 2px);
    }
    &-header {
      display: flex;
      align-items: center;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: calc(var(--m-nav-box-gap) - 2px);
    border-radius: 6px;
    width: var(--m-nav-icon-box-size);
    height: var(--m-nav-icon-box-size);
    font-size: var(--m-nav-icon-size);
    background-color: var(--vp-c-bg-soft-down);
    transition: background-color 0.25s;
    :deep(svg) {
      width: var(--m-nav-icon-size);
      fill: currentColor;
    }
    :deep(img) {
      border-radius: 4px;
      width: var(--m-nav-icon-size);
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
    &:not(.no-icon) {
      line-height: var(--m-nav-icon-box-size);
    }
  }

  .badge {
    position: absolute;
    top: 2px;
    right: 0;
    transform: scale(0.8);
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin: calc(var(--m-nav-box-gap) - 2px) 0 0;
    line-height: 1.5;
    font-size: 12px;
    color: var(--vp-c-text-2);
  }
}

@media (max-width: 960px) {
  .m-nav-link {
    --m-nav-icon-box-size: 36px;
    --m-nav-icon-size: 20px;
    --m-nav-box-gap: 8px;

    .title {
      font-size: 14px;
    }
  }
}
</style>
```

``` [MNavLinks.vue]
<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'

import MNavLink from './MNavLink.vue'
import type { NavLink } from '../untils/types'

const props = defineProps<{
  title: string
  noIcon?: boolean
  items: NavLink[]
}>()

const formatTitle = computed(() => {
  return slugify(props.title)
})
</script>

<template>
  <h2 v-if="title" :id="formatTitle" tabindex="-1">
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
  </h2>
  <div class="m-nav-links">
    <MNavLink v-for="item in items" :noIcon="noIcon" v-bind="item" />
  </div>
</template>

<style lang="scss" scoped>
.m-nav-links {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
  @media (min-width: $media) {
    .m-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>
```
:::


这里有报红，我们要安装 `@mdit-vue/shared`

::: tip 说明
按 `CTRL+C` 退出开发预览模式后安装

安装完成再重新启动
:::


::: code-group
```sh [pmpm]
pnpm add -D @mdit-vue/shared
```

```sh [yarn]
yarn add -D @mdit-vue/shared
```

```sh [npm]
npm i -D @mdit-vue/shared
```

```sh [bun]
bun add -D @mdit-vue/shared
```
:::

最后我们注册一下 `MNavLinks.vue` 组件，后期我们只需要引用它就够了

```ts{4,11}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import MNavLinks from './components/MNavLinks.vue'

export default {
  extends: DefaultTheme,

  enhanceApp({app}) {
    // 注册组件
    app.component('MNavLinks' , MNavLinks)
  },
}
```




### 新建页面

在 `nav` 目录下新建一个 `index.md` 文件

::: tip 说明
名字随意哈，我只是做演示
:::

```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav
│  │  └─ index.md      <-- 导航演示页
│  └─ index.md
└─ package.json
```

粘贴下面代码保存


```md
---
layout: doc
layoutClass: m-nav-layout
---
```

### 修改样式

然后在 `.vitepress/theme/style` 目录下新建 `nav.scss`

```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme
│  │     └─ style
│  │        └─ nav.scss
│  ├─ nav             
│  │  └─ index.md     
│  └─ index.md
└─ package.json
```

复制粘贴下面代码保存

```scss
.m-nav-layout {
    /* 覆盖全局的 vp-layout-max-width（仅当前页面使用） */
    --vp-layout-max-width: 1660px;
  
    /* layout 样式 */
    .container {
      max-width: var(--vp-layout-max-width) !important;
    }
    .content-container,
    .content {
      max-width: 100% !important;
    }
  
    /* aside 样式 */
    .aside {
      padding-left: 0;
      max-width: 224px;
    }
  
    .content .copyright {
      display: none;
    }
  
    /* tip */
    .tip {
      .custom-block-title {
        display: none;
      }
      p {
        margin: 0;
      }
    }
  
    .vp-doc h2 {
      margin-top: 24px;
    }
  }
```


安装一下 `sass`

::: tip 说明
按 `CTRL+C` 退出开发预览模式后安装

安装完成再重新启动
:::


::: code-group
```sh [pmpm]
pnpm add -D sass
```

```sh [yarn]
yarn add -D sass
```

```sh [npm]
npm i -D sass
```

```sh [bun]
bun add -D sass
```
:::



然后将样式引入 `index.md` ，并关闭侧边栏

```md{4,7}
---
layout: doc
layoutClass: m-nav-layout
sidebar: false
---

<style src="/.vitepress/theme/style/nav.scss"></style>

# 我的导航
```






### 建数据库

在 `.vitepress/theme/untils` 目录新建 `data.ts` 文件


```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme
│  │     └─ untils
│  │        └─ data.ts  <- 我在这
│  ├─ nav             
│  │  └─ index.md     
│  └─ index.md
└─ package.json
```

粘贴代码保存，也可参考数据进行修改

::: details 点我查看 data.ts 代码
```ts
import type { NavData } from './types'

export const NAV_DATA: NavData[] = [
  {
    title: '常用工具',
    items: [
      {
        icon: 'https://caniuse.com/img/favicon-128.png',
        title: 'Can I use',
        badge: {
          text: '茂神牛批',
          type: 'info',
        },
        desc: '前端 API 兼容性查询',
        link: 'https://caniuse.com'
      },
      {
        icon: 'https://tinypng.com/images/apple-touch-icon.png',
        title: 'TinyPNG',
        badge: {
          text: '茂神牛批',
          type: 'tip',
        },
        desc: '在线图片压缩工具',
        link: 'https://tinypng.com'
      },
      {
        icon: 'https://devtool.tech/logo.svg',
        title: '开发者武器库',
        badge: {
          text: '茂神牛批',
          type: 'warning',
        },
        desc: '开发者武器库，做开发者最专业最好用的专业工具箱',
        link: 'https://devtool.tech'
      },
      {
        icon: 'https://tool.lu/favicon.ico',
        title: '在线工具',
        badge: {
          text: '茂神牛批',
          type: 'danger',
        },
        desc: '开发人员的工具箱',
        link: 'https://tool.lu'
      },
      {
        icon: '/icons/json-cn.ico',
        title: 'Json 中文网',
        badge: {
          text: '请给茂茂点点小星星哦',
          type: 'info',
        },
        desc: 'JSON 在线解析及格式化验证',
        link: 'https://www.json.cn'
      }
    ]
  },
  {
    title: 'AI 导航',
    items: [
      {
        icon: '/icons/chatgpt.png',
        title: 'ChatGPT（最强）',
        link: 'https://chat.openai.com/chat'
      },
      {
        icon: 'https://www.notion.so/images/logo-ios.png',
        title: 'Notion AI（笔记）',
        link: 'https://www.notion.so'
      },
      {
        icon: 'https://www.midjourney.com/apple-touch-icon.png',
        title: 'Midjourney（绘画）',
        link: 'https://www.midjourney.com'
      },
      {
        icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
        title: 'Beautiful.ai（PPT）',
        link: 'https://www.beautiful.ai'
      }
    ]
  },
  {
    title: '茂茂的站点导航',
    items: [
      {
        icon: '/logo.png',
        title: '前端日常笔记',
        desc: '日常笔记记录（零零散散啥都记系列）',
        link: 'https://github.com/maomao1996/daily-notes'
      },
      {
        icon: '/logo.png',
        title: '前端思维导图',
        desc: '用思维导图的方式总结个人所学知识',
        link: 'https://mindmap.fe-mm.com'
      },
      {
        icon: 'https://qwerty.fe-mm.com/apple-touch-icon.png',
        title: 'Qwerty Learner',
        desc: '为键盘工作者设计的单词记忆与英语肌肉记忆锻炼软件',
        link: 'https://qwerty.fe-mm.com'
      },
      {
        icon: '/logo.png',
        title: 'mmPlayer',
        desc: 'mmPlayer 在线音乐播放器',
        link: 'https://netease-music.fe-mm.com'
      }
    ]
  },
  {
    title: 'React 生态',
    items: [
      {
        icon: 'https://zh-hans.reactjs.org/favicon.ico',
        title: 'React',
        desc: '用于构建用户界面的 JavaScript 库',
        link: 'https://zh-hans.reactjs.org'
      },
      {
        icon: 'https://reactrouter.com/favicon-light.png',
        title: 'React Router',
        desc: 'React 的声明式路由',
        link: 'https://reactrouter.com'
      },
      {
        icon: 'https://nextjs.org/static/favicon/safari-pinned-tab.svg',
        title: 'Next.js',
        desc: '一个用于 Web 的 React 框架',
        link: 'https://nextjs.org'
      },
      {
        icon: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        title: 'UmiJS',
        desc: '插件化的企业级前端应用框架',
        link: 'https://umijs.org'
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
        title: 'Ant Design',
        desc: '一套企业级 UI 设计语言和 React 组件库',
        link: 'https://ant.design'
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/69a27fcc-ce52-4f27-83f1-c44541e9b65d.svg',
        title: 'Ant Design Mobile',
        desc: '构建移动 WEB 应用程序的 React 组件库',
        link: 'https://mobile.ant.design'
      },
      {
        icon: 'https://docs.pmnd.rs/apple-touch-icon.png',
        title: 'Zustand',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://docs.pmnd.rs/zustand/getting-started/introduction'
      },
      {
        icon: 'https://valtio.pmnd.rs/favicon.ico',
        title: 'Valtio',
        desc: 'makes proxy-state simple for React and Vanilla',
        link: 'https://valtio.pmnd.rs'
      },
      {
        icon: 'https://jotai.org/favicon.svg',
        title: 'Jotai',
        desc: 'primitive and flexible state management for React',
        link: 'https://jotai.org'
      },
      {
        icon: 'https://cn.redux.js.org/img/redux.svg',
        title: 'Redux',
        desc: 'JavaScript 应用的状态容器，提供可预测的状态管理',
        link: 'https://cn.redux.js.org'
      },
      {
        icon: 'https://zh.mobx.js.org/assets/mobx.png',
        title: 'MobX',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://zh.mobx.js.org'
      },
      {
        icon: 'https://ahooks.js.org/simple-logo.svg',
        title: 'ahooks',
        desc: '一套高质量可靠的 React Hooks 库',
        link: 'https://ahooks.js.org/zh-CN'
      }
    ]
  },
  {
    title: 'Vue 生态',
    items: [
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 3',
        desc: '渐进式 JavaScript 框架',
        link: 'https://cn.vuejs.org'
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 2',
        desc: '渐进式 JavaScript 框架',
        link: 'https://v2.cn.vuejs.org'
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue Router',
        desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
        link: 'https://router.vuejs.org/zh'
      },
      {
        icon: 'https://pinia.vuejs.org/logo.svg',
        title: 'Pinia',
        desc: '符合直觉的 Vue.js 状态管理库',
        link: 'https://pinia.vuejs.org/zh'
      },
      {
        icon: 'https://nuxt.com/icon.png',
        title: 'Nuxt.js',
        desc: '一个基于 Vue.js 的通用应用框架',
        link: 'https://nuxt.com'
      },
      {
        icon: 'https://vueuse.org/favicon.svg',
        title: 'VueUse',
        desc: 'Vue Composition API 的常用工具集',
        link: 'https://vueuse.org'
      },
      {
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        title: 'Element Plus',
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        link: 'https://element-plus.org'
      },
      {
        icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
        title: 'Ant Design Vue',
        desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
        link: 'https://antdv.com'
      },
      {
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        title: 'Vant',
        desc: '轻量、可定制的移动端 Vue 组件库',
        link: 'https://vant-ui.github.io/vant'
      },
      {
        icon: 'https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico',
        title: 'Cube UI',
        desc: '基于 Vue.js 实现的精致移动端组件库',
        link: 'https://didi.github.io/cube-ui'
      },
      {
        icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
        title: 'NutUI',
        desc: '京东风格的轻量级移动端组件库',
        link: 'https://nutui.jd.com'
      }
    ]
  },
  {
    title: 'JavaScript 框架类库',
    items: [
      {
        icon: 'https://svelte.dev/svelte-logo-horizontal.svg',
        title: 'Svelte',
        desc: '将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码',
        link: 'https://svelte.dev'
      },
      {
        // icon: 'https://simpleicons.org/icons/jquery.svg',
        icon: '/icons/jquery.svg',
        title: 'jQuery API 中文文档',
        desc: '一个兼容多浏览器的 JavaScript 框架',
        link: 'https://jquery.cuishifeng.cn'
      }
    ]
  },
  {
    title: 'CSS 相关',
    items: [
      {
        icon: 'https://postcss.org/assets/logo-3e39b0aa.svg',
        title: 'PostCSS',
        desc: '一个用 JavaScript 转换 CSS 的工具',
        link: 'https://postcss.org'
      },
      {
        icon: 'https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg',
        title: 'Sass',
        desc: '一个成熟，稳定，功能强大的专业级 CSS 扩展语言',
        link: 'https://sass-lang.com'
      },
      {
        icon: 'https://www.tailwindcss.cn/apple-touch-icon.png',
        title: 'TailwindCSS 中文网',
        desc: '一个功能类优先的 CSS 框架',
        link: 'https://www.tailwindcss.cn'
      }
    ]
  },
  {
    title: '小程序相关',
    items: [
      {
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
        title: '微信小程序文档',
        desc: '微信小程序官方开发者文档',
        link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/'
      },
      {
        icon: '/icons/taro.svg',
        title: 'Taro',
        desc: '多端统一开发解决方案',
        link: 'https://taro.jd.com'
      },
      {
        icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/icon.png',
        title: 'uni-app',
        desc: '一个使用 Vue.js 开发所有前端应用的框架',
        link: 'https://uniapp.dcloud.net.cn'
      },
      {
        icon: 'https://mpxjs.cn/favicon.ico',
        title: 'Mpx',
        desc: '增强型跨端小程序框架',
        link: 'https://mpxjs.cn'
      }
    ]
  },
  {
    title: 'Node 相关',
    items: [
      {
        icon: '/icons/nodejs.svg',
        title: 'Node.js',
        desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境',
        link: 'https://nodejs.org/zh-cn'
      },
      {
        icon: 'https://expressjs.com/images/favicon.png',
        title: 'Express',
        desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
        link: 'https://expressjs.com'
      },
      {
        icon: '/icons/koa.svg',
        title: 'Koa',
        desc: '基于 Node.js 平台的下一代 web 开发框架',
        link: 'https://koajs.com'
      },
      {
        icon: 'https://www.eggjs.org/favicon.png',
        title: 'Egg',
        desc: '为企业级框架和应用而生',
        link: 'https://www.eggjs.org/zh-CN'
      },
      {
        icon: 'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
        title: 'Nest.js 中文文档',
        desc: '用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架',
        link: 'https://docs.nestjs.cn'
      }
    ]
  },
  {
    title: '可视化',
    items: [
      {
        icon: 'https://echarts.apache.org/zh/images/favicon.png',
        title: 'ECharts',
        desc: '一个基于 JavaScript 的开源可视化图表库',
        link: 'https://echarts.apache.org/zh/index.html'
      },
      {
        icon: 'https://antv.vision/icons/icon-72x72.png',
        title: 'AntV',
        desc: '蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。',
        link: 'https://antv.vision/zh/'
      },
      {
        icon: 'https://d3js.org/favicon.png',
        title: 'D3.js',
        desc: '一个遵循 Web 标准用于可视化数据的 JavaScript 库',
        link: 'https://d3js.org'
      },
      {
        icon: 'https://www.chartjs.org/favicon.ico',
        title: 'Chart.js',
        desc: '一个简单而灵活的 JavaScript 图表库',
        link: 'https://www.chartjs.org'
      },
      {
        icon: 'https://threejs.org/files/favicon.ico',
        // icon: 'https://threejs.org/files/favicon_white.ico',
        title: 'Three.js',
        desc: 'JavaScript 3d 库',
        link: 'https://threejs.org'
      }
    ]
  },
  {
    title: '编译&构建&打包',
    items: [
      {
        icon: 'https://www.webpackjs.com/icon_180x180.png',
        title: 'Webpack 中文网',
        desc: '一个用于现代 JavaScript 应用程序的静态模块打包工具',
        link: 'https://www.webpackjs.com'
      },
      {
        icon: 'https://cn.vitejs.dev/logo.svg',
        title: 'Vite 中文文档',
        desc: '下一代前端工具链',
        link: 'https://cn.vitejs.dev'
      },
      {
        icon: 'https://www.rollupjs.com/img/favicon.png',
        title: 'Rollup',
        desc: 'Rollup 是一个 JavaScript 模块打包器',
        link: 'https://www.rollupjs.com'
      },
      {
        icon: 'https://turbo.build/images/favicon-dark/apple-touch-icon.png',
        title: 'Turbo',
        desc: 'Turbo is an incremental bundler and build system optimized for JavaScript and TypeScript, written in Rust',
        link: 'https://turbo.build'
      },
      {
        icon: 'https://www.babeljs.cn/img/favicon.png',
        title: 'Babel',
        desc: 'Babel 是一个 JavaScript 编译器',
        link: 'https://www.babeljs.cn'
      },
      {
        icon: 'https://esbuild.github.io/favicon.svg',
        title: 'esbuild',
        desc: 'An extremely fast bundler for the web',
        link: 'https://esbuild.github.io'
      },
      {
        icon: 'https://swc.rs/favicon/apple-touch-icon.png',
        title: 'SWC',
        desc: 'Rust-based platform for the Web',
        link: 'https://swc.rs'
      }
    ]
  },
  {
    title: '站点生成器',
    items: [
      {
        icon: 'https://astro.build/favicon.svg',
        title: 'Astro',
        desc: '一个现代化的轻量级静态站点生成器',
        link: 'https://astro.build'
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VitePress',
        desc: '由 Vite 和 Vue 驱动的静态网站生成器',
        link: 'https://vitepress.dev'
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VuePress',
        desc: 'Vue 驱动的静态网站生成器',
        link: 'https://vuepress.vuejs.org/zh'
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        desc: '基于 Umi 为组件研发而生的静态站点框架',
        link: 'https://d.umijs.org'
      },
      {
        icon: 'https://docusaurus.io/zh-CN/img/docusaurus.ico',
        title: 'Docusaurus',
        desc: '基于 React 的静态网站生成器',
        link: 'https://docusaurus.io/zh-CN'
      }
    ]
  },
  {
    title: '图标库',
    items: [
      {
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
        title: 'iconfont',
        desc: '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
        link: 'https://www.iconfont.cn'
      },
      {
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        title: 'IconPark 图标库',
        desc: 'IconPark图标库是一个通过技术驱动矢量图标样式的开源图标库，可以实现根据单一 SVG 源文件变换出多种主题， 具备丰富的分类、更轻量的代码和更灵活的使用场景；致力于构建高质量、统一化、可定义的图标资源，让大多数人都能够选择适合自己的风格图标',
        link: 'https://iconpark.oceanengine.com/official'
      },
      {
        icon: 'https://emoji.muan.co/appicon.png',
        title: 'Emoji searcher',
        desc: 'Emoji 表情大全',
        link: ''
      }
    ]
  },
  {
    title: '前端学习资料',
    items: [
      {
        icon: 'https://developer.mozilla.org/apple-touch-icon.6803c6f0.png',
        title: 'MDN | Web 开发者指南',
        desc: 'Mozilla 的开发者平台，提供了大量关于 HTML、CSS 和 JavaScript 的详细文档以及广泛的 Web API 参考资',
        link: 'https://developer.mozilla.org/zh-CN'
      },
      {
        icon: 'https://static.runoob.com/images/favicon.ico',
        title: '菜鸟教程',
        desc: '学的不仅是技术，更是梦想！',
        link: 'https://www.runoob.com'
      },
      {
        icon: '/icons/es6.svg',
        title: 'ES6 入门教程',
        desc: '阮一峰的网络日志',
        link: 'http://es6.ruanyifeng.com'
      }
    ]
  },
  {
    title: '社区',
    items: [
      {
        title: 'Github',
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
        },
        desc: '一个面向开源及私有软件项目的托管平台',
        link: 'https://github.com'
      },
      {
        icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
        title: 'Stack Overflow',
        desc: '全球最大的技术问答网站',
        link: 'https://stackoverflow.com'
      },
      {
        title: '稀土掘金',
        icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
        desc: '面向全球中文开发者的技术内容分享与交流平台',
        link: 'https://juejin.cn'
      },
      {
        title: 'V2EX',
        icon: 'https://www.v2ex.com/static/icon-192.png',
        desc: '一个关于分享和探索的地方',
        link: 'https://www.v2ex.com'
      },
      {
        title: 'SegmentFault 思否',
        icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
        desc: '技术问答开发者社区',
        link: 'https://segmentfault.com'
      },
      {
        title: '博客园',
        // icon: 'https://common.cnblogs.com/favicon.ico',
        icon: '/icons/cnblogs.svg',
        desc: '博客园是一个面向开发者的知识分享社区',
        link: 'https://www.cnblogs.com'
      },
      {
        title: '知乎',
        icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
        desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
        link: 'https://juejin.cn'
      }
    ]
  },
  {
    title: '摸鱼专用',
    items: [
      {
        icon: 'https://momoyu.cc/icon-192.png',
        title: '摸摸鱼热榜',
        // desc: '聚合每日热门、搞笑、有趣、适合摸鱼的资讯',
        link: 'https://momoyu.cc'
      },
      {
        icon: 'https://v.qq.com/favicon.ico',
        title: '腾讯视频',
        // desc: '中国领先的在线视频媒体平台，海量高清视频在线观看',
        link: 'https://v.qq.com'
      },
      {
        icon: 'https://static.hdslb.com/mobile/img/512.png',
        title: '哔哩哔哩',
        // desc: '',
        link: 'https://www.bilibili.com'
      },
      {
        icon: 'https://www.youtube.com/s/desktop/014dbbed/img/favicon_48x48.png',
        title: 'YouTube',
        // desc: '',
        link: 'https://www.youtube.com'
      },
      {
        icon: '/icons/twitter.svg',
        title: 'Twitter',
        // desc: '',
        link: 'https://twitter.com'
      },
      {
        icon: '/icons/pixiv.png',
        title: 'Pixiv',
        // desc: '',
        link: 'https://www.pixiv.net'
      }
    ]
  }
]
```
:::



### 实现

最后我们引入 `index.md`，上下页也关闭

```md{5-6,9-13,18}
---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
---

<style src="/.vitepress/theme/style/nav.scss"></style>

<script setup>
import { NAV_DATA } from '/.vitepress/theme/untils/data'
</script>


# 我的导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

```





### 优化：搜索


默认自带的本地搜索无法爬取到导航，建议使用 [Algolia](../page.md#algolia)

还需要增加页面的 `outline` 配置项

```md
---
outline: [2, 3, 4]
---
```


### 优化：悬停边框

需要修改 `MNavLink.vue` 中的代码，可以自己做一些颜色改变

::: tip 建议
只改边框色就行，背景色不好配
:::

```vue{4}
<style lang="scss" scoped>
  &:hover {
    box-shadow: var(--vp-shadow-2); 
    border-color: var(--vp-c-brand); //悬停边框色
    text-decoration: initial;
    background-color: var(--vp-c-bg); //悬停背景色
  }
</style>
```



### 优化：下划线

这个在 [VitePress美化](../style#链接下划线) 的时候说了，请参考修改

::: warning 注意
如果你在 `var.css` 中引用了，这里就不用填了
:::

```scss
/* .vitepress/theme/style/nav.scss */
.vp-doc a {
    text-decoration: none;
}
```


### 优化：图标穿透

图标大小在 `MNavLink.vue` 中修改 `.m-nav-link` 的值

```vue{3-4}
<style lang="scss" scoped>
.m-nav-link {
  --m-nav-icon-box-size: 50px;
  --m-nav-icon-size: 45px;
  --m-nav-box-gap: 12px;
}
</style>
```

因为安装 [medium-zoom](http://127.0.0.1:5174/plugin.html#%E5%9B%BE%E7%89%87%E7%BC%A9%E6%94%BE) 的时候引入了一个样式，导致手机端导航被这个图片样式给遮盖了

那么我们就需要在 `nav.scss` 中加入此样式，并改成 `0` 就可以覆盖掉

```scss
// .vitepress/theme/style/nav.scss
.medium-zoom-overlay {
  z-index: 0;
}
  
.medium-zoom-image {
  z-index: 0 !important;
}
```























## ahua导航

虽然基于茂茂的，但这hover深入我心啊

* 仓库：https://github.com/ahua666/StarNavigation

* Demo：https://star-navigation.vercel.app/


### 自定义布局

在 `docs/.vitepress/theme` 目录下的`index.ts` 文件中加入如下代码

::: tip 说明
因为 `layout: doc` 主要是提供给文档使用的，其页面宽度有限，同时为了更好的样式隔离，为其添加一个 `layoutClass` 方便我们更好的去自定义样式

样式代码，一会我们写到组件中
:::

```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │      └─ index.ts   <-- 主题配置
│  └─ index.md        
└─ package.json
```


```ts{3-4,9-20}
import DefaultTheme from 'vitepress/theme'

import { h } from 'vue'
import { useData } from 'vitepress'

export default {
  extends: DefaultTheme,

  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props)
  },
}
```

:::: details vue如果是报红的状态?
安装 `vue` 即可，已安装的无视！

::: tip 说明
按 `CTRL+C` 退出开发预览模式后安装

安装完成再重新启动
:::

::: code-group
```sh [pmpm]
pnpm add -D vue
```

```sh [yarn]
yarn add -D vue
```

```sh [npm]
npm i -D vue
```

```sh [bun]
bun add -D vue
```
:::
::::




### 自定义组件


在 `.vitepress/theme/components` 新建 `Navlink.vue` 文件，复制粘贴下面代码保存

```md{6-7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme          
│  │     └─ components      
│  │         └─ Navlink.vue.vue    <-- 我在这
│  │  └─ config.mts
│  └─ index.md       
└─ package.json
```

::: tip 说明
这里的22行，数据名可以根据自己的改

本次仅做演示
:::

```vue{2}
<template>
    <div id="article-container" class="flink">
      <div v-for="(item, index) in datas" :key="index">
        <h2 :id="item.title" tabindex="-1">{{ item.title }}</h2>
        <div class="flink-desc">{{ item.desc }}</div>
        <div class="flink-list">
          <div v-for="(item2, index2) in item.items" :key="index2" class="flink-list-item"><a :href="item2.link"
              :title="item2.title" rel="external nofollow" target="_blank"><img :data-lazy-src="item2.icon"
                :src="item2.icon" alt="chatGPT" class="flink-avatar entered loaded" data-ll-status="loaded"
                onerror="this.onerror=null;this.src='https://bu.dusays.com/2023/03/03/6401a7902b8de.png'">
              <div class="img-alt is-center">{{ item2.title }}</div>
              <div class="flink-item-info"><span class="flink-item-name">{{ item2.title }}</span><span :title="item2.desc"
                  class="flink-item-desc">{{ item2.desc }}</span></div>
            </a></div>
        </div>
  
      </div>
    </div>
</template>
  
<script lang="ts" setup>
  import { NAV_DATA } from '../untils/data-ahua'
  const datas: any = NAV_DATA
</script>
  
<style>
  :root {
    --star-white: #fff;
    --star-white-op: rgba(255, 255, 255, 0.2);
    --star-black: #000;
    --star-black-op: rgba(0, 0, 0, 0.2);
    --star-none: #00000000;
    --star-gray: #999999;
    --star-gray-op: #9999992b;
    --star-vip: #e5a80d;
    --star-main: var(--star-theme);
    --star-main-op: var(--star-theme-op);
    --star-main-op-deep: var(--star-theme-op-deep);
    --star-main-none: var(--star-theme-none);
    --star-shadow-theme: 0 8px 12px -3px var(--star-theme-op);
    --star-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, .15);
    --star-shadow-main: 0 8px 12px -3px var(--star-main-op);
    --star-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, .20);
    --star-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, .20);
    --star-shadow-black: 0 0 12px 4px rgba(0, 0, 0, .05);
    --star-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, .12);
    --star-shadow-red: 0 8px 12px -3px #ee7d7936;
    --star-shadow-green: 0 8px 12px -3px #87ee7936;
    --star-logo-color: linear-gradient(215deg, #4584ff 0%, #cf0db9 100%);
    --star-snackbar-time: 5s;
    --star-theme: #425AEF;
    --star-theme-op: #4259ef23;
    --star-theme-op-deep: #4259efdd;
    --star-theme-none: #4259ef01;
    --star-blue: #425AEF;
    --star-red: #f04a63;
    --star-pink: #FF7C7C;
    --star-green: #57bd6a;
    --star-yellow: #c28b00;
    --star-yellow-op: #d99c001a;
    --star-orange: #e38100;
    --star-fontcolor: #363636;
    --star-background: #f7f9fe;
    --star-reverse: #000;
    --star-maskbg: rgba(255, 255, 255, 0.6);
    --star-maskbgdeep: rgba(255, 255, 255, 0.85);
    --star-hovertext: var(--star-main);
    --star-ahoverbg: #F7F7FA;
    --star-lighttext: var(--star-main);
    --star-secondtext: rgba(60, 60, 67, 0.8);
    --star-scrollbar: rgba(60, 60, 67, 0.4);
    --star-card-btn-bg: #edf0f7;
    --star-post-blockquote-bg: #fafcff;
    --star-post-tabs-bg: #f2f5f8;
    --star-secondbg: #f1f3f8;
    --star-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --star-card-bg: #fff;
    --star-card-bg-op: var(--star-black-op);
    --star-card-bg-none: rgba(255, 255, 255, 0);
    --star-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-card-border: #e3e8f7;
    --star-shadow-border: 0 8px 16px -4px #2c2d300c;
    --style-border: 1px solid var(--star-card-border);
    --style-border-always: 1px solid var(--star-card-border);
    --style-border-hover: 1px solid var(--star-main);
    --style-border-hover-always: 1px solid var(--star-main);
    --style-border-dashed: 1px dashed var(--star-theme-op);
    --style-border-forever: 2px solid var(--star-main);
  }

  ::selection {
    background: var(--star-fontcolor);
    color: var(--star-background);
  }

  [class=light] {
    --star-theme: #425AEF;
    --star-theme-op: #4259ef23;
    --star-theme-op-deep: #4259efdd;
    --star-theme-none: #4259ef01;
    --star-blue: #425AEF;
    --star-red: #f04a63;
    --star-pink: #FF7C7C;
    --star-green: #57bd6a;
    --star-yellow: #c28b00;
    --star-yellow-op: #d99c001a;
    --star-orange: #e38100;
    --star-fontcolor: #363636;
    --star-background: #f7f9fe;
    --star-reverse: #000;
    --star-maskbg: rgba(255, 255, 255, 0.6);
    --star-maskbgdeep: rgba(255, 255, 255, 0.85);
    --star-hovertext: var(--star-main);
    --star-ahoverbg: #F7F7FA;
    --star-lighttext: var(--star-main);
    --star-secondtext: rgba(60, 60, 67, 0.8);
    --star-scrollbar: rgba(60, 60, 67, 0.4);
    --star-card-btn-bg: #edf0f7;
    --star-post-blockquote-bg: #fafcff;
    --star-post-tabs-bg: #f2f5f8;
    --star-secondbg: #f1f3f8;
    --star-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --star-card-bg: #fff;
    --star-card-bg-op: var(--star-black-op);
    --star-card-bg-none: rgba(255, 255, 255, 0);
    --star-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-card-border: #e3e8f7;
    --star-shadow-border: 0 8px 16px -4px #2c2d300c;
    --style-border: 1px solid var(--star-card-border);
    --style-border-always: 1px solid var(--star-card-border);
    --style-border-hover: 1px solid var(--star-main);
    --style-border-hover-always: 1px solid var(--star-main);
    --style-border-dashed: 1px dashed var(--star-theme-op);
    --style-border-forever: 2px solid var(--star-main);
  }

  [class=dark] {
    --star-theme: #f2b94b;
    --star-theme-op: #f2b94b23;
    --star-theme-op-deep: #f2b94bdd;
    --star-theme-none: #f2b94b00;
    --star-blue: #0084FF;
    --star-red: #FF3842;
    --star-pink: #d44040;
    --star-green: #3e9f50;
    --star-yellow: #ffc93e;
    --star-yellow-op: #ffc93e30;
    --star-orange: #ff953e;
    --star-fontcolor: #F7F7FA;
    --star-background: #18171d;
    --star-reverse: #fff;
    --star-maskbg: rgba(0, 0, 0, 0.6);
    --star-maskbgdeep: rgba(0, 0, 0, 0.85);
    --star-hovertext: #0A84FF;
    --star-ahoverbg: #fff;
    --star-lighttext: var(--star-theme);
    --star-secondtext: #a1a2b8;
    --star-scrollbar: rgba(200, 200, 223, 0.4);
    --star-card-btn-bg: #30343f;
    --star-post-blockquote-bg: #000;
    --star-post-tabs-bg: #121212;
    --star-secondbg: #30343f;
    --star-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --star-card-bg: #1d1e22;
    --star-card-bg-op: var(--star-white-op);
    --star-card-bg-none: #1d1b2600;
    --star-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --star-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --star-card-border: #3d3d3f;
    --star-shadow-border: 0 8px 16px -4px #00000050;
    --style-border: 1px solid var(--star-card-border);
    --style-border-always: 1px solid var(--star-card-border);
    --style-border-hover: 1px solid var(--star-theme);
    --style-border-hover-always: 1px solid var(--star-theme);
    --style-border-dashed: 1px dashed var(--star-theme-op);
    --style-border-forever: 2px solid var(--star-lighttext);
  }

  .is-center {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
  }

  .img-alt {
    font-size: 12px;
    margin: 0;
    color: var(--star-secondtext);
  }

  .flink-list>.flink-list-item a .img-alt {
    display: none;
  }

  .flink-list {
    overflow: auto;
    padding: 10px 10px 0px;
    text-align: center;
  }

  .flink-list>.flink-list-item a .flink-item-desc {
    display: block;
    padding: 4px 10px 0px 0px;
    height: 50px;
    font-size: 0.93em;
  }

  .flink-list>.flink-list-item a {
    color: var(--star-fontcolor);
    text-decoration: none;
  }

  /* 炙焰友链间距 */
  .flink-list {
    padding: 0;
    margin: 0.5rem -6px 1rem -6px;
    overflow-x: hidden;

  }

  .flink-desc {
    margin: 0;
    color: var(--star-secondtext);
  }

  .flink-desc {
    margin: 0.2rem 0px 0.5rem;
  }

  /* 友情描述 */
  .flink-list>.flink-list-item a .flink-item-desc {
    white-space: normal;
    padding: 5px 10px 16px 0;
    color: var(--star-fontcolor);
    text-align: left;
    height: 40px;
    text-overflow: ellipsis;
    opacity: 0.7;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .flink-list>.flink-list-item:hover a .flink-item-desc {
    color: var(--star-white);
  }

  /* 友链标题 */
  .flink-list-item .flink-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 90px);
    height: fit-content;
  }

  .flink-list-item:hover .flink-item-info {
    min-width: calc(100% - 20px);
  }

  .flink-list>.flink-list-item a .flink-item-name {
    text-align: left;
    font-size: 19px;
    line-height: 20px;
    color: var(--star-fontcolor);
  }

  .flink-list>.flink-list-item:hover a .flink-item-name {
    color: var(--star-white);
  }

  .flink-list>.flink-list-item a {
    display: flex;
    border: none;
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .flink-list>.flink-list-item a:hover {
    background: none;
  }

  #article-container img {
    display: block;
    margin: 0px auto 0.8rem;
  }

  img {
    max-width: 100%;
    transition: all 0.2s ease 0s;
    border-style: none;
  }

  #article-container img {
    border-radius: 32px;
    margin-bottom: 0.5rem;
    object-fit: cover;
  }

  .flink-list>.flink-list-item a img {
    float: left;
    margin: 15px 10px;
    width: 60px;
    height: 60px;
    border-radius: 35px;
    transition: all 0.3s ease 0s;
  }

  /* 友链头像 */
  .flink-list>.flink-list-item a img {
    border-radius: 32px;
    margin: 15px 20px 15px 15px;
    transition: 0.3s;
    background: var(--star-background);
    min-width: 60px;
    min-height: 60px;
  }


  /* 悬浮状态头像 */
  .flink-list>.flink-list-item:hover a img {
    transition: 0.6s;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0.5rem;
    min-width: 0px;
    min-height: 0px;
  }

  /* 标题和描述 */
  .flink-list-item a span {
    transition: 0.3s;
  }

  /* 友链描述 */
  .flink-list-item:hover a .flink-item-desc {
    overflow: hidden;
    width: 100%;
  }


  #article-container.flink {
    margin-top: 1rem;
  }

  .flink#article-container .flink-desc {
    margin: 0.2rem 0px 0.5rem;
  }

  .flink#article-container .flink-list {
    overflow: auto;
    padding: 10px 10px 0px;
    text-align: center;
  }

  @media screen and (max-width: 1200px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(25% - 12px) !important;
    }
  }

  @media screen and (max-width: 1024px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(33.3333% - 12px) !important;
    }
  }

  @media screen and (max-width: 768px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(50% - 12px) !important;
    }
  }

  @media screen and (max-width: 600px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(100% - 12px) !important;
    }
  }

  /* 修改初始动画 */
  .flink#article-container .flink-list>.flink-list-item {
    margin: 6px 6px;
    transition: 0.3s;
    border-radius: 12px;
    transition-timing-function: ease-in-out;
    position: relative;
    width: calc(20% - 12px);
    border: var(--style-border);
    box-shadow: var(--star-shadow-border);
    background: var(--star-card-bg);
    display: flex;
  }

  .flink#article-container .flink-list>.flink-list-item {
    position: relative;
    float: left;
    overflow: hidden;
    margin: 15px 7px;
    width: calc(25% - 12px);
    height: 90px;
    border-radius: 5px;
    line-height: 17px;
    transform: translateZ(0px);
    transition: all 0.3s ease 0s;
  }

  /* 修改初始动画 */
  .flink#article-container .flink-list>.flink-list-item {
    margin: 6px 6px;
    transition: 0.3s;
    border-radius: 12px;
    transition-timing-function: ease-in-out;
    position: relative;
    width: calc(20% - 12px);
    border: var(--style-border);
    box-shadow: var(--star-shadow-border);
    background: var(--star-card-bg);
    display: flex;
  }

  .flink#article-container .flink-list>.flink-list-item:hover {
    transform: scale(1);
    background: var(--star-theme);
    border: var(--style-border-hover);
    box-shadow: var(--star-shadow-main);
  }

  .flink#article-container .site-card .img img {
    width: 100%;
    height: 100%;
    transition: transform 2s ease 0s;
    object-fit: cover;
  }

  .flink#article-container .site-card .info {
    margin-top: 8px;
  }

  .flink#article-container .site-card .info img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    float: left;
    margin-right: 8px;
    margin-top: 2px;
  }

  .flink#article-container .site-card .info span {
    display: block;
  }

  .flink#article-container .site-card .info .title {
    font-weight: 600;
    color: rgb(68, 68, 68);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    transition: all 0.3s ease 0s;
  }

  .flink#article-container .site-card .info .desc {
    overflow-wrap: break-word;
    line-height: 1.2;
    color: rgb(136, 136, 136);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
  }

  .flink#article-container .site-card .img {
    transition: all 0.3s ease 0s;
  }

  .flink#article-container .site-card .img-alt {
    display: none;
  }

  .flink#article-container .site-card:hover .info .title {
    color: rgb(255, 87, 34);
  }

  .flink-list>.flink-list-item:hover {
    transform: scale(1);
    background: var(--star-theme);
    border: var(--style-border-hover);
    box-shadow: var(--star-shadow-main);
  }

  .gallery-group figcaption p {
    line-height: 1.5 !important;
  }

  /* 超级博主友链 */

  /* 超级博主标题 */

  .site-card .info .title {
    color: var(--star-fontcolor);
    text-align: left;
  }

  .site-card:hover .info .title {
    color: var(--star-white);
    box-shadow: var(--star-shadow-blue);
  }

  .site-card:hover .info {
    height: 120px;
  }

  .site-card .site-card-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }


  /* 超级博主描述 */
  .site-card .info .desc {
    font-size: 0.7rem;
    color: var(--star-fontcolor);
    opacity: 0.7;
    transition: 0.3s;
    text-align: left;
  }

  .site-card:hover .info .desc {
    -webkit-line-clamp: 4;
  }

  .site-card:hover .info .desc {
    transition: 0.3s;
    color: var(--star-white);
    width: 100%
  }

  .site-card:hover .info {
    background: var(--star-theme);
  }

  /* 背景 */
  .site-card {
    border: var(--style-border);
    border-radius: 12px;
    transition: 0.3s;
    transition-timing-function: ease-in-out;
    overflow: hidden;
    height: 200px;
    position: relative;
    width: calc(100% / 7 - 16px);
    background: var(--star-card-bg);
    box-shadow: var(--star-shadow-border);
  }

  .site-card-tag {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4px 8px;
    background-color: var(--star-blue);
    box-shadow: var(--star-shadow-blue);
    color: var(--star-white);
    z-index: 1;
    border-radius: 12px 0 12px 0;
    transition: 0.3s;
    font-size: 0.6rem;
  }

  .site-card-tag.vip {
    /*! Edit and share this gradient: https://html5kit.com/gradient-editor/?preset=d48f16,100;e5b085,0 */
    background: -moz-linear-gradient(38deg, rgba(229, 176, 133, 1) 0%, rgba(212, 143, 22, 1) 100%);
    /* FF3.6+ */
    background: -webkit-linear-gradient(38deg, rgba(229, 176, 133, 1) 0%, rgba(212, 143, 22, 1) 100%);
    /* Chrome10-25, Safari5.1-6 */
    background: linear-gradient(38deg, rgba(229, 176, 133, 1) 0%, rgba(212, 143, 22, 1) 100%);
    /* W3C, IE10+, Firefox16+, Chrome26+, Opera12+, Safari7+ */
    overflow: hidden;
    box-shadow: var(--star-shadow-yellow);
  }

  .light {
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 100px;
    height: 50px;
    background-image: -moz-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    background-image: -webkit-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    -webkit-animation: light_tag 4s both infinite;
    -moz-animation: light_tag 4s both infinite;
    -ms-animation: light_tag 4s both infinite;
    animation: light_tag 4s both infinite;
  }

  @keyframes light_tag {
    0% {
      transform: skewx(0deg);
      -o-transform: skewx(0deg);
      -moz-transform: skewx(0deg);
      -webkit-transform: skewx(0deg);
      left: -150px;
    }

    99% {
      transform: skewx(-25deg);
      -o-transform: skewx(-25deg);
      -moz-transform: skewx(-25deg);
      -webkit-transform: skewx(-25deg);
      left: 50px;
    }
  }

  .site-card-tag.speed {
    background: var(--star-green);
    box-shadow: var(--star-shadow-green);
  }

  .site-card:hover .site-card-tag {
    left: -50px;
  }


  .flink-list-item:hover .site-card-tag {
    left: -70px;
  }

  .site-card .info {
    display: flex;
    border: none;
    padding: 0.5rem;
    width: 100%;
    height: 90px;
    margin: 0;
    border-radius: 0 0 12px 12px;
  }

  /* 修复图片圆角 */
  .site-card .img img {
    border-radius: 0;
    transform: scale(1.03);
    transition: 0.3s;
  }

  @media screen and (min-width: 769px) {
    .site-card:hover .img img {
      transform: scale(1.1);
      filter: brightness(0.3);
    }

    .site-card:hover .img {
      height: 80px;
    }
  }


  .site-card .img {
    -webkit-mask-image: -webkit-radial-gradient(center, rgb(255, 255, 255), rgb(0, 0, 0));
    border-radius: 0;
    height: 120px;
    width: 100%;
    display: flex;
    border: none;
    padding: 0 !important;
  }


  /* 头像 */
  .site-card .info img {
    border-radius: 32px;
    transition: 0.3s !important;
    margin: 2px 8px 0 0;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    background: var(--star-secondbg);
  }


  /* 边距 */
  .site-card-group {
    padding: 20px 0;
  }

  .site-card:hover .info img {
    width: 0;
    height: 0;
    opacity: 0;
    min-width: 0;
    min-height: 0;
  }

  .site-card:hover {
    border: var(--style-border-hover);
    box-shadow: var(--star-shadow-main);
  }

  /* 友链文章 */
  .article-sort-item-info a {
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
```


最后我们注册一下 `Navlink.vue` 组件，后期我们只需要引用它就够了

```ts{4,11}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import Navlink from './components/Navlink.vue'

export default {
  extends: DefaultTheme,

  enhanceApp({app}) {
    // 注册组件
    app.component('Navlink' , Navlink)
  },
}
```



### 新建页面

在 `nav` 目录下新建一个 `index.md` 文件

::: tip 说明
名字随意哈，我只是做演示
:::

```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav
│  │  └─ index.md      <-- 导航演示页
│  └─ index.md
└─ package.json
```

粘贴下面代码保存


```md
---
layout: doc
layoutClass: m-nav-layout
---
```

### 修改样式

然后在 `.vitepress/theme/style` 目录下新建 `nav.scss`

```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme
│  │     └─ style
│  │        └─ nav.scss
│  ├─ nav             
│  │  └─ index.md     
│  └─ index.md
└─ package.json
```

复制粘贴下面代码保存

```scss
.m-nav-layout {
    /* 覆盖全局的 vp-layout-max-width（仅当前页面使用） */
    --vp-layout-max-width: 1660px;
  
    /* layout 样式 */
    .container {
      max-width: var(--vp-layout-max-width) !important;
    }
    .content-container,
    .content {
      max-width: 100% !important;
    }
  
    /* aside 样式 */
    .aside {
      padding-left: 0;
      max-width: 224px;
    }
  
    .content .copyright {
      display: none;
    }
  
    /* tip */
    .tip {
      .custom-block-title {
        display: none;
      }
      p {
        margin: 0;
      }
    }
  
    .vp-doc h2 {
      margin-top: 24px;
    }
  }
```


安装一下 `sass`

::: tip 说明
按 `CTRL+C` 退出开发预览模式后安装

安装完成再重新启动
:::


::: code-group
```sh [pmpm]
pnpm add -D sass
```

```sh [yarn]
yarn add -D sass
```

```sh [npm]
npm i -D sass
```

```sh [bun]
bun add -D sass
```
:::



然后将样式引入 `index.md` ，并关闭侧边栏

```md{4,7}
---
layout: doc
layoutClass: m-nav-layout
sidebar: false
---

<style src="/.vitepress/theme/style/nav.scss"></style>

# 我的导航
```






### 建数据库

在 `.vitepress/theme/untils` 目录新建 `data-ahua.ts` 文件


```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme
│  │     └─ untils
│  │        └─ data-ahua.ts  <- 我在这
│  ├─ nav             
│  │  └─ index.md     
│  └─ index.md
└─ package.json
```

粘贴代码保存，也可参考数据进行修改

::: details 点我查看 data-ahua.ts 代码
```ts
type NavData = {
    title: string
    desc: string
    items: NavLink[]
}
type NavLink = {
    icon: string
    title: string
    desc?: string
    link: string
}
export const NAV_DATA: NavData[] = [
    {
        title: 'AI 导航',
        desc: '让人工智能帮助你完成枯燥的工作',
        items: [
            {
                icon: 'https://gpt.ahuaaa.cn/favicon.ico',
                title: 'ChatGPT（内部）',
                link: 'https://gpt.ahuaaa.cn/',
                desc: '需要内部授权码'
            },
            {
                icon: 'https://gpt4.ahuaaa.cn/favicon.ico',
                title: 'ChatGPT（内部）',
                link: 'https://gpt4.ahuaaa.cn/',
                desc: '需要内部授权码'
            },
            {
                icon: 'https://assets.website-files.com/60de2701a7b28f308f619d3d/62f5b1528499d8e6b3d02447_Gamma_V1_Icon_only_4.gif',
                title: 'Gamma (PPT)',
                link: 'https://gamma.app/',
                desc: '公测免费使用'
            },
            {
                icon: 'https://www.midjourney.com/apple-touch-icon.png',
                title: 'Midjourney（绘画）',
                link: 'https://www.midjourney.com'
            },
            {
                icon: 'https://neveragain.allstatics.com/2019/assets/icon/logo/edraw-mindmaster-square.svg',
                title: 'mindmaster',
                link: 'https://www.mindmaster.io/',
                desc: '亿图思维(流程图)，需付费(可以免费试用)'
            },
            {
                icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
                title: 'Beautiful.ai（PPT）',
                link: 'https://www.beautiful.ai'
            }, {
                title: 'AI工具集',
                icon: 'https://ai-bot.cn/wp-content/uploads/2023/07/ai-bot-favicon.png',
                link: 'https://ai-bot.cn/',
                desc: '国内外AI工具集合网站大全'
            }
        ]
    }, {
        title: '社区',
        desc: '开发者社区',
        items: [
            {
                icon: 'https://ts3.cn.mm.bing.net/th?id=Aed3c79c5ea4781db45fd44d7e804b5ae&w=148&h=148&o=6&dpr=1.3&pid=SANGAM',
                title: 'github',
                desc: '一个面向开源及私有软件项目的托管平台',
                link: 'https://github.com/'
            }, {
                icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
                title: 'Stack Overflow',
                desc: '全球最大的技术问答网站',
                link: 'https://stackoverflow.com'
            },
            {
                title: '稀土掘金',
                icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
                desc: '面向全球中文开发者的技术内容分享与交流平台',
                link: 'https://juejin.cn'
            },
            {
                title: 'SegmentFault 思否',
                icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
                desc: '技术问答开发者社区',
                link: 'https://segmentfault.com'
            },
            {
                title: '博客园',
                // icon: 'https://common.cnblogs.com/favicon.ico',
                icon: 'https://ts4.cn.mm.bing.net/th?id=ODLS.c8870dec-a17f-476f-ad66-f13612a6fe85&w=32&h=32&o=6&pid=13.1',
                desc: '博客园是一个面向开发者的知识分享社区',
                link: 'https://www.cnblogs.com'
            },
            {
                title: '知乎',
                icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
                desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
                link: 'https://juejin.cn'
            },
        ]
    }, {
        title: '设计工具',
        desc: '收录的设计工具',
        items: [
            {
                icon: 'https://img.js.design/assets/webImg/favicon.ico',
                title: '即时设计',
                desc: '同时创造，即时设计',
                link: 'https://js.design/',
            },
        ]
    }, {
        title: 'WEB网页设计',
        desc: '灵感酷站',
        items: [
            {
                icon: 'https://pngimg.com/uploads/pinterest/pinterest_PNG63.png',
                title: 'Pinterest',
                desc: 'Pintester 国外图片资源',
                link: 'https://www.pinterest.com/'
            }, {
                icon: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RLVRjameUVvXbSNFl5xXKwHaHa?pid=ImgDet&rs=1',
                title: 'Dribbble',
                link: 'https://dribbble.com/',
                desc: '设计师必备站点，国内顶尖的设计师都在上面',
            }, {
                icon: 'https://xcx.bigbigwork.com/pimg/favicon.ico',
                title: '大作',
                desc: ' 国内图片资源',
                link: 'https://bigbigwork.com/'
            }, {
                icon: 'https://www.instructables.com/assets/img/siteassets/apple-touch-icon-192x192.png',
                title: 'instructables',
                link: 'https://www.instructables.com/',
                desc: '电子电气作品',
            },
        ]
    }, {
        title: '小工具',
        desc: '收录的小工具',
        items: [
            {
                icon: 'https://squoosh.app/c/icon-demo-logo-326ed9b6.png',
                title: '在线png压缩',
                desc: 'png图片压缩',
                link: 'https://squoosh.app/'
            },
            {
                icon: 'https://uigradients.com/static/images/favicon-32x32.png',
                title: 'CSS渐变',
                desc: '在线查看渐变颜色,并生成css代码一键复制',
                link: 'https://uigradients.com/#Mini',
            },
            {
                icon: 'https://ezgif.com/favicon.ico',
                title: '在线转GIF',
                desc: '多种格式在线转换为GIF',
                link: 'https://ezgif.com/',
            },
            {
                icon: 'https://color.oulu.me/favicon.ico',
                title: 'CSS渐变2',
                desc: '180种免费的线性渐变,不仅可以复制渐变的原生CSS颜色代码，还可以查看下载每个优质的渐变图片',
                link: 'https://color.oulu.me/'
            }
        ]
    },
    {
        title: 'npm',
        desc: '免费的前端开源项目 CDN 加速服务',
        items: [
            {
                icon: 'https://cdn.cbd.int/favicon.ico',
                title: 'cbd',
                desc: 'npm镜像',
                link: 'https://cdn.cbd.int/'
            }, {
                icon: 'https://cdn.bytedance.com/src/res/favicon.png',
                title: '字节跳动静态资源公共库',
                link: 'https://cdn.bytedance.com/',
                desc: '字节跳动静态资源公共库',
            }, {
                icon: 'https://www.bootcdn.cn/assets/ico/favicon.ico',
                title: 'bootcdn',
                desc: '稳定、快速、免费的前端开源项目 CDN 加速服务',
                link: 'https://www.bootcdn.cn/'
            }, {
                icon: 'https://www.jsdelivr.com/favicon.ico',
                title: 'jsDelivr',
                link: 'https://www.jsdelivr.com/',
                desc: 'jsDelivr 是一个免费、快速且可靠的 npm 和 GitHub 开源 CDN。大多数 GitHub 链接可以轻松转换为 jsDelivr 链接。',
            },
        ]
    }, {
        title: 'Vue 生态',
        desc: '一系列支持库和工具，可帮助开发者更快速、高效地构建现代化的Vue应用程序。',
        items: [
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue 3',
                desc: '渐进式 JavaScript 框架',
                link: 'https://cn.vuejs.org'
            },
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue 2',
                desc: '渐进式 JavaScript 框架',
                link: 'https://v2.cn.vuejs.org'
            },
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue Router',
                desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
                link: 'https://router.vuejs.org/zh'
            },
            {
                icon: 'https://pinia.vuejs.org/logo.svg',
                title: 'Pinia',
                desc: '符合直觉的 Vue.js 状态管理库',
                link: 'https://pinia.vuejs.org/zh'
            },
            {
                icon: 'https://nuxt.com/icon.png',
                title: 'Nuxt.js',
                desc: '一个基于 Vue.js 的通用应用框架',
                link: 'https://nuxt.com'
            },
            {
                icon: 'https://vueuse.org/favicon.svg',
                title: 'VueUse',
                desc: 'Vue Composition API 的常用工具集',
                link: 'https://vueuse.org'
            },
            {
                icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
                title: 'Element Plus',
                desc: '基于 Vue 3，面向设计师和开发者的组件库',
                link: 'https://element-plus.org'
            },
            {
                icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
                title: 'Ant Design Vue',
                desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
                link: 'https://antdv.com'
            },
            {
                icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
                title: 'Vant',
                desc: '轻量、可定制的移动端 Vue 组件库',
                link: 'https://vant-ui.github.io/vant'
            },
            {
                icon: 'https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico',
                title: 'Cube UI',
                desc: '基于 Vue.js 实现的精致移动端组件库',
                link: 'https://didi.github.io/cube-ui'
            },
            {
                icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
                title: 'NutUI',
                desc: '京东风格的轻量级移动端组件库',
                link: 'https://nutui.jd.com'
            }
        ]
    },]
```
:::



### 实现

最后我们引入 `index.md`，上下页也关闭

```md{5-6,9-13}
---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
---

<style src="/.vitepress/theme/style/nav.scss"></style>

# 我的导航

<Navlink></Navlink>
```





### 优化：搜索


默认自带的本地搜索无法爬取到导航，建议使用 [Algolia](../page.md#algolia)


还需要增加页面的 `outline` 配置项

```md
---
outline: [2, 3, 4]
---
```




### 优化：下划线

这个在 [VitePress美化](../style#链接下划线) 的时候说了，请参考修改

::: warning 注意
如果你在 `var.css` 中引用了，这里就不用填了
:::

```scss
/* .vitepress/theme/style/nav.scss */
.vp-doc a {
    text-decoration: none;
}
```


### 优化：图标穿透


因为安装 [medium-zoom](http://127.0.0.1:5174/plugin.html#%E5%9B%BE%E7%89%87%E7%BC%A9%E6%94%BE) 的时候引入了一个样式，导致手机端导航被这个图片样式给遮盖了

那么我们就需要在 `nav.scss` 中加入此样式，并改成 `0` 就可以覆盖掉

```scss
// .vitepress/theme/style/nav.scss
.medium-zoom-overlay {
  z-index: 0;
}
  
.medium-zoom-image {
  z-index: 0 !important;
}
```

