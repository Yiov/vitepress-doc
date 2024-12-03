import DefaultTheme from 'vitepress/theme'

// giscusTalk
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

// 样式
import 'virtual:group-icons.css' //代码组样式
import './style/index.css' //自定义样式

import { h } from 'vue' // h函数
import { useData , useRoute } from 'vitepress'
// mediumZoom
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';


// 组件
import MNavLinks from './components/MNavLinks.vue' //导航
import HomeUnderline from "./components/HomeUnderline.vue" // 首页下划线
import confetti from "./components/confetti.vue" // 五彩纸屑
import update from "./components/update.vue" // 更新时间
import xgplayer from "./components/xgplayer.vue" //西瓜播放器
import ArticleMetadata from "./components/ArticleMetadata.vue" //字数阅读时间
import Linkcard from "./components/Linkcard.vue" //链接卡片
import MyLayout from "./components/MyLayout.vue" //视图过渡
import backtotop from "./components/backtotop.vue" //返回顶部
import notice from "./components/notice.vue" //公告
import fluidborder from "./components/fluidborder.vue" //流体边框仅用于演示

// 不蒜子
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import bsz from "./components/bsz.vue"


export default {
  extends: DefaultTheme,

  enhanceApp({app , router }) {
    // 注册全局组件
    app.component('MNavLinks' , MNavLinks) //导航
    app.component('HomeUnderline' , HomeUnderline) // 首页下划线
    app.component('confetti' , confetti) // 五彩纸屑
    app.component('update' , update) // 更新
    app.component('xgplayer' , xgplayer) //西瓜播放器
    app.component('ArticleMetadata' , ArticleMetadata) //字数阅读时间
    app.component('Linkcard' , Linkcard) //链接卡片
    app.component('fluidborder' , fluidborder) //流体边框仅用于演示

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

    // return h(DefaultTheme.Layout, props, {
    //   'layout-bottom': () => h(bsz), //不蒜子layout-bottom插槽
    //   'doc-footer-before': () => h(backtotop), // 返回顶部doc-footer-before插槽
    //   'layout-top': () => h(notice), // 公告layout-top插槽
    // })

    return h(MyLayout,props)
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