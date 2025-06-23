# 永久链接


## 简介

由于VitePress，使用的是Markdown文件名作为访问链接，而当我们变动文件名后，再访问链接就会404，在分享时会造成很大困扰

永久链接就是为了解决这个情况，无论你怎么改文件名，都是这个访问链接



## 实现历程

本次代码主要是借鉴了 [@izhichao/vitepress-theme-minimalism](https://github.com/izhichao/vitepress-theme-minimalism) ，再次感谢！

需要在Frontmatter中配置4个参数： `title` `prev` `next` `permalink`

::: tip 说明
- permalink：永久链接生成的字符，打乱了原本vitepress上下页的逻辑，无法匹配，需要指定prev / next

- prev / next：自动获取上下页名，只能获取到文件名，无法显示标题

- title：自动获取文件的一级标题
:::


## 提前说明

由于目录不同，代码有一点点区别，后面我会标注

::: code-group
```md{2} [以docs为根目录]
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts          <-- 配置文件
│  ├─ api-examples.md        <-- 文章1
│  ├─ markdown-examples.md   <-- 文章2
│  ├─ permalink              <-- 目录1
│  │   └─ index.md           <-- 目录1的首页
│  └─ index.md               <-- 首页
└─ package.json
```

```md{1} [以/为根目录]
.
├─ .vitepress
│    └─ config.mts          <-- 配置文件
├─ docs                     <-- 目录1
├─ permalink                <-- 目录2
│    └─ index.md            <-- 目录2的首页
├─ index.md                 <-- 首页
└─ package.json
```

:::



## 新建文件

请全部安装好，否则会报错，安装过的无视

::: code-group
```sh [pnpm]
pnpm add -D gray-matter fast-glob @types/node
```

```sh [yarn]
yarn add -D gray-matter fast-glob @types/node
```

```sh [npm]
npm i -D gray-matter fast-glob @types/node
```

```sh [bun]
bun add -D gray-matter fast-glob @types/node
```
:::




在 `.vitepress/theme/untils` 文件夹，新建 `permalink.ts` 文件

```md{6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme          
│  │     └─ untils       
│  │         └─ permalink.ts   <-- 我在这
│  │  └─ config.mts
│  └─ index.md       
└─ package.json
```

粘贴如下代码，目录不同，代码有点点区别

::: danger 注意
不要粘贴了就直接保存！！！

请先根据自己的目录情况，修改好扫描源目录，再保存！
:::

::: code-group

```ts{45-46} [以docs为根目录]
// 导入必要的库
import matter from 'gray-matter'; // 用于解析和操作Markdown文件的frontmatter
import fg from 'fast-glob';      // 快速文件系统匹配库
import fs from 'fs/promises';    // Node.js文件系统Promise API
import path from 'path';         // 路径处理库

/**
 * 生成指定长度的随机字符串
 * @param {number} length - 需要生成的字符串长度
 * @returns {string} 由0-9和a-f组成的随机字符串
 */
export const generateString = (length: number) => {
  const charset = '0123456789abcdef'; // 可用的字符集
  let randomCode = ''; // 初始化结果字符串

  // 循环生成指定长度的随机字符串
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length); // 随机选取字符索引
    randomCode += charset[randomIndex]; // 将随机字符添加到结果中
  }

  return randomCode;
};

/**
 * 从Markdown内容中提取一级标题
 * @param {string} content - Markdown内容
 * @returns {string} 提取的标题，如果没有找到则返回空字符串
 */
const extractTitleFromContent = (content: string): string => {
  // 匹配一级标题的正则表达式 (支持#前后可能有空格的情况)
  const h1Regex = /^\s*#\s+(.+?)\s*$/m;
  const match = content.match(h1Regex);
  return match ? match[1].trim() : '';
};

/**
 * 处理文章Markdown文件，生成永久链接和重写规则
 * @param {Object} options - 配置选项
 * @param {string} options.srcDir - 源目录，默认为'permalink'
 * @param {string} options.baseDir - 基础目录，默认为'docs'
 * @returns {Promise<Object>} 包含重写规则的对象
 */
export const usePosts = async ({
  srcDir = 'permalink',  // 默认源目录为'permalink' [!code focus:2]
  baseDir = 'docs'   // 默认基础目录为'docs'
} = {}) => {
  const rewrites = {}; // 初始化重写规则对象

  try {
    // 使用fast-glob查找所有匹配的Markdown文件，但忽略index.md文件
    const paths = (await fg(`${baseDir}/${srcDir}/**/*.md`, {
      ignore: ['**/index.md']  // 忽略所有index.md文件
    })).sort(); // 按字母顺序排序

    // 创建一个映射，存储所有文件的permalink和title
    const postsMap: Record<string, { permalink: string; title: string }> = {};

    // 第一遍：收集所有文件的基本信息
    await Promise.all(
      paths.map(async (postPath) => {
        const { data, content } = matter.read(postPath);
        
        // 提取或设置title
        if (!data.title) {
          const extractedTitle = extractTitleFromContent(content);
          if (extractedTitle) {
            data.title = extractedTitle;
          }
        }

        // 生成或使用现有的permalink
        if (!data.permalink) {
          data.permalink = `/${srcDir}/${generateString(6)}`;
        }

        // 存储到映射中
        postsMap[postPath] = {
          permalink: data.permalink,
          title: data.title || path.basename(postPath, '.md')
        };
      })
    );

    // 第二遍：设置prev/next导航
    await Promise.all(
      paths.map(async (postPath, index) => {
        const { data, content } = matter.read(postPath);
        const prevPost = index > 0 ? postsMap[paths[index - 1]] : null;
        const nextPost = index < paths.length - 1 ? postsMap[paths[index + 1]] : null;

        // 设置prev导航
        if (prevPost && !data.prev) {
          data.prev = {
            text: prevPost.title,
            link: prevPost.permalink
          };
        }

        // 设置next导航
        if (nextPost && !data.next) {
          data.next = {
            text: nextPost.title,
            link: nextPost.permalink
          };
        }

        // 将更新后的frontmatter写回文件
        await fs.writeFile(
          postPath,
          matter.stringify(content, data),
          'utf8'
        );

        // 计算相对路径并添加到重写规则
        const relativePath = postPath.replace(`${baseDir}/`, '');
        rewrites[relativePath.replace(/[+()]/g, '\\$&')] =
          `${data.permalink}.md`.slice(1).replace(/[+()]/g, '\\$&');
      })
    );

    return { rewrites }; // 返回生成的重写规则
  } catch (e) {
    console.error(e); // 捕获并打印错误
    return { rewrites }; // 即使出错也返回可能部分完成的重写规则
  }
};
```

```ts{44} [以/为根目录]
// 导入必要的库
import matter from 'gray-matter'; // 用于解析和操作Markdown文件的frontmatter
import fg from 'fast-glob';      // 快速文件系统匹配库
import fs from 'fs/promises';    // Node.js文件系统Promise API
import path from 'path';         // 路径处理库

/**
 * 生成指定长度的随机字符串
 * @param {number} length - 需要生成的字符串长度
 * @returns {string} 由0-9和a-f组成的随机字符串
 */
export const generateString = (length: number) => {
  const charset = '0123456789abcdef'; // 可用的字符集
  let randomCode = ''; // 初始化结果字符串

  // 循环生成指定长度的随机字符串
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length); // 随机选取字符索引
    randomCode += charset[randomIndex]; // 将随机字符添加到结果中
  }

  return randomCode;
};

/**
 * 从Markdown内容中提取一级标题
 * @param {string} content - Markdown内容
 * @returns {string} 提取的标题，如果没有找到则返回空字符串
 */
const extractTitleFromContent = (content: string): string => {
  // 匹配一级标题的正则表达式 (支持#前后可能有空格的情况)
  const h1Regex = /^\s*#\s+(.+?)\s*$/m;
  const match = content.match(h1Regex);
  return match ? match[1].trim() : '';
};

/**
 * 处理文章Markdown文件，生成永久链接和重写规则
 * @param {Object} options - 配置选项
 * @param {string} options.srcDir - 源目录，默认为'permalink'
 * @returns {Promise<Object>} 包含重写规则的对象
 */
export const usePosts = async ({
  srcDir = 'permalink'  // 默认源目录为'permalink' [!code focus]
} = {}) => {
  const rewrites = {}; // 初始化重写规则对象

  try {
    // 使用fast-glob查找所有匹配的Markdown文件，但忽略index.md文件
    const paths = (await fg(`${baseDir}/${srcDir}/**/*.md`, {
      ignore: ['**/index.md']  // 忽略所有index.md文件
    })).sort(); // 按字母顺序排序

    // 创建一个映射，存储所有文件的permalink和title
    const postsMap: Record<string, { permalink: string; title: string }> = {};

    // 第一遍：收集所有文件的基本信息
    await Promise.all(
      paths.map(async (postPath) => {
        const { data, content } = matter.read(postPath);
        
        // 提取或设置title
        if (!data.title) {
          const extractedTitle = extractTitleFromContent(content);
          if (extractedTitle) {
            data.title = extractedTitle;
          }
        }

        // 生成或使用现有的permalink
        if (!data.permalink) {
          data.permalink = `/${srcDir}/${generateString(6)}`;
        }

        // 存储到映射中
        postsMap[postPath] = {
          permalink: data.permalink,
          title: data.title || path.basename(postPath, '.md')
        };
      })
    );

    // 第二遍：设置prev/next导航
    await Promise.all(
      paths.map(async (postPath, index) => {
        const { data, content } = matter.read(postPath);
        const prevPost = index > 0 ? postsMap[paths[index - 1]] : null;
        const nextPost = index < paths.length - 1 ? postsMap[paths[index + 1]] : null;

        // 设置prev导航
        if (prevPost && !data.prev) {
          data.prev = {
            text: prevPost.title,
            link: prevPost.permalink
          };
        }

        // 设置next导航
        if (nextPost && !data.next) {
          data.next = {
            text: nextPost.title,
            link: nextPost.permalink
          };
        }

        // 将更新后的frontmatter写回文件
        await fs.writeFile(
          postPath,
          matter.stringify(content, data),
          'utf8'
        );

        // 计算相对路径并添加到重写规则
        const relativePath = postPath;
        rewrites[relativePath.replace(/[+()]/g, '\\$&')] =
          `${data.permalink}.md`.slice(1).replace(/[+()]/g, '\\$&');
      })
    );

    return { rewrites }; // 返回生成的重写规则
  } catch (e) {
    console.error(e); // 捕获并打印错误
    return { rewrites }; // 即使出错也返回可能部分完成的重写规则
  }
};
```

:::


## 实现

最后我们将它引入 `config.mts` 中重写生效

```ts{3-4,10}
import { defineConfig } from 'vitepress'

import { usePosts } from './theme/untils/permalink';
const { rewrites } = await usePosts();

export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程",
  rewrites,

  //主题配置
  themeConfig: {
  }
})

```

按 `Ctrl+C键` 退出开发模式，重新启动项目

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


## 效果

重启后自动给你指定目录md文件添加信息，比如：

::: tip 说明
请确保你指定的目录中有文件，另外已经被添加过的，不会被修改
:::


```md{2-6}
---
title: 测试1
permalink: /permalink/3dc2b3
next:
  text: 测试2
  link: /permalink/3d643c
---
# 测试1

永久链接测试1

```

- 本地访问：`http://localhost:5173/permalink/3dc2b3`

- 永久链接：`https://vitepress.yiov.top/permalink/3dc2b3`

