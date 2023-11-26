# 快速上手

> 更新时间：2023-10-28



## 前期工作


### 工具

::: tip 说明
已经安装 或者 熟练了，可以不用看此步骤
:::

必装：[安装nodejs](https://yiov.top/website/nodejs#window%E5%AE%89%E8%A3%85)

建议安装：[安装vscode](https://yiov.top/daily/VSCode/)

可选安装：[安装git](https://yiov.top/daily/git)


### pnpm

::: tip 说明
已经安装 或者 熟练了，可以不用看此步骤
:::

::: code-group
```sh [pmpm]
#安装pnpm
npm install -g pnpm
#查看版本号
pnpm -v
```

```sh [yarn]
#安装yarn
npm install -g yarn
#查看版本号
yarn -v
```

```sh [bun]
#安装yarn
npm install -g bun
#查看版本号
bun -v
```
:::


### 创建目录

win键+R键，调出命令运行框，输入 `cmd`

先进入任意盘符，比如 `F` 盘

```sh
#盘符可以自定义 回车进入
f:
```

再创建文件夹名

```sh
#目录可以自定义
mkdir vitepress

#目录和上面保持一致
cd vitepress
```
::: warning 说明
这样我的目录路径为 `F:\vitepress`

我们先关闭cmd，一会介绍快捷的方法
:::


## 安装

### 安装依赖

在目录上方的地址栏，比如我的是 `F:\vitepress` 上输入 `cmd` 回车可以快捷打开


::: code-group
```sh [pmpm]
pnpm add -D vitepress
```

```sh [yarn]
yarn add -D vitepress
```

```sh [npm]
npm i -D vitepress
```

```sh [bun]
bun add -D vitepress
```
:::

::: details 收到了缺少对等依赖的警告
如果使用 PNPM，您会注意到 `@docsearch/js` 缺少对等警告。这并不妨碍 VitePress 工作。如果您希望抑制此警告，请将以下内容添加到您的 `package.json`

注意：最新版已经不会提示了！

```
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search",
      "search-insights"
    ]
  }
}
```
:::

::: tip 说明
VitePress是一个仅支持ESM的软件包。不要使用 `require()` 来导入它，并确保您最近的 `package.json` 文件包含 `"type": "module"` ，或者将相关文件的扩展名例如 `vitepress/config.js` 更改为.mjs/.mts。有关更多详细信息，请参考 [Vite的故障排除指南](https://vitejs.dev/guide/troubleshooting.html#this-package-is-esm-only) 。此外，在异步的CJS上下文中，您可以使用 `await import('vitepress')` 来代替。
:::


### 初始化向导


::: code-group
```sh [pmpm]
pnpm dlx vitepress init
```

```sh [yarn]
yarn vitepress init
```

```sh [npm]
npx vitepress init
```

```sh [bun]
bunx vitepress init
```
:::

我们将文件都放在 `./docs` ，参照下面，其他默认回车

::: tip 说明
如果你第一个直接回车，放在了根目录 `./`

那你的 [脚本命令](#脚本命令) 也要做修改
:::

```sh{6}
  vitepress v1.0.0-rc.31

T   Welcome to VitePress!
|
o  Where should VitePress initialize the config?
|  ./docs
|
o  Site title:
|  My Awesome Project
|
o  Site description:
|  A VitePress Site
|
o  Theme:
|  Default Theme
|
o  Use TypeScript for config and theme files?
|  Yes
|
o  Add VitePress npm scripts to package.json?
|  Yes
|
—  Done! Now run npm run docs:dev and start writing.
```

::: tip Vue 作为对等依赖
如果您打算使用 Vue 组件或 API 进行自定义，您还应该显式安装 `vue` 作为对等依赖项。

`pnpm add -D vue`
:::


### 脚本命令

可以无视，初始化的时候已经弄好了

::: warning 注意
如果你在初始化的时候选择了 `./` ，而不是 `./doc`，这里就需要修改
:::

```json
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
```




### git忽略项

添加.gitignore文件

::: tip 说明
主要用于上传到gitee/github时，忽略这些文件不上传
:::

```sh
echo node_modules >> .gitignore

echo cache >> .gitignore

echo dist >> .gitignore
```



## 启动

本地启动开发环境，来开发你的网站

### 本地启动

::: tip 如何退出
ctrl+c 即可退出开发模式
:::

::: code-group
```sh [pmpm]
pnpm run docs:dev
```

```sh [yarn]
yarn run docs:dev
```

```sh [npm]
npm run docs:dev
```

```sh [bun]
bun run docs:dev
```
:::



生成了一个本地 `5173` 端口的链接，可以对网站进行预览


此时，VitePress已经搭建好了一个基础的网站

`http://localhost:5173/`

::: tip 说明
接下来我们可以关闭cmd，全程用vscode了
:::

### 启动端口修改

需要在 [脚本命令](#脚本命令) 中修改端口

::: warning 注意
若无必要，不用修改
:::

这样就是 `8080` 端口启动了

```json{2}
  "scripts": {
    "docs:preview": "vitepress preview docs --port 8080" // [!code focus]
  }
```

### 其他启动命令

你也可以直接调用命令

::: code-group
```sh [pmpm]
pnpm exec vitepress dev docs
```

```sh [npm]
npx vitepress dev docs
```

```sh [bun]
bunx vitepress dev docs
```
:::