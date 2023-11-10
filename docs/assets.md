# 静态部署

> 更新时间：2023-10-28

主要讲一下GitHub，其他的方式都大同小异，[更多部署方式可以参考官方文档](https://vitepress.dev/guide/deploy)



## Base

::: warning 注意

base必须配置，否则打包会丢失css样式！！

根目录配置 `/`，那么对应 `https://yiov.github.io/`

仓库 `vitepress` 配置 `/vitepress/` ，那么对应 `https://yiov.github.io/vitepress`
:::

我们根据自己的需求，选择相应的的配置

```ts
export default defineConfig({
    base: '/', //网站部署的路径，默认根目录
    // base: '/vitepress/', //网站部署到github的vitepress这个仓库里
})
```

另一个要注意的点，你的 [Fav图标路径](./page.md#fav图标) 也要变动一下

```ts{3-6}
export default defineConfig({

  //fav图标
  head: [
    ['link',{ rel: 'icon', href: '/logo.png'}], //部署到根目录 // [!code --]
    ['link',{ rel: 'icon', href: '/vitepress/logo.png'}], //部署到vitepress仓库 // [!code ++]
  ],

})
```


## 构建

构建完成后，在dist文件夹上传到Github即可

::: code-group
```sh [pmpm]
pnpm run docs:build
```

```sh [yarn]
yarn run docs:build
```

```sh [npm]
npm run docs:build
```

```sh [bun]
bun run docs:build
```
:::

如果你需要本地预览，可以执行

::: code-group
```sh [pmpm]
pnpm run docs:preview
```

```sh [yarn]
yarn docs:preview
```

```sh [npm]
npm run docs:preview
```

```sh [bun]
bun run docs:preview
```
:::



## 部署

::: tip 说明
常见的静态部署方式，无论你采用哪种，都会先上传到GitHub
:::

| 名称 | 自定义域名 | 限制 | 缺点 |
|:-:|:-:|:-:|:-:|
| [Github page](https://pages.github.com/) | 支持 | 空间1G，100G/月 | 国内访问慢，百度不收录 |
| [Gitee Pages](https://gitee.com/help/articles/4136#article-header0) | 收费 | 空间1G，100G/月 | 需实名，仓库审查 |
| [GitLab Pages](https://docs.gitlab.cn/jh/user/project/pages/index.html) | 支持 | - | 国内访问慢 |
| |
| [Netlify](https://docs.netlify.com/get-started/) | 支持 | 100G/月 | 从GitHub、GitLab、BitBucket拉取 |
| [Vercel](https://vercel.com/docs/concepts/get-started) | 支持 | 100G/月 | 从GitHub、GitLab、BitBucket拉取 |
| [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/) | 支持 | - | 从GitHub、GitLab拉取 |

### 手动上传

默认的构建输出目录 `.vitepress/dist` ，上传到Github即可

::: tip 说明
如果你还不会使用，请参考教程：[Github的注册使用到上传](https://yiov.top/daily/github)
:::


在GitHub仓库 - 设置 - page里把分支改成main，默认root，保存


等创建成功后即可获得访问链接



### 工作流

在仓库 `Actions` 里新建一个工作流  或者 直接在 `.github/workflows` 中创建一个 `deploy.yml` 脚本文件

::: tip 说明
名字可以自定义，不用非得用 `deploy` ，只要下面配置名和这个一致就行

分支默认是 `main`
:::


```yml{1,6}
name: Deploy
on:
  workflow_dispatch: {}
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: npm
      - run: npm ci
      - name: Build
        run: npm run docs:build
      - uses: actions/configure-pages@v2
      - uses: actions/upload-pages-artifact@v1
        with:
          path: docs/.vitepress/dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v1
```

每次你更新代码后，系统会自动给你打包上传并部署