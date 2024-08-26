# 样式美化

<ArticleMetadata />


## 主题目录(必看)

::: tip 说明
要修改样式，建议还是按此方式，无论怎样修改都不影响源文件
:::

在 `.vitepress` 中新建文件夹 `theme`，看目录

```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ index.mts 或者 index.ts
│  └─ index.md
└─ node_modules
```

然后在 `theme` 目录下新建 `index.ts` 并填入如下代码


```ts
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
}
```




## 主题美化


### 主题色

在 `theme` 目录下新建 `style` 文件夹，然后新建 `index.css` 和 `var.css`

```md{7-8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ var.css
│  └─ index.md
└─ node_modules
```


分别复制代码并粘贴

::: code-group

```css [index.css]
/* index.css */
@import './var.css';
```


```css [var.css]
/* var.css */
:root {
  --vp-c-brand-1: #18794e;
  --vp-c-brand-2: #299764;
  --vp-c-brand-3: #30a46c;
}

.dark {
  --vp-c-brand-1: #3dd68c;
  --vp-c-brand-2: #30a46c;
  --vp-c-brand-3: #298459;
}
/* 以前的vp-c-brand已弃用 */

:root {
  /* hero标题渐变色 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);

  /*hero logo背景渐变色 */
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

/* 也可自行单独修改brand按钮 */
/* :root {
  --vp-button-brand-border: #F6CEEC;
  --vp-button-brand-text: #F6CEEC;
  --vp-button-brand-bg: #D939CD;

  --vp-button-brand-hover-border: #F6CEEC;
  --vp-button-brand-hover-text: #fff;
  --vp-button-brand-hover-bg: #D939CD;

  --vp-button-brand-active-border: #F6CEEC;
} */
```
:::



然后将修改好的样式引入 `index.ts`


```ts{3}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css' // [!code focus]

export default {
  extends: DefaultTheme,
}
```


---



### H1标题颜色

::: warning 当然
同理，你也可以改H2-H6的标题，不过我感觉没必要，太花里胡哨了
:::

最简单的修改就是，比如改成红色

```css
/* .vitepress/theme/style/var.css */
h1 {
  color: red;
}
```

但是这样并不太好看，我们可以弄一个渐变色

```css
/* .vitepress/theme/style/var.css */
h1 {
  background: -webkit-linear-gradient(10deg, #bd34fe 5%, #e43498 15%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

::: tip 说明
background: 采用了一个线性渐变

background-clip: 使文本的背景颜色与渐变效果相同

text-fill-color：将文字透明
:::




---


### 链接下划线

新版本更新后，文字跳转链接就多了一个下划线

不习惯的可以修改，我们在 `var.css` 中添加下面代码就行了

```css
/* var.css */
.vp-doc a {
    text-decoration: none;
}
```

[参考：MDN Web Docs 社区](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)





## 其他美化

太多了，可以参照源文件来进行修改

```
node_modules\vitepress\dist\client\theme-default\styles\var.css
```



---


### 引用颜色

在Markdown中，我们常用的引用符号是 `>`，我们可以稍微改动一下

在 `theme/style` 新建 `blockquote.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ blockquote.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `blockquote.css` 中

::: code-group

```css
/* .vitepress\theme\style\blockquote.css */
.vp-doc blockquote {
    border-radius: 10px;
    padding: 18px 20px 20px 15px;
    position: relative;
    background-color: var(--vp-c-gray-soft);
    border-left: 6px solid var(--vp-c-green-2);
}
```
:::


然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './blockquote.css';
```



输入：

```md
> 更新时间：2024年
```

输出：

> 更新时间：2024年




---


### Badge颜色

随着版本更新迭代，现在这 `tip` `warning` `danger` 颜色真的想吐槽，好丑！

[Vuepress/hope主题的容器颜色](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/hint.html#%E6%BC%94%E7%A4%BA) 就不错，参考着弄一下


在 `theme/style` 新建 `custom-block.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ blockquote.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `custom-block.css` 中

::: code-group

