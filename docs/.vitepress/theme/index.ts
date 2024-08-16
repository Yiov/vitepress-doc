import DefaultTheme from 'vitepress/theme'

// giscusTalk
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

// 样式
import './style/index.css' //自定义样式
import "vitepress-markdown-timeline/dist/theme/index.css"; //时间线

import { h } from 'vue' // h函数
import { useData , useRoute } from 'vitepress'
// mediumZoom
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';


// 组件
import MNavLinks from './components/MNavLinks.vue' //导航1
import Navlink from './components/Navlink.vue' //导航2
import HomeUnderline from "./components/HomeUnderline.vue" // 首页下划线
import Video from './components/Video.vue' // 视频播放器
import confetti from "./components/confetti.vue" // 五彩纸屑
import blur from "./components/blur.vue" // LOGO模糊渐显
import update from "./components/update.vue" // LOGO模糊渐显


// 不蒜子
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import view from "./components/view.vue"


export default {
  extends: DefaultTheme,

  enhanceApp({app , router }) {
    // 注册全局组件
    app.component('MNavLinks' , MNavLinks) //导航1
    app.component('Navlink' , Navlink) //导航2
    app.component('HomeUnderline' , HomeUnderline) // 首页下划线
    app.component('Video' , Video) // 视频播放器
    app.component('confetti' , confetti) // 五彩纸屑
    app.component('blur' , blur) // LOGO模糊渐显
    app.component('update' , update) // LOGO模糊渐显

    // 不蒜子
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
         busuanzi.fetch()
       }
    }

  },

  //导航
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props, {
      'layout-bottom': () => h(view), //不蒜子layout-bottom插槽
    })
  },
  
  // medium-zoom
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    // giscus
    const { frontmatter } = useData();

    // giscus配置
    giscusTalk({
      repo: 'Yiov/vitepress-doc', //仓库
      repoId: 'R_kgDOGYFl1A', //仓库ID
      category: 'Announcements', // 讨论分类
      categoryId: 'DIC_kwDOGYFl1M4CayLM', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );

  },

}