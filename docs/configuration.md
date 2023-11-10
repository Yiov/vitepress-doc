# 配置

> 更新时间：2023-10-28



## 目录

搭建完成后，可以看到一个已经完善的目录

在此基础上我们可以进行修改和新增

::: tip 说明
`index.md` 是我们的首页，最后也渲染成 `index.html`

你也可以命名成README.md
:::

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts          <-- 配置文件已由ts变成mts
│  ├─ api-examples.md        <-- 文章1
│  ├─ markdown-examples.md   <-- 文章2
│  └─ index.md               <-- 首页
└─ package.json
```


## 纯净链接

在默认情况下Vitepress的链接结尾 `.html` ，如果你喜欢纯净的网址不使用 `.html`

我们需要变更下目录，将原先的文档使用文件夹，然后再文件夹内新建页面

::: tip 说明
例如：`https://vitepress.dev/guide/` 变成 `https://vitepress.dev/guide/.html`
:::



```md{6,8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts           <--  配置文件已由ts变成mts
│  ├─ api-examples           
│  │  └─ index.md            <-- 文章1
│  ├─ markdown-examples      
│  │  └─ index.md            <-- 文章2
│  └─ index.md               <-- 首页
└─ package.json
```

如果你文章太多，或者觉得上面的麻烦，可以直接配置

```ts{2}
export default defineConfig({
  cleanUrls:true,
})
```



## 配置

在目录，右键用vscode打开，正式开始开发

```md{4}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts           <--  配置文件已由ts变成mts
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

配置已经写好了，我们点击 `config.mts` ，在此基础上修改就行了


```ts
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'VitePress',
  //titleTemplate: '另起标题覆盖title'
  description: 'Vite & Vue 驱动的静态网站生成器',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    //导航
    nav: [
      { text: 'Home', link: '/' }, 
      { text: 'Examples', link: '/markdown-examples' }
    ],
    //侧边栏
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

```



修改成想要的了保存，然后重新进入开发模式

::: tip 如何退出
ctrl+c 即可退出开发模式
:::

::: code-group
```sh [pmpm]
pnpm run docs:dev
```

```sh [yarn]
yarn docs:dev
```

```sh [npm]
npm run docs:dev
```

```sh [bun]
bun run docs:dev
```
:::

