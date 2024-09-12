# 组件



## 简介

常说的 SFC 组件，即 `Single file component` ，也就是我们的vue组件

组件是将HTML、CSS以及JavaScript封装成了一个 `*.vue` 文件

分别是：`<script>`、`<template>`、`<style>`

::: tip 说明
* JavaScript 对应：`<script>`

* HTML 对应：`<template>`

* CSS 对应：`<style>`
:::



## 安装

::: tip 说明
已安装过的无视，按 `CTRL+C` 退出开发预览模式后安装
:::

::: code-group
```sh [pnpm]
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



## 使用

在 `theme` 目录中 创建 `components`文件夹，然后创建 `Mycomponent.vue`

```md{5-6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ Mycomponent.vue
│  │   └─ index.ts
└─ index.md
```

然后将下面代码粘贴在 `Mycomponent.vue` 中

::: tip 说明
如果没有css样式可以不写 `<style>`
:::

```vue
<script setup>
// 这里是JavaScript
</script>

<template>
<!-- 这里是HTML -->
</template>

<style>
/* 这里是CSS */
</style>
```


然后，在 `theme\index.ts` 中注册全局组件


```md{7}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ Mycomponent.vue
│  │   └─ index.ts
└─ index.md
```

```ts{2,6-9}
/* .vitepress/theme/index.ts */
import Mycomponent from "./components/Mycomponent.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('Mycomponent' , Mycomponent)
  }
}
```





## 演示


### 链接卡片 

::: tip 说明
代码参考自 [vuejs官网](https://cn.vuejs.org/guide/introduction.html) 的 [中文仓库](https://github.com/vuejs-translations/docs-zh-cn)
:::

在 `theme/components` 文件夹，创建 `Linkcard.vue`


```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ Linkcard.vue
│  │   └─ index.ts
└─ index.md
```

粘贴如下代码，保存

::: code-group
```vue [Linkcard.vue]
<script setup lang="ts">
interface Props {
    url: string
    title: string
    description: string
    logo: string
}

const props = withDefaults(defineProps<Props>(), {
    url: '',
    title: '',
    description: '',
    logo: '',
})
</script>


<template>
    <div class="linkcard">
        <a :href="props.url" target="_blank">
            <p class="description">{{ props.title }}<br><span>{{ props.description }}</span></p>
            <div class="logo">
                <img alt="logo" width="70px" height="70px" :src="props.logo" />
            </div>
        </a>
    </div>
</template>

<style>
/* 卡片背景 */
.linkcard {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    padding: 8px 16px 8px 8px;
    transition: color 0.5s, background-color 0.5s;
    margin-top: 15px;
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
</style>
```
:::




然后，在 `index.ts` 中注册全局组件


```md{7}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ Linkcard.vue
│  │   └─ index.ts
└─ index.md
```


```ts{3,7-10}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import Linkcard from "./components/Linkcard.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('Linkcard' , Linkcard)
  }
}
```

使用上，注意格式

```md{1}
<Linkcard url="你的网址" title="标题" description="描述" logo="logo图片路径"/>

比如：

<Linkcard url="https://vitepress.yiov.top/" title="Vitepress中文搭建教程" description="https://vitepress.yiov.top/" logo="https://vitepress.yiov.top/logo.png"/>
```

输出：

<Linkcard url="https://vitepress.yiov.top/" title="Vitepress中文搭建教程" description="https://vitepress.yiov.top/" logo="https://vitepress.yiov.top/logo.png"/>

---


### 首页文字下划线

[首页文字](./index.md) 的下划线，是利用了 [@Theo-Messi](https://github.com/Theo-Messi/tm-fe/) 的组件

在 `theme/components` 文件夹，创建 `HomeUnderline.vue`


```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ HomeUnderline.vue
│  │   └─ index.ts
└─ index.md
```

在 `HomeUnderline.vue` 填入如下代码，保存

::: code-group
```vue [HomeUnderline.vue]
<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'

/**
 * 获取当前页面的数据，包括前言和其它信息。
 * @returns {Object} 包含前言（frontmatter）等数据。
 */
const { frontmatter: fm } = useData()

/**
 * 在组件挂载后，移动指定的 DOM 元素。
 * 将 `#hero-text` 元素移动到 `.VPHero .text` 元素内部。
 */
onMounted(() => {
  const p = document.querySelector('.VPHero .text') as HTMLElement | null
  const s = document.querySelector('#hero-text') as HTMLElement | null

  if (!p || !s) return

  // 移除 `.VPHero .text` 元素下的所有子节点
  while (p.lastChild) p.lastChild.remove()

  // 将 `#hero-text` 元素追加到 `.VPHero .text` 元素中
  p.append(s)
})
</script>

