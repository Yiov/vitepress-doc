# 样式美化


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


### 彩虹背景动画

在 [UnoCSS](https://unocss.dev/) 首页中，它的hero标题和图片背景有类似彩虹的渐变色动画，其实也是通过修改css样式实现的

在 `theme/style` 新建 `rainbow.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ rainbow.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `rainbow.css` 中


::: details 点我查看代码

```css [rainbow.css]
/* 彩虹动画 */
@keyframes rainbow {
    0% {
        --rainbow-prev: #009ff7;
        --rainbow-next: #c76dd1;
    }

    1.25% {
        --rainbow-prev: #009dfa;
        --rainbow-next: #cf69c9;
    }

    2.5% {
        --rainbow-prev: #009bfc;
        --rainbow-next: #d566c2;
    }

    3.75% {
        --rainbow-prev: #0098fd;
        --rainbow-next: #dc63ba;
    }

    5% {
        --rainbow-prev: #0096fd;
        --rainbow-next: #e160b3;
    }

    6.25% {
        --rainbow-prev: #0093fd;
        --rainbow-next: #e65eab;
    }

    7.5% {
        --rainbow-prev: #2e90fc;
        --rainbow-next: #e95ca2;
    }

    8.75% {
        --rainbow-prev: #4d8dfa;
        --rainbow-next: #ed5a9a;
    }

    10% {
        --rainbow-prev: #638af8;
        --rainbow-next: #ef5992;
    }

    11.25% {
        --rainbow-prev: #7587f5;
        --rainbow-next: #f15989;
    }

    12.5% {
        --rainbow-prev: #8583f1;
        --rainbow-next: #f25981;
    }

    13.75% {
        --rainbow-prev: #9280ed;
        --rainbow-next: #f25a79;
    }

    15% {
        --rainbow-prev: #9f7ce9;
        --rainbow-next: #f25c71;
    }

    16.25% {
        --rainbow-prev: #aa78e3;
        --rainbow-next: #f15e69;
    }

    17.5% {
        --rainbow-prev: #b574dd;
        --rainbow-next: #ef6061;
    }

    18.75% {
        --rainbow-prev: #be71d7;
        --rainbow-next: #ed635a;
    }

    20% {
        --rainbow-prev: #c76dd1;
        --rainbow-next: #eb6552;
    }

    21.25% {
        --rainbow-prev: #cf69c9;
        --rainbow-next: #e8694b;
    }

    22.5% {
        --rainbow-prev: #d566c2;
        --rainbow-next: #e46c44;
    }

    23.75% {
        --rainbow-prev: #dc63ba;
        --rainbow-next: #e06f3d;
    }

    25% {
        --rainbow-prev: #e160b3;
        --rainbow-next: #db7336;
    }

    26.25% {
        --rainbow-prev: #e65eab;
        --rainbow-next: #d77630;
    }

    27.5% {
        --rainbow-prev: #e95ca2;
        --rainbow-next: #d17a2a;
    }

    28.75% {
        --rainbow-prev: #ed5a9a;
        --rainbow-next: #cc7d24;
    }

    30% {
        --rainbow-prev: #ef5992;
        --rainbow-next: #c6811e;
    }

    31.25% {
        --rainbow-prev: #f15989;
        --rainbow-next: #bf8418;
    }

    32.5% {
        --rainbow-prev: #f25981;
        --rainbow-next: #b98713;
    }

    33.75% {
        --rainbow-prev: #f25a79;
        --rainbow-next: #b28a0f;
    }

    35% {
        --rainbow-prev: #f25c71;
        --rainbow-next: #ab8d0c;
    }

    36.25% {
        --rainbow-prev: #f15e69;
        --rainbow-next: #a3900b;
    }

    37.5% {
        --rainbow-prev: #ef6061;
        --rainbow-next: #9c920d;
    }

    38.75% {
        --rainbow-prev: #ed635a;
        --rainbow-next: #949510;
    }

    40% {
        --rainbow-prev: #eb6552;
        --rainbow-next: #8b9715;
    }

    41.25% {
        --rainbow-prev: #e8694b;
        --rainbow-next: #83991b;
    }

    42.5% {
        --rainbow-prev: #e46c44;
        --rainbow-next: #7a9b21;
    }

    43.75% {
        --rainbow-prev: #e06f3d;
        --rainbow-next: #719d27;
    }

    45% {
        --rainbow-prev: #db7336;
        --rainbow-next: #679e2e;
    }

    46.25% {
        --rainbow-prev: #d77630;
        --rainbow-next: #5da035;
    }

    47.5% {
        --rainbow-prev: #d17a2a;
        --rainbow-next: #51a13c;
    }

    48.75% {
        --rainbow-prev: #cc7d24;
        --rainbow-next: #44a244;
    }

    50% {
        --rainbow-prev: #c6811e;
        --rainbow-next: #34a44b;
    }

    51.25% {
        --rainbow-prev: #bf8418;
        --rainbow-next: #1ba553;
    }

    52.5% {
        --rainbow-prev: #b98713;
        --rainbow-next: #00a65b;
    }

    53.75% {
        --rainbow-prev: #b28a0f;
        --rainbow-next: #00a663;
    }

    55% {
        --rainbow-prev: #ab8d0c;
        --rainbow-next: #00a76c;
    }

    56.25% {
        --rainbow-prev: #a3900b;
        --rainbow-next: #00a874;
    }

    57.5% {
        --rainbow-prev: #9c920d;
        --rainbow-next: #00a87d;
    }

    58.75% {
        --rainbow-prev: #949510;
        --rainbow-next: #00a985;
    }

    60% {
        --rainbow-prev: #8b9715;
        --rainbow-next: #00a98e;
    }

    61.25% {
        --rainbow-prev: #83991b;
        --rainbow-next: #00a996;
    }

    62.5% {
        --rainbow-prev: #7a9b21;
        --rainbow-next: #00a99f;
    }

    63.75% {
        --rainbow-prev: #719d27;
        --rainbow-next: #00a9a7;
    }

    65% {
        --rainbow-prev: #679e2e;
        --rainbow-next: #00a9b0;
    }

    66.25% {
        --rainbow-prev: #5da035;
        --rainbow-next: #00a9b8;
    }

    67.5% {
        --rainbow-prev: #51a13c;
        --rainbow-next: #00a9c0;
    }

    68.75% {
        --rainbow-prev: #44a244;
        --rainbow-next: #00a8c7;
    }

    70% {
        --rainbow-prev: #34a44b;
        --rainbow-next: #00a8cf;
    }

    71.25% {
        --rainbow-prev: #1ba553;
        --rainbow-next: #00a7d5;
    }

    72.5% {
        --rainbow-prev: #00a65b;
        --rainbow-next: #00a6dc;
    }

    73.75% {
        --rainbow-prev: #00a663;
        --rainbow-next: #00a6e2;
    }

    75% {
        --rainbow-prev: #00a76c;
        --rainbow-next: #00a4e7;
    }

    76.25% {
        --rainbow-prev: #00a874;
        --rainbow-next: #00a3ec;
    }

    77.5% {
        --rainbow-prev: #00a87d;
        --rainbow-next: #00a2f1;
    }

    78.75% {
        --rainbow-prev: #00a985;
        --rainbow-next: #00a0f4;
    }

    80% {
        --rainbow-prev: #00a98e;
        --rainbow-next: #009ff7;
    }

    81.25% {
        --rainbow-prev: #00a996;
        --rainbow-next: #009dfa;
    }

    82.5% {
        --rainbow-prev: #00a99f;
        --rainbow-next: #009bfc;
    }

    83.75% {
        --rainbow-prev: #00a9a7;
        --rainbow-next: #0098fd;
    }

    85% {
        --rainbow-prev: #00a9b0;
        --rainbow-next: #0096fd;
    }

    86.25% {
        --rainbow-prev: #00a9b8;
        --rainbow-next: #0093fd;
    }

    87.5% {
        --rainbow-prev: #00a9c0;
        --rainbow-next: #2e90fc;
    }

    88.75% {
        --rainbow-prev: #00a8c7;
        --rainbow-next: #4d8dfa;
    }

    90% {
        --rainbow-prev: #00a8cf;
        --rainbow-next: #638af8;
    }

    91.25% {
        --rainbow-prev: #00a7d5;
        --rainbow-next: #7587f5;
    }

    92.5% {
        --rainbow-prev: #00a6dc;
        --rainbow-next: #8583f1;
    }

    93.75% {
        --rainbow-prev: #00a6e2;
        --rainbow-next: #9280ed;
    }

    95% {
        --rainbow-prev: #00a4e7;
        --rainbow-next: #9f7ce9;
    }

    96.25% {
        --rainbow-prev: #00a3ec;
        --rainbow-next: #aa78e3;
    }

    97.5% {
        --rainbow-prev: #00a2f1;
        --rainbow-next: #b574dd;
    }

    98.75% {
        --rainbow-prev: #00a0f4;
        --rainbow-next: #be71d7;
    }

    100% {
        --rainbow-prev: #009ff7;
        --rainbow-next: #c76dd1;
    }
}

/* 彩虹色卡 */
:root,.dark {
    --rainbow-prev: #009ff7;
    --rainbow-next: #c76dd1;
    animation: rainbow 8s linear infinite;
}



:root {
    /* hero标题渐变色 */
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, var(--rainbow-prev) 30%, var(--rainbow-next));

    /*hero logo背景渐变色 */
    --vp-home-hero-image-background-image: linear-gradient(-45deg, var(--rainbow-prev) 30%, var(--rainbow-next));
    --vp-home-hero-image-filter: blur(80px);
}


