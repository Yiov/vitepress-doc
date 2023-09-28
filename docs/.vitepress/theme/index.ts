import Theme from 'vitepress/theme'
import './style/var.css'


import Video from "./components/Video.vue"



export default {
  ...Theme,
  enhanceApp(ctx) {
    // 注册全局组件
    ctx.app.component('Video' , Video)
  }
}


