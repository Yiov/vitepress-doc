# 更新及卸载



## 更新

### 安装ncu

::: danger 注意
已经安装过的可以无视
:::

由于直接用命令更新，不能改变 `package.json` 的内容

我更推荐用 npm-check-updates，即 `ncu`

```sh
npm i -g npm-check-updates
```

ncu可以可以检查出需更新的软件包

```sh
ncu
```


### 更新

更新模块包版本信息

::: tip 说明
这时候我们的 `package.json` 里的版本都按最新的填写完毕了
:::

```sh
#即运行ncu -u to upgrade package.json
ncu -u
```



我们直接用命令更新安装依赖即可


::: code-group
```sh [pnpm]
pnpm install
```

```sh [yarn]
yarn install
```

```sh [bun]
bun install
```
:::



## 卸载

卸载就比较简单了，在 `package.json` 中找到包名即可

::: code-group
```sh [pnpm]
pnpm uninstall <包名>
```

```sh [yarn]
yarn uninstall <包名>
```

```sh [bun]
bun uninstall <包名>
```
:::

::: info 比如
pnpm uninstall vue

`vue` 就是包名
:::


## alpha版本

对于升级了新版本的，如何在升降级呢

::: code-group
```sh [pnpm]
#升级到指定版本
pnpm add -D vitepress@2.0.0-alpha.6

#降级到指定版本
pnpm add -D vitepress@2.0.0-alpha.5
```

```sh [yarn]
#升级到指定版本
yarn add -D vitepress@2.0.0-alpha.6

#降级到指定版本
yarn add -D vitepress@2.0.0-alpha.5
```

```sh [npm]
#升级到指定版本
npm i -D vitepress@2.0.0-alpha.6

#降级到指定版本
npm i -D vitepress@2.0.0-alpha.5
```

```sh [bun]
#升级到指定版本
bun add -D vitepress@2.0.0-alpha.6

#降级到指定版本
bun add -D vitepress@2.0.0-alpha.5
```
:::


alpha版本又如何切换回正式版呢

- 删掉 `pnpm-lock.yaml` 和 `node_modules` 文件夹

- 修改 `package.json` 中的 vitepress 版本改成指定版本

```json [package.json]
{
  "devDependencies": {
    "vitepress": "2.0.0-alpha.5" // [!code --]
    "vitepress": "^1.6.3" // [!code ++]
  },
  "packageManager": "pnpm@8.6.10+sha1.98fe2755061026799bfa30e7dc8d6d48e9c3edf0",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

修改好后，重新拉取依赖即可

::: code-group
```sh [pnpm]
pnpm install
```

```sh [yarn]
yarn install
```

```sh [npm]
npx i
```

```sh [bun]
bun install
```
:::