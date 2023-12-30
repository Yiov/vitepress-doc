<template>
    <div id="article-container" class="flink">
      <div v-for="(item, index) in datas" :key="index">
        <h2 :id="item.title" tabindex="-1">{{ item.title }}</h2>
        <div class="flink-desc">{{ item.desc }}</div>
        <div class="flink-list">
          <div v-for="(item2, index2) in item.items" :key="index2" class="flink-list-item"><a :href="item2.link"
              :title="item2.title" rel="external nofollow" target="_blank"><img :data-lazy-src="item2.icon"
                :src="item2.icon" alt="chatGPT" class="flink-avatar entered loaded" data-ll-status="loaded"
                onerror="this.onerror=null;this.src='https://bu.dusays.com/2023/03/03/6401a7902b8de.png'">
              <div class="img-alt is-center">{{ item2.title }}</div>
              <div class="flink-item-info"><span class="flink-item-name">{{ item2.title }}</span><span :title="item2.desc"
                  class="flink-item-desc">{{ item2.desc }}</span></div>
            </a></div>
        </div>
  
      </div>
    </div>
</template>
  
<script lang="ts" setup>
  import { NAV_DATA } from '../untils/data-ahua'
  const datas: any = NAV_DATA
</script>
  
<style>
  :root {
    --star-white: #fff;
    --star-white-op: rgba(255, 255, 255, 0.2);
    --star-black: #000;
    --star-black-op: rgba(0, 0, 0, 0.2);
    --star-none: #00000000;
    --star-gray: #999999;
    --star-gray-op: #9999992b;
    --star-vip: #e5a80d;
    --star-main: var(--star-theme);
    --star-main-op: var(--star-theme-op);
    --star-main-op-deep: var(--star-theme-op-deep);
    --star-main-none: var(--star-theme-none);
    --star-shadow-theme: 0 8px 12px -3px var(--star-theme-op);
    --star-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, .15);
    --star-shadow-main: 0 8px 12px -3px var(--star-main-op);
    --star-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, .20);
    --star-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, .20);
    --star-shadow-black: 0 0 12px 4px rgba(0, 0, 0, .05);
    --star-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, .12);
    --star-shadow-red: 0 8px 12px -3px #ee7d7936;
    --star-shadow-green: 0 8px 12px -3px #87ee7936;
    --star-logo-color: linear-gradient(215deg, #4584ff 0%, #cf0db9 100%);
    --star-snackbar-time: 5s;
    --star-theme: #425AEF;
    --star-theme-op: #4259ef23;
    --star-theme-op-deep: #4259efdd;
    --star-theme-none: #4259ef01;
    --star-blue: #425AEF;
    --star-red: #f04a63;
    --star-pink: #FF7C7C;
    --star-green: #57bd6a;
    --star-yellow: #c28b00;
    --star-yellow-op: #d99c001a;
    --star-orange: #e38100;
    --star-fontcolor: #363636;
    --star-background: #f7f9fe;
    --star-reverse: #000;
    --star-maskbg: rgba(255, 255, 255, 0.6);
    --star-maskbgdeep: rgba(255, 255, 255, 0.85);
    --star-hovertext: var(--star-main);
    --star-ahoverbg: #F7F7FA;
    --star-lighttext: var(--star-main);
    --star-secondtext: rgba(60, 60, 67, 0.8);
    --star-scrollbar: rgba(60, 60, 67, 0.4);
    --star-card-btn-bg: #edf0f7;
    --star-post-blockquote-bg: #fafcff;
    --star-post-tabs-bg: #f2f5f8;
    --star-secondbg: #f1f3f8;
    --star-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --star-card-bg: #fff;
    --star-card-bg-op: var(--star-black-op);
    --star-card-bg-none: rgba(255, 255, 255, 0);
    --star-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-card-border: #e3e8f7;
    --star-shadow-border: 0 8px 16px -4px #2c2d300c;
    --style-border: 1px solid var(--star-card-border);
    --style-border-always: 1px solid var(--star-card-border);
    --style-border-hover: 1px solid var(--star-main);
    --style-border-hover-always: 1px solid var(--star-main);
    --style-border-dashed: 1px dashed var(--star-theme-op);
    --style-border-forever: 2px solid var(--star-main);
  }

  ::selection {
    background: var(--star-fontcolor);
    color: var(--star-background);
  }

  [class=light] {
    --star-theme: #425AEF;
    --star-theme-op: #4259ef23;
    --star-theme-op-deep: #4259efdd;
    --star-theme-none: #4259ef01;
    --star-blue: #425AEF;
    --star-red: #f04a63;
    --star-pink: #FF7C7C;
    --star-green: #57bd6a;
    --star-yellow: #c28b00;
    --star-yellow-op: #d99c001a;
    --star-orange: #e38100;
    --star-fontcolor: #363636;
    --star-background: #f7f9fe;
    --star-reverse: #000;
    --star-maskbg: rgba(255, 255, 255, 0.6);
    --star-maskbgdeep: rgba(255, 255, 255, 0.85);
    --star-hovertext: var(--star-main);
    --star-ahoverbg: #F7F7FA;
    --star-lighttext: var(--star-main);
    --star-secondtext: rgba(60, 60, 67, 0.8);
    --star-scrollbar: rgba(60, 60, 67, 0.4);
    --star-card-btn-bg: #edf0f7;
    --star-post-blockquote-bg: #fafcff;
    --star-post-tabs-bg: #f2f5f8;
    --star-secondbg: #f1f3f8;
    --star-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --star-card-bg: #fff;
    --star-card-bg-op: var(--star-black-op);
    --star-card-bg-none: rgba(255, 255, 255, 0);
    --star-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --star-card-border: #e3e8f7;
    --star-shadow-border: 0 8px 16px -4px #2c2d300c;
    --style-border: 1px solid var(--star-card-border);
    --style-border-always: 1px solid var(--star-card-border);
    --style-border-hover: 1px solid var(--star-main);
    --style-border-hover-always: 1px solid var(--star-main);
    --style-border-dashed: 1px dashed var(--star-theme-op);
    --style-border-forever: 2px solid var(--star-main);
  }

  [class=dark] {
    --star-theme: #f2b94b;
    --star-theme-op: #f2b94b23;
    --star-theme-op-deep: #f2b94bdd;
    --star-theme-none: #f2b94b00;
    --star-blue: #0084FF;
    --star-red: #FF3842;
    --star-pink: #d44040;
    --star-green: #3e9f50;
    --star-yellow: #ffc93e;
    --star-yellow-op: #ffc93e30;
    --star-orange: #ff953e;
    --star-fontcolor: #F7F7FA;
    --star-background: #18171d;
    --star-reverse: #fff;
    --star-maskbg: rgba(0, 0, 0, 0.6);
    --star-maskbgdeep: rgba(0, 0, 0, 0.85);
    --star-hovertext: #0A84FF;
    --star-ahoverbg: #fff;
    --star-lighttext: var(--star-theme);
    --star-secondtext: #a1a2b8;
    --star-scrollbar: rgba(200, 200, 223, 0.4);
    --star-card-btn-bg: #30343f;
    --star-post-blockquote-bg: #000;
    --star-post-tabs-bg: #121212;
    --star-secondbg: #30343f;
    --star-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --star-card-bg: #1d1e22;
    --star-card-bg-op: var(--star-white-op);
    --star-card-bg-none: #1d1b2600;
    --star-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --star-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --star-card-border: #3d3d3f;
    --star-shadow-border: 0 8px 16px -4px #00000050;
    --style-border: 1px solid var(--star-card-border);
    --style-border-always: 1px solid var(--star-card-border);
    --style-border-hover: 1px solid var(--star-theme);
    --style-border-hover-always: 1px solid var(--star-theme);
    --style-border-dashed: 1px dashed var(--star-theme-op);
    --style-border-forever: 2px solid var(--star-lighttext);
  }

  .is-center {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
  }

  .img-alt {
    font-size: 12px;
    margin: 0;
    color: var(--star-secondtext);
  }

  .flink-list>.flink-list-item a .img-alt {
    display: none;
  }

  .flink-list {
    overflow: auto;
    padding: 10px 10px 0px;
    text-align: center;
  }

  .flink-list>.flink-list-item a .flink-item-desc {
    display: block;
    padding: 4px 10px 0px 0px;
    height: 50px;
    font-size: 0.93em;
  }

  .flink-list>.flink-list-item a {
    color: var(--star-fontcolor);
    text-decoration: none;
  }

  /* 炙焰友链间距 */
  .flink-list {
    padding: 0;
    margin: 0.5rem -6px 1rem -6px;
    overflow-x: hidden;

  }

  .flink-desc {
    margin: 0;
    color: var(--star-secondtext);
  }

  .flink-desc {
    margin: 0.2rem 0px 0.5rem;
  }

  /* 友情描述 */
  .flink-list>.flink-list-item a .flink-item-desc {
    white-space: normal;
    padding: 5px 10px 16px 0;
    color: var(--star-fontcolor);
    text-align: left;
    height: 40px;
    text-overflow: ellipsis;
    opacity: 0.7;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .flink-list>.flink-list-item:hover a .flink-item-desc {
    color: var(--star-white);
  }

  /* 友链标题 */
  .flink-list-item .flink-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 90px);
    height: fit-content;
  }

  .flink-list-item:hover .flink-item-info {
    min-width: calc(100% - 20px);
  }

  .flink-list>.flink-list-item a .flink-item-name {
    text-align: left;
    font-size: 19px;
    line-height: 20px;
    color: var(--star-fontcolor);
  }

  .flink-list>.flink-list-item:hover a .flink-item-name {
    color: var(--star-white);
  }

  .flink-list>.flink-list-item a {
    display: flex;
    border: none;
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .flink-list>.flink-list-item a:hover {
    background: none;
  }

  #article-container img {
    display: block;
    margin: 0px auto 0.8rem;
  }

  img {
    max-width: 100%;
    transition: all 0.2s ease 0s;
    border-style: none;
  }

  #article-container img {
    border-radius: 32px;
    margin-bottom: 0.5rem;
    object-fit: cover;
  }

  .flink-list>.flink-list-item a img {
    float: left;
    margin: 15px 10px;
    width: 60px;
    height: 60px;
    border-radius: 35px;
    transition: all 0.3s ease 0s;
  }

  /* 友链头像 */
  .flink-list>.flink-list-item a img {
    border-radius: 32px;
    margin: 15px 20px 15px 15px;
    transition: 0.3s;
    background: var(--star-background);
    min-width: 60px;
    min-height: 60px;
  }


  /* 悬浮状态头像 */
  .flink-list>.flink-list-item:hover a img {
    transition: 0.6s;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0.5rem;
    min-width: 0px;
    min-height: 0px;
  }

  /* 标题和描述 */
  .flink-list-item a span {
    transition: 0.3s;
  }

  /* 友链描述 */
  .flink-list-item:hover a .flink-item-desc {
    overflow: hidden;
    width: 100%;
  }


  #article-container.flink {
    margin-top: 1rem;
  }

  .flink#article-container .flink-desc {
    margin: 0.2rem 0px 0.5rem;
  }

  .flink#article-container .flink-list {
    overflow: auto;
    padding: 10px 10px 0px;
    text-align: center;
  }

  @media screen and (max-width: 1200px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(25% - 12px) !important;
    }
  }

  @media screen and (max-width: 1024px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(33.3333% - 12px) !important;
    }
  }

  @media screen and (max-width: 768px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(50% - 12px) !important;
    }
  }

  @media screen and (max-width: 600px) {
    .flink#article-container .flink-list>.flink-list-item {
      width: calc(100% - 12px) !important;
    }
  }

  /* 修改初始动画 */
  .flink#article-container .flink-list>.flink-list-item {
    margin: 6px 6px;
    transition: 0.3s;
    border-radius: 12px;
    transition-timing-function: ease-in-out;
    position: relative;
    width: calc(20% - 12px);
    border: var(--style-border);
    box-shadow: var(--star-shadow-border);
    background: var(--star-card-bg);
    display: flex;
  }

  .flink#article-container .flink-list>.flink-list-item {
    position: relative;
    float: left;
    overflow: hidden;
    margin: 15px 7px;
    width: calc(25% - 12px);
    height: 90px;
    border-radius: 5px;
    line-height: 17px;
    transform: translateZ(0px);
    transition: all 0.3s ease 0s;
  }

  /* 修改初始动画 */
  .flink#article-container .flink-list>.flink-list-item {
    margin: 6px 6px;
    transition: 0.3s;
    border-radius: 12px;
    transition-timing-function: ease-in-out;
    position: relative;
    width: calc(20% - 12px);
    border: var(--style-border);
    box-shadow: var(--star-shadow-border);
    background: var(--star-card-bg);
    display: flex;
  }

  .flink#article-container .flink-list>.flink-list-item:hover {
    transform: scale(1);
    background: var(--star-theme);
    border: var(--style-border-hover);
    box-shadow: var(--star-shadow-main);
  }

  .flink#article-container .site-card .img img {
    width: 100%;
    height: 100%;
    transition: transform 2s ease 0s;
    object-fit: cover;
  }

  .flink#article-container .site-card .info {
    margin-top: 8px;
  }

  .flink#article-container .site-card .info img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    float: left;
    margin-right: 8px;
    margin-top: 2px;
  }

  .flink#article-container .site-card .info span {
    display: block;
  }

  .flink#article-container .site-card .info .title {
    font-weight: 600;
    color: rgb(68, 68, 68);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    transition: all 0.3s ease 0s;
  }

  .flink#article-container .site-card .info .desc {
    overflow-wrap: break-word;
    line-height: 1.2;
    color: rgb(136, 136, 136);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
  }

  .flink#article-container .site-card .img {
    transition: all 0.3s ease 0s;
  }

  .flink#article-container .site-card .img-alt {
    display: none;
  }

  .flink#article-container .site-card:hover .info .title {
    color: rgb(255, 87, 34);
  }

  .flink-list>.flink-list-item:hover {
    transform: scale(1);
    background: var(--star-theme);
    border: var(--style-border-hover);
    box-shadow: var(--star-shadow-main);
  }

  .gallery-group figcaption p {
    line-height: 1.5 !important;
  }

  /* 超级博主友链 */

  /* 超级博主标题 */

  .site-card .info .title {
    color: var(--star-fontcolor);
    text-align: left;
  }

  .site-card:hover .info .title {
    color: var(--star-white);
    box-shadow: var(--star-shadow-blue);
  }

  .site-card:hover .info {
    height: 120px;
  }

  .site-card .site-card-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }


  /* 超级博主描述 */
  .site-card .info .desc {
    font-size: 0.7rem;
    color: var(--star-fontcolor);
    opacity: 0.7;
    transition: 0.3s;
    text-align: left;
  }

  .site-card:hover .info .desc {
    -webkit-line-clamp: 4;
  }

  .site-card:hover .info .desc {
    transition: 0.3s;
    color: var(--star-white);
    width: 100%
  }

  .site-card:hover .info {
    background: var(--star-theme);
  }

  /* 背景 */
  .site-card {
    border: var(--style-border);
    border-radius: 12px;
    transition: 0.3s;
    transition-timing-function: ease-in-out;
    overflow: hidden;
    height: 200px;
    position: relative;
    width: calc(100% / 7 - 16px);
    background: var(--star-card-bg);
    box-shadow: var(--star-shadow-border);
  }

  .site-card-tag {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4px 8px;
    background-color: var(--star-blue);
    box-shadow: var(--star-shadow-blue);
    color: var(--star-white);
    z-index: 1;
    border-radius: 12px 0 12px 0;
    transition: 0.3s;
    font-size: 0.6rem;
  }

  .site-card-tag.vip {
    /*! Edit and share this gradient: https://html5kit.com/gradient-editor/?preset=d48f16,100;e5b085,0 */
    background: -moz-linear-gradient(38deg, rgba(229, 176, 133, 1) 0%, rgba(212, 143, 22, 1) 100%);
    /* FF3.6+ */
    background: -webkit-linear-gradient(38deg, rgba(229, 176, 133, 1) 0%, rgba(212, 143, 22, 1) 100%);
    /* Chrome10-25, Safari5.1-6 */
    background: linear-gradient(38deg, rgba(229, 176, 133, 1) 0%, rgba(212, 143, 22, 1) 100%);
    /* W3C, IE10+, Firefox16+, Chrome26+, Opera12+, Safari7+ */
    overflow: hidden;
    box-shadow: var(--star-shadow-yellow);
  }

  .light {
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 100px;
    height: 50px;
    background-image: -moz-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    background-image: -webkit-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    -webkit-animation: light_tag 4s both infinite;
    -moz-animation: light_tag 4s both infinite;
    -ms-animation: light_tag 4s both infinite;
    animation: light_tag 4s both infinite;
  }

  @keyframes light_tag {
    0% {
      transform: skewx(0deg);
      -o-transform: skewx(0deg);
      -moz-transform: skewx(0deg);
      -webkit-transform: skewx(0deg);
      left: -150px;
    }

    99% {
      transform: skewx(-25deg);
      -o-transform: skewx(-25deg);
      -moz-transform: skewx(-25deg);
      -webkit-transform: skewx(-25deg);
      left: 50px;
    }
  }

  .site-card-tag.speed {
    background: var(--star-green);
    box-shadow: var(--star-shadow-green);
  }

  .site-card:hover .site-card-tag {
    left: -50px;
  }


  .flink-list-item:hover .site-card-tag {
    left: -70px;
  }

  .site-card .info {
    display: flex;
    border: none;
    padding: 0.5rem;
    width: 100%;
    height: 90px;
    margin: 0;
    border-radius: 0 0 12px 12px;
  }

  /* 修复图片圆角 */
  .site-card .img img {
    border-radius: 0;
    transform: scale(1.03);
    transition: 0.3s;
  }

  @media screen and (min-width: 769px) {
    .site-card:hover .img img {
      transform: scale(1.1);
      filter: brightness(0.3);
    }

    .site-card:hover .img {
      height: 80px;
    }
  }


  .site-card .img {
    -webkit-mask-image: -webkit-radial-gradient(center, rgb(255, 255, 255), rgb(0, 0, 0));
    border-radius: 0;
    height: 120px;
    width: 100%;
    display: flex;
    border: none;
    padding: 0 !important;
  }


  /* 头像 */
  .site-card .info img {
    border-radius: 32px;
    transition: 0.3s !important;
    margin: 2px 8px 0 0;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    background: var(--star-secondbg);
  }


  /* 边距 */
  .site-card-group {
    padding: 20px 0;
  }

  .site-card:hover .info img {
    width: 0;
    height: 0;
    opacity: 0;
    min-width: 0;
    min-height: 0;
  }

  .site-card:hover {
    border: var(--style-border-hover);
    box-shadow: var(--star-shadow-main);
  }

  /* 友链文章 */
  .article-sort-item-info a {
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>