```css [custom-block.css]
/* .vitepress/theme/style/custom-block.css */
/* 深浅色卡 */
:root {
    --vp-custom-block-info: #cccccc;
    --vp-custom-block-info-bg: #fdfdfe;

    --vp-custom-block-tip: #009400;
    --vp-custom-block-tip-bg: #e6f6e6;

    --vp-custom-block-warning: #e6a700;
    --vp-custom-block-warning-bg: #fff8e6;

    --vp-custom-block-danger: #e13238;
    --vp-custom-block-danger-bg: #ffebec;

    --vp-custom-block-note: #4cb3d4;
    --vp-custom-block-note-bg: #eef9fd;

    --vp-custom-block-important: #a371f7;
    --vp-custom-block-important-bg: #f4eefe;
}

.dark {
    --vp-custom-block-info: #cccccc;
    --vp-custom-block-info-bg: #474748;

    --vp-custom-block-tip: #009400;
    --vp-custom-block-tip-bg: #003100;

    --vp-custom-block-warning: #e6a700;
    --vp-custom-block-warning-bg: #4d3800;

    --vp-custom-block-danger: #e13238;
    --vp-custom-block-danger-bg: #4b1113;

    --vp-custom-block-note: #4cb3d4;
    --vp-custom-block-note-bg: #193c47;

    --vp-custom-block-important: #a371f7;
    --vp-custom-block-important-bg: #230555;
}


/* 标题字体大小 */
.custom-block-title {
    font-size: 16px;
}

/* 注释容器:背景色、左侧 */
.custom-block.info {
    background-color: var(--vp-custom-block-info-bg);
    border-left: 5px solid var(--vp-custom-block-info);
}

/* 提示容器:边框色、背景色、左侧 */
.custom-block.tip {
    /* border-color: var(--vp-custom-block-tip); */ 
    background-color: var(--vp-custom-block-tip-bg);
    border-left: 5px solid var(--vp-custom-block-tip);
}

/* 警告容器:背景色、左侧 */
.custom-block.warning {
    background-color: var(--vp-custom-block-warning-bg);
    border-left: 5px solid var(--vp-custom-block-warning);
}

/* 危险容器:背景色、左侧 */
.custom-block.danger {
    background-color: var(--vp-custom-block-danger-bg);
    border-left: 5px solid var(--vp-custom-block-danger);
}

/* NOTE容器:背景色、左侧 */
.custom-block.note {
    background-color: var(--vp-custom-block-note-bg);
    border-left: 5px solid var(--vp-custom-block-note);
}

/* IMPORTANT容器:背景色、左侧 */
.custom-block.important {
    background-color: var(--vp-custom-block-important-bg);
    border-left: 5px solid var(--vp-custom-block-important);
}

/* CAUTION容器:背景色、左侧 */
.custom-block.caution {
    background-color: var(--vp-c-red-soft);
    border-left: 5px solid var(--vp-c-red-3);
}
```
:::


