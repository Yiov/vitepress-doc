# 前言



## 简介

[VitePress](https://vitepress.dev/zh/) 使用 Markdown 编写的源内容，生成可以轻松部署在任何地方的静态 HTML 页面

VitePress 作为 [VuePress](https://v2.vuepress.vuejs.org/zh/) 的孪生兄弟，借助 [Vue 3](https://cn.vuejs.org/) 和 [vite](https://vitejs.cn/)，VitePress 提供了明显更好的 DX、更好的生产性能、更精致的默认主题以及更灵活的定制 API

::: details 基于vitepress的网站
[Vite](https://cn.vitejs.dev/)、[Rollup](https://rollupjs.org/)、[Pinia](https://pinia.vuejs.org/)、[VueUse](https://vueuse.org/)、[Vitest](https://vitest.dev/)、[D3](https://d3js.org/)、[UnoCSS](https://unocss.dev/)、[Iconify](https://iconify.design/) 等 [其他文档](https://www.vuetelescope.com/explore?framework.slug=vitepress)
:::


## 官方

它是搭建文档的 静态站点生成器(SSG) 最佳利器之一

* VitePress官网：https://vitepress.dev/zh/

* vite官网：https://cn.vitejs.dev/

::: details 其他静态站点生成器
[VuePress](https://v2.vuepress.vuejs.org/zh/)、[Docusaurus](https://docusaurus.io/)、[Astro](https://astro.build/)、[Modern.js](https://modernjs.dev/)、[docsify](https://docsify.js.org/)、[Docz](https://www.docz.site/)、[Nuxt](https://nuxt.com/)、[Jekyll](https://jekyllrb.com/)、[Hexo](https://hexo.io/zh-cn/)、[Hugo](https://gohugo.io/)、[idoc](https://wangchujiang.com/idoc/)、[Styleguidist](https://react-styleguidist.js.org/)、[Storybook](https://storybook.js.org/)、[Gatsby](https://www.gatsbyjs.com/)、[Eleventy](https://www.11ty.dev/)、[Publii](https://getpublii.com/)
:::

::: tip 说明
VitePress是一个仅支持ESM的软件包。不要使用 `require()` 来导入它，请参考 [Vite的故障排除指南](https://cn.vitejs.dev/guide/troubleshooting#this-package-is-esm-only) 

---

当使用 `require` 导入一个仅支持 ESM 的包时，会出现以下错误且文件无法被 require 加载

建议你通过以下方式将你的配置文件转换为 ESM 格式：

* 在邻近的 `package.json` 中添加 `"type": "module"`

* `vite.config.js/vite.config.ts` 重命名为 `vite.config.mjs/vite.config.mts`
:::

## 参考网站

* [GitHub仓库](https://github.com/vuejs/vitepress)

* [vite备用官网](https://vitejs.cn/)

* [Vuepress的主题](https://github.com/alex8088/vitepress-theme-vue)