@media (min-width: 640px) {
    :root {
        --vp-home-hero-image-filter: blur(120px);
    }
}

@media (min-width: 960px) {
    :root {
        --vp-home-hero-image-filter: blur(120px);
    }
}

/* Safari has a very bad performance on gradient and filter */
.browser-safari,
.browser-firefox {
    --vp-home-hero-image-background-image: transparent;
    --vp-home-hero-image-filter: '';
}
```
:::


然后在 `index.css` 中引入生效，回到主页看效果

::: details 为什么我的没效果？
- 自身问题：请仔细检查代码颜色色卡，是否正确配置

- 电脑问题：我的电脑 - 右键 `属性` - `高级系统设置` - 在系统属性页卡中 `高级` - 性能 `设置`，默认为 调整为最佳外观，将 `窗口内的动画控件和元素` 打勾，确定（如果电脑字体变化，请调整为其他，只要确保勾选此项即可）
:::

```css
/* .vitepress/theme/style/index.css */
@import './rainbow.css';
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


### 容器颜色

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
│  │        └─ custom-block.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `custom-block.css` 中

::: code-group

```css [custom-block.css]
/* .vitepress/theme/style/custom-block.css */
/* 深浅色卡 */
:root {
    --custom-block-info-left: #cccccc;
    --custom-block-info-bg: #fafafa;

    --custom-block-tip-left: #009400;
    --custom-block-tip-bg: #e6f6e6;

    --custom-block-warning-left: #e6a700;
    --custom-block-warning-bg: #fff8e6;

    --custom-block-danger-left: #e13238;
    --custom-block-danger-bg: #ffebec;

    --custom-block-note-left: #4cb3d4;
    --custom-block-note-bg: #eef9fd;

    --custom-block-important-left: #a371f7;
    --custom-block-important-bg: #f4eefe;

    --custom-block-caution-left: #e0575b;
    --custom-block-caution-bg: #fde4e8;
}

.dark {
    --custom-block-info-left: #cccccc;
    --custom-block-info-bg: #474748;

    --custom-block-tip-left: #009400;
    --custom-block-tip-bg: #003100;

    --custom-block-warning-left: #e6a700;
    --custom-block-warning-bg: #4d3800;

    --custom-block-danger-left: #e13238;
    --custom-block-danger-bg: #4b1113;

    --custom-block-note-left: #4cb3d4;
    --custom-block-note-bg: #193c47;

    --custom-block-important-left: #a371f7;
    --custom-block-important-bg: #230555;

    --custom-block-caution-left: #e0575b;
    --custom-block-caution-bg: #391c22;
}


/* 标题字体大小 */
.custom-block-title {
    font-size: 16px;
}

/* info容器:背景色、左侧 */
.custom-block.info {
    border-left: 5px solid var(--custom-block-info-left);
    background-color: var(--custom-block-info-bg);
}

/* info容器:svg图 */
.custom-block.info [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z' fill='%23ccc'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* 提示容器:边框色、背景色、左侧 */
.custom-block.tip {
    /* border-color: var(--custom-block-tip); */ 
    border-left: 5px solid var(--custom-block-tip-left);
    background-color: var(--custom-block-tip-bg);
}

/* 提示容器:svg图 */
.custom-block.tip [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23009400' d='M7.941 18c-.297-1.273-1.637-2.314-2.187-3a8 8 0 1 1 12.49.002c-.55.685-1.888 1.726-2.185 2.998H7.94zM16 20v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1h8zm-3-9.995V6l-4.5 6.005H11v4l4.5-6H13z'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -2px;
}

/* 警告容器:背景色、左侧 */
.custom-block.warning {
    border-left: 5px solid var(--custom-block-warning-left);
    background-color: var(--custom-block-warning-bg);
}

/* 警告容器:svg图 */
.custom-block.warning [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M576.286 752.57v-95.425q0-7.031-4.771-11.802t-11.3-4.772h-96.43q-6.528 0-11.3 4.772t-4.77 11.802v95.424q0 7.031 4.77 11.803t11.3 4.77h96.43q6.528 0 11.3-4.77t4.77-11.803zm-1.005-187.836 9.04-230.524q0-6.027-5.022-9.543-6.529-5.524-12.053-5.524H456.754q-5.524 0-12.053 5.524-5.022 3.516-5.022 10.547l8.538 229.52q0 5.023 5.022 8.287t12.053 3.265h92.913q7.032 0 11.803-3.265t5.273-8.287zM568.25 95.65l385.714 707.142q17.578 31.641-1.004 63.282-8.538 14.564-23.354 23.102t-31.892 8.538H126.286q-17.076 0-31.892-8.538T71.04 866.074q-18.582-31.641-1.004-63.282L455.75 95.65q8.538-15.57 23.605-24.61T512 62t32.645 9.04 23.605 24.61z' fill='%23e6a700'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
}

/* 危险容器:背景色、左侧 */
.custom-block.danger {
    border-left: 5px solid var(--custom-block-danger-left);
    background-color: var(--custom-block-danger-bg);
}

/* 危险容器:svg图 */
.custom-block.danger [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c5.523 0 10 4.477 10 10v3.764a2 2 0 0 1-1.106 1.789L18 19v1a3 3 0 0 1-2.824 2.995L14.95 23a2.5 2.5 0 0 0 .044-.33L15 22.5V22a2 2 0 0 0-1.85-1.995L13 20h-2a2 2 0 0 0-1.995 1.85L9 22v.5c0 .171.017.339.05.5H9a3 3 0 0 1-3-3v-1l-2.894-1.447A2 2 0 0 1 2 15.763V12C2 6.477 6.477 2 12 2zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' fill='%23e13238'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* NOTE容器:背景色、左侧 */
.custom-block.note {
    border-left: 5px solid var(--custom-block-note-left);
    background-color: var(--custom-block-note-bg);
}

/* NOTE容器:svg图 */
.custom-block.note [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z' fill='%234cb3d4'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* IMPORTANT容器:背景色、左侧 */
.custom-block.important {
    border-left: 5px solid var(--custom-block-important-left);
    background-color: var(--custom-block-important-bg);
}

/* IMPORTANT容器:svg图 */
.custom-block.important [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M512 981.333a84.992 84.992 0 0 1-84.907-84.906h169.814A84.992 84.992 0 0 1 512 981.333zm384-128H128v-42.666l85.333-85.334v-256A298.325 298.325 0 0 1 448 177.92V128a64 64 0 0 1 128 0v49.92a298.325 298.325 0 0 1 234.667 291.413v256L896 810.667v42.666zm-426.667-256v85.334h85.334v-85.334h-85.334zm0-256V512h85.334V341.333h-85.334z' fill='%23a371f7'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* CAUTION容器:背景色、左侧 */
.custom-block.caution {
    border-left: 5px solid var(--custom-block-caution-left);
    background-color: var(--custom-block-caution-bg);
}

/* CAUTION容器:svg图 */
.custom-block.caution [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c5.523 0 10 4.477 10 10v3.764a2 2 0 0 1-1.106 1.789L18 19v1a3 3 0 0 1-2.824 2.995L14.95 23a2.5 2.5 0 0 0 .044-.33L15 22.5V22a2 2 0 0 0-1.85-1.995L13 20h-2a2 2 0 0 0-1.995 1.85L9 22v.5c0 .171.017.339.05.5H9a3 3 0 0 1-3-3v-1l-2.894-1.447A2 2 0 0 1 2 15.763V12C2 6.477 6.477 2 12 2zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' fill='%23e13238'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}
```
:::