看看效果，也可以在 `::before`中添加 `content`属性，使用 [Emoji表情](https://www.emojiall.com/zh-hans/) 或者 [Unicode 符号表](https://symbl.cc/cn/unicode-table/) ，因为添加后要改动的地方较多，就不演示了

::: info 注释
改为左缩进+灰色
:::

::: tip 提示
改为左缩进+绿色
:::


::: warning 警告
改为左缩进+橘色
:::

::: danger 危险
改为左缩进+红色
:::


---


### 导航栏毛玻璃

在 `theme/style` 文件夹，然后新建 `blur.css` 并填入如下代码

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ blur.css
│  └─ index.md
└─ node_modules
```

在主题原始文件中， `VPNavBar.vue` 组件有其对应的属性

复制下面代码，粘贴到 `blur.css` 中，可以自行增减

::: code-group
```css [blur.css]
/* .vitepress/theme/style/blur.css */
:root {

    /* 首页导航 */
    .VPNavBar {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
    }

    /* 文档页导航两侧 */
    .VPNavBar:not(.home) {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
    }

    @media (min-width: 960px) {

        /* 文档页导航两侧 */
        .VPNavBar:not(.home) {
            background-color: rgba(255, 255, 255, 0);
            backdrop-filter: blur(10px);
        }

        /* 首页下滑后导航两侧 */
        .VPNavBar:not(.has-sidebar):not(.home.top) {
            background-color: rgba(255, 255, 255, 0);
            backdrop-filter: blur(10px);
        }
    }

    @media (min-width: 960px) {

        /* 文档页导航中间 */
        .VPNavBar:not(.home.top) .content-body {
            background-color: rgba(255, 255, 255, 0);
            backdrop-filter: blur(10px);
        }

        /* 首页下滑后导航中间 */
        .VPNavBar:not(.has-sidebar):not(.home.top) .content-body {
            background-color: rgba(255, 255, 255, 0);
            backdrop-filter: blur(10px);
        }
    }


    /* 分割线 */

    @media (min-width: 960px) {

        /* 文档页分割线 */
        .VPNavBar:not(.home.top) .divider-line {
            background-color: rgba(255, 255, 255, 0);
            backdrop-filter: blur(10px);
        }

        /* 首页分割线 */
        .VPNavBar:not(.has-sidebar):not(.home.top) .divider {
            background-color: rgba(255, 255, 255, 0);
            backdrop-filter: blur(10px);
        }
    }

    /* 搜索框 VPNavBarSearchButton.vue */
    .DocSearch-Button {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
    }


    /* 移动端大纲栏 */
    .VPLocalNav {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
        /* 隐藏分割线 */
        /* border-bottom: 5px solid var(--vp-c-gutter); */
        border-bottom: 0px;
    }


}
```
:::


最后引入 `index.css` 中 即可看到效果

```css
/* style/index.css */
@import './blur.css';
```


---




### 链接图标

在 [Vuejs官网的快速上手](https://cn.vuejs.org/guide/quick-start.html) 中 链接前有个图标，怎么做到呢

在 `theme/style` 新建 `link.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ link.css
│  └─ index.md
└─ node_modules
```

将下面代码，复制粘贴到 `link.css` 中

分别添加了 [油管](https://www.youtube.com/) 和 [B站](https://www.bilibili.com/) 的链接图标

::: details 使用说明
多个链接，分别添加即可

`content` 可使用Emoji，自行修改好位置即可
:::

```css{2,4}
/* .vitepress\theme\style\link.css */
.vp-doc a[href^="https://www.youtube.com/"]:before,[href^="https://www.bilibili.com/"]:before
{
  content: '➹';
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 10px;
  vertical-align: middle;
  position: relative;
  top: -2px;
  color: var(--vp-c-green-1);
  font-size: 13px;
  border: 3px solid var(--vp-c-green-1);
  margin-right: 8px;
  margin-left: 4px;
  line-height: 15px;
  padding-left: 1.5px;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress\theme\style\index.css */
@import './link.css';
```


输入：

```md
油管链接图标：[Youtube](https://www.youtube.com/)

B站链接图标：[哔哩哔哩](https://www.bilibili.com/)
```

输出：

油管链接图标：[Youtube](https://www.youtube.com/)

B站链接图标：[哔哩哔哩](https://www.bilibili.com/)


---






### 链接卡片 

::: tip 说明
方法参考自 [vuejs官网](https://cn.vuejs.org/guide/introduction.html) 的 [中文仓库](https://github.com/vuejs-translations/docs-zh-cn)
:::

在 `.vitepress/theme/style` 目录新建一个 `linkcard.css` 文件


```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ linkcard.css
│  └─ index.md
└─ node_modules
```

粘贴如下代码，保存


```css
/* .vitepress/theme/style/linkcard.css */

/* 卡片背景 */
.linkcard {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
  transition: color 0.5s, background-color 0.5s;
}

/* 卡片鼠标悬停 */
.linkcard:hover {
  background-color: var(--vp-c-yellow-soft);
}

/* 链接样式 */
.linkcard a {
  display: flex;
  align-items: center;
}

/* 描述链接文字 */
.linkcard .description {
  flex: 1;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: var(--vp-c-text-1);
  margin: 0 0 0 16px;
  transition: color 0.5s;
}

/* 描述链接文字2 */
.linkcard .description span {
  font-size: 14px;
}

/* logo图片 */
.linkcard .logo img {
  width: 80px;
  object-fit: contain;
}

/* 链接下划线去除 */
.vp-doc a {
  text-decoration: none;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './linkcard.css';
```


输入：

```md
<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://vitepress.yiov.top/logo.png" />
    </div>
  </a>
</div>
```

输出：

<div class="linkcard">
  <a href="https://vitepress.yiov.top/" target="_blank">
    <p class="description">Vitepress中文搭建教程<br><span>https://vitepress.yiov.top/</span></p>
    <div class="logo">
        <img alt="Logo" width="70px" height="70px" src="https://vitepress.yiov.top/logo.png" />
    </div>
  </a>
</div>



---




### 代码组

将代码组改成Mac风格，三个小圆点

在 `.vitepress/theme/style` 目录新建一个 `vp-code-group.css` 文件


```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ vp-code-group.css
│  └─ index.md
└─ node_modules
```

粘贴如下代码，保存


```css
/* .vitepress/theme/style/vp-code-group.css */

/* 代码块tab */
.vp-code-group .tabs {
    padding-top: 30px;
}

/* 代码块tab-顶部小圆点 */
.vp-code-group .tabs::before {
    background: #fc625d;
    border-radius: 50%;
    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
    content: ' ';
    height: 12px;
    width: 12px;
    left: 12px;
    margin-top: -15px;
    position: absolute;
}


/* 代码组 */
.vp-code-group {
    color: var(--vp-c-black-soft);
    border-radius: 8px;
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './vp-code-group.css';
```

输入：

````md
::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

:::
````



输出：


::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```
:::

修改默认单个代码块，就会影响到代码组

如果你想单个使用，在 `code-group` 只写入一组即可


输入：

````md
::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```
:::
````

输出：

::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```
:::


---


### 代码精简

当我们的内容多了，在 `config.mts` 中配置导航和侧边栏，翻就要半天了


所以那就来个简化导航栏，其他同理

在 `.vitepress` 目录新建 `config` 文件夹，并新建 `index.ts` 文件


```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ configs      <- 配置文件夹
│  │     └─ index.ts
│  └─ index.md
└─ node_modules
```

然后复制粘贴到 `index.ts` 并保存下面代码

```ts
/* configs/index.ts */
export * from './nav'
```


然后再新建 `nav.ts` 文件

```md{7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ configs      
│  │     └─ index.ts
│  │     └─ nav.ts     <- 导航配置
│  └─ index.md
└─ node_modules
```

同样复制粘贴并保存

```ts
/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: 'VitePress', link: 'https://vitepress.dev/' },
  {
    text: '1.0.0-rc.**',
    items: [
      { text: '更新日志', link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md' },
      { text: '贡献', link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md' },
      ],
  },
]
```


最后我们回到 `config.mts` 中引入配置

```ts{3,8-9}
import { defineConfig } from 'vitepress'

import { nav } from './configs'

export default defineConfig({
  //主题配置
  themeConfig: {
    //导航栏
    nav,
  }
})
```








## 徽章

也可以叫徽标，无论文档还是github项目都会见到这种

![](https://vuepress.yiov.top/assets/vuepress-37-83d44ec7.png)

官网：https://shields.io/

选择要生成的徽标，生成后，选择Markdown格式即可，旁边都有示例不难

::: tip 其他徽标
https://badgen.net/

https://forthebadge.com/

https://badge.fury.io/
:::


### 组成

由三部分组成：标签、消息和颜色，其中标签可以不写，但消息和颜色必须存在！

格式：`label-message-color`(由左至右)

* label：标签

* message：消息

* color：颜色

---

### 实操

在输入框输入 `any text-you like-blue`

::: tip 说明
用 `_` 或 `%20`表示空格，`-` 分隔内容

如果你想要输入一个真的 `-` ，那么用两个 `--` 来表示一个真的 `-`
:::

生成链接：https://img.shields.io/badge/any_text-you_like-blue

输入：

```md
![](https://img.shields.io/badge/any_text-you_like-blue)
```

输出：

![](https://img.shields.io/badge/any_text-you_like-blue)


如果不写标签，只写消息和颜色的话，输入 `just_do_it-8A2BE2`


生成链接：https://img.shields.io/badge/just_do_it-8A2BE2

输入：

```md
![](https://img.shields.io/badge/just_do_it-8A2BE2)
```

输出：

![](https://img.shields.io/badge/just_do_it-8A2BE2)


点击输入框下面的 `Show optional parameters` 展开更多详细信息

我随机填了一些信息，logo可以使用 [Simple Icons](https://simpleicons.org/)

生成链接：https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=red

输入：

```md
![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)
```

输出：

![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)


静态徽章做跳转的话，可以直接使用markdown格式

```md
[![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)](https://shields.io/badges)
```

效果：
[![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)](https://shields.io/badges)


::: warning 关于其他动态徽章
可以参照官网，挨个摸索并不难上手
:::


---

### 效果演示

::: tip 更多徽章样式
https://github.com/Ileriayo/markdown-badges

https://github.com/Envoy-VC/awesome-badges
:::

::: details 这里引用 [查尔斯](https://blog.charles7c.top/about/me) 的页面展示
```md
#### 后端技术栈

<p>
  <img src="https://img.shields.io/badge/-Spring-6DB33F?logo=Spring&logoColor=FFF" alt="Spring" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=Spring-Boot&logoColor=FFF" alt="Spring Boot" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MySQL-4479A1?logo=MySQL&logoColor=FFF" alt="MySQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MariaDB-A9A9A9?logo=MariaDB&logoColor=003545" alt="MariaDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PostgreSQL-C0C0C0?logo=PostgreSQL&logoColor=4169E1" alt="PostgreSQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Oracle-C0C0C0?logo=Oracle&logoColor=F80000" alt="Oracle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Microsoft%20SQL%20Server-D3D3D3?logo=Microsoft-SQL-Server&logoColor=CC2927" alt="Microsoft SQL Server" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Redis-DC382D?logo=Redis&logoColor=FFF" alt="Redis" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MongoDB-47A248?logo=MongoDB&logoColor=FFF" alt="MongoDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-RabbitMQ-FF6600?logo=RabbitMQ&logoColor=FFF" alt="RabbitMQ" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Solr-D9411E?logo=Apache-Solr&logoColor=FFF" alt="Solr" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ElasticSearch-005571?logo=ElasticSearch&logoColor=FFF" alt="ElasticSearch" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Logstash-A9A9A9?logo=Logstash&logoColor=005571" alt="Logstash" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kibana-A9A9A9?logo=Kibana&logoColor=005571" alt="Kibana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kafka-C0C0C0?logo=Apache-Kafka&logoColor=231F20" alt="Kafka" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Consul-F24C53?logo=Consul&logoColor=FFF" alt="Consul" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tomcat-F8DC75?logo=Apache-Tomcat&logoColor=000" alt="Tomcat" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JUnit5-25A162?logo=JUnit5&logoColor=FFF" alt="JUnit5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Liquibase-2962FF?logo=Liquibase&logoColor=FFF" alt="Liquibase" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Maven-C71A36?logo=Apache-Maven&logoColor=FFF" alt="Maven" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gradle-D3D3D3?logo=Gradle&logoColor=02303A" alt="Gradle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Security-6DB33F?logo=Spring-Security&logoColor=FFF" alt="Spring Security" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Hibernate-59666C?logo=Hibernate&logoColor=FFF" alt="Hibernate" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JSON-000?logo=JSON&logoColor=FFF" alt="JSON" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JWT-000?logo=JSON-Web-Tokens&logoColor=FFF" alt="JWT" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Java-F78C40?logo=OpenJDK&logoColor=FFF" alt="Java" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Python-A9A9A9?logo=Python&logoColor=3776AB" alt="Python" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android-C0C0C0?logo=Android&logoColor=3DDC84" alt="Android" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Go-DCDCDC?logo=Go&logoColor=00ADD8" alt="Go" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GraphQL-FFF?logo=GraphQL&logoColor=E10098" alt="GraphQL" style="display: inline-block;" />&nbsp;
</p>

#### 前端技术栈

<p>
  <img src="https://img.shields.io/badge/-Vue3-C0C0C0?logo=Vue.js&logoColor=4FC08D" alt="Vue3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-TypeScript-C0C0C0?logo=TypeScript&logoColor=3178C6" alt="TypeScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ant%20Design-C0C0C0?logo=Ant-Design&logoColor=0170FE" alt="Ant Design" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Node.js-D3D3D3?logo=Node.js&logoColor=339933" alt="Node.js" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Vite-D3D3D3?logo=Vite&logoColor=646CFF" alt="Vite" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Webpack-D3D3D3?logo=Webpack&logoColor=8DD6F9" alt="Webpack" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-NPM-C0C0C0?logo=npm&logoColor=CB3837" alt="NPM" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Axios-C0C0C0?logo=Axios&logoColor=5A29E4" alt="Axios" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-C0C0C0?logo=ESLint&logoColor=4B32C3" alt="ESLint" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-jQuery-0769AD?logo=jQuery&logoColor=FFF" alt="jQuery" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Bootstrap-7952B3?logo=Bootstrap&logoColor=FFF" alt="BootStrap" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ECharts-C0C0C0?logo=Apache-ECharts&logoColor=AA344D" alt="ECharts" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JavaScript-A9A9A9?logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-HTML5-A9A9A9?logo=HTML5&logoColor=E34F26" alt="HTML5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CSS3-A9A9A9?logo=CSS3&logoColor=1572B6" alt="CSS3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tailwind%20CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4" alt="Tailwind CSS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Less-D3D3D3?logo=Less&logoColor=1D365D" alt="Less" style="display: inline-block;" />&nbsp;
</p>

#### DevOps

<p>
  <img src="https://img.shields.io/badge/-Git-F05032?logo=Git&logoColor=FFF" alt="Git" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub-181717?logo=GitHub&logoColor=FFF" alt="GitHub" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gitee-C71D23?logo=Gitee&logoColor=FFF" alt="Gitee" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitLab-FC6D26?logo=GitLab&logoColor=FFF" alt="gitlab" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Actions-2088FF?logo=GitHub-Actions&logoColor=FFF" alt="GitHub Actions" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Jenkins-D24939?logo=Jenkins&logoColor=000" alt="Jenkins" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-SonarQube-A9A9A9?logo=SonarQube&logoColor=4E9BCD" alt="SonarQube" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Docker-2496ED?logo=Docker&logoColor=FFF" alt="Docker" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Harbor-FFF?logo=Harbor&logoColor=60B932" alt="Harbor" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kubernetes-326CE5?logo=Kubernetes&logoColor=FFF" alt="Kubernetes" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CentOS-262577?logo=CentOS&logoColor=FFF" alt="CentOS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ubuntu-E95420?logo=Ubuntu&logoColor=FFF" alt="Ubuntu" style="display: inline-block;" />&nbsp;
</p>

#### 运维技术栈

<p>
  <img src="https://img.shields.io/badge/-阿里云-FF6A00?logo=Alibaba-Cloud&logoColor=FFF" alt="阿里云" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Nginx-009639?logo=Nginx&logoColor=FFF" alt="Nginx" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VMware-607078?logo=VMware&logoColor=FFF" alt="VMware" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Prometheus-C0C0C0?logo=Prometheus&logoColor=E6522C" alt="Prometheus" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Grafana-DCDCDC?logo=Grafana&logoColor=F46800" alt="Grafana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ansible-FFF?logo=Ansible&logoColor=EE0000" alt="Ansible" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Lua-FFF?&logo=Lua&logoColor=2C2D72" alt="Lua" style="display: inline-block;" />&nbsp;
</p>

#### 测试技术栈

<p>
  <img src="https://img.shields.io/badge/-Postman-FF6C37?logo=Postman&logoColor=FFF" alt="Postman" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JMeter-D3D3D3?logo=Apache-JMeter&logoColor=D22128" alt="JMeter" style="display: inline-block;" />&nbsp;
</p>

#### 开发工具

<p>
  <img src="https://img.shields.io/badge/-Intellij%20IDEA-000?logo=Intellij-IDEA&logoColor=FFF" alt="Intellij IDEA" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Eclipse-2C2255?logo=Eclipse&logoColor=FFF" alt="Eclipse" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WebStorm-000?logo=WebStorm&logoColor=FFF" alt="WebStorm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PyCharm-C0C0C0?logo=PyCharm&logoColor=000" alt="PyCharm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android%20Studio-C0C0C0?logo=Android-Studio&logoColor=3DDC84" alt="Android Studio" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VSCode-C0C0C0?logo=Visual-Studio-Code&logoColor=007ACC" alt="VSCode" style="display: inline-block;" />&nbsp;
</p>

#### 其他

<p>
  <img src="https://img.shields.io/badge/-Markdown-000?logo=Markdown&logoColor=FFF" alt="Markdown" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WordPress-21759B?logo=WordPress&logoColor=FFF" alt="WordPress" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Pages-222?logo=GitHub-Pages&logoColor=FFF" alt="GitHub Pages" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Adobe%20Photoshop-A9A9A9?logo=Adobe-Photoshop&logoColor=31A8FF" alt="Adobe Photoshop" style="display: inline-block;" />&nbsp;
</p>
```
:::



效果：

#### 后端技术栈

<p>
  <img src="https://img.shields.io/badge/-Spring-6DB33F?logo=Spring&logoColor=FFF" alt="Spring" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=Spring-Boot&logoColor=FFF" alt="Spring Boot" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MySQL-4479A1?logo=MySQL&logoColor=FFF" alt="MySQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MariaDB-A9A9A9?logo=MariaDB&logoColor=003545" alt="MariaDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PostgreSQL-C0C0C0?logo=PostgreSQL&logoColor=4169E1" alt="PostgreSQL" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Oracle-C0C0C0?logo=Oracle&logoColor=F80000" alt="Oracle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Microsoft%20SQL%20Server-D3D3D3?logo=Microsoft-SQL-Server&logoColor=CC2927" alt="Microsoft SQL Server" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Redis-DC382D?logo=Redis&logoColor=FFF" alt="Redis" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-MongoDB-47A248?logo=MongoDB&logoColor=FFF" alt="MongoDB" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-RabbitMQ-FF6600?logo=RabbitMQ&logoColor=FFF" alt="RabbitMQ" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Solr-D9411E?logo=Apache-Solr&logoColor=FFF" alt="Solr" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ElasticSearch-005571?logo=ElasticSearch&logoColor=FFF" alt="ElasticSearch" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Logstash-A9A9A9?logo=Logstash&logoColor=005571" alt="Logstash" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kibana-A9A9A9?logo=Kibana&logoColor=005571" alt="Kibana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kafka-C0C0C0?logo=Apache-Kafka&logoColor=231F20" alt="Kafka" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Consul-F24C53?logo=Consul&logoColor=FFF" alt="Consul" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tomcat-F8DC75?logo=Apache-Tomcat&logoColor=000" alt="Tomcat" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JUnit5-25A162?logo=JUnit5&logoColor=FFF" alt="JUnit5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Liquibase-2962FF?logo=Liquibase&logoColor=FFF" alt="Liquibase" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Maven-C71A36?logo=Apache-Maven&logoColor=FFF" alt="Maven" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gradle-D3D3D3?logo=Gradle&logoColor=02303A" alt="Gradle" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Spring%20Security-6DB33F?logo=Spring-Security&logoColor=FFF" alt="Spring Security" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Hibernate-59666C?logo=Hibernate&logoColor=FFF" alt="Hibernate" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JSON-000?logo=JSON&logoColor=FFF" alt="JSON" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JWT-000?logo=JSON-Web-Tokens&logoColor=FFF" alt="JWT" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Java-F78C40?logo=OpenJDK&logoColor=FFF" alt="Java" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Python-A9A9A9?logo=Python&logoColor=3776AB" alt="Python" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android-C0C0C0?logo=Android&logoColor=3DDC84" alt="Android" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Go-DCDCDC?logo=Go&logoColor=00ADD8" alt="Go" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GraphQL-FFF?logo=GraphQL&logoColor=E10098" alt="GraphQL" style="display: inline-block;" />&nbsp;
</p>

#### 前端技术栈

<p>
  <img src="https://img.shields.io/badge/-Vue3-C0C0C0?logo=Vue.js&logoColor=4FC08D" alt="Vue3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-TypeScript-C0C0C0?logo=TypeScript&logoColor=3178C6" alt="TypeScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ant%20Design-C0C0C0?logo=Ant-Design&logoColor=0170FE" alt="Ant Design" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Node.js-D3D3D3?logo=Node.js&logoColor=339933" alt="Node.js" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Vite-D3D3D3?logo=Vite&logoColor=646CFF" alt="Vite" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Webpack-D3D3D3?logo=Webpack&logoColor=8DD6F9" alt="Webpack" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-NPM-C0C0C0?logo=npm&logoColor=CB3837" alt="NPM" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Axios-C0C0C0?logo=Axios&logoColor=5A29E4" alt="Axios" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ESLint-C0C0C0?logo=ESLint&logoColor=4B32C3" alt="ESLint" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-jQuery-0769AD?logo=jQuery&logoColor=FFF" alt="jQuery" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Bootstrap-7952B3?logo=Bootstrap&logoColor=FFF" alt="BootStrap" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-ECharts-C0C0C0?logo=Apache-ECharts&logoColor=AA344D" alt="ECharts" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JavaScript-A9A9A9?logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-HTML5-A9A9A9?logo=HTML5&logoColor=E34F26" alt="HTML5" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CSS3-A9A9A9?logo=CSS3&logoColor=1572B6" alt="CSS3" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Tailwind%20CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4" alt="Tailwind CSS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Less-D3D3D3?logo=Less&logoColor=1D365D" alt="Less" style="display: inline-block;" />&nbsp;
</p>

#### DevOps

<p>
  <img src="https://img.shields.io/badge/-Git-F05032?logo=Git&logoColor=FFF" alt="Git" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub-181717?logo=GitHub&logoColor=FFF" alt="GitHub" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Gitee-C71D23?logo=Gitee&logoColor=FFF" alt="Gitee" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitLab-FC6D26?logo=GitLab&logoColor=FFF" alt="gitlab" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Actions-2088FF?logo=GitHub-Actions&logoColor=FFF" alt="GitHub Actions" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Jenkins-D24939?logo=Jenkins&logoColor=000" alt="Jenkins" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-SonarQube-A9A9A9?logo=SonarQube&logoColor=4E9BCD" alt="SonarQube" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Docker-2496ED?logo=Docker&logoColor=FFF" alt="Docker" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Harbor-FFF?logo=Harbor&logoColor=60B932" alt="Harbor" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Kubernetes-326CE5?logo=Kubernetes&logoColor=FFF" alt="Kubernetes" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-CentOS-262577?logo=CentOS&logoColor=FFF" alt="CentOS" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ubuntu-E95420?logo=Ubuntu&logoColor=FFF" alt="Ubuntu" style="display: inline-block;" />&nbsp;
</p>

#### 运维技术栈

<p>
  <img src="https://img.shields.io/badge/-阿里云-FF6A00?logo=Alibaba-Cloud&logoColor=FFF" alt="阿里云" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Nginx-009639?logo=Nginx&logoColor=FFF" alt="Nginx" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VMware-607078?logo=VMware&logoColor=FFF" alt="VMware" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Prometheus-C0C0C0?logo=Prometheus&logoColor=E6522C" alt="Prometheus" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Grafana-DCDCDC?logo=Grafana&logoColor=F46800" alt="Grafana" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Ansible-FFF?logo=Ansible&logoColor=EE0000" alt="Ansible" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Lua-FFF?&logo=Lua&logoColor=2C2D72" alt="Lua" style="display: inline-block;" />&nbsp;
</p>

#### 测试技术栈

<p>
  <img src="https://img.shields.io/badge/-Postman-FF6C37?logo=Postman&logoColor=FFF" alt="Postman" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-JMeter-D3D3D3?logo=Apache-JMeter&logoColor=D22128" alt="JMeter" style="display: inline-block;" />&nbsp;
</p>

#### 开发工具

<p>
  <img src="https://img.shields.io/badge/-Intellij%20IDEA-000?logo=Intellij-IDEA&logoColor=FFF" alt="Intellij IDEA" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Eclipse-2C2255?logo=Eclipse&logoColor=FFF" alt="Eclipse" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WebStorm-000?logo=WebStorm&logoColor=FFF" alt="WebStorm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-PyCharm-C0C0C0?logo=PyCharm&logoColor=000" alt="PyCharm" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Android%20Studio-C0C0C0?logo=Android-Studio&logoColor=3DDC84" alt="Android Studio" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-VSCode-C0C0C0?logo=Visual-Studio-Code&logoColor=007ACC" alt="VSCode" style="display: inline-block;" />&nbsp;
</p>

#### 其他

<p>
  <img src="https://img.shields.io/badge/-Markdown-000?logo=Markdown&logoColor=FFF" alt="Markdown" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-WordPress-21759B?logo=WordPress&logoColor=FFF" alt="WordPress" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-GitHub%20Pages-222?logo=GitHub-Pages&logoColor=FFF" alt="GitHub Pages" style="display: inline-block;" />&nbsp;
  <img src="https://img.shields.io/badge/-Adobe%20Photoshop-A9A9A9?logo=Adobe-Photoshop&logoColor=31A8FF" alt="Adobe Photoshop" style="display: inline-block;" />&nbsp;
</p>



## Github美化

个人介绍页面，如何高大上

新建一个 `自己的账户名` 的仓库，然后参照下面的教程

https://github.com/vn7n24fzkq/github-profile-summary-cards

https://github.com/star-history/star-history

https://github.com/anuraghazra/github-readme-stats