<template>
  <div id="hero-text">
    <span style="display: inline-block; position: relative">
      {{ fm.hero.text}}
      <svg style="color: var(--vp-c-brand); position: absolute; z-index: -1; top: 1em; left: 0.2em; width: calc(100% - 0.7em); height: auto;" width="240" height="11" viewBox="0 0 240 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
        <path d="M20.766 10.187c.939-.024.386-.885.552-1.401 1.105-.301.553.626.962 1.061.685-.263 1.171-1.1 1.696-1.085.044.144.15.191.044.378.697-.736 2.21-.134 2.995-1.052a.55.55 0 0 1 .127.215 3.35 3.35 0 0 1-.204-1.204c.42-.034.751-.593.94 0-.255 0-.266.23-.377.416l.426-.273c.448.813-.586.316-.553.927.84-.306 1.802-1.037 2.476-.831.182.803-1.525.339-.608 1.023l-1.033-.268c.85 1.248-.625-.057.171 1.276 1.348.177 1.47-.478 2.818-.3.276-.479-.132-.66.144-1.124 1.857-.885 1.602 1.984 2.94.846.337-.555.42-1.582 1.442-1.08l-.276.889c1.298.038.668-1.348 2.06-.784-.226.368-1.005.344-.8.444.917.689.59-.545 1.27-.569l.16.827c1.371-.181 2.863-.827 4.388-1.037-.072.249-.326.512.044.746 1.912-.478 4.123-.058 6.007.368l.68-.727c.05.015.095.04.132.074a.275.275 0 0 1 .077.118c.014.044.015.091.004.136a.27.27 0 0 1-.07.122c.74.243 0-.445.354-.732.414-.062.552.383.315.603 1.248-.636 3.586-1.401 4.973-.694l-.254.22c1.06.249 1.105-1.477 2.127-.855l-.182.129c2.293.23 4.785-.478 6.564.52.293-1.017 2.272.393 2.365-1.022 1.327.664.967.927 2.813 1.348.492.052.702-.899 1.299-1.061l.044.731.79-.794.47.87.552-.205a.66.66 0 0 1-.332-.2.517.517 0 0 1-.132-.33c.873-.354 2.177.477 2.21.831l2.078-.679c-.039.301-.387.411-.657.607 1.105-.779.226.77 1.232.053-.144-.163.06-.44.077-.588.553.435 1.691.416 2.547.205l-.149.512c1.558.1 3.271-.31 5.018-.335-.636-.224-.514-1.109 0-1.204l.226.774c.32-.478-.552-.282.122-.884.652.076.464.875.094 1.138l.784-.287c.056.23-.127.358-.165.655.309-.478 1.387.75 1.834-.096l.05.23c1.746-.03 2.53-.316 3.95-.383 0-.674.553-.535.984-1.085 1.05.196 2.21.707 3.482.63.878-.343.243-.568.635-.955.077.612 1.332.535.69.985a15.353 15.353 0 0 0 3.83-.68c-.21-.243-.447-.353-.331-.563a.738.738 0 0 1 .275.01c.09.02.173.058.245.11a.58.58 0 0 1 .169.188c.04.072.061.151.062.232l-.088.067c2.127-.956 4.973 1.706 6.669.41l-.099.068 1.763-.684c.817.1-.481.478.127.842 1.9-1.043 3.022.12 4.586-.574 1.243 1.793 4.327-.167 5.979.956l-.1-.42c.426-.421.52.234.835.33-.05-.33-.464-.378-.205-.613 3.598-.545 7.438.598 11.129.956 1.348.11.757-2.203 2.465-1.195l-.481.794c2.719-.956 5.564 0 8.233-.77-.154.182-.16.416-.425.416.552.574 2.083.034 2.094-.435.42.053.1.425.354.665.552.339 1.42-.732 1.718-.158.05.09-.16.186-.265.23.37-.278 1.719.076 1.365-.589 1 .32 1.917-.287 2.713.105.553-.736 1.713.364 1.884-.683-.077 1.08 1.752.875 2.387.377-.215.326.553.345.299.794.718 0 1.381-.206 1.265-.76 1.315 1.305 2.686-1.018 3.415.645a45.888 45.888 0 0 1 6.078-1.17c-.082 1.075-2.138.09-2.066 1.218 1.834-.425 2.906-1.343 4.719-1.066.47.153-.276.478-.437.65 1.835-.43 3.537.148 5.172-.42 0 .1-.182.21-.348.291.321-.033.741.167.713-.325l-.315.13c-.497-.718 1.304-1.468 1.365-1.841-.553 1.396 1.602.377.707 2.137a.73.73 0 0 0 .337-.263.58.58 0 0 0 .1-.383c.315.1.409.297.083.665 1.155-.254.757-.78 1.801-.75 0 .233-.221.324-.337.601.553-.478 1.078-.908 1.951-.697-.056.143.044.33-.216.325 1.509-.048 2.603-1.195 4.249-.722-.513 1.023.553.349.625 1.243l.895-.254-.348-.44c.785.034 1.492-.602 2.155-.296l-.591.354 1.47-.139-.824-.354c.807-.444-.055-1.132.978-.86-.21.086.785.029 1.177.56.398-.278.801-.57 1.376-.335.138.291-.149.984-.055 1.176.398-.736 1.834-.168 2.337-.956-.143.227-.192.49-.138.745l.337-.597c.359.2.409.296.337.669 1.105.134-.309-1.138.967-.626-.105.048-.055.138-.27.23 1.287.277 2.519-.335 3.702 0 .326.903-1.05.195-.669.955 1.724-.129 3.592-.999 5.25-.74l-.31-.106c.277-1.262 1.221.66 2.083.086-.21.086-.298.693-.237.555 1.105.234 2.343-.249 4.083-.603l-.226.32c.657.311 1.763.216 2.481.383.226-.315.641-.253.403-.731 2.166 1.912 4.305-.89 6.228.726-.238 0-.553.268-.387.273l1.702-.244c-.111-.554-.21-.34-.553-.784.124-.163.292-.298.489-.392.198-.094.419-.145.644-.148-.774.34-.028.884.287 1.205-.049-.173.072-.354.05-.526.846 1.008.199-1.11 1.376-.407l-.077.287c.458-.134.889-.478 1.37-.401.177.645-.492.282-.552.803.685 0 1.403-1.162 1.994-.507-.298.167-.718.158-1.016.325.641.77.729.583 1.221.717h-.044l1.138.378-.282-.21c.928-1.635 1.752-.25 2.951-1.3-1.166.994-.21.592-.332 1.309.288.21.724.454.586.65.553-.564.89.478 1.696-.34 0 .235.581.044.431.627.713-.163-.149-.411-.077-.703 1.133-.76 2.514 1.061 4.139.029 1.376-.397 1.658-1.171 2.94-1.515.403.392-.393.836-.393.836.267.161.581.255.906.27a1.97 1.97 0 0 0 .934-.184c-.138.196 0 .373.172.64.519-.038.386-.831 1.05-.477a3.24 3.24 0 0 1-.553.918c.619-.192 1.243-.603 1.884-.79.149.412-.409.603-.646.856.718-.153 1.851-.296 2.105-.927l-.442-.248c.26 0 .105.559-.094.669-.63.478-.862-.258-.884-.478l.459-.134c-.387-1.382-1.818.148-2.719.033l.431-.956-.973.784c-.182-.263-.287-.822.166-.956-.624-.516-.591.33-1.105-.239-.055-.086-.028-.134.033-.172l-.646.273c.132-.201-.072-.703.309-.545-1.105-.617-1.873.674-2.26-.096l.099-.057c-1.596.272-.193.721-1.414 1.534l-.713-1.83-.188.721c-.16-.033-.481-.1-.409-.387-.63.478.089.32-.287.78-.752-.699-2.172.229-2.293-.957-.31.545.729.478-.127.813-.183-1.258-.978.181-1.658-.416.254-.636.917-.273.226-.875-.486 1.076-1.386-.282-2-.096-.066.87-1.332.32-2.354.579.078-.292-1.89-.54-2.818-.885l.033-.148c-.221.87-1.182.674-1.901.832a.906.906 0 0 1 .132-.55c.102-.169.258-.31.449-.406h-.669a.979.979 0 0 1-.34.327 1.167 1.167 0 0 1-.478.151l.194-.65c-.885 0-1.813.712-2.94.244-.083.607.84 1.725-.381 2.103-.034-.335-.056-.899.27-1.028-.105.043-.381.263-.585.12l.502-.545c-.508-.258-.287.478-.701.397 0-.478-.293-.35-.221-.722.11-.038.359.205.525 0a1.931 1.931 0 0 1-.691-.264 1.649 1.649 0 0 1-.503-.487c.028.268-.028.636-.37.684-.89 0-.282-.574-.79-.832-.227.325-.78-.033-.824.674-.259 0-.293-.34-.387-.535-.469.3-2.149.033-1.657.793l.116.053s-.05 0-.078.033c-1.525.66-3.105-.478-4.608-.224V3.34c-.895.244-1.984.106-2.636.593a.711.711 0 0 1-.402-.28.553.553 0 0 1-.084-.442c-.691.158-.774.416-1.746 0 .701-.396-.221-.373.713-.287-.879-.224-1.067-.607-2.039 0 .342-.597-.641-.774-1.067-.602l.608.445c-.436.053-.88.039-1.31-.043l.254-.794c-1.784-1.004-3.315 1.578-4.647-.067-.497.545.973.411.553 1.052-.829-.124-1.658-1.286-1.929-1.29-1.132-.479-1.105 1.137-2.282.812a.818.818 0 0 1 .031.774.938.938 0 0 1-.264.323 1.11 1.11 0 0 1-.397.198c-.829-.124-.994-1.214-.464-1.434.205 0 .299.072.288.168.27-.096.629-.21.303-.526l-.116.282c-.403-.297-1.552-.292-1.271-.75-.635.257-.281.477.183.616-1.061-.435-1.658-.053-2.763-.344.171.162.326.478.155.478-1.608-.378-.724.526-1.824.636-.608-.445.249-1.033-.862-.684-.668-.306-.127-.755.149-.985-1.016.536-1.867-.387-2.442-.478l.553-.22a1.892 1.892 0 0 1-.846.12l.293.573c-.309-.105-.553-.11-.553-.348-.326.368.227.956-.42 1.434-.403-.297-1.265.286-1.392-.478 1.298.272-.127-.76.978-.866a1.102 1.102 0 0 1-.851.024c-.044-.086.044-.157.133-.2-1.233-.689-.592.846-1.879.807.171-.42-.287-.808-.497-.721.519 0 .237.712-.249 1.027-.823-.34-.906.235-1.337.187l.491.162c-.176.426-.585.364-1.165.478-.045-.33.524-.22.326-.368-.652.736-1.437-.793-2.338-.306-.409-.291-.027-.798-.387-.999-1.011.54-1.077-.588-2.133-.148.293.574.349.435-.403.985l1.735-.387-1.105.822c.525 0 1.105-.35 1.42-.249-.553.478-.481.316-.238.794-.701-.86-1.425.478-2.21-.1l.044-1.41c-1.232-.641-2.21.702-3.823.334l.513.248c-.221.56-.994.072-1.519.292.055-.478-.271-.645-.492-.956.028.349-1.177-.043-1.337.899l-.707-.627c-1.305-.267-1.503 1.33-2.763 1.157.381-.507-.183-.846.657-1.21-.414 0-.79-.095-.801.23-.276-.263-1.199.646-1.575.215-.182.206-.243.698-.713.655a.337.337 0 0 1 0-.234c0 .234-.735.31-.331.837-1.271-1.478-3.592.095-4.708-1.172-.936.165-1.883.277-2.835.335.05-.139 0-.234.16-.186-1.143-.44-.707 1.352-2.005.86-.664-.765.69-.411.276-.703-.171-1.553-1.564.21-2.437-.702l.21-.091c-.663-.555-1.608.564-2.713.454a.326.326 0 0 0 0-.234c-.746.784-2.155 1.051-3.205 1.271.326-.607.475-.32.276-.956-.47.091.138.99-.801 1.167-.304-.33-.984-.622-1.078-1.282l.89-.019c-.459-.85-1.149.034-1.613-.114l.055-.368c-1.36.124-1.376 1.06-2.835.999l.155.282c-.796.956-.674-.521-1.465.172l-.248-.956c-.871.453-1.797.82-2.763 1.094.552-.698 1.658-1.06 2.315-1.477-.519 0-1.774.072-2.044.54.21-.09.475-.325.685-.181a2.832 2.832 0 0 1-1.094.83 3.298 3.298 0 0 1-1.42.27c.171-1.832-2.713-.455-3.482-1.865-1.834.693-3.652-.258-5.796-.13.774 1.435-.625.049-.481 1.507-.497.1-.685.076-.729 0l-1.525-.86c-.365-.421.469-.326.42-.65-1.106-.106-.465-.618-1.194-1 .155.521-.37.75-1 .56l.901.659c-1.52.793-1.338-1.214-2.868-.43l.48-.478c-.79.277-2.917 0-3.674 1.204-.144-.167-.332-.564 0-.674-1.89-.148-4.183 1.31-5.664.612l.138-.358c-.348.105-.602.678-1.05.325 0-.148.138-.359 0-.378-.182.124-.923.64-1.392.44l.386-.411c-1.85-.44-2.807 1.023-4.343 1.29 0-1.051-1.475-1.376-2.21-1.53V.685c-2.15-.086-3.625.956-5.598 1.4-1.265-1.118-4.188-.392-6.194-.99.31.182 0 .818-.37.957-.475-.206-1.266.755-1.221-.21h.165c-.375-.957-1.326-.67-2.072-.675l-.083 1.267c-2.006-1.778-5.106.813-6.227-.803-.459.33-1.045.34-1.498.67v-.68a12.396 12.396 0 0 0-3.575 0l.31-.478c-.912 0-1.072 1.98-1.912 2.042l-.288-1c-1.591.053-3.232-.774-4.763.192 0-.148.055-.445.31-.478-.746 0-2.918-.588-2.587.788-.06-.903-1.657-.038-2.48.388l.104-.689c-.685.875-.701 1.11-1.696 1.377-.243-.076-.238-.526.088-.368-.812-.32-.59.655-1.574.33l.342-.435c-.823-.029-.746.2-1.177.707-.503.287-1.564-.114-1.713-.712-.094.368-.52.875-1.011.717a.38.38 0 0 1 .013-.245.442.442 0 0 1 .164-.2c-1.393-.406-2 .851-2.973.235a.553.553 0 0 0-.182-.392 9.431 9.431 0 0 1 1.89.028c0-.616-.912-.688-.255-1.563-.685.478-1.845 1.54-2.713 1.286a.84.84 0 0 1-.1-.215l.061-.072a.668.668 0 0 0-.295 0 .61.61 0 0 0-.257.125 1.992 1.992 0 0 0-.718-.158c-.128-.507-1.023-.234-1.465-.244.072.67-.508.583.06 1.119-.07-.048.078-.086.366-.125a.528.528 0 0 0 .188-.076l-.028.062c.287-.033.663-.062 1.105-.09-.332.358-.68.654-1.183.3-.204.445-.43.894-.552 1.11-.647-.914-1.83-1.377-2.022-1.946-1.321.43-3.145.368-3.918 1.663-.376.177-.459-.344-.614-.535.216-.139.476-.13.586-.316-.74.354-2.249.216-2.381 1.105-.984-.364.491-.837-.818-.636l.166-.277c-2.675-1.291-4.09 2.433-7.068.755.204.105.304.148.354.296-3.316-.645-6.709 1.038-10.018-.062-.94-.205-1 .359-1.531.818l-.249-.713-.906.88c-1.315.679-2.47-1.65-4.117-.411l.254.478c-.624-.058-1.939.387-1.873-.177-.055.09-.166.516-.425.272l-.044-.372-1.487.712c-1.199-.215.078-1.506-1.658-1.492C.895 5.105-.22 6.114.04 6.362c.178.01.347.073.478.179a.645.645 0 0 1 .24.4l-.558.225C.17 8.279-.194 9.44 1.304 10.144l.917-.732.36.521-.818.1c.513.479.784 0 1.105-.305.07.225.233.42.458.55l.907-1.114c.149.43-.376.884.292 1.094.426-.516-.502-.956.233-1.314.513.478.403.898.933.44a.447.447 0 0 1 .012.336.525.525 0 0 1-.233.27c.476-.367 1.304-.214 1.525-.817.553.598 1.658-.248 1.691.808.29-.433.74-.77 1.277-.956-.752 1.3 1.724 0 1.591 1.348.553-1.162 2.21-.617 3.255-1.3-.055.095-.16.282-.265.23.624.061.823.391 1.237.592 0-.956.967-1.195 1.448-1.797.812.87-.392 1.118-.1 1.974-.082-.755 1.272-.813.973-1.434.614.53.514.248.862 1.008.028-1.17.553-.22.962-.956.873.54.282 1.086 1.182.689.453.354-.342.808-.342.808Zm21.793-2.93-.447.057.447-.058Zm1.818-.091a7.552 7.552 0 0 0-.801 0c-.072-.23 0-.478.171-.478-.083.186.348.305.63.478Zm-4.128-4.49c.288-.109.393 0 .442.159-.172.02-.343.053-.508.1v.081a.973.973 0 0 1 .066-.34Z" />
      </svg>
    </span>
    <!-- {{ fm.hero.image?.alt }} -->
  </div>
