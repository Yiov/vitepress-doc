type NavData = {
    title: string
    desc: string
    items: NavLink[]
}
type NavLink = {
    icon: string
    title: string
    desc?: string
    link: string
}
export const NAV_DATA: NavData[] = [
    {
        title: 'AI 导航',
        desc: '让人工智能帮助你完成枯燥的工作',
        items: [
            {
                icon: 'https://gpt.ahuaaa.cn/favicon.ico',
                title: 'ChatGPT（内部）',
                link: 'https://gpt.ahuaaa.cn/',
                desc: '需要内部授权码'
            },
            {
                icon: 'https://gpt4.ahuaaa.cn/favicon.ico',
                title: 'ChatGPT（内部）',
                link: 'https://gpt4.ahuaaa.cn/',
                desc: '需要内部授权码'
            },
            {
                icon: 'https://assets.website-files.com/60de2701a7b28f308f619d3d/62f5b1528499d8e6b3d02447_Gamma_V1_Icon_only_4.gif',
                title: 'Gamma (PPT)',
                link: 'https://gamma.app/',
                desc: '公测免费使用'
            },
            {
                icon: 'https://www.midjourney.com/apple-touch-icon.png',
                title: 'Midjourney（绘画）',
                link: 'https://www.midjourney.com'
            },
            {
                icon: 'https://neveragain.allstatics.com/2019/assets/icon/logo/edraw-mindmaster-square.svg',
                title: 'mindmaster',
                link: 'https://www.mindmaster.io/',
                desc: '亿图思维(流程图)，需付费(可以免费试用)'
            },
            {
                icon: 'https://global-uploads.webflow.com/59deb588800ae30001ec19c9/5d4891e0e260e3c1bc37b100_beautiful%20ai%20favicon%20%20blue%20square.png',
                title: 'Beautiful.ai（PPT）',
                link: 'https://www.beautiful.ai'
            }, {
                title: 'AI工具集',
                icon: 'https://ai-bot.cn/wp-content/uploads/2023/07/ai-bot-favicon.png',
                link: 'https://ai-bot.cn/',
                desc: '国内外AI工具集合网站大全'
            }
        ]
    }, {
        title: '社区',
        desc: '开发者社区',
        items: [
            {
                icon: 'https://ts3.cn.mm.bing.net/th?id=Aed3c79c5ea4781db45fd44d7e804b5ae&w=148&h=148&o=6&dpr=1.3&pid=SANGAM',
                title: 'github',
                desc: '一个面向开源及私有软件项目的托管平台',
                link: 'https://github.com/'
            }, {
                icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
                title: 'Stack Overflow',
                desc: '全球最大的技术问答网站',
                link: 'https://stackoverflow.com'
            },
            {
                title: '稀土掘金',
                icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
                desc: '面向全球中文开发者的技术内容分享与交流平台',
                link: 'https://juejin.cn'
            },
            {
                title: 'SegmentFault 思否',
                icon: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
                desc: '技术问答开发者社区',
                link: 'https://segmentfault.com'
            },
            {
                title: '博客园',
                // icon: 'https://common.cnblogs.com/favicon.ico',
                icon: 'https://ts4.cn.mm.bing.net/th?id=ODLS.c8870dec-a17f-476f-ad66-f13612a6fe85&w=32&h=32&o=6&pid=13.1',
                desc: '博客园是一个面向开发者的知识分享社区',
                link: 'https://www.cnblogs.com'
            },
            {
                title: '知乎',
                icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
                desc: '中文互联网高质量的问答社区和创作者聚集的原创内容平台',
                link: 'https://juejin.cn'
            },
        ]
    }, {
        title: '设计工具',
        desc: '收录的设计工具',
        items: [
            {
                icon: 'https://img.js.design/assets/webImg/favicon.ico',
                title: '即时设计',
                desc: '同时创造，即时设计',
                link: 'https://js.design/',
            },
        ]
    }, {
        title: 'WEB网页设计',
        desc: '灵感酷站',
        items: [
            {
                icon: 'https://pngimg.com/uploads/pinterest/pinterest_PNG63.png',
                title: 'Pinterest',
                desc: 'Pintester 国外图片资源',
                link: 'https://www.pinterest.com/'
            }, {
                icon: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.RLVRjameUVvXbSNFl5xXKwHaHa?pid=ImgDet&rs=1',
                title: 'Dribbble',
                link: 'https://dribbble.com/',
                desc: '设计师必备站点，国内顶尖的设计师都在上面',
            }, {
                icon: 'https://xcx.bigbigwork.com/pimg/favicon.ico',
                title: '大作',
                desc: ' 国内图片资源',
                link: 'https://bigbigwork.com/'
            }, {
                icon: 'https://www.instructables.com/assets/img/siteassets/apple-touch-icon-192x192.png',
                title: 'instructables',
                link: 'https://www.instructables.com/',
                desc: '电子电气作品',
            },
        ]
    }, {
        title: '小工具',
        desc: '收录的小工具',
        items: [
            {
                icon: 'https://squoosh.app/c/icon-demo-logo-326ed9b6.png',
                title: '在线png压缩',
                desc: 'png图片压缩',
                link: 'https://squoosh.app/'
            },
            {
                icon: 'https://uigradients.com/static/images/favicon-32x32.png',
                title: 'CSS渐变',
                desc: '在线查看渐变颜色,并生成css代码一键复制',
                link: 'https://uigradients.com/#Mini',
            },
            {
                icon: 'https://ezgif.com/favicon.ico',
                title: '在线转GIF',
                desc: '多种格式在线转换为GIF',
                link: 'https://ezgif.com/',
            },
            {
                icon: 'https://color.oulu.me/favicon.ico',
                title: 'CSS渐变2',
                desc: '180种免费的线性渐变,不仅可以复制渐变的原生CSS颜色代码，还可以查看下载每个优质的渐变图片',
                link: 'https://color.oulu.me/'
            }
        ]
    },
    {
        title: 'npm',
        desc: '免费的前端开源项目 CDN 加速服务',
        items: [
            {
                icon: 'https://cdn.cbd.int/favicon.ico',
                title: 'cbd',
                desc: 'npm镜像',
                link: 'https://cdn.cbd.int/'
            }, {
                icon: 'https://cdn.bytedance.com/src/res/favicon.png',
                title: '字节跳动静态资源公共库',
                link: 'https://cdn.bytedance.com/',
                desc: '字节跳动静态资源公共库',
            }, {
                icon: 'https://www.bootcdn.cn/assets/ico/favicon.ico',
                title: 'bootcdn',
                desc: '稳定、快速、免费的前端开源项目 CDN 加速服务',
                link: 'https://www.bootcdn.cn/'
            }, {
                icon: 'https://www.jsdelivr.com/favicon.ico',
                title: 'jsDelivr',
                link: 'https://www.jsdelivr.com/',
                desc: 'jsDelivr 是一个免费、快速且可靠的 npm 和 GitHub 开源 CDN。大多数 GitHub 链接可以轻松转换为 jsDelivr 链接。',
            },
        ]
    }, {
        title: 'Vue 生态',
        desc: '一系列支持库和工具，可帮助开发者更快速、高效地构建现代化的Vue应用程序。',
        items: [
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue 3',
                desc: '渐进式 JavaScript 框架',
                link: 'https://cn.vuejs.org'
            },
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue 2',
                desc: '渐进式 JavaScript 框架',
                link: 'https://v2.cn.vuejs.org'
            },
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue Router',
                desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
                link: 'https://router.vuejs.org/zh'
            },
            {
                icon: 'https://pinia.vuejs.org/logo.svg',
                title: 'Pinia',
                desc: '符合直觉的 Vue.js 状态管理库',
                link: 'https://pinia.vuejs.org/zh'
            },
            {
                icon: 'https://nuxt.com/icon.png',
                title: 'Nuxt.js',
                desc: '一个基于 Vue.js 的通用应用框架',
                link: 'https://nuxt.com'
            },
            {
                icon: 'https://vueuse.org/favicon.svg',
                title: 'VueUse',
                desc: 'Vue Composition API 的常用工具集',
                link: 'https://vueuse.org'
            },
            {
                icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
                title: 'Element Plus',
                desc: '基于 Vue 3，面向设计师和开发者的组件库',
                link: 'https://element-plus.org'
            },
            {
                icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
                title: 'Ant Design Vue',
                desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
                link: 'https://antdv.com'
            },
            {
                icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
                title: 'Vant',
                desc: '轻量、可定制的移动端 Vue 组件库',
                link: 'https://vant-ui.github.io/vant'
            },
            {
                icon: 'https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico',
                title: 'Cube UI',
                desc: '基于 Vue.js 实现的精致移动端组件库',
                link: 'https://didi.github.io/cube-ui'
            },
            {
                icon: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
                title: 'NutUI',
                desc: '京东风格的轻量级移动端组件库',
                link: 'https://nutui.jd.com'
            }
        ]
    },]