# 插件

<p style="color: #7e7e7e;">更新时间：2023-11-5</p>


## 时间线

采用了 [@HanochMa](https://github.com/HanochMa/) 的项目

仓库：https://github.com/HanochMa/vitepress-markdown-timeline

Demo：https://hanochma.github.io/daily/2023-04



安装插件

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
