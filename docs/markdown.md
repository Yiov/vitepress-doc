# Markdown



> 如果你还不了解 Markdown ，请先了解下Markdown的简单用法
>
> VitePress 中的链接可以直接渲染


<Linkcard url="https://yiov.top/computer/markdown.html" title="Markdown的简单用法" description="https://yiov.top/computer/markdown.html" logo="/markdown.png"/>


## 基础功能

VitePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 作为解析器，并使用 [Shiki](https://shiki.matsu.io/) 来突出显示语言语法


### 基本配置

```ts
export default defineConfig({
  markdown:{
      //这里填配置项
  },
})
```



### 标题锚 {#title-anchor}

标题会自动应用锚链接

::: tip 说明
`[]` 中括号内文字随便输，`()` 括号里的填一个 `#` 号加标题

无论是几级标题，都是一个 `#` 号
:::

输入：

```md
[点我跳转：基础功能](#基础功能)
```

输出：

[点我跳转：基础功能](#基础功能)

---

自定义锚点，以应对中文无法正确跳转的问题

先再标题后，添加英文锚点

```md
### 标题锚 {#title-anchor}
```

输入：

```md
[点我跳转：标题锚](#title-anchor)
```

输出：

[点我跳转：标题锚](#title-anchor)


### 图片引用

这里涉及到一个相对路径 `./` 和 绝对路径 `/`

::: warning 建议
对于指向内部 Markdown 文件的链接，尽可能使用相对路径，而不是绝对路径
:::

```md{7}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  ├─ public
│  │  └─ logo.png     <-- LOGO
│  ├─ markdown.md    <-- 我的位置
│  └─ index.md 
└─ package.json
```

输入：


```md
<!-- 相对路径，目标文件相对于本文章所在位置 -->
![LOGO](./public/logo.png)

<!-- 绝对路径，目标文件就是真实路径在哪 -->
![LOGO](/public/logo.png)
```



输出：

::: tip 说明
由于public文件夹的特殊性，我们直接使用 `![LOGO](/logo.png)` 即可

其他文件夹请遵从上面的使用规则
:::



![LOGO](/logo.png)




### 图片懒加载

提升我们的访问体验，非常推荐开启

::: tip 区别
不开启：图片一次性加载出来，图片越多加载越慢

开启：快速打开网页，当访问到了图片的位置，它再加载出来
:::


```ts{4-7}
export default defineConfig({
  //markdown配置
  markdown: {
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
  },
})
```


### 链接

分为内部和外部链接，且默认情况下，生成链接带有  `.html`后缀

内部链接引用，输入：

```md
[点我跳转：Frontmatter文章中的大纲](./frontmatter.md#大纲)
```


输出：

[点我跳转：Frontmatter文章中的大纲](./frontmatter.md#大纲)


外部链接引用，输入：

```md
* [vuejs.org](https://vuejs.org/)

* [GitHub 上的 VitePress](https://github.com/vuejs/vitepress)
```

输出：

* [vuejs.org](https://vuejs.org/)

* [GitHub 上的 VitePress](https://github.com/vuejs/vitepress)




### 视频

视频用HTML5自带的 `<video>` 即可

输入：

```html
<video src="/本地视频路径.mp4" controls="controls"></video>
```

输出：

<video src="/lol.mp4" controls="controls"></video>


那在线视频呢，我们可以用 `<iframe>` 标签实现

::: tip 说明
本次仅演示 [Youtube](https://www.youtube.com/) 和 [B站](https://www.bilibili.com/) ，在视频分享中选择 `嵌入视频` 即可获取链接

其他的请自测
:::


输入：

```md{3,12}
<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="https://www.youtube.com/embed/bzyMLoSwYvk" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>


<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="//player.bilibili.com/player.html?bvid=BV1YptMeMEcV" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>
```

输出：

<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="https://www.youtube.com/embed/bzyMLoSwYvk" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>


<iframe 
style="width:100%; aspect-ratio:16/9; margin-top: 2em;" 
src="//player.bilibili.com/player.html?bvid=BV1YptMeMEcV" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
allowfullscreen>
</iframe>


### 表格

输入：

```
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```


输出：

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |


::: tip 说明
更详细的使用方式，我在 [Markdown教程](https://yiov.top/computer/markdown.html#%E8%A1%A8%E6%A0%BC) 里也说到过

也可使用 Execl 生成 Markdwon：https://tableconvert.com/zh-cn/
:::



### Emoji

输入：

```md
:tada: :100:
```

输出：

:tada: :100:


Emoji大全：https://www.emojiall.com/zh-hans/





### 目录


输入：

```md
[[toc]]
```

输出：

::: details 点我查看当前页目录
[[toc]]
:::



### 折叠语法


输入：

```md
<details>
  <summary>点我展开</summary>
  Markdown默认折叠语法，Vitepress可以使用容器折叠语法，更加美观
</details>
```

输出：

<details>
  <summary>点我展开</summary>
  Markdown默认折叠语法，Vitepress可以使用容器折叠语法，更加美观
</details>





## 容器

### 基础使用

容器可以通过其类型、标题和内容来定义


输入：

```md
::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字
:::
```


输出：

::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字

还可以加入代码块

```md
Hello, VitePress!
```
:::


> 为什么和我不一样？
>
> 我对样式进行了修改，请查看 [样式美化 - 容器颜色](./style.md#容器颜色)


::: details 不喜欢添加在后面，可以直接在配置中自定义标题

```ts{4-12}
// .vitepress/config.mts
export default defineConfig({

  markdown: { // [!code focus:9]
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }

})
```
:::


### GitHub风格警报

你也可以使用 [GitHub 风格的警报](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)，只是书写方式不同，使用上是一样的


输入：

```md
> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```


输出：

> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。



::: details 如果你是 Typora 的用户，本地不生效

使用下面代码进行配置，本代码由 [Aurorxa](https://github.com/Aurorxa) 提供

```ts{4-25}
// .vitepress/config.mts
export default defineConfig({

  markdown: {
    config: (md) => {
      // 创建 markdown-it 插件
      md.use((md) => {
        const defaultRender = md.render
        md.render = function (...args) {

          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          defaultContent = defaultContent
                .replace(/NOTE/g, '提醒')
                .replace(/TIP/g, '建议')
                .replace(/IMPORTANT/g, '重要')
                .replace(/WARNING/g, '警告')
                .replace(/CAUTION/g, '注意')
          // 返回渲染的内容
          return defaultContent
        }
      })
    }
  },

})
```
:::




### Badge组件

徽章可让您向标题添加状态

输入：

```md
* VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" />
```


输出：

* VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" />

你也可以自定义 `children`

输入：

```md
* VitePress <Badge type="info">custom element</Badge>
```

输出：

* VitePress <Badge type="info">custom element</Badge>


您可以通过覆盖 css 变量来自定义徽章的 `background-color`

默认值：

::: details 点击查看css变量 

var的值都改程颜色代码即可

例如：`--vp-badge-info-border: #ffffff;`

```css
:root {
  --vp-badge-info-border: transparent;
  --vp-badge-info-text: var(--vp-c-text-2);
  --vp-badge-info-bg: var(--vp-c-default-soft);

  --vp-badge-tip-border: transparent;
  --vp-badge-tip-text: var(--vp-c-tip-1);
  --vp-badge-tip-bg: var(--vp-c-tip-soft);

  --vp-badge-warning-border: transparent;
  --vp-badge-warning-text: var(--vp-c-warning-1);
  --vp-badge-warning-bg: var(--vp-c-warning-soft);

  --vp-badge-danger-border: transparent;
  --vp-badge-danger-text: var(--vp-c-danger-1);
  --vp-badge-danger-bg: var(--vp-c-danger-soft);
}
```
:::










## 代码块

代码块基本用法，就是上下三个反引号

输入：

````
```md(常用的还有 ts / js/ yaml / sh 等等，但这里尽量不要出现中文)
中间写代码内容
```
````

::: tip 为什么我的有小圆点
因为我对 [代码块样式](./style.md#代码块) 进行了美化，可以按需配置
:::


### 语法突出

VitePress有着 [Shiki](https://shiki.tmrs.site/) 插件的加持，在前反引号后可以写入代码的语法，渲染后会显示在代码块右上方

输入：

````
```ts // [!code focus]
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
``` // [!code focus]
````

````
```html // [!code focus]
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
``` // [!code focus]
````




输出：

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```


```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```


### 行高亮

比如我要第2-3行和第5行显示，连续行用 `-` ，不连续行用 `,`

输入：

````
```ts{2-3,5}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```
````


输出：

```ts{2-3,5}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```


也可以使用 `// [!code highlight]`


输入：

````md
```ts
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程", // [!!code highlight]
})
```
````


输出：

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程", // [!code highlight]
})
```


也可以通过 `// [!code highlight:<lines>]` 连续行号

输入：

````md
```ts
export default defineConfig({
  lang: 'zh-CN', // [!!code highlight:3]
  title: "VitePress",
  description: "我的vitpress文档教程",
})
```
````


输出：

```ts
export default defineConfig({
  lang: 'zh-CN', // [!code highlight:3]
  title: "VitePress",
  description: "我的vitpress文档教程",
})
```




### 聚焦代码

在某一行后添加 `// [!code focus]` 注释会聚焦该行，并模糊代码的其他部分


输入：

````
```ts{4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程", // [!!code focus]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```ts{4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程", // [!code focus]
  titleTemplate: '另起标题覆盖title' ,
})
```


如果你要聚焦连续多行，可以使用 `// [!code focus:<lines>]`

::: tip 说明
从添加行的位置开始，输入最终聚焦的行号即可

分散的行，请单独添加使用
:::

输入：


````
```ts{2-5}
export default defineConfig({
  lang: 'zh-CN', // [!!code focus:4]
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```ts{2-5}
export default defineConfig({
  lang: 'zh-CN', // [!code focus:5]
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```





### 增减差异

在某一行上添加 `// [!code --]` 或 `// [!code ++]` 注释将创建该行的差异，同时保留代码块的颜色

输入：

````
```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!!code --]
  description: "更详细的vitpress中文文档教程", // [!!code ++]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!code --]
  description: "更详细的vitpress中文文档教程", // [!code ++]
  titleTemplate: '另起标题覆盖title' ,
})
```



### 错误和警告

在某一行上添加 `// [!code warning]` 或 `// [!code error]` 注释会相应地为其着色


输入：


````
```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!!code error]
  description: "更详细的vitpress中文文档教程", // [!!code warning]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!code error]
  description: "更详细的vitpress中文文档教程", // [!code warning]
  titleTemplate: '另起标题覆盖title' ,
})
```



### 行号显示

```ts{2-6}
export default defineConfig({
  //markdown配置 // [!code focus:6]
  markdown: {
    //行号显示
    lineNumbers: true, //false关闭
  },
})
```

如果你在某个代码块不想使用，可以通过 `ts:no-line-numbers` 来临时关闭


输入：

````
```ts:no-line-numbers
无行号演示
```
````

输出：

```ts:no-line-numbers
无行号演示
```





### 代码组


和Vuepress不同，我们用 `code-group` 包裹

```
::: code-group
:::
```

输入：

````
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

::: tip 为什么我的有小圆点
因为我对 [代码组样式](./style.md#代码组) 进行了美化，可以按需配置
:::



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



### 导入代码

要输出准确的文件路径，可以指定代码的片段和高亮部分

导入片段，我们需要对原文件进行注释 `// #region` 和 `// #endregion`

::: warning 注意
开始和结束都要有，后面的字必须是字母，不能汉字!

可以自定义，比如示例中的 `fav`
:::

原文件修改示例：

```ts{1,5}
// #region fav // [!code focus]
  head: [
    ['link',{ rel: 'icon', href: '/logo.png'}],
  ],
  // #endregion fav // [!code focus]
```

输入：

::: tip 说明
{} 大括号中是高亮的行号
:::

```md
<!-- 绝对路径 二选一-->
<<< @/.vitepress/config.mts#fav{2}

<!-- 相对路径 二选一-->
<<< ./.vitepress/config.mts#fav{2}
```







### 代码块嵌套

比如我们想展示代码块的写法，但是反引号已经用了

那么我们就用4个反引号 ```` ，以此类推即可

::: tip 说明
这个使用方法，其实我在 [Markdown教程](https://yiov.top/computer/markdown.html#%E4%BB%A3%E7%A0%81%E5%9D%97%E5%B5%8C%E5%A5%97) 里已经说过了
:::

输入：

`````md
````
```
pnpm run docs:dev
```
````
`````

输出：


````sh
```
pnpm run docs:dev
```
````



## 团队页面

使用从 `vitepress/theme` 公开的 `<VPTeamMembers>` 组件在任何页面上显示团队成员列表


### 页面中显示

输入：

```md
<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: 'Kia King Ishii',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' }
    ]
  },
]
</script>

### Our Team

Say hello to our awesome team.

<VPTeamMembers size="medium" :members="members" />
```


输出：

::: tip 说明
尺寸大小有2个，`small` 和 `medium`

看自己喜好吧，文档中一般是small
:::

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: 'Kia King Ishii',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' }
    ]
  },
]
</script>


<VPTeamMembers size="medium" :members="members" />



### 创建完整页面

你还可以创建完整的团队页面，而不是将团队成员添加到文档页面，这与创建自定义首页类似

::: tip 说明
要创建团队页面，首先创建一个新的 `md` 文件。 文件名并不重要，但这里我们将其命名为 `team.md`
:::

在此文件中，设置 [frontmatter](./frontmatter.md#首页) 选项 `layout: page`，然后使用 TeamPage 组件构建页面结构


输入：

```md{2,36,39-40,44}
---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: 'Kia King Ishii',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' },
    ],
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of VitePress is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>
```

输出：

::: tip 说明
`<VPPageTitle>` 组件添加页面，标题是 `<h1>` 标题，使用 `#title` 和 `#lead` 槽来记录团队的信息

`<VPMembers>` 的工作方式与在文档页面中使用时相同，它将显示成员列表
:::


[点我查看：团队成员信息](./team.md)


### 合作伙伴

输入：

```md
---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection,
} from 'vitepress/theme'

const coreMembers = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: 'Kia King Ishii',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' },
    ],
  },
]

const partners = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: 'Kia King Ishii',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' },
    ],
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>
    The development of VitePress is guided by an international
    team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #lead>
    This is our partner.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
```

输出：

[点我查看：团队成员信息](./team.md)


### 组件显示成员

::: tip 说明
可选项，也不建议在此处配置，太乱了
:::

如果你在 `const coreMembers = []` 或 `const partners = []` 没有配置成员列表

你可以在 `<VPTeamMembers` 中单独配置


```md
const coreMembers = [],

<VPTeamMembers
  size="medium"
  :members="[
    {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: 'Kia King Ishii',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' },
    ],
  },
    ]"
/>

```