</template>
```
:::


然后，在 `index.ts` 中注册全局组件


```md{7}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ HomeUnderline.vue
│  │   └─ index.ts
└─ index.md
```


```ts{3,7-10}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import HomeUnderline from "./components/HomeUnderline.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('HomeUnderline' , HomeUnderline)
  }
}
```

最后回到首页，插入组件，看效果

```md
<!-- index.md -->
<HomeUnderline />
```


---


### 视频播放

之前我们用 `<video>` 标签实现了 [视频播放](./markdown.md#视频)，但是没有封面也没有倍数

我们安装 [西瓜播放器](https://h5player.bytedance.com/guide/) 并封装成vue组件达到目的

::: details 其他播放器
有能力的也可以看看最近比较热门的播放器：[VidStack](https://www.vidstack.io/)
:::

::: code-group

```sh [pnpm]
pnpm add -D xgplayer
```

```sh [yarn]
yarn add -D xgplayer
```

```sh [npm]
npm i xgplayer
```

```sh [bun]
bun add -D xgplayer
```

:::


在 `theme/components` 文件夹，然后创建 `xgplayer.vue`


```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ xgplayer.vue
│  │   └─ index.ts
└─ index.md
```

在 `xgplayer.vue` 填入如下代码，保存

::: code-group
```vue [xgplayer.vue]
<template>
  <div id="mse"></div>
