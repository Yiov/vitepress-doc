# 静态部署

> 更新时间：2024-1-28

主要讲一下GitHub，其他的方式都大同小异，[更多部署方式可以参考官方文档](https://vitepress.dev/zh/guide/deploy)



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

另一个要注意的点，部署到非根目录，你的 [Fav图标路径](./page.md#fav图标) 也要变动一下

```ts{5-6}
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
yarn docs:build
```

```sh [npm]
npm run docs:build
```

```sh [bun]
bun run docs:build
```
:::




:::: details 如果你需要本地预览，可以执行
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
::::


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

在仓库 `Actions` 里新建一个工作流 中创建一个 `deploy.yml` 脚本文件

::: tip 说明
名字可以自定义，不用非得用 `deploy` ，只要下面配置名和这个一致就行

分支默认是 `main`
:::


```yml{3,9}
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v2 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: |
          npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
          touch docs/.vitepress/dist/.nojekyll
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

每次你更新代码后，系统会自动给你打包上传并部署