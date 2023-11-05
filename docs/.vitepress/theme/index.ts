import DefaultTheme from 'vitepress/theme'
import './style/index.css' 

import Video from "./components/Video.vue"

import { h } from 'vue'
import { useData } from 'vitepress'

// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    // 注册全局组件
    ctx.app.component('Video' , Video)
  },
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props)
  },
}