</template>

<script setup lang="ts">
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import { onMounted } from 'vue'

interface propsType {
  url: string
  poster: string
}

const props = withDefaults(defineProps<propsType>(), {
  url: '',
  poster: '',
})

onMounted(() => {
  new Player({
    id: 'mse', //占位id
    volume: 0, // 默认静音
    lang: "zh", //设置中文

    autoplay: false, //关闭自动播放
    // autoplayMuted: true,// 是否开启自动静音
    fluid: true,  // 流式布局，自动宽高比
    controls: true, //开启控制栏，设为false即隐藏
    leavePlayerTime: 0, //鼠标离开控制栏隐藏延时时间，默认3000ms
    download: true, //开启下载
    keyShortcut: true, //开启热键

    url: props.url, //传入的url
    poster: props.poster, //传入的视频封面

    start: {
      isShowPause: true //暂停显示播放按钮
    }

  })

})

</script>

<style scoped>
#mse {
  flex: auto;
}
</style>
```
:::


然后，在 `index.ts` 中注册全局组件

```ts{3,7-10}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import xgplayer from "./components/xgplayer.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('xgplayer' , xgplayer)
  }
}
```

最后回到任意页面，插入组件，看效果

```md
<!-- index.md -->
<xgplayer url="/视频路径.mp4" poster="/封面路径.png" />
```

更多的功能，可以自己在 [西瓜播放器的配置](https://h5player.bytedance.com/config/) 中寻找

<xgplayer url="/lol.mp4" poster="/lol.png" />





---

### 不蒜子

使用前请安装 [浏览量的插件：不蒜子](./plugin.md#浏览量) ，想好看自己研究一下吧

现在仅做一个简单的封装示例，在 `theme/components` 文件夹中创建 `DataPanel.vue` 组件

```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ DataPanel.vue
│  │   └─ index.ts
└─ index.md
```

在 `DataPanel.vue` 填入如下代码，保存

::: tip 说明
代码参考自 [ChoDocs](https://chodocs.cn/) 的早期页面，现已下架

作者使用了 [unocss](https://unocss.dev/) ，我就直接生扒下来了，凑合用吧

---

代码中使用了 [动态的emoji表情](https://www.emojiall.com/zh-hans/image-emoji-platform/telegram/animation)，可自行替换

:::

::: code-group

```vue [confetti.vue]
<script setup lang="ts">
</script>

