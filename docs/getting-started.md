# 快速上手

::: warning 更新时间
最近更新：2023-7-12

搭建版本：vitepress v1.0.0-beta.5
:::

## 前期工作


### 工具

::: tip 说明
已经安装 或者 熟练了，可以不用看此步骤
:::

必装：[安装nodejs](https://yiov.top/website/nodejs#window%E5%AE%89%E8%A3%85)

建议安装：[安装vscode](https://yiov.top/daily/VSCode/)

可选安装：[安装git](https://yiov.top/daily/git)


### pnpm/yarn

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

我们在目录上方的地址栏输入 `cmd` 可以快捷打开

::: tip 建议
如果你已经安装好 Vscode ，在目录右键 `vscode打开`
:::

::: code-group
```sh [pmpm]
pnpm add -D vitepress search-insights @algolia/client-search
```

```sh [yarn]
yarn add -D vitepress search-insights @algolia/client-search
```

```sh [npm]
npm install -D vitepress search-insights @algolia/client-search
```
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
:::

我们将文件都放在 `./docs` ，参照下面，其他默认回车

::: tip 说明
如果你全部默认直接回车，放在根目录 `./`

那你的 [脚本命令](#脚本命令) 也要做修改
:::

```sh{6}
  vitepress v1.0.0-beta.5

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

::: details 收到了缺少对等依赖的警告？

其实无视即可，不影响任何操作

强迫症在 `package.json` 中添加如下，消除提示

```json
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



### 脚本命令

可以无视，初始化的时候已经弄好了


```json{2-4}
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
```

::: warning 注意
如果你在初始化的时候选择了 `./` ，而不是 `./doc`，这里就需要修改

```
"docs:dev": "vitepress dev",
"docs:build": "vitepress build",
"docs:preview": "vitepress preview"
```
:::




### git忽略项

添加.gitignore文件

::: tip 说明
主要用于上传到gitee/github时，忽略这些文件不上传

`node_modules` / `cache`
:::

```sh
echo node_modules >> .gitignore

echo cache >> .gitignore

```

::: tip 说明
生成的 `dist` 目录不上传也可以加入忽略项里
:::

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
:::