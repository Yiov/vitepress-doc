# 插件



## 时间线


采用了 [@HanochMa/vitepress-markdown-timeline](https://github.com/HanochMa/vitepress-markdown-timeline) 的项目

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








## 谷歌分析

利用插件 [google-analytics](https://analytics.google.com/) ，来查看网站访问量

这里我们用 [@ZhongxuYang/vitepress-plugin-google-analytics](https://github.com/ZhongxuYang/vitepress-plugin-google-analytics) 的插件


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
  z-index: 30;
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

这里使用 [@xinlei3166/vitepress-theme-website](https://github.com/xinlei3166/vitepress-theme-website) 的 [Live2D](https://www.live2d.com/zh-CHS/) 插件


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

```ts{3}
useLive2d({
  model: {
  url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/bilibili-22/index.json' // [!code focus]
  },
})
```








## 浏览量

基本上使用的是 [不蒜子](http://busuanzi.ibruce.info/)，免费的且足够好用

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

使用就很简单了，复制到页面中使用即可

::: tip 说明
本地开发出现数字即算成功，等你部署后会显示正确的数值
:::

```html
本站总访问量 <span id="busuanzi_value_site_pv" /> 次
本站访客数 <span id="busuanzi_value_site_uv" /> 人次
```

但是这也不好看啊，那就根据自己需求选择封装吧

::: info 封装演示

* 仅首页显示：[组件使用示例](./components.md#不蒜子)

* 所有页面底部：[插槽使用示例](./layout.md#不蒜子)
:::





## 自动侧边栏

发现一款自动侧边栏，简单好用 [@jooy2/vitepress-sidebar](https://github.com/jooy2/vitepress-sidebar)

安装文档：https://vitepress-sidebar.jooy2.com/guide/getting-started

::: code-group
```sh [pnpm]
pnpm add -D vitepress-sidebar
```

```sh [yarn]
yarn add -D vitepress-sidebar
```

```sh [npm]
npm i -D vitepress-sidebar
```
:::


在 `configs.mts` 中引入配置，可以根据 [作者api文档](https://vitepress-sidebar.jooy2.com/guide/api) 按需修改

```ts{2,4-6,10-53}
// .vitepress/configs.mts
import { generateSidebar } from 'vitepress-sidebar';

const vitepressSidebarOptions = {
  /* Options... */
};

export default defineConfig({
  themeConfig: {
    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://vitepress-sidebar.jooy2.com/guide/api
       */
      documentRootPath: '/docs', //文档根目录
      // scanStartPath: null,
      // resolvePath: null,
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // frontmatterTitleFieldName: 'title',
      // useFolderTitleFromIndexFile: false, //是否使用层级首页文件名做分级标题
      // useFolderLinkFromIndexFile: false, //是否链接至层级首页文件
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: false,
      // capitalizeEachWords: false,
      collapsed: false, //折叠组关闭
      collapseDepth: 2, //折叠组2级菜单
      // sortMenusByName: false,
      // sortMenusByFrontmatterOrder: false,
      // sortMenusByFrontmatterDate: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumericallyFromTitle: false,
      // sortMenusOrderNumericallyFromLink: false,
      // frontmatterOrderDefaultValue: 0,
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'], //手动排序，文件夹不用带后缀
      removePrefixAfterOrdering: false, //删除前缀，必须与prefixSeparator一起使用
      prefixSeparator: '.', //删除前缀的符号
      // excludeFiles: ['first.md', 'secret.md'],
      // excludeFilesByFrontmatterFieldName: 'exclude',
      // excludeFolders: ['secret-folder'],
      // includeDotFiles: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false, //是否包含层级主页
      // includeEmptyFolder: false,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      // convertSameNameSubFileToGroupIndexPage: false,
      // folderLinkNotIncludesFileName: false,
      // keepMarkdownSyntaxFromTitle: false,
      // debugPrint: false,
    }),
  },
})
```

为了避免安装插件影响教程，就写一个简单的示例

stackblitz演示：https://stackblitz.com/edit/vite-y1rga7

> 等待生成后可查看，左侧是目录，右侧是页面
>
> 注意：插件在读取目录之后，你再修改文件名，需要重启才能生效

![](/sidebar.png)



## Todo

为什么Vitepress没有任务列表，在 [issues#1923](https://github.com/vuejs/vitepress/issues/1923) 和 [issues#413](https://github.com/vuejs/vitepress/issues/413) 里找到了这个问题

::: tip 开发者认为
Vitepress并不需要这个，也可以通过 [markdown-it](https://markdown-it.github.io/) 实现，但 [vitepress集成的markdown-it](https://vitepress.dev/zh/guide/markdown#advanced-configuration) 并没有此功能

看到推荐的 [markdown-it-task-lists](https://www.npmjs.com/package/markdown-it-task-lists) 年久失修，找了一下可以使用 [markdown-it-task-checkbox](https://github.com/linsir/markdown-it-task-checkbox) 实现
:::


:::: details 实测下来不建议折腾，不如直接使用Emoji表情

我们需要用到另一款插件：[markdown-it-task-checkbox](https://github.com/linsir/markdown-it-task-checkbox)


::: code-group
```sh [pnpm]
pnpm add -D markdown-it-task-checkbox
```

```sh [yarn]
yarn add -D markdown-it-task-checkbox
```

```sh [npm]
npm install markdown-it-task-checkbox --save
```

```sh [bun]
bun add -D markdown-it-task-checkbox
```
:::


如果根据文档配置的话是不行的，源码也比较久了，使用的是 [commonjs 同步函数](https://zh.wikipedia.org/wiki/CommonJS) ，而Vitepress使用的是 [ES module 异步函数](https://zh.wikipedia.org/wiki/ECMAScript)

::: details 关于 CJS 和 ESM
commonjs：简称CJS，`module.exports` `exports` 导出，`require` 导入

ES module：简称ESM，`export` 导出，`import` 导入

这个我们在最开始 [Vitepress前言](./preface.md#官方) 的时候也提到过
:::

```ts{2,5-16}
// .vitepress/config.mts
import taskLists from 'markdown-it-task-checkbox'

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(taskLists, {
        disabled: true,
        divWrap: false,
        divClass: 'checkbox',
        idPrefix: 'cbx_',
        ulClass: 'task-list',
        liClass: 'task-list-item',
      })
    }
  },
})
```

::: details 关于引用报错但未爆红
> 无法找到模块“markdown-it-task-checkbox”的声明文件。“/node_modules/.pnpm/markdown-it-task-checkbox@1.0.6/node_modules/markdown-it-task-checkbox/index.js”隐式拥有 "any" 类型。
>
> 尝试使用 `npm i --save-dev @types/markdown-it-task-checkbox` (如果存在)，或者添加一个包含 `declare module 'markdown-it-task-checkbox';` 的新声明(.d.ts)文件ts(7016)

---

解决：

在 `congfig.mts`同级目录新建一个 `type.d.ts` 文件

粘贴 `declare module 'markdown-it-task-checkbox';` 代码保存
:::

::: tip 说明
`disabled` 改成  `false` ，可以激活勾选框
:::

版本过低，跑不起来，我们直接安装 `@types/node`



::: code-group
```sh [pnpm]
pnpm add -d @types/node
```

```sh [yarn]
yarn add -D @types/node
```

```sh [npm]
npm install @types/node --save
```

```sh [bun]
bun add -D @types/node
```
:::


自己测试效果即可

- [ ] 吃饭
- [ ] 睡觉
- [x] 打豆豆

::::



最后，我还是推荐直接使用 [emoji表情](https://www.emojiall.com/zh-hant/) ，简简单单

* ✅ 吃饭

* ⬜ 睡觉



## 代码组图标

使用的是 [@yuyinws/vitepress-plugin-group-icons](https://github.com/yuyinws/vitepress-plugin-group-icons)

参照教程安装：https://vpgi.vercel.app/

::: code-group
```sh [pnpm]
pnpm add -D vitepress-plugin-group-icons
```

```sh [yarn]
yarn add -D vitepress-plugin-group-icons
```

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [bun]
bun add -D vitepress-plugin-group-icons
```
:::


然后在 `config.mts` 中配置

::: tip `groupIconMdPlugin` 报错？
请备份配置及文件后，重新安装VitePress
:::

```ts{3,8-10,13-17}
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons' // [!code focus]

export default defineConfig({

  markdown: {
    config(md) { // [!code focus:3]
      md.use(groupIconMdPlugin) //代码组图标
    },
  },

  vite: { // [!code focus:5]
    plugins: [
      groupIconVitePlugin() //代码组图标
    ],
  },

})
```

最后还需要再 `index.ts` 中引入样式

```ts{4}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import 'virtual:group-icons.css' //代码组样式 // [!code focus]

export default {
  extends: DefaultTheme,
}
```


使用时，请确保代码后有对应的文字触发

````md{2,6,10}
::: code-group
```sh [pnpm]
pnpm -v
```

```sh [yarn]
yarn -v
```

```sh [bun]
bun -v
```
:::
````

已经内置的常用图标有

```ts
export const builtInIcons: Record<string, string> = {
  // package manager
  pnpm: 'logos:pnpm',
  npm: 'logos:npm-icon',
  yarn: 'logos:yarn',
  bun: 'logos:bun',
  // framework
  vue: 'logos:vue',
  svelte: 'logos:svelte-icon',
  angular: 'logos:angular-icon',
  react: 'logos:react',
  next: 'logos:nextjs-icon',
  nuxt: 'logos:nuxt-icon',
  solid: 'logos:solidjs-icon',
  // bundler
  rollup: 'logos:rollupjs',
  webpack: 'logos:webpack',
  vite: 'logos:vitejs',
  esbuild: 'logos:esbuild',
}
```

那么如何自定义呢，我们先在 [iconify](https://icon-sets.iconify.design/) 中找到中意的图标

::: tip 说明
* 本地图标格式：只能使用相对路径

* 远程图标格式：必须是 `logos:***`
:::

图标名复制后，可以在 `config.mts` 中配置


```ts{3,15-20}
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons' // [!code focus]

export default defineConfig({

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin) //代码组图标
    },
  },

  vite: {
    plugins: [
      groupIconVitePlugin({ // [!code focus:6]
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          js: 'logos:javascript', //js图标
          md: 'logos:markdown', //markdown图标
          css: 'logos:css-3', //css图标
        },
      })
    ],
  },

})
```

来吧看看，效果如何

::: code-group
```ts [ts]
console.log("I'm TypeScript");
```

```js [js]
console.log("I'm JavaScript");
```

```md [md]
Markdown图标演示
```

```css [css]
h1 {
  background: red;
}
```

:::





## 评论

从个人角度而言，[Giscus](https://giscus.app/zh-CN) 最佳，就用它演示，其他的这里就不赘述了

::: details 为什么使用 Giscus

| 评论系统 | 说明 |
| :-: | :-: |
| [Valine](https://valine.js.org/quickstart.html) | 不用登录账号即可评论，但容易产生垃圾评论，其次没有评论提醒通知 |
| [Waline](https://waline.js.org/) | 是Valine的升级版，登录后方可评论，有通知，但是需要自己部署服务端 |
| [Twikoo](https://twikoo.js.org/) | 不用登录账号即可评论，但容易产生垃圾评论，有通知，但是需要自己部署服务端 |
| [Artalk](https://artalk.js.org/) | 可设置是否启用登录账号后评论，有通知，但是需要自己部署服务端 |
| [utteranc](https://utteranc.es/) | GitHub登录后方可评论，评论数据在 GitHub issues 中，评论后有邮件通知，无需部署服务端，但UI样式一般，且移动端不显示头像 |
| [gitalk](https://gitalk.github.io/) | GitHub登录后方可评论，评论数据在 GitHub issues 中，评论后有邮件通知，无需部署服务端，UI样式一般，评论不支持点赞 |
| ⭐[Giscus](https://giscus.app/zh-CN) | GitHub登录后方可评论，评论数据在 GitHub Discussions 中，评论后有邮件通知，无需部署服务端，UI爱了 |

:::

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


![](/giscus/giscus-01.png)



选择 `Only select repositories`，再指定一个你想开启讨论的仓库

::: tip 注意
仓库必须是公开的，私有的不行

想单独放评论，新建一个也可
:::

![](/giscus/giscus-02.png)

::: tip 查看
完成后可以在个人头像-设置-应用 `Applications` 中看到
:::



### 开启讨论

因为giscus会把评论数据都放到讨论 `discussions` 中

我们进入要开启讨论的仓库，点设置 - 勾选讨论 `Settings - discussions`

![](/giscus/giscus-03.png)


### 生成数据

进入官网：https://giscus.app/zh-CN

输入自己的仓库链接，满足条件会提示可用

![](/giscus/giscus-04.png)

下拉到 Discussion 分类我们按推荐的选 `Announcements` ，懒加载评论也可以勾选下

![](/giscus/giscus-05.png)


下方就自动生成了你的关键数据

![](/giscus/giscus-06.png)


其中 `data-repo` 、 `data-repo-id` 、 `data-category` 和 `data-category-id` 这4个是我们的关键数据

```js{2-5}
<script src="https://giscus.app/client.js"
        data-repo="github repository" // [!code focus:4]
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

有能力的可以用官方给的js数据封装

我这里用 [@T-miracle/vitepress-plugin-comment-with-giscus](https://github.com/T-miracle/vitepress-plugin-comment-with-giscus) 的插件


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