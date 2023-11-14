# 插件

> 更新时间：2023-11-9




## 时间线

采用了 [@HanochMa](https://github.com/HanochMa/) 的项目

仓库：https://github.com/HanochMa/vitepress-markdown-timeline

Demo：https://hanochma.github.io/daily/2023-04


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
:::








## 谷歌分析

利用插件 [google-analytics](https://analytics.google.com/) ，来查看网站访问量，这里我们用 [@ZhongxuYang](https://github.com/ZhongxuYang/) 的插件

仓库：https://github.com/ZhongxuYang/vitepress-plugin-google-analytics


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


在 `.vitepress/theme/index.ts` 中引入

```ts{3,8-10}
// .vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme"
import googleAnalytics from 'vitepress-plugin-google-analytics'

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    googleAnalytics({
      id: 'G-******', //跟踪ID，在analytics.google.com注册即可
    }),
  },
}
```









## 图片缩放

Vuepress是可以直接安装插件 [medium-zoom](https://github.com/francoischalifour/medium-zoom) 的，非常好用

但是Vitepress直接用不了，在 [vitepress的issues中找到了方法#854](https://github.com/vuejs/vitepress/issues/854)



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

点击图片后，还是能看到导航栏，加一个遮挡样式

在 `.vitepress/theme/style/var.css` 中加入如下代码，并保存

```css
/* .vitepress/theme/style/var.css */

.medium-zoom-overlay {
  z-index: 20;
}

.medium-zoom-image {
  z-index: 9999 !important;/* 给的值是21，但是实测盖不住，直接999 */
}
```

测试一下效果，还不错

::: tip 但是
有个小bug，每次修改完需要刷新才能起效，不过不影响使用
:::

![](/img_test.jpg)











## 看板娘

第一次接触的人会比较懵，其实就是在右下角有个二次元的人物，类似电子宠物

这里使用 [@xinlei3166](https://github.com/xinlei3166/) 的 [Live2D](https://www.live2d.com/zh-CHS/) 插件

仓库：https://github.com/xinlei3166/vitepress-theme-website


::: code-group
```sh [pnpm]
pnpm add -D vitepress-theme-website
```

```sh [yarn]
yarn add -D vitepress-theme-website
```

```sh [npm]
npm install vitepress-theme-website
```

```sh [bun]
bun add -D vitepress-theme-website
```
:::



在 `.vitepress/theme/index.ts` 粘贴下面代码并保存

```ts{4,11-30}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import { useLive2d } from 'vitepress-theme-website' // [!code focus]

export default {
  extends: DefaultTheme,

  setup() {

    //看板娘 // [!code focus:20]
    useLive2d({
      enable: true,
      model: {
        url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hibiki/hibiki.model.json'
      },
      display: {
        position: 'right',
        width: '135px',
        height: '300px',
        xOffset: '35px',
        yOffset: '5px'
      },
      mobile: {
        show: true
      },
      react: {
        opacity: 0.8
      }
    })

  }
}
```

想要更换模型在 [@iCharlesZ](https://github.com/iCharlesZ/vscode-live2d-models#url) 这里找，替换 `model` 中的 `url` 链接即可

```ts{2}
model: {
  url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/bilibili-22/index.json'
},
```








## 浏览量

我对这个并不感冒，看了一下，基本上是用的 [不蒜子](http://busuanzi.ibruce.info/)

但是想要好看就得自己封装一下

::: code-group
```sh [pnpm]
pnpm add -D busuanzi.pure.js
```

```sh [yarn]
yarn add -D busuanzi.pure.js
```

```sh [npm]
npm install busuanzi.pure.js
```

```sh [bun]
bun add -D busuanzi.pure.js
```
:::



```ts{4-5,10-16}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'

export default {
  extends: DefaultTheme,

  enhanceApp({ app , router }) {
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
}
```

使用就很简单了，也可以自己写个好看点的组件

```html
本站总访问量 <span id="busuanzi_value_site_pv" /> 次
本站访客数 <span id="busuanzi_value_site_uv" /> 人次
```








## 评论

评论的插件比较多：

* [Giscus](https://giscus.app/zh-CN)、[waline](https://waline.js.org/)、[gitalk](https://gitalk.github.io/)

* [Valine](https://valine.js.org/quickstart.html)、[disqus](https://disqus.com/)[Twikoo](https://twikoo.js.org/)、[Artalk](https://artalk.js.org/guide/deploy.html)

从个人角度而言，[Giscus](https://giscus.app/zh-CN) 最佳，就用它演示，其他的这里就不赘述了

::: details 关于 [@xinlei3166](https://github.com/xinlei3166/) 的 waline 插件


在使用看板娘发时候就已经装好了，直接引用就行了


```ts{4,11-13}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import { useWaline } from 'vitepress-theme-website'

export default {
  extends: DefaultTheme,

  setup() {

    useWaline({
      serverURL: 'https://you_url.com'
    }),

  }
}
```

记得 `serverURL` 换成自己的即可，但是作者的插件有个bug，暗黑模式下看不清字

所以要用 [waline](https://waline.js.org/) 话就 [参考官方的教程](https://waline.js.org/guide/get-started/)
:::


### 安装giscus

Giscus 是一个基于 GitHub Discussion 的评论系统，启用简便

进 Giscus App官网：https://github.com/apps/giscus

点击 `Install` 安装


![](/giscus-01.png)



选择 `Only select repositories`，再指定一个你想开启讨论的仓库

::: tip 注意
仓库必须是公开的，私有的不行

想单独放评论，新建一个也可
:::

![](/giscus-02.png)

::: tip 查看
完成后可以在个人头像-设置-应用 `Applications` 中看到
:::



### 开启讨论

因为giscus会把评论数据都放到讨论 `discussions` 中

我们进入要开启讨论的仓库，点设置 - 勾选讨论 `Settings - discussions`

![](/giscus-03.png)


### 生成数据

进入官网：https://giscus.app/zh-CN

输入自己的仓库链接，满足条件会提示可用

![](/giscus-04.png)

下拉到 Discussion 分类我们按推荐的选 `Announcements` ，懒加载评论也可以勾选下

![](/giscus-05.png)


下方就自动生成了你的关键数据

![](/giscus-06.png)


其中 `data-repo` 、 `data-repo-id` 、 `data-category` 和 `data-category-id` 这4个是我们的关键数据

```js{2-5}
<script src="https://giscus.app/client.js"
        data-repo="Yiov/vitepress-doc"
        data-repo-id="R_******"
        data-category="Announcements"
        data-category-id="DIC_******"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```


### 安装使用

有能力的可以用官方给的js数据封装，我这里用 [@T-miracle](https://github.com/T-miracle/) 的插件

仓库：https://github.com/T-miracle/vitepress-plugin-comment-with-giscus

::: code-group
```sh [pnpm]
pnpm add -D vitepress-plugin-comment-with-giscus
```

```sh [yarn]
yarn add -D vitepress-plugin-comment-with-giscus
```

```sh [npm]
npm install vitepress-plugin-comment-with-giscus
```

```sh [bun]
bun add -D vitepress-plugin-comment-with-giscus
```
:::


在 `.vitepress/theme/index.ts` 中填入下面代码

并将我们之前获取的4个关键数据填入，其他保持默认保存

```ts{3-4,10-31}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';

export default {
  extends: DefaultTheme,

  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();
        
    // giscus配置
    giscusTalk({
      repo: 'your github repository', //仓库
      repoId: 'your repository id', //仓库ID
      category: 'Announcements', // 讨论分类
      categoryId: 'your category id', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );

}
```

看下底部的效果吧

::: details 如果某一页不想启用
我们可以在当前页使用 `Frontmatter` 关闭

```yaml
---
comment: false
---
```
:::