<template>
  <div class="panel">
    <div class="container">
      <section class="grid">
        <span class="text">
          本站总访问量 <span id="busuanzi_value_site_pv" class="font-bold">--</span> 次
        </span>
        <img src="/heart.gif" alt="heart" width="50" height="50" />
        <span class="text">
          本站访客数 <span id="busuanzi_value_site_uv" class="font-bold">--</span> 人次
        </span>
      </section>
    </div>
  </div>
</template>

<style scoped>
.panel {
  margin-top: 12px;
  margin-bottom: 8px;
}

.container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  width: 100%;
  min-height: 32px;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
}

.grid {
  font-weight: 500;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: 12px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  display: grid;
}

.text {
  font-size: .875rem;
  line-height: 1.25rem;
}
</style>
```
:::


然后，在 `index.ts` 中注册全局组件

```ts{3,7-10}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import DataPanel from "./components/DataPanel.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('DataPanel' , DataPanel)
  }
}
```

最后回到首页，插入组件看效果

```md
<!-- index.md -->
<DataPanel />
```








---


### 五彩纸屑

佬友的需求越来越花哨了，直接使用 [@catdad/canvas-confetti](https://github.com/catdad/canvas-confetti)


::: code-group

```sh [pnpm]
pnpm add -D canvas-confetti
```

```sh [yarn]
yarn add -D canvas-confetti
```

```sh [npm]
npm i -D canvas-confetti
```

```sh [bun]
bun add -D canvas-confetti
```

:::

在其 [官网](https://www.kirilv.com/canvas-confetti/) 上，有最简单的纸屑配置

但是建议还是vue封装一下，在 `theme/components` 文件夹中创建 `confetti.vue`

```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ confetti.vue
│  │   └─ index.ts
└─ index.md
```

在 `confetti.vue` 填入如下代码，保存

::: code-group

```vue [confetti.vue]
<script setup lang="ts">
import confetti from 'canvas-confetti'
import { inBrowser } from 'vitepress';

