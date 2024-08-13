# 布局插槽

> 更新时间：2024-8-13


## 简介

Vitepress基于Vue3用到了 `<slot>` 插槽，在 `<Layout/>` 布局组件中预留了一些插槽，可以对页面布局进行自定义修改

由于也是使用组件，请了解过 [组件的使用](./components.md) 了再来看

::: tip 说明
布局插槽就好比一个插线板，将电器的插头插入对应的插线孔就可以工作了
:::


## 示例

开始前，请确保你安装了 `vue` ，已安装的无视


::: code-group
```sh [pmpm]
pnpm add -D vue
```

```sh [yarn]
yarn add -D vue
```

```sh [npm]
npm i vue
```

```sh [bun]
bun add -D vue
```
:::



在 `.vitepress/theme/components` 目录新建一个 `MyLayout.vue`组件



```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ MyLayout.vue    <-- 插槽组件
│  │   └─ index.ts
└─ index.md
```


使用上，有两种方案，按使用习惯选择 [示例1](#示例1-layout) 和 [示例2](#示例2-h函数)

---


### 示例1：Layout

在 `MyLayout.vue` 中粘贴如下代码


::: tip 说明
这里的 `aside-outline-before` 和 `doc-before` 是 [插槽](#插槽表)

如果只改一个布局插槽，自行增减一个 `<template>` 即可
:::



::: code-group

```vue{10-13,15-18} [MyLayout.vue]
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>

        <!-- 插槽1 --> 
        <template #aside-outline-before>
            <div class="title">aside-outline-before</div>
        </template>

        <!-- 插槽2 -->
        <template #doc-before>
            <div class="title">doc-before</div>
        </template>

    </Layout>
</template>

<style>
.title {
    color: red;
}
</style>
```
:::



然后在 `.vitepress/theme/index.ts` 中引入


```ts{3,7}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import MyLayout from './components/MyLayout.vue' // [!code focus]

export default {
  extends: DefaultTheme,
  Layout: MyLayout, // [!code focus]
}
```



---





### 示例2：h函数

在 `MyLayout.vue` 中粘贴如下代码

```vue{5}
<script setup>
</script>

<template>
  <div class="title">aside-outline-before</div>
</template>

<style>
.title {
  color: red;
}
</style>
```

::: tip 说明
这里的 `aside-outline-before` 是 [插槽](#插槽表)

如果想使用多个插槽，再新建一个vue组件即可
:::



```ts{3-4,9-14}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import MyLayout from './components/MyLayout.vue'
// import MyLayout2 from './components/MyLayout2.vue' // 第2个组件

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(MyLayout),
      //'doc-before': () => h(MyLayout2), // 第2个组件使用doc-before插槽
    })
  }
}
```




## 插槽表

不同的页面，可使用的插槽不同

### doc

当 [Frontmatter](./frontmatter.md) 配置 `layout: doc` (默认)时插槽及位置

* doc-top
* doc-bottom
* doc-footer-before
* doc-before
* doc-after


* sidebar-nav-before
* sidebar-nav-after



* aside-top
* aside-bottom
* aside-outline-before
* aside-outline-after
* aside-ads-before
* aside-ads-after


![](/layout-doc.png)


---


### home

当 [Frontmatter](./frontmatter.md) 配置 `layout: home` (默认)时插槽及位置

* home-hero-before
* home-hero-info
* home-hero-image
* home-hero-after
* home-features-before
* home-features-after


![](/layout-home.png)


---

### page

当 [Frontmatter](./frontmatter.md) 配置 `layout: page` (默认)时插槽及位置

* page-top
* page-bottom

![](/layout-page.png)


---

### 404

在未找到 (404) 页面上

* not-found

![](/layout-404.png)

---

### Always

所有布局均可使用

* layout-top
* layout-bottom


* nav-bar-title-before
* nav-bar-title-after
* nav-bar-content-before
* nav-bar-content-after


* nav-screen-content-before
* nav-screen-content-after


![](/layout-nav.png)


## 使用演示

分别演示两种使用情况，[Frontmatter使用](#frontmatter使用) 和 [常规使用](#常规使用)

---

### Frontmatter（Layout）

本方法参考 [掘金 @Younglina](https://juejin.cn/post/7134586612406714375)的文章

通过VitePress官网给出的 [useDate](https://vitepress.dev/reference/runtime-api#usedata) 返回页面数据，可以看到返回对象的类型

```ts{5}
interface VitePressData {
  site: Ref<SiteData>
  page: Ref<PageData>
  theme: Ref<any> // themeConfig from .vitepress/config.js
  frontmatter: Ref<PageData['frontmatter']>
  lang: Ref<string>
  title: Ref<string>
  description: Ref<string>
  localePath: Ref<string>
}
```

我这里仅演示 `frontmatter` 使用，其他的同理


在 `.vitepress/theme/components` 目录新建一个 `tags.vue`组件

```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ tags.vue
│  │   └─ index.ts
└─ index.md
```

粘贴如下代码，此处的插槽使用的是 [doc-before](#doc)

::: code-group

```vue{12-14} [tags.vue]
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme

const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-before>
      <span class="date">🔥&nbsp;更新时间：{{ frontmatter.date }}</span>
    </template>
  </Layout>
</template>

<style>
  .date{
    font-size: 15px;
    color: #7f7f7f;
    margin-right: 10px;
  }
</style>
```
:::


然后在引入

```ts{3-4,8}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import tags from './tags.vue'

export default {
  extends: DefaultTheme,
  Layout: tags,
}
```

然后在任意 `*.md` 文章顶部使用 Frontmatter

```md
---
date: 2023-12-19 08:09
---
```

查看效果
 
![](/layout-demo-01.png)



---


### Vite官网赞助（h函数）


这里我们参考 [Vite官网](https://vitejs.cn/vite3-cn/) 下的赞助，代码在 [仓库](https://github.com/vitejs/vite) 查找


![](/layout-vite.png)

在 `untils` 目录新建一个 `sponsors.ts` 文件



```md{7}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   ├─ untils
│  │   │   └─ sponsors.ts    <-- ts文件
│  │   └─ index.ts
└─ index.md
```

粘贴如下代码，保存

::: code-group

```ts [sponsors.ts ]
import { ref, onMounted } from 'vue'

interface Sponsors {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

interface Sponsor {
  name: string
  img: string
  url: string
}

// shared data across instances so we load only once.
const data = ref()

const dataHost = 'https://sponsors.vuejs.org'
const dataUrl = `${dataHost}/vite.json`

const viteSponsors: Pick<Sponsors, 'special' | 'gold'> = {
  special: [
    // sponsors patak-dev
    {
      name: 'StackBlitz',
      url: 'https://stackblitz.com',
      img: '/svg/stackblitz.svg',
    },
    // sponsors antfu
    {
      name: 'NuxtLabs',
      url: 'https://nuxtlabs.com',
      img: '/svg/nuxtlabs.svg',
    },
    // sponsors bluwy
    {
      name: 'Astro',
      url: 'https://astro.build',
      img: '/svg/astro.svg',
    },
  ],
  gold: [
    // through GitHub -> OpenCollective
    {
      name: 'Remix',
      url: 'https://remix.run/',
      img: '/svg/remix.svg',
    },
  ],
}

export function useSponsor() {
  onMounted(async () => {
    if (data.value) {
      return
    }

    const result = await fetch(dataUrl)
    const json = await result.json()

    data.value = mapSponsors(json)
  })

  return {
    data,
  }
}

function mapSponsors(sponsors: Sponsors) {
  return [
    {
      tier: 'Special Sponsors',
      size: 'big',
      items: viteSponsors['special'],
    },
    {
      tier: 'Platinum Sponsors',
      size: 'big',
      items: mapImgPath(sponsors['platinum']),
    },
    {
      tier: 'Gold Sponsors',
      size: 'medium',
      items: viteSponsors['gold'].concat(mapImgPath(sponsors['gold'])),
    },
  ]
}

const viteSponsorNames = new Set(
  Object.values(viteSponsors).flatMap((sponsors) =>
    sponsors.map((s) => s.name),
  ),
)

/**
 * Map Vue/Vite sponsors data to objects and filter out Vite-specific sponsors
 */
function mapImgPath(sponsors: Sponsor[]) {
  return sponsors
    .filter((sponsor) => !viteSponsorNames.has(sponsor.name))
    .map((sponsor) => ({
      ...sponsor,
      img: `${dataHost}/images/${sponsor.img}`,
    }))
}
```
:::


然后我们将赞助商的图片放入 `public - svg` 文件夹


```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
├─ public
│  └─ svg      <-- 赞助商svg文件
└─ index.md
```

在 `components` 目录新建 `HomeSponsors.vue` 组件



```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ HomeSponsors.vue    <-- 插槽组件
│  │   └─ index.ts
└─ index.md
```

粘贴如下代码，保存

::: code-group

```ts [HomeSponsors.vue]
<script setup lang="ts">
import { VPHomeSponsors } from 'vitepress/theme'
import { useSponsor } from '../untils/sponsor'

const { data } = useSponsor()
</script>

<template>
  <VPHomeSponsors
    v-if="data"
    message="Vite is free and open source, made possible by wonderful sponsors."
    :data="data"
  />
  <div class="action">
    <a
      class="sponsor"
      href="https://github.com/sponsors/vitejs"
      target="_blank"
      rel="noreferrer"
    >
      Sponsor Vite
    </a>
    <a
      class="sponsor"
      href="https://github.com/sponsors/yyx990803"
      target="_blank"
      rel="noreferrer"
    >
      Sponsor Evan You
    </a>
  </div>
</template>

<style scoped>
.action {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-top: 4rem;
}

.sponsor {
  /* .VPButton */
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
  /* .VPButton.medium */
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  /* .VPButton.sponsor */
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
}

.sponsor:hover {
  /* .VPButton.sponsor:hover */
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
}
</style>
```
:::


最后我们使用 `home-features-after` 插槽并引入配置文件`index.ts` 

```ts{3-4,8-12}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import HomeSponsors from './components/HomeSponsors.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(HomeSponsors),
    })
  },
}
```








### 不蒜子

之前安装了 [浏览器插件：不蒜子](./plugin.md#浏览量) ，现在仅做一个简单的封装示例，好看自己研究一下吧

新建一个 `busuanzi.vue` 组件

```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ busuanzi.vue    <-- 不蒜子组件
│  │   └─ index.ts
└─ index.md
```


选择一种方式，复制代码，粘贴到 `busuanzi.vue` 中

::: code-group

```vue [h函数（2选1）]
<script setup>
</script>

<template>
  <div class="busuanzi">
    本站访客数 <span id="busuanzi_value_site_uv" /> 人次 本站总访问量 <span id="busuanzi_value_site_pv" /> 次
  </div>
</template>

<style>
.busuanzi {
  font-size: 15px;
  color: gray;
  text-align: center;
}
</style>
```

```vue [Layout（2选1）]
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <div class="busuanzi">
        本站访客数 <span id="busuanzi_value_site_uv" /> 人次 本站总访问量 <span id="busuanzi_value_site_pv" /> 次
      </div>
    </template>
  </Layout>
</template>

<style>
.busuanzi {
  font-size: 15px;
  color: gray;
  text-align: center;
}
</style>
```

:::


最后引入 `index.ts` 中

::: code-group

```ts{4-5,9-13} [h函数（2选1）]
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import { h } from 'vue' // [!code focus:2]
import busuanzi from './components/busuanzi.vue'

export default {
  extends: DefaultTheme,
  Layout() { // [!code focus:5]
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(busuanzi),
    })
  },
}
```

```ts{3,7} [Layout（2选1）]
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import busuanzi from './components/busuanzi.vue' // [!code focus]

export default {
  extends: DefaultTheme,
  Layout: busuanzi, // [!code focus]
}
```