看看效果

::: info 注释
注释是灰色
:::

::: tip 提示
提示是绿色
:::


::: warning 警告
警告是橘色
:::

::: danger 危险
危险是红色
:::

如果想更花里胡哨的，可以加一个流体边框，类似跑马灯的效果

::: details 点我查看代码，感谢 [@Aurorxa](https://github.com/Aurorxa) 提供

```css [custom-block.css (复制，粘贴，覆盖原先的代码保存)]
/* .vitepress/theme/style/custom-block.css */
/* 深浅色卡 */
:root {
  --custom-block-info-left: #cccccc;
  --custom-block-info-bg: #fafafa;

  --custom-block-tip-left: #009400;
  --custom-block-tip-bg: #e6f6e6;

  --custom-block-warning-left: #e6a700;
  --custom-block-warning-bg: #fff8e6;

  --custom-block-danger-left: #e13238;
  --custom-block-danger-bg: #ffebec;

  --custom-block-note-left: #4cb3d4;
  --custom-block-note-bg: #eef9fd;

  --custom-block-important-left: #a371f7;
  --custom-block-important-bg: #f4eefe;

  --custom-block-caution-left: #e0575b;
  --custom-block-caution-bg: #fde4e8;
}

.dark {
  --custom-block-info-left: #cccccc;
  --custom-block-info-bg: #474748;

  --custom-block-tip-left: #009400;
  --custom-block-tip-bg: #003100;

  --custom-block-warning-left: #e6a700;
  --custom-block-warning-bg: #4d3800;

  --custom-block-danger-left: #e13238;
  --custom-block-danger-bg: #4b1113;

  --custom-block-note-left: #4cb3d4;
  --custom-block-note-bg: #193c47;

  --custom-block-important-left: #a371f7;
  --custom-block-important-bg: #230555;

  --custom-block-caution-left: #e0575b;
  --custom-block-caution-bg: #391c22;
}


/* 标题字体大小 */
.custom-block-title {
  font-size: 16px;
}

/* info容器:背景色、流体边框 */
.custom-block.info {
  border-left: none;
  background-color: var(--custom-block-info-bg);
  position: relative;
  transition: all .3s;
}

/* info容器:svg图 */
.custom-block.info [class*="custom-block-title"]::before {
  content: '';
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z' fill='%23ccc'/%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 4px;
  left: -5px;
  top: -1px;
}

/* info容器:流体边框 */
.custom-block.info::before,
.custom-block.info::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--custom-block-info-left);
  transition: all .5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

/* info容器:流体边框动画 */
.custom-block.info::after {
  animation: clippath 6s infinite -3s linear;
}




/* TIP容器::背景色、流体边框 */
.custom-block.tip {
  border-left: none;
  background-color: var(--custom-block-tip-bg);
  position: relative;
  transition: all .3s;
}

/* TIP容器:svg图 */
.custom-block.tip [class*="custom-block-title"]::before {
  content: '';
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23009400' d='M7.941 18c-.297-1.273-1.637-2.314-2.187-3a8 8 0 1 1 12.49.002c-.55.685-1.888 1.726-2.185 2.998H7.94zM16 20v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1h8zm-3-9.995V6l-4.5 6.005H11v4l4.5-6H13z'/%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 4px;
  left: -5px;
  top: -2px;
}

/* TIP容器:流体边框 */
.custom-block.tip::before,
.custom-block.tip::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--custom-block-tip-left);
  transition: all .5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

/* TIP容器:流体边框动画 */
.custom-block.tip::after {
  animation: clippath 6s infinite -3s linear;
}




/* WARNING:背景色、流体边框 */
.custom-block.warning {
  border-left: none;
  background-color: var(--custom-block-warning-bg);
  position: relative;
  transition: all .3s;
}

/* WARNING:svg图 */
.custom-block.warning [class*="custom-block-title"]::before {
  content: '';
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M576.286 752.57v-95.425q0-7.031-4.771-11.802t-11.3-4.772h-96.43q-6.528 0-11.3 4.772t-4.77 11.802v95.424q0 7.031 4.77 11.803t11.3 4.77h96.43q6.528 0 11.3-4.77t4.77-11.803zm-1.005-187.836 9.04-230.524q0-6.027-5.022-9.543-6.529-5.524-12.053-5.524H456.754q-5.524 0-12.053 5.524-5.022 3.516-5.022 10.547l8.538 229.52q0 5.023 5.022 8.287t12.053 3.265h92.913q7.032 0 11.803-3.265t5.273-8.287zM568.25 95.65l385.714 707.142q17.578 31.641-1.004 63.282-8.538 14.564-23.354 23.102t-31.892 8.538H126.286q-17.076 0-31.892-8.538T71.04 866.074q-18.582-31.641-1.004-63.282L455.75 95.65q8.538-15.57 23.605-24.61T512 62t32.645 9.04 23.605 24.61z' fill='%23e6a700'/%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 4px;
  left: -5px;
}

/* WARNING容器:流体边框 */
.custom-block.warning::before,
.custom-block.warning::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--custom-block-warning-left);
  transition: all .5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

/* WARNING容器:流体边框动画 */
.custom-block.warning::after {
  animation: clippath 6s infinite -3s linear;
}




/* DANGER容器:背景色、流体边框 */
.custom-block.danger {
  border-left: none;
  background-color: var(--custom-block-danger-bg);
  position: relative;
  transition: all .3s;
}

/* DANGER容器:svg图 */
.custom-block.danger [class*="custom-block-title"]::before {
  content: '';
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c5.523 0 10 4.477 10 10v3.764a2 2 0 0 1-1.106 1.789L18 19v1a3 3 0 0 1-2.824 2.995L14.95 23a2.5 2.5 0 0 0 .044-.33L15 22.5V22a2 2 0 0 0-1.85-1.995L13 20h-2a2 2 0 0 0-1.995 1.85L9 22v.5c0 .171.017.339.05.5H9a3 3 0 0 1-3-3v-1l-2.894-1.447A2 2 0 0 1 2 15.763V12C2 6.477 6.477 2 12 2zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' fill='%23e13238'/%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 4px;
  left: -5px;
  top: -1px;
}


/* DANGER容器:流体边框 */
.custom-block.danger::before,
.custom-block.danger::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--custom-block-danger-left);
  transition: all .5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

/* DANGER容器:流体边框动画 */
.custom-block.danger::after {
  animation: clippath 6s infinite -3s linear;
}








/* GitHub风格警告 */



/* NOTE容器:背景色、流体边框 */
.custom-block.note {
  border-left: none;
  background-color: var(--custom-block-note-bg);
  position: relative;
  transition: all .3s;
}

/* NOTE容器:svg图 */
.custom-block.note [class*="custom-block-title"]::before {
  content: '';
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z' fill='%234cb3d4'/%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 4px;
  left: -5px;
  top: -1px;
}

/* NOTE容器:流体边框 */
.custom-block.note.github-alert::before,
.custom-block.note.github-alert::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--custom-block-note-left);
  transition: all .5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

/* NOTE容器:流体边框动画 */
.custom-block.note.github-alert::after {
  animation: clippath 6s infinite -3s linear;
}




/* IMPORTANT容器:背景色、流体边框 */
.custom-block.important {
  border-left: none;
  background-color: var(--custom-block-important-bg);
  position: relative;
  transition: all .3s;
}

/* IMPORTANT容器:svg图 */
.custom-block.important [class*="custom-block-title"]::before {
  content: '';
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M512 981.333a84.992 84.992 0 0 1-84.907-84.906h169.814A84.992 84.992 0 0 1 512 981.333zm384-128H128v-42.666l85.333-85.334v-256A298.325 298.325 0 0 1 448 177.92V128a64 64 0 0 1 128 0v49.92a298.325 298.325 0 0 1 234.667 291.413v256L896 810.667v42.666zm-426.667-256v85.334h85.334v-85.334h-85.334zm0-256V512h85.334V341.333h-85.334z' fill='%23a371f7'/%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 4px;
  left: -5px;
  top: -1px;
}


/* IMPORTANT容器:流体边框 */
.custom-block.important.github-alert::before,
.custom-block.important.github-alert::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--custom-block-important-left);
  transition: all .5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

/* IMPORTANT容器:流体边框动画 */
.custom-block.important.github-alert::after {
  animation: clippath 6s infinite -3s linear;
}




/* CAUTION容器:背景色、流体边框 */
.custom-block.caution {
  border-left: none;
  background-color: var(--custom-block-caution-bg);
  position: relative;
  transition: all .3s;
}

/* CAUTION容器:svg图 */
.custom-block.caution [class*="custom-block-title"]::before {
  content: '';
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c5.523 0 10 4.477 10 10v3.764a2 2 0 0 1-1.106 1.789L18 19v1a3 3 0 0 1-2.824 2.995L14.95 23a2.5 2.5 0 0 0 .044-.33L15 22.5V22a2 2 0 0 0-1.85-1.995L13 20h-2a2 2 0 0 0-1.995 1.85L9 22v.5c0 .171.017.339.05.5H9a3 3 0 0 1-3-3v-1l-2.894-1.447A2 2 0 0 1 2 15.763V12C2 6.477 6.477 2 12 2zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' fill='%23e13238'/%3E%3C/svg%3E");
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-right: 4px;
  left: -5px;
  top: -1px;
}

/* CAUTION容器:流体边框 */
.custom-block.caution.github-alert::before,
.custom-block.caution.github-alert::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--custom-block-caution-left);
  transition: all .5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

/* CAUTION容器:流体边框动画 */
.custom-block.caution.github-alert::after {
  animation: clippath 6s infinite -3s linear;
}



/* 流光边框 - 跑马灯 */

@keyframes clippath {

  0%,
  100% {
    clip-path: inset(0 0 90% 0);
  }

  25% {
    clip-path: inset(0 90% 0 0);
  }

  50% {
    clip-path: inset(90% 0 0 0);
  }

  75% {
    clip-path: inset(0 0 0 90%);
  }
}

```
:::

我们来看看效果

::: details 为什么我的没效果？
- 自身问题：请仔细检查代码颜色色卡，是否正确配置

- 电脑问题：我的电脑 - 右键 `属性` - `高级系统设置` - 在系统属性页卡中 `高级` - 性能 `设置`，默认为 调整为最佳外观，将 `窗口内的动画控件和元素` 打勾，确定（如果电脑字体变化，请调整为其他，只要确保勾选此项即可）
:::

<fluidborder />


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
/* .vitepress\theme\style\blur.css */
:root {

    /* 首页下滑后导航透明 */
    .VPNavBar:not(.has-sidebar):not(.home.top) {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
    }

    /* 搜索框透明 */
    .DocSearch-Button {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
    }

    /* Feature透明 */
    .VPFeature {
        border: none;
        box-shadow: 0 10px 30px 0 rgb(0 0 0 / 15%);
        background-color: transparent;
    }

    /* 文档页侧边栏顶部透明 */
    .curtain {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
    }

    @media (min-width: 960px) {

        /* 文档页导航中间透明 */
        .VPNavBar:not(.home.top) .content-body {
            background-color: rgba(255, 255, 255, 0);
            backdrop-filter: blur(10px);
        }
    }

    /* 移动端大纲栏透明 */
    .VPLocalNav {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(10px);
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



### 隐藏横条

文档中有各种横条，挡着占视野影响美观

在 `theme/style` 文件夹，然后新建 `hidden.css` 并填入如下代码

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ hidden.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `hidden.css` 中，可以自行增减

::: code-group
```css [hidden.css]
/* .vitepress\theme\style\hidden.css */
:root {

    /* 文档页Logo出文字下横条 */
    .VPNavBar.has-sidebar .title {
        width: 0px;
    }

    /* 页脚横条隐藏 */
    .VPFooter {
        border-top: none;
    }

    /* 手机端菜单栏顶部横条隐藏 */
    .VPNavBar.screen-open {
        border-bottom: none;
    }

    /* 手机端菜单栏菜单分割线隐藏 */
    .VPNavScreenMenuLink {
        border-bottom: none;
    }

    /* 手机端菜单组隐藏 */
    .VPNavScreenMenuGroup {
        border-bottom: none;
    }

    /* 手机端大纲栏横条隐藏 */
    .VPLocalNav {
        border-bottom: none;
    }

}


/* 导航栏下划线隐藏 */
.divider {
    display: none;
}
```
:::

最后引入 `index.css` 中 即可看到效果

```css
/* style/index.css */
@import './hidden.css';
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

::: tip SVG图形
* 建议使用 `32*32` 的尺寸

[iconfont](https://www.iconfont.cn/)、[xicons](https://www.xicons.org/#/zh-CN)、[iconpark](https://iconpark.oceanengine.com/official)
:::



::: code-group

```css{6,19} [link.css]
/* .vitepress/theme/style/link.css */

/* YouTube */
.vp-doc a[href^="https://www.youtube.com/"]:before {
    content: '';
    background-image: url(/svg/youtube.svg);
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    background-size: cover;
    margin-right: 4px;
}

/* 哔哩哔哩 */
.vp-doc a[href^="https://www.bilibili.com/"]:before {
    content: '';
    background-image: url(/svg/bilibili.svg);
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    background-size: cover;
    top: -2px;
    margin-right: 4px;
}
```
:::


然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
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





### 记号笔

在某些整段的文字中，我们可以用记号笔，划出重点

在 `theme/style` 新建 `marker.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ marker.css
│  └─ index.md
└─ node_modules
```

将下面代码，复制粘贴到 `marker.css` 中

```css
/* .vitepress/theme/style/marker.css */

/* 记号笔 不喜欢可自行调整 */
.marker-text {
    text-decoration: underline;
    text-decoration-thickness: 9px;
    text-decoration-color: rgba(255, 228, 0, 0.4);
    text-underline-offset: -4px;
    text-decoration-skip-ink: none;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './link.css';
```

输入：

```md
<sapn class="marker-text">这里是重重点</sapn>
```

输出：

<sapn class="marker-text">这里是重重点</sapn>

还可以实现类似荧光笔的效果

```css
/* .vitepress/theme/style/marker.css */

/* 荧光笔 不喜欢可自行调整*/
.marker-text-highlight {
    border-radius: 5px 5px;
    background: transparent;
    color: var(--vp-c-text-soft);
    background: linear-gradient(104deg, rgba(130, 255, 173, 0) 0.9%, rgba(130, 255, 173, 1.25) 2.4%, rgba(130, 255, 173, 0.5) 5.8%, rgba(130, 255, 173, 0.1) 93%, rgba(130, 255, 173, 0.7) 96%, rgba(130, 255, 1732, 0) 98%), linear-gradient(183deg, rgba(130, 255, 173, 0) 0%, rgba(130, 255, 173, 0.3) 7.9%, rgba(130, 255, 173, 0) 15%);
}
```

输入：

```md
<sapn class="marker-text-highlight">这里是荧光笔</sapn>
```

输出：

<sapn class="marker-text-highlight">这里是荧光笔</sapn>


但是这些都不是我心仪的，最后在 [尤大的个人主页](https://evanyou.me/) 还有个 `hover`，真不错

直接扒拉下来，嘿嘿嘿

```css
/* .vitepress/theme/style/marker.css */

/* 尤雨溪 不喜欢可自行调整 */
.marker-evy {
    white-space: nowrap;
    position: relative;
}

.marker-evy:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 66%;
    left: 0em;
    right: 0em;
    bottom: 0;
    transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
    background-color: rgba(79, 192, 141, 0.5);
}

.marker-evy:hover:after {
    top: 0%;
}
```

输入：

```md
<sapn class="marker-evy">这里是尤雨溪的主页样式，鼠标放在我上面看效果</sapn>
```

输出：

<sapn class="marker-evy">这里是尤雨溪的主页样式，鼠标放在我上面看效果</sapn>




---

### 代码块

将代码组改成Mac风格，三个小圆点

在 `.vitepress/theme/style` 目录新建一个 `vp-code.css` 文件


```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ vp-code.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `vp-code.css` 保存

::: tip 说明
本次代码感谢 [@Aurorxa](https://github.com/Aurorxa) 提供，本人在此基础上进行一些修改
:::

::: code-group
```css [vp-code.css]
/* .vitepress/theme/style/vp-code.css */

/* 无行号 添加背景阴影 */
.vp-doc div[class*=language-] {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
  z-index: 1;
}

/* 无行号：添加 macOS 风格的小圆点 */
.vp-doc div[class*=language-]::before {
  content: "";
  display: block;
  position: relative;
  top: 12px;
  left: 12px;
  width: 12px;
  height: 12px;
  background-color: #ff5f56;
  border-radius: 50%;
  box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
  z-index: 1;
}

/* 有行号 添加背景阴影 */
div[class*="language-"].vp-adaptive-theme.line-numbers-mode {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}


/* 有行号：添加 macOS 风格的小圆点 */
.vp-doc div[class*="language-"].line-numbers-mode::before {
  content: "";
  display: block;
  position: relative;
  top: 12px;
  left: -22px;
  width: 12px;
  height: 12px;
  background-color: #ff5f56;
  border-radius: 50%;
  box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
  z-index: 1;
}



/* 下移行号，与代码对齐；隐藏右侧竖线 */
.vp-doc .line-numbers-wrapper {
  padding-top: 32px;
  border-right: none;
}

/* 重新建立行号右侧竖线 */
.vp-doc .line-numbers-wrapper::after {
  content: "";
  position: absolute;
  top: 38px;
  right: 0;
  border-right: 1px solid var(--vp-code-block-divider-color);
  height: calc(100% - 66px);
}
```
:::


然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './vp-code.css';
```

输入：

````md
```sh
#默认有行号
pnpm -v
```

```sh:no-line-numbers
#关闭行号
pnpm -v
```
````

输出：

```sh
#查询pnpm版本
pnpm -v
```

```sh:no-line-numbers
#关闭行号
pnpm -v
```



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

复制下面代码，粘贴到 `vp-code-group.css` 保存

::: tip 说明
本次代码感谢 [@Aurorxa](https://github.com/Aurorxa) 提供，本人在此基础上进行一些修改
:::

::: code-group
```css [vp-code-group.css]
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

/* 代码组的容器样式 */
.vp-code-group {
  color: var(--vp-c-black-soft);
  border-radius: 8px;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

/* 在代码组内部与外部容器的边角一致，避免嵌套的阴影叠加 */
.vp-code-group div[class*="language-"].vp-adaptive-theme.line-numbers-mode {
  border-radius: 8px;
  box-shadow: none;
  position: relative;
}

/* 上移代码块小圆点 遮盖住 */
.vp-code-group div[class*="language-"].vp-adaptive-theme.line-numbers-mode::before {
  top: -12px;
}
```
:::


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

![](https://vuepress.yiov.top/beautification/02.png)

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