if (inBrowser) {

/* 纸屑 */
confetti({
    particleCount: 100,
    spread: 170,
    origin: { y: 0.6 },
})

}
</script>
```
:::

::: details npm打包报错，请使用如下方式
```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import confetti from 'canvas-confetti';

onMounted(() => (
   /* 纸屑 */
  confetti({
    particleCount: 100,
    spread: 170,
    origin: { y: 0.6 },
  })
));

</script>
```
:::

然后，在 `index.ts` 中注册全局组件

```ts{3,7-10}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import confetti from "./components/confetti.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('confetti' , confetti)
  }
}
```

最后回到首页或者其他页面，插入组件看效果，同理也可以做 [雪花效果](https://www.kirilv.com/canvas-confetti/#snow)

```md
<!-- index.md -->
<confetti />
```


---


### 标题下添加时间

文档页有个 `lastUpdated` 通过 `git log` 的方式自动更新时间，我们直接获取同步，不用手动填那不香香！

开干！在查询了 [官网的API接口：useData](https://vitepress.dev/zh/reference/runtime-api#usedata)，发现 `lastUpdated` 在 `page` 属性中

```ts{13,40}
interface VitePressData<T = any> {
  /**
   * 站点级元数据
   */
  site: Ref<SiteData<T>>
  /**
   * .vitepress/config.js 中的 themeConfig
   */
  theme: Ref<T>
  /**
   * 页面级元数据
   */
  page: Ref<PageData> // [!code focus]
  /**
   * 页面 frontmatter
   */
  frontmatter: Ref<PageData['frontmatter']>
  /**
   * 动态路由参数
   */
  params: Ref<PageData['params']>
  title: Ref<string>
  description: Ref<string>
  lang: Ref<string>
  isDark: Ref<boolean>
  dir: Ref<string>
  localeIndex: Ref<string>
}

