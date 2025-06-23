# 配置



## 目录

搭建完成后，已经有了一个完善的目录

在此基础上，我们可以进行修改和新增

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts          <-- 配置文件已由ts变成mts
│  ├─ api-examples.md        <-- 文章1
│  ├─ markdown-examples.md   <-- 文章2
│  ├─ guide                  <-- 新增目录
│  │   └─ index.md           <-- 新增目录的首页
│  └─ index.md               <-- 首页
└─ package.json
```

生成的 HTML 页面会是这样：

```
api-examples.md         -->    /api-examples.html
markdown-examples.md    -->    /markdown-examples.html
index.md                -->    /index.html (可以通过 / 访问)
guide/index.md          -->    /guide/index.html (可以通过 /guide/ 访问)
```




## 基础配置

在当前目录，`右键用 vscode 打开` ，[没有的请自行安装VScode](https://yiov.top/website/VSCode.html)

![](/vscode/vscode-01.png)

然后按 [Ctrl+\`(~) 键](#基础配置) （ESC下面的那个键），调出终端，正式开始开发

![](/vscode/vscode-02.png)


展开右侧目录，找到 `config.mts`

```md{4}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts           <--  配置文件，支持js、ts、mjs、mts
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

![](/vscode/vscode-03.png)


配置已经写好了，在此基础上修改就行了

```ts
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
```




:::: details 如何重新进入开发模式

::: tip 如何退出
ctrl+c 即可退出开发模式
:::

::: code-group
```sh [pnpm]
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
::::





## 纯净链接

这是一个简单又麻烦的事，可以等网站初上线后，再来完善

它需要服务器支持，默认情况下Vitepress的链接以 `.html` 结尾


### 服务器支持

* [Netlify](https://docs.netlify.com/get-started/) 和 [GitHub Pages](https://pages.github.com/) 是无需配置

* [Vercel](https://vercel.com/docs/concepts/get-started) 需要在 [vercel.json 中启用 cleanUrls 选项](https://vercel.com/docs/projects/project-configuration#cleanurls)


确保文章在引用是没有使用 `*md` 的后缀名

```
[Getting Started](./getting-started)
[Getting Started](../guide/getting-started)
```


然后在 `config.mts` 中配置如下

```ts{4}
import { defineConfig } from 'vitepress'

export default defineConfig({
  cleanUrls:true, //开启纯净链接 // [!code focus]
})
```


### 服务器不支持

需要变更下目录，将原先的文档放入文件夹中

原先的 `api-examples.md` 变成了 `api-examples/index.md`

```md{5,7}
.
├─ docs
│  ├─ .vitepress
│  ├─ api-examples           
│  │  └─ index.md            <-- 文章1
│  ├─ markdown-examples      
│  │  └─ index.md            <-- 文章2
│  └─ index.md               <-- 首页
└─ package.json
```




