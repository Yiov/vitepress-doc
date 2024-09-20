<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)

function closeBulletin() {
    visible.value = false
}

setTimeout(function(){ visible.value = false }, 5000);
</script>

<template>
    <div v-if="visible" class="bulletin-wrapper" style="width: 300px;">

        <div class="bulletin-title">
            <span class="bulletin-icon left">
                <svg class="bulletin-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" style="width: 20px; height: 20px; font-size: 20px; color: rgb(255, 255, 255);"><path d="M27.16 8.08l-1.53 1.29a10 10 0 0 1-.29 13.23l1.47 1.4a12 12 0 0 0 .35-15.88z" fill="currentColor"></path><path d="M21.58 12a6 6 0 0 1-.18 7.94l1.47 1.36a8 8 0 0 0 .23-10.59z" fill="currentColor"></path><path d="M18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0a1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1zM4 20h6.08a1 1 0 0 1 .71.3L17 26.57V5.43l-6.21 6.27a1 1 0 0 1-.71.3H4z" fill="currentColor"></path></svg>
                <span>公告</span>
            </span>
            <svg class="btn-close" @click="closeBulletin" t="1573745677073" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4448" width="22" height="22"><path d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0" p-id="4449"></path></svg>
        </div>

        <div class="bulletin-content">
            <h3 class="bulletin-h3">本次更新：</h3>
            <p class="bulletin-p">公告样式，参考自 <a class="bulletin-link" href="https://theme-reco.vuejs.press/" target="_blank">VuePress-Reco</a></p>
            <p class="bulletin-p">QQ 频道：******(无效二维码)</p>
            <img class="bulletin-img" src="/qrcode.png">
            <hr>
            <div class="btn-group">
                <a class="btn" href="https://vitepress.dev/zh/" target="_blank">官网</a>
            </div>
        </div>
    </div>
</template>


<style>
.bulletin-wrapper {
    position: fixed;
    top: 5rem;
    right: 1rem;
    z-index: 30;
    box-sizing: border-box;
    border-radius: 1.2rem;
    overflow-y: auto;
    background-color: #1b1446;
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}


.bulletin-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(255 255 255);
    padding: 1rem;
}


.bulletin-icon {
    display: inline-flex;
}

.bulletin-icon.left {
    flex-direction: row;
    align-items: center
}

.bulletin-icon.left>svg {
    margin-right: .375rem
}


.btn-close {
    cursor: pointer;
    fill: currentColor;
}


.bulletin-content {
    padding: 1.5rem 2rem;
    background-color: #ffffff;
}


.bulletin-h3 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: #000000;
    font-size: 19px;
    font-weight: bolder;
}

.bulletin-p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: #000000;
    font-size: 16px;
}


.bulletin-link {
    color: red;
}


.bulletin-img {
    width: 100%
}


hr {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-top-width: 1px;
    border-style: solid;
    border-color: #1b1446;
}

.btn-group {
    text-align: center
}


.btn {
    display: inline-block;
    height: 3.5rem;
    width: 3.5rem;
    cursor: pointer;
    border-radius: 50%;
    background-color: #1b1446;
    text-align: center;
    line-height: 3.5rem;
    color: #ffffff;
}
</style>