interface PageData {
  title: string
  titleTemplate?: string | boolean
  description: string
  relativePath: string
  filePath: string
  headers: Header[]
  frontmatter: Record<string, any>
  params?: Record<string, any>
  isNotFound?: boolean
  lastUpdated?: number // [!code focus]
}
```

我们直接在 `theme/components` 文件夹，新建 `update.vue` 组件编写


```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ update.vue
│  │   └─ index.ts
└─ index.md
```

在 `update.vue` 填入如下代码，保存

::: tip 说明
在 [JavaScript Date](https://www.runoob.com/jsref/jsref-obj-date.html) 对象中，可以根据自己需求选择显示的时间

* toLocaleString()：显示日期和时间 `默认`

* toLocaleDateString()：仅显示日期

* toLocaleTimeString()：仅显示时间
:::

::: code-group
```vue{13} [update.vue]
<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
const { page } = useData()

const date = computed(
  () => new Date(page.value.lastUpdated!)
)
</script>

<template>
  <div class="LastUpdated">
    <p>更新时间: {{ date.toLocaleString() }}</p>
  </div>
</template>

<style>
.LastUpdated {
  color: var(--vp-c-text-2);
}
</style>
```
:::


然后，在 `index.ts` 中注册全局组件

```ts{3,7-10}
/* .vitepress\theme\index.ts */
import DefaultTheme from 'vitepress/theme'
import update from "./components/update.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('update' , update)
  }
}
```

最后回到首页或者其他页面，插入组件即可

::: details 为什么不用插槽
目前位置最佳的 [插槽](./layout.md#插槽表) 是 `doc-before`

但是在标题上方，不是太喜欢，所以选择组件，你也可以自己找

* 区别：插槽不用手动添加；组件需要手动添加
:::

::: details 本地开发显示 更新时间: Invalid Date
请确保你的 `config.mts` 配置和 Frontmatter 中，已开启 `lastUpdated: true,`
:::

::: details 可以添加显示作者吗
官方没有提供这个接口，在 [官方的issues中](https://github.com/vuejs/vitepress/issues/3001) 你可以找到答案，添加贡献者并尝试
:::

```md
<!-- index.md -->
<update />
```




---



### 字数及阅读时间

这里使用了 [@shiheme/appbeebee](https://github.com/shiheme/appbeebee/) 博客组件

在 `theme/components` 文件夹，新建 `ArticleMetadata.vue`

以及 `theme/untils` 文件夹，新建 `functions.ts`


```md{6,8}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ ArticleMetadata.vue
│  │   ├─ untils
│  │   │   └─ functions.ts
│  │   └─ index.ts
└─ index.md
```

在 `ArticleMetadata.vue` 和 `functions.ts` 填入如下代码，保存

::: tip 说明
此处我将 [更新时间](#标题下添加时间) 也加入了进入
:::

::: code-group
```vue [ArticleMetadata.vue]
<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, ref, onMounted } from 'vue'
import { countWord } from '../untils/functions'

const { page } = useData()
const date = computed(
  () => new Date(page.value.lastUpdated!)
)

const wordCount = ref(0)
const imageCount = ref(0)

const wordTime = computed(() => {
    return ((wordCount.value / 275) * 60)
})

const imageTime = computed(() => {
    const n = imageCount.value
    if (imageCount.value <= 10) {
        // 等差数列求和
        return n * 13 + (n * (n - 1)) / 2
    }
    return 175 + (n - 10) * 3
})

// 阅读时间
const readTime = computed(() => {
    return Math.ceil((wordTime.value + imageTime.value) / 60)
})


function analyze() {
    document.querySelectorAll('.meta-des').forEach(v => v.remove())
    const docDomContainer = window.document.querySelector('#VPContent')
    const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
        '.content-container .main img'
    )
    imageCount.value = imgs?.length || 0
    const words = docDomContainer?.querySelector('.content-container .main')?.textContent || ''
    wordCount.value = countWord(words)
}

onMounted(() => {
    // 初始化时执行一次
    analyze()
})
</script>


