# 插件

<p style="color: #7e7e7e;">更新时间：2023-11-7</p>


## 时间线

采用了 [@HanochMa](https://github.com/HanochMa/) 的项目

仓库：https://github.com/HanochMa/vitepress-markdown-timeline

Demo：https://hanochma.github.io/daily/2023-04



### 安装

::: code-group
```sh [pnpm]
pnpm add -D vitepress-markdown-timeline
```

```sh [yarn]
yarn add -D vitepress-markdown-timeline
```

```sh [npm]
npm install vitepress-markdown-timeline
```

```sh [bun]
bun add -D vitepress-markdown-timeline
```
:::



### 使用

在 `config.mts` 中注册 markdown 解析插件

```ts{1,8-11}
import timeline from "vitepress-markdown-timeline"; // [!code focus]

export default {
  markdown: { // [!code focus]
    //行号显示
    lineNumbers: true, 

    //时间线 // [!code focus:5]
    config: (md) => {
      md.use(timeline);
    },
  }, 
}
```


在 `.vitepress/theme/index.ts` 中引入时间线样式

::: info 说明
如果你没有这个文件，就自己新建
:::

```ts{4-5}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
  extends: DefaultTheme,
}
```

最后我们在markdown文件中，按格式使用即可

输入：

```md
::: timeline 2023-04-24
- 一个非常棒的开源项目 H5-Dooring 目前 star 3.1k
  - 开源地址 https://github.com/MrXujiang/h5-Dooring
  - 基本介绍 http://h5.dooring.cn/doc/zh/guide/
- 《深入浅出webpack》 http://webpack.wuhaolin.cn/
:::

::: timeline 2023-04-23
- css !important 该条样式属性声明具有最高优先级
  - https://www.cnblogs.com/meiwenzx/p/6673302.html
- 发现一个不错的 git 文档库 准备 get 一下
  - https://github.com/HenryTSZ/zeit/tree/master/source/_posts
:::

::: timeline 2023-04-22
- vue elementui table 表格的封装https://segmentfault.com/a/1190000023382224
:::

::: timeline 2023-04-21
- vue2 和 vue3 使用 typeScript 的不同方式
  - https://jishuin.proginn.com/p/763bfbd2e891
  - https://www.cnblogs.com/qq3279338858/p/12631728.html
- vue 中 lint 检查的配置
  - https://www.cnblogs.com/fengyingYZ/p/10369703.html
- dart-sass 和 node-sass 区别
  - https://blog.csdn.net/qianxing111/article/details/107617538
- 前端多媒体知识
  - https://mp.weixin.qq.com/s/yuIkTwHk5dx20r8Z0cpSDA
- google 技术栏目
  - https://www.infoq.cn/zones/google/cloud/list?id=2
:::
```


输出：

::: timeline 2023-04-24
- 一个非常棒的开源项目 H5-Dooring 目前 star 3.1k
  - 开源地址 https://github.com/MrXujiang/h5-Dooring
  - 基本介绍 http://h5.dooring.cn/doc/zh/guide/
- 《深入浅出webpack》 http://webpack.wuhaolin.cn/
:::

::: timeline 2023-04-23
- css !important 该条样式属性声明具有最高优先级
  - https://www.cnblogs.com/meiwenzx/p/6673302.html
- 发现一个不错的 git 文档库 准备 get 一下
  - https://github.com/HenryTSZ/zeit/tree/master/source/_posts
:::

::: timeline 2023-04-22
- vue elementui table 表格的封装https://segmentfault.com/a/1190000023382224
:::

::: timeline 2023-04-21
- vue2 和 vue3 使用 typeScript 的不同方式
  - https://jishuin.proginn.com/p/763bfbd2e891
  - https://www.cnblogs.com/qq3279338858/p/12631728.html
- vue 中 lint 检查的配置
  - https://www.cnblogs.com/fengyingYZ/p/10369703.html
- dart-sass 和 node-sass 区别
  - https://blog.csdn.net/qianxing111/article/details/107617538
- 前端多媒体知识
  - https://mp.weixin.qq.com/s/yuIkTwHk5dx20r8Z0cpSDA
- google 技术栏目
  - https://www.infoq.cn/zones/google/cloud/list?id=2
:::






## 谷歌分析

利用插件 [google-analytics](https://analytics.google.com/) ，来查看网站访问量，这里我们用 [@ZhongxuYang](https://github.com/ZhongxuYang/) 的插件

仓库：https://github.com/ZhongxuYang/vitepress-plugin-google-analytics


### 安装

::: code-group
```sh [pnpm]
pnpm add -D vitepress-plugin-google-analytics
```

```sh [yarn]
yarn add -D vitepress-plugin-google-analytics
```

```sh [npm]
npm install vitepress-plugin-google-analytics
```

```sh [bun]
bun add -D vitepress-plugin-google-analytics
```
:::


### 使用

在 `.vitepress/theme/index.ts` 中引入

```ts{3,8-10}
// .vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme"
import googleAnalytics from 'vitepress-plugin-google-analytics'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    googleAnalytics({
      id: 'G-******', //跟踪ID，在analytics.google.com注册即可
    }),
  },
}
```



## 图片缩放

Vuepress是可以直接安装插件 [medium-zoom](https://github.com/francoischalifour/medium-zoom) 的，非常好用

但是Vitepress直接用不了，在 [vitepress的issues中找到了方法#854](https://github.com/vuejs/vitepress/issues/854)


### 安装


::: code-group
```sh [pnpm]
pnpm add -D medium-zoom
```

```sh [yarn]
yarn add -D medium-zoom
```

```sh [npm]
npm install medium-zoom
```

```sh [bun]
bun add -D medium-zoom
```
:::


### 使用

在 `.vitepress/theme/index.ts` 添加如下代码，并保存

```ts{4-6,11-24}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },

}
```

点击图片后，还是能看到导航栏，强迫症可以加一个遮挡，否则无视

在 `.vitepress/theme/style/var.css` 中加入如下代码，并保存

```css
/* .vitepress/theme/style/var.css */

.medium-zoom-overlay {
  z-index: 20;
}

.medium-zoom-image {
  z-index: 999; /* 给的值是21，但是实测盖不住，直接999 */
}
```

测试一下效果，还不错

::: tip 但是
有个小bug，每次修改完需要刷新才能起效，不过不影响使用
:::

![](/img_test.jpg)