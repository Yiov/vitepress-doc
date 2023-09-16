# 组件

::: warning 更新时间
最近更新：2023-9-16

搭建版本：vitepress v1.0.0-r.13
:::

## 参考

本次参考了 [掘金@吴老头的文章](https://juejin.cn/post/7208188347864760357) ，他提的PR已经被合并，可以直接使用了

::: danger 注意
不过貌似新版本更新就不行了 -_-||
:::

要实现的效果预览：https://volarjs.github.io/

## 动画标题效果

在 `theme` 目录中 创建 `components`文件夹，然后创建 `AnimateTitle.vue`

```md{6-7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ components
│  │        └─ AnimateTitle.vue
│  └─ index.md
└─ node_modules
```

在 `AnimateTitle.vue` 填入如下代码

```vue
<script setup lang="ts"></script>

<template>
  <h1 class="name">
    <span class="clip">Vitepress Fun Cli</span>
  </h1>
  <p class="text">A Vitepress Site For Fun</p>
  <p class="tagline">My great project tagline</p>
</template>

<style scoped>
.name {
  background: -webkit-linear-gradient(
    315deg,
    rgb(210, 86, 53) 10%,
    #647eff 50%,
    rgb(238, 224, 112) 90%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.name,
.text {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}
@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}
@media (min-width: 960px) {
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}
@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }
}
</style>
```

然后在 `theme - index.mts` 并填入如下代码


```ts
import Theme from "vitepress/theme";
import { h } from "vue";
import AnimateTitle from "./components/AnimateTitle.vue";

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      "home-hero-info": () => h(AnimateTitle),
    });
  },
};
```

现在是报错的状态，因为还没有安装 `vue` ，我们现在来安装

::: tip 退出
按CTRL+C退出开发预览模式
:::

::: code-group
```sh [pmpm]
pnpm add vue
```

```sh [yarn]
yarn add vue
```

```sh [npm]
npm add vue
```

```sh [bun]
bun add vue
```
:::

重新启动就能看效果了



::: details 关于components找不到相应模块的问题

TS识别不了Vue，我们先在 `theme` 目录 新建一个 `error-vue.ts` 

```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ error-vue.ts  <- 名字随便取
│  └─ index.md
└─ node_modules
```

将下面代码粘贴进去

```ts
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
  }
```

然后在根目录，新建一个 `tsconfig.json`

```md{5}
.
├─ docs
└─ node_modules
└─ package.json
└─ tsconfig.json  <- 我在这
```

将下面代码粘贴进去

```json
{
    "compilerOptions": {
      "outDir": "dist",
      "target": "esnext",
      "module": "esnext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "resolveJsonModule": true,
      "allowJs": true,
      "strict": true,
      "jsx": "preserve",
      "baseUrl": ".",
      "paths": {
        "@theme/*": [".vitepress/theme/components/*"]
      }
    },
    "include": ["env.d.ts", "src/**/*", "docs/.vitepress/**/*"]
  }
```
:::
