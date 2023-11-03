# VitePress搭建个人导航

<p style="color: #7e7e7e;">更新时间：2023-10-28</p>


## 简介

VitePress也能做导航，Amazing！茂神牛批！

* 仓库：https://github.com/maomao1996/vitepress-nav-template

* Demo：https://fe-nav.netlify.app/nav/

::: warning 说明
如果你懒得折腾，直接仓库下 [@茂茂大神](https://github.com/maomao1996/mm-notes) 的用即可
:::



## 自定义布局

在 `docs/.vitepress/theme` 目录下的`index.ts` 文件中加入如下代码

::: tip 说明
因为 `layout: doc` 主要是提供给文档使用的，其页面宽度有限，同时为了更好的样式隔离，为其添加一个 `layoutClass` 方便我们更好的去自定义样式
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
npm add -D vue
```

```sh [bun]
bun add -D vue
```
:::
::::




## 自定义组件

为了让这个导航网站与整个站点风格相符，将 `features` 作为参考并进行改造

在 `nav` 新建 `components` 文件夹，再新建 `type.ts` 文件

```md{6-7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav           
│  │  └─ components   <-- 导航组件目录
│  │     └─ type.ts   <-- 导航组件配置
│  │  └─ index.md     
│  └─ index.md       
└─ package.json
```

粘贴如下代码

```ts
/* type.ts */
export interface NavLink {
    /** 站点图标 */
    icon?: string | { svg: string }
    /** 站点名称 */
    title: string
    /** 站点名称 */
    desc?: string
    /** 站点链接 */
    link: string
  }
```


然后在 `components` 目录下新建 `MNavLink.vue`，复制代码保存

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav           
│  │  └─ components
│  │     └─ type.ts
│  │     └─ MNavLink.vue   <-- 导航组件
│  │  └─ index.md     
│  └─ index.md       
└─ package.json
```

::: details 点我查看 MNavLink.vue 代码
```vue
<script setup lang="ts">
import { computed } from 'vue'

import { NavLink } from './type'

const props = defineProps<{
  icon?: NavLink['icon']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})
</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box">
      <div class="box-header">
        <div v-if="svg" class="icon" v-html="svg"></div>
        <div v-else-if="icon && typeof icon === 'string'" class="icon">
          <img :src="icon" :alt="title" onerror="this.parentElement.style.display='none'" />
        </div>
        <h6 v-if="title" class="title">{{ title }}</h6>
      </div>
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style lang="scss" scoped>
.m-nav-link {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 8px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--vp-c-bg-soft);
  }

  .box {
    display: flex;
    flex-direction: column;
    padding: 16px;
    height: 100%;
    color: var(--vp-c-text-1);
    &-header {
      display: flex;
      align-items: center;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    border-radius: 6px;
    width: 48px;
    height: 48px;
    font-size: 24px;
    background-color: var(--vp-c-mute);
    transition: background-color 0.25s;
    :deep(svg) {
      width: 24px;
      fill: currentColor;
    }
    :deep(img) {
      border-radius: 4px;
      width: 24px;
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 48px;
    font-size: 16px;
    font-weight: 600;
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    margin: 10px 0 0;
    line-height: 20px;
    font-size: 12px;
    color: var(--vp-c-text-2);
  }
}

@media (max-width: 960px) {
  .m-nav-link {
    .box {
      padding: 8px;
    }
    .icon {
      width: 40px;
      height: 40px;
    }
    .title {
      line-height: 40px;
      font-size: 14px;
    }
  }
}
</style>
```
:::

继续在 `components` 目录下新建 `MNavLinks.vue`，复制代码保存

```md{9}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav           
│  │  └─ components
│  │     └─ type.ts
│  │     └─ MNavLink.vue    <-- 导航组件
│  │     └─ MNavLinks.vue   <-- 导航组件2
│  │  └─ index.md     
│  └─ index.md       
└─ package.json
```

::: details 点我查看 MNavLinks.vue 代码
```
<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'

import MNavLink from './MNavLink.vue'
import type { NavLink } from './type'

const props = defineProps<{
  title: string
  items: NavLink[]
}>()

const formatTitle = computed(() => {
  return slugify(props.title)
})
</script>

<template>
  <h2 v-if="title" :id="formatTitle" tabindex="-1">
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true">#</a>
  </h2>
  <div class="m-nav-links">
    <MNavLink
      v-for="{ icon, title, desc, link } in items"
      :key="link"
      :icon="icon"
      :title="title"
      :desc="desc"
      :link="link"
    />
  </div>
</template>

<style lang="scss" scoped>
.m-nav-links {
  --gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-row-gap: var(--gap);
  grid-column-gap: var(--gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--gap);
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
    --gap: 20px;
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
npm add -D @mdit-vue/shared
```

```sh [bun]
bun add -D @mdit-vue/shared
```
:::




## 导航页

### 新建页面

在 `nav` 目录下新建一个 `demo.md` 文件

::: tip 说明
名字随意哈，我只是做演示
:::

```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav
│  │  └─ demo.md      <-- 导航演示页
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

然后在 `nav` 目录下新建 `index.scss`

::: tip 说明
VitePress 的所有样式都是基于 `CSS` 变量来编写，所以在扩展时很方便，同时因为 `CSS` 变量具有作用域，我们只需要在自定义的 `layoutClass` 下去修改，这样也不会影响其他页面
:::

```md{7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav             
│  │  └─ demo.md     
│  │  └─ index.scss   <-- 导航页样式
│  └─ index.md
└─ package.json
```

```scss
.m-nav-layout {
  /* 覆盖全局的 vp-layout-max-width（仅当前页面使用） */
  --vp-layout-max-width: 1660px;

  /* 修改 layout 最大宽度 */
  .container {
    max-width: var(--vp-layout-max-width) !important;
  }
  .content-container,
  .content {
    max-width: 100% !important;
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
npm add -D sass
```

```sh [bun]
bun add -D sass
```
:::




然后将其引入 `demo.md` ，并关闭侧边栏

```md{4,7}
---
layout: doc
layoutClass: m-nav-layout
sidebar: false
---

<style src="./index.scss"></style>

# 我的导航
```






### 建数据库

在 `nav` 目录新建 `data.ts` 文件


```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ nav           
│  │  └─ data.ts      <-- 数据配置
│  │  └─ index.md     
│  └─ index.md       
└─ package.json
```

粘贴代码保存，也可参考数据进行修改

::: details 点我查看 data.ts 代码
```ts
import type { NavLink } from './components/type'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: '常用工具',
    items: [
      {
        icon: 'https://caniuse.com/img/favicon-128.png',
        title: 'Can I use',
        desc: '前端 API 兼容性查询',
        link: 'https://caniuse.com',
      },
      {
        icon: 'https://tinypng.com/images/apple-touch-icon.png',
        title: 'TinyPNG',
        desc: '在线图片压缩工具',
        link: 'https://tinypng.com',
      },
      {
        icon: 'https://devtool.tech/logo.svg',
        title: '开发者武器库',
        desc: '开发者武器库，做开发者最专业最好用的专业工具箱',
        link: 'https://devtool.tech',
      },
      {
        icon: 'https://tool.lu/favicon.ico',
        title: '在线工具',
        desc: '开发人员的工具箱',
        link: 'https://tool.lu',
      },
      {
        icon: '/icons/json-cn.ico',
        title: 'Json 中文网',
        desc: 'JSON 在线解析及格式化验证',
        link: 'https://www.json.cn',
      },
    ],
  },
  {
    title: 'AI 导航',
    items: [
      {
        icon: '/icons/chatgpt.png',
        title: 'ChatGPT（最强）',
        link: 'https://chat.openai.com/chat',
      },
      {
        icon: 'https://www.notion.so/images/logo-ios.png',
        title: 'Notion AI（笔记）',
        link: 'https://www.notion.so',
      },
      {
        icon: 'https://www.midjourney.com/apple-touch-icon.png',
        title: 'Midjourney（绘画）',
        link: 'https://www.midjourney.com',
      },
      {
        icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
        title: 'Beautiful.ai（PPT）',
        link: 'https://www.beautiful.ai',
      },
    ],
  },
  {
    title: '茂茂的站点导航',
    items: [
      {
        icon: '/logo.png',
        title: '前端日常笔记',
        desc: '日常笔记记录（零零散散啥都记系列）',
        link: 'https://github.com/maomao1996/daily-notes',
      },
      {
        icon: '/logo.png',
        title: '前端思维导图',
        desc: '用思维导图的方式总结个人所学知识',
        link: 'https://mindmap.fe-mm.com',
      },
      {
        icon: 'https://qwerty.fe-mm.com/apple-touch-icon.png',
        title: 'Qwerty Learner',
        desc: '为键盘工作者设计的单词记忆与英语肌肉记忆锻炼软件',
        link: 'https://qwerty.fe-mm.com',
      },
      {
        icon: '/logo.png',
        title: 'mmPlayer',
        desc: 'mmPlayer 在线音乐播放器',
        link: 'https://netease-music.fe-mm.com',
      },
    ],
  },
  {
    title: 'React 生态',
    items: [
      {
        icon: 'https://zh-hans.reactjs.org/favicon.ico',
        title: 'React',
        desc: '用于构建用户界面的 JavaScript 库',
        link: 'https://zh-hans.reactjs.org',
      },
      {
        icon: 'https://reactrouter.com/favicon-light.png',
        title: 'React Router',
        desc: 'React 的声明式路由',
        link: 'https://reactrouter.com',
      },
      {
        icon: 'https://nextjs.org/static/favicon/safari-pinned-tab.svg',
        title: 'Next.js',
        desc: '一个用于 Web 的 React 框架',
        link: 'https://nextjs.org',
      },
      {
        icon: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        title: 'UmiJS',
        desc: '插件化的企业级前端应用框架',
        link: 'https://umijs.org',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
        title: 'Ant Design',
        desc: '一套企业级 UI 设计语言和 React 组件库',
        link: 'https://ant.design',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/69a27fcc-ce52-4f27-83f1-c44541e9b65d.svg',
        title: 'Ant Design Mobile',
        desc: '构建移动 WEB 应用程序的 React 组件库',
        link: 'https://mobile.ant.design',
      },
      {
        icon: 'https://docs.pmnd.rs/apple-touch-icon.png',
        title: 'Zustand',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
      },
      {
        icon: 'https://valtio.pmnd.rs/favicon.ico',
        title: 'Valtio',
        desc: 'makes proxy-state simple for React and Vanilla',
        link: 'https://valtio.pmnd.rs',
      },
      {
        icon: 'https://jotai.org/favicon.svg',
        title: 'Jotai',
        desc: 'primitive and flexible state management for React',
        link: 'https://jotai.org',
      },
      {
        icon: 'https://cn.redux.js.org/img/redux.svg',
        title: 'Redux',
        desc: 'JavaScript 应用的状态容器，提供可预测的状态管理',
        link: 'https://cn.redux.js.org',
      },
      {
        icon: 'https://zh.mobx.js.org/assets/mobx.png',
        title: 'MobX',
        desc: '一个小型、快速、可扩展的 React 状态管理解决方案',
        link: 'https://zh.mobx.js.org',
      },
      {
        icon: 'https://ahooks.js.org/simple-logo.svg',
        title: 'ahooks',
        desc: '一套高质量可靠的 React Hooks 库',
        link: 'https://ahooks.js.org/zh-CN',
      },
    ],
  },
  {
    title: 'Vue 生态',
    items: [
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 3',
        desc: '渐进式 JavaScript 框架',
        link: 'https://cn.vuejs.org',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 2',
        desc: '渐进式 JavaScript 框架',
        link: 'https://v2.cn.vuejs.org',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue Router',
        desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
        link: 'https://router.vuejs.org/zh',
      },
      {
        icon: 'https://pinia.vuejs.org/logo.svg',
        title: 'Pinia',
        desc: '符合直觉的 Vue.js 状态管理库',
        link: 'https://pinia.vuejs.org/zh',
      },
      {
        icon: 'https://nuxt.com/icon.png',
        title: 'Nuxt.js',
        desc: '一个基于 Vue.js 的通用应用框架',
        link: 'https://nuxt.com',
      },
      {
        icon: 'https://vueuse.org/favicon.svg',
        title: 'VueUse',
        desc: 'Vue Composition API 的常用工具集',
        link: 'https://vueuse.org',
      },
      {
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        title: 'Element Plus',
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        link: 'https://element-plus.org',
      },
      {
        icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
        title: 'Ant Design Vue',
        desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
        link: 'https://antdv.com',
      },
      {
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
        title: 'Vant',
        desc: '轻量、可定制的移动端 Vue 组件库',
        link: 'https://vant-ui.github.io/vant',
      },
      {
        icon: 'https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico',
        title: 'Cube UI',
        desc: '基于 Vue.js 实现的精致移动端组件库',
        link: 'https://didi.github.io/cube-ui',
      },
      {
        icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
        title: 'NutUI',
        desc: '京东风格的轻量级移动端组件库',
        link: 'https://nutui.jd.com',
      },
    ],
  },
  {
    title: 'JavaScript 框架类库',
    items: [
      {
        icon: 'https://svelte.dev/svelte-logo-horizontal.svg',
        title: 'Svelte',
        desc: '将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码',
        link: 'https://svelte.dev',
      },
      {
        // icon: 'https://simpleicons.org/icons/jquery.svg',
        icon: '/icons/jquery.svg',
        title: 'jQuery API 中文文档',
        desc: '一个兼容多浏览器的 JavaScript 框架',
        link: 'https://jquery.cuishifeng.cn',
      },
    ],
  },
  {
    title: 'CSS 相关',
    items: [
      {
        icon: 'https://postcss.org/assets/logo-3e39b0aa.svg',
        title: 'PostCSS',
        desc: '一个用 JavaScript 转换 CSS 的工具',
        link: 'https://postcss.org',
      },
      {
        icon: 'https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg',
        title: 'Sass',
        desc: '一个成熟，稳定，功能强大的专业级 CSS 扩展语言',
        link: 'https://sass-lang.com',
      },
      {
        icon: 'https://www.tailwindcss.cn/apple-touch-icon.png',
        title: 'TailwindCSS 中文网',
        desc: '一个功能类优先的 CSS 框架',
        link: 'https://www.tailwindcss.cn',
      },
    ],
  },
  {
    title: '小程序相关',
    items: [
      {
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
        title: '微信小程序文档',
        desc: '微信小程序官方开发者文档',
        link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
      },
      {
        icon: '/icons/taro.svg',
        title: 'Taro',
        desc: '多端统一开发解决方案',
        link: 'https://taro.jd.com',
      },
      {
        icon: 'https://web-assets.dcloud.net.cn/unidoc/zh/icon.png',
        title: 'uni-app',
        desc: '一个使用 Vue.js 开发所有前端应用的框架',
        link: 'https://uniapp.dcloud.net.cn',
      },
      {
        icon: 'https://mpxjs.cn/favicon.ico',
        title: 'Mpx',
        desc: '增强型跨端小程序框架',
        link: 'https://mpxjs.cn',
      },
    ],
  },
  {
    title: 'Node 相关',
    items: [
      {
        icon: '/icons/nodejs.svg',
        title: 'Node.js',
        desc: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境',
        link: 'https://nodejs.org/zh-cn',
      },
      {
        icon: 'https://expressjs.com/images/favicon.png',
        title: 'Express',
        desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
        link: 'https://expressjs.com',
      },
      {
        icon: '/icons/koa.svg',
        title: 'Koa',
        desc: '基于 Node.js 平台的下一代 web 开发框架',
        link: 'https://koajs.com',
      },
      {
        icon: 'https://www.eggjs.org/favicon.png',
        title: 'Egg',
        desc: '为企业级框架和应用而生',
        link: 'https://www.eggjs.org/zh-CN',
      },
      {
        icon: 'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
        title: 'Nest.js 中文文档',
        desc: '用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架',
        link: 'https://docs.nestjs.cn',
      },
    ],
  },
  {
    title: '可视化',
    items: [
      {
        icon: 'https://echarts.apache.org/zh/images/favicon.png',
        title: 'ECharts',
        desc: '一个基于 JavaScript 的开源可视化图表库',
        link: 'https://echarts.apache.org/zh/index.html',
      },
      {
        icon: 'https://antv.vision/icons/icon-72x72.png',
        title: 'AntV',
        desc: '蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。',
        link: 'https://antv.vision/zh/',
      },
      {
        icon: 'https://d3js.org/favicon.png',
        title: 'D3.js',
        desc: '一个遵循 Web 标准用于可视化数据的 JavaScript 库',
        link: 'https://d3js.org',
      },
      {
        icon: 'https://www.chartjs.org/favicon.ico',
        title: 'Chart.js',
        desc: '一个简单而灵活的 JavaScript 图表库',
        link: 'https://www.chartjs.org',
      },
      {
        icon: 'https://threejs.org/files/favicon.ico',
        // icon: 'https://threejs.org/files/favicon_white.ico',
        title: 'Three.js',
        desc: 'JavaScript 3d 库',
        link: 'https://threejs.org',
      },
    ],
  },
  {
    title: '编译&构建&打包',
    items: [
      {
        icon: 'https://www.webpackjs.com/icon_180x180.png',
        title: 'Webpack 中文网',
        desc: '一个用于现代 JavaScript 应用程序的静态模块打包工具',
        link: 'https://www.webpackjs.com',
      },
      {
        icon: 'https://cn.vitejs.dev/logo.svg',
        title: 'Vite 中文文档',
        desc: '下一代前端工具链',
        link: 'https://cn.vitejs.dev',
      },
      {
        icon: 'https://www.rollupjs.com/img/favicon.png',
        title: 'Rollup',
        desc: 'Rollup 是一个 JavaScript 模块打包器',
        link: 'https://www.rollupjs.com',
      },
      {
        icon: 'https://turbo.build/images/favicon-dark/apple-touch-icon.png',
        title: 'Turbo',
        desc: 'Turbo is an incremental bundler and build system optimized for JavaScript and TypeScript, written in Rust',
        link: 'https://turbo.build',
      },
      {
        icon: 'https://www.babeljs.cn/img/favicon.png',
        title: 'Babel',
        desc: 'Babel 是一个 JavaScript 编译器',
        link: 'https://www.babeljs.cn',
      },
      {
        icon: 'https://esbuild.github.io/favicon.svg',
        title: 'esbuild',
        desc: 'An extremely fast bundler for the web',
        link: 'https://esbuild.github.io',
      },
      {
        icon: 'https://swc.rs/favicon/apple-touch-icon.png',
        title: 'SWC',
        desc: 'Rust-based platform for the Web',
        link: 'https://swc.rs',
      },
    ],
  },
  {
    title: '站点生成器',
    items: [
      {
        icon: 'https://astro.build/favicon.svg',
        title: 'Astro',
        desc: '一个现代化的轻量级静态站点生成器',
        link: 'https://astro.build',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VitePress',
        desc: '由 Vite 和 Vue 驱动的静态网站生成器',
        link: 'https://vitepress.dev',
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'VuePress',
        desc: 'Vue 驱动的静态网站生成器',
        link: 'https://vuepress.vuejs.org/zh',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        desc: '基于 Umi 为组件研发而生的静态站点框架',
        link: 'https://d.umijs.org',
      },
      {
        icon: 'https://docusaurus.io/zh-CN/img/docusaurus.ico',
        title: 'Docusaurus',
        desc: '基于 React 的静态网站生成器',
        link: 'https://docusaurus.io/zh-CN',
      },
    ],
  },
  {
    title: '图标库',
    items: [
      {
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
        title: 'iconfont',
        desc: '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
        link: 'https://www.iconfont.cn',
      },
      {
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        title: 'IconPark 图标库',
        desc: 'IconPark图标库是一个通过技术驱动矢量图标样式的开源图标库，可以实现根据单一 SVG 源文件变换出多种主题， 具备丰富的分类、更轻量的代码和更灵活的使用场景；致力于构建高质量、统一化、可定义的图标资源，让大多数人都能够选择适合自己的风格图标',
        link: 'https://iconpark.oceanengine.com/official',
      },
      {
        icon: 'https://emoji.muan.co/appicon.png',
        title: 'Emoji searcher',
        desc: 'Emoji 表情大全',
        link: '',
      },
    ],
  },
  {
    title: '前端学习资料',
    items: [
      {
        icon: 'https://developer.mozilla.org/apple-touch-icon.6803c6f0.png',
        title: 'MDN | Web 开发者指南',
        desc: 'Mozilla 的开发者平台，提供了大量关于 HTML、CSS 和 JavaScript 的详细文档以及广泛的 Web API 参考资',
        link: 'https://developer.mozilla.org/zh-CN',
      },
      {
        icon: 'https://static.runoob.com/images/favicon.ico',
        title: '菜鸟教程',
        desc: '学的不仅是技术，更是梦想！',
        link: 'https://www.runoob.com',
      },
      {
        icon: '/icons/es6.svg',
        title: 'ES6 入门教程',
        desc: '阮一峰的网络日志',
        link: 'http://es6.ruanyifeng.com',
      },
    ],
  },
  {
    title: '社区',
    items: [
      {
        title: 'Github',
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
        },
        desc: '一个面向开源及私有软件项目的托管平台',
        link: 'https://github.com',
      },
      {
        icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
        title: 'Stack Overflow',
        desc: '全球最大的技术问答网站',
        link: 'https://stackoverflow.com',
      },
      {
        title: '稀土掘金',
        icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
        desc: '面向全球中文开发者的技术内容分享与交流平台',
        link: 'https://juejin.cn',
      },
      {
        title: 'V2EX',
        icon: 'https://www.v2ex.com/static/icon-192.png',
        desc: '一个关于分享和探索的地方',
        link: 'https://www.v2ex.com',
      },
      {
        title: 'SegmentFault 思否',
        icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
        desc: '技术问答开发者社区',
        link: 'https://segmentfault.com',
      },
      {
        title: '博客园',
        // icon: 'https://common.cnblogs.com/favicon.ico',
        icon: '/icons/cnblogs.svg',
        desc: '博客园是一个面向开发者的知识分享社区',
        link: 'https://www.cnblogs.com',
      },
      {
        title: '知乎',
        icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
        desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
        link: 'https://juejin.cn',
      },
    ],
  },
  {
    title: '摸鱼专用',
    items: [
      {
        icon: 'https://momoyu.cc/icon-192.png',
        title: '摸摸鱼热榜',
        // desc: '聚合每日热门、搞笑、有趣、适合摸鱼的资讯',
        link: 'https://momoyu.cc',
      },
      {
        icon: 'https://v.qq.com/favicon.ico',
        title: '腾讯视频',
        // desc: '中国领先的在线视频媒体平台，海量高清视频在线观看',
        link: 'https://v.qq.com',
      },
      {
        icon: 'https://static.hdslb.com/mobile/img/512.png',
        title: '哔哩哔哩',
        // desc: '',
        link: 'https://www.bilibili.com',
      },
      {
        icon: 'https://www.youtube.com/s/desktop/014dbbed/img/favicon_48x48.png',
        title: 'YouTube',
        // desc: '',
        link: 'https://www.youtube.com',
      },
      {
        icon: '/icons/twitter.svg',
        title: 'Twitter',
        // desc: '',
        link: 'https://twitter.com',
      },
      {
        icon: '/icons/pixiv.png',
        title: 'Pixiv',
        // desc: '',
        link: 'https://www.pixiv.net',
      },
    ],
  },
]
```
:::



最后我们引入 `demo.md`

```md{9-13,18}
---
layout: doc
layoutClass: m-nav-layout
sidebar: false
---

<style src="./index.scss"></style>

<script setup>
import MNavLinks from './components/MNavLinks.vue'

import { NAV_DATA } from './data'
</script>


# 我的导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

```



## 首页

我们直接用茂神的吧，自己修改就行

```md
---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: VitePress-Nav
  text: 前端导航模板教程
  tagline: 基于 VitePress 打造个人前端导航页面
  image:
    src: /logo-nav.png
    alt: vitepress-nav
  actions:
    - text: 快速上手
      link: /nav/step
    - text: 预览
      link: /nav/demo
      theme: alt
    - text: VitePress
      link: /
      theme: sponsor
features:
  - icon: 📖
    title: 前端物语
    details: 整理前端常用知识点<small>（面试八股文）</small><br />如有异议按你的理解为主，不接受反驳
    link: https://notes.fe-mm.com/fe/javascript/types
    linkText: 前端常用知识
  - icon: 📘
    title: 源码阅读
    details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
    link: https://notes.fe-mm.com/analysis/utils/only-allow
    linkText: 源码阅读
  - icon: 💡
    title: Workflow
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
    link: https://notes.fe-mm.com/workflow/utils/library
    linkText: 常用工具库
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: https://notes.fe-mm.com/efficiency/online-tools
    linkText: 提效工具
  - icon: 🐞
    title: 踩坑记录
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: https://notes.fe-mm.com/pit/npm
    linkText: 踩坑记录
  - icon: 💯
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
    link: https://notes.fe-mm.com/mao
---
```



## 搜索 

默认使用自带的本地搜索，如果你使用的 `Algolia` 

还需要增加页面的 `outline` 配置项

```md
---
outline: [2, 3, 4]
---
```


## 美化


### 悬停边框

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



### 下划线

这个在 [VitePress美化](../style#链接下划线) 的时候说了，请参考修改样式