<template>
    <div class="word">
        <p>
            <svg t="1724572866572" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18131" width="16" height="16"><path d="M168.021333 504.192A343.253333 343.253333 0 0 1 268.629333 268.8a342.229333 342.229333 0 0 1 243.285334-100.778667A341.504 341.504 0 0 1 755.029333 268.8c9.856 9.898667 19.2 20.394667 27.733334 31.402667l-60.16 46.976a8.021333 8.021333 0 0 0 2.986666 14.122666l175.701334 43.008a8.021333 8.021333 0 0 0 9.898666-7.68l0.810667-180.906666a7.936 7.936 0 0 0-12.885333-6.314667L842.666667 253.44a418.858667 418.858667 0 0 0-330.922667-161.493333c-229.12 0-415.488 183.594667-419.797333 411.818666a8.021333 8.021333 0 0 0 8.021333 8.192H160a7.978667 7.978667 0 0 0 8.021333-7.808zM923.946667 512H864a7.978667 7.978667 0 0 0-8.021333 7.808 341.632 341.632 0 0 1-26.88 125.994667 342.186667 342.186667 0 0 1-73.685334 109.397333 342.442667 342.442667 0 0 1-243.328 100.821333 342.229333 342.229333 0 0 1-270.976-132.224l60.16-46.976a8.021333 8.021333 0 0 0-2.986666-14.122666l-175.701334-43.008a8.021333 8.021333 0 0 0-9.898666 7.68l-0.682667 181.034666c0 6.698667 7.68 10.496 12.885333 6.314667L181.333333 770.56a419.072 419.072 0 0 0 330.922667 161.408c229.205333 0 415.488-183.722667 419.797333-411.818667a8.021333 8.021333 0 0 0-8.021333-8.192z" fill="#8a8a8a" p-id="18132"></path></svg>
            更新: {{ date.toLocaleDateString() }}
            <svg t="1724571760788" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6125" width="16" height="16"><path d="M204.8 0h477.866667l273.066666 273.066667v614.4c0 75.093333-61.44 136.533333-136.533333 136.533333H204.8c-75.093333 0-136.533333-61.44-136.533333-136.533333V136.533333C68.266667 61.44 129.706667 0 204.8 0z m307.2 607.573333l68.266667 191.146667c13.653333 27.306667 54.613333 27.306667 61.44 0l102.4-273.066667c6.826667-20.48 0-34.133333-20.48-40.96s-34.133333 0-40.96 13.653334l-68.266667 191.146666-68.266667-191.146666c-13.653333-27.306667-54.613333-27.306667-68.266666 0l-68.266667 191.146666-68.266667-191.146666c-6.826667-13.653333-27.306667-27.306667-47.786666-20.48s-27.306667 27.306667-20.48 47.786666l102.4 273.066667c13.653333 27.306667 54.613333 27.306667 61.44 0l75.093333-191.146667z" fill="#777777" p-id="6126"></path><path d="M682.666667 0l273.066666 273.066667h-204.8c-40.96 0-68.266667-27.306667-68.266666-68.266667V0z" fill="#E0E0E0" opacity=".619" p-id="6127"></path></svg>
            字数: {{ wordCount }} 字
            <svg t="1724572797268" class="icon" viewBox="0 0 1060 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15031" width="16" height="16"><path d="M556.726857 0.256A493.933714 493.933714 0 0 0 121.929143 258.998857L0 135.021714v350.390857h344.649143L196.205714 334.482286a406.820571 406.820571 0 1 1-15.908571 312.649143H68.937143A505.819429 505.819429 0 1 0 556.726857 0.256z m-79.542857 269.531429v274.907428l249.197714 150.966857 42.422857-70.070857-212.114285-129.389714V269.787429h-79.542857z" fill="#8a8a8a" p-id="15032"></path></svg>
            时长: {{ readTime }} 分钟
        </p>
    </div>
</template>

<style>
.word {
  color: var(--vp-c-text-2);
  font-size: 15px;
}

.icon {
    display: inline-block;
    transform: translate(0px , 2px);
}
</style>


```

```ts [functions.ts]
const pattern
    = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export function countWord(data: string) {
    const m = data.match(pattern)
    let count = 0
    if (!m) {
        return 0
    }
    for (let i = 0; i < m.length; i += 1) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
        }
        else {
            count += 1
        }
    }
    return count
}
```
:::

然后，在 `index.ts` 中注册全局组件

```ts{3,7-10}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import ArticleMetadata from "./components/ArticleMetadata.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('ArticleMetadata' , ArticleMetadata)
  }
}
```

使用上，在拜读了 [查尔斯的知识库](https://blog.charles7c.top/) 后，找到了答案

将其写在 H1标题 下即可，参照官网 [Markdown的高级配置](https://vitepress.dev/zh/guide/markdown#advanced-configuration) 在 `config.mts` 中配置

::: info 说明
如果你觉得组件在 H1标题 之上的位置，才是最合适的，建议使用 [doc-before 插槽](./layout.md#doc) 位置

不要像上方一样使用 `enhanceApp` 方式注册组件，请参考 [h函数的配置](./layout.md#示例2-h函数) 使用
:::

```ts{8-15}
/* .vitepress/config.mts */
import { defineConfig } from 'vitepress'

export default defineConfig({

  //markdown配置
  markdown: {
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; // [!code focus]
          return htmlResult;
      }
    }
  }

})
```

---


### 文章摘要

这个就真的是博客的需求，而不是文档了，推荐一个博客主题

* 项目：https://github.com/imsyy/vitepress-theme-curve

静等开源吧