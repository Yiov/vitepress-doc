# 快速上手

<Linkcard url="https://vitepress.new/" title="在线体验及调试（StackBlitz 驱动）" description="https://vitepress.new/" logo="/svg/stackblitz_logo.svg"/>

## 前期工作

::: tip 说明
已经安装 或者 熟练了，可以不用看此步骤
:::

::: details 必备工具

* 必装：[安装nodejs](https://yiov.top/website/nodejs.html)

* 建议安装：[安装vscode](https://yiov.top/website/VSCode.html)

* 可选安装：[安装git](https://yiov.top/website/pages/git.html)
:::




:::: details pnpm / yarn / bun

::: code-group
```sh [pnpm]
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
::::




:::: details 创建目录

`win键+R键`，输入 `cmd`，打开命令终端

![](/cmd/cmd-01.png)



先进入任意盘符，比如 `F` 盘

```sh
#盘符可以自定义 回车进入
f:
```

![](/cmd/cmd-02.png)


再创建文件夹名并进入

```sh
#创建目录并进入文件夹
mkdir vitepress && cd vitepress
```

这样我的目录路径为 `F:\vitepress`

我们先关闭cmd，一会介绍快捷进入的方法


![](/cmd/cmd-03.png)

::::







## 安装

### 安装依赖

在项目目录上方的地址栏，上输入 `cmd` 回车可以快捷打开

![](/cmd/cmd-04.png)

![](/cmd/cmd-05.png)

然后我们安装vitepress

::: code-group
```sh [pnpm]
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

![](/cmd/cmd-06.png)

### 初始化向导


::: code-group
```sh [pnpm]
pnpm vitepress init
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


::: details 文件位置放在 `./docs`
文件夹名新手请参照下面，老手可以自己改

如果你直接回车，则是放在了根目录 `./`，那你的 [脚本命令](#脚本命令) 也要修改一下
:::



```sh:no-line-numbers{4}
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
如果您打算使用 Vue 组件或 API 进行自定义，您还应该显式 [安装 Vue](./components.md#安装) 作为对等依赖项

如果你不懂，我们先暂时不看，我们后面会详细说
:::


### 脚本命令

默认不用改，在 `package.json` 中可以查看

::: warning 建议
在里面添加一个 `"type": "module",` ，避免有时出现未知错误
:::

```json{6}
{
  "devDependencies": {
    "vitepress": "^1.3.4"
  },
  "packageManager": "pnpm@8.6.10+sha1.98fe2755061026799bfa30e7dc8d6d48e9c3edf0",
  "type": "module",
  "scripts": { 
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```




### git忽略项

添加 `.gitignore` 文件，主要用于上传到gitee/github时，忽略这些文件不上传

```sh
echo node_modules >> .gitignore
echo cache >> .gitignore
echo dist >> .gitignore
```

![](/cmd/cmd-07.png)



## 启动

本地启动开发环境，来开发你的网站


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


::: details 为什么我启动不了
如果你在 [初始化向导](#初始化向导) 直接回车，使用的是 `./` ，而不是 `./doc`，这里就是 `pnpm run dev`

在其 [脚本命令](#脚本命令) 的 `scripts` 中也可以看到
:::


生成了一个本地 `5173` 端口的链接，复制到浏览器打开进行预览

```sh:no-line-numbers{9}
F:\vitepress>pnpm run docs:dev

> @ docs:dev F:\vitepress
> vitepress dev docs


  vitepress v1.3.4

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```




按 `Ctrl+C键` 即可退出开发模式

我们可以关闭cmd，以后全程用 [VScode](https://yiov.top/website/VSCode.html) 了

![](/cmd/cmd-08.png)



## 相关

无特殊情况，不需要了解

:::: details 拓展：启动端口修改

若无必要，不用修改，需要在 [脚本命令](#脚本命令) 中修改端口

这样就是 `8080` 端口启动了

```json{2}
  "scripts": {
    "docs:preview": "vitepress preview docs --port 8080" // [!code focus]
  }
```
::::


:::: details 拓展：其他启动命令

你也可以直接调用命令

::: code-group
```sh [pnpm]
pnpm exec vitepress dev docs
```

```sh [npm]
npx vitepress dev docs
```

```sh [bun]
bunx vitepress dev docs
```
:::
::::