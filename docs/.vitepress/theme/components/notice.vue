<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)

function closetz() {
    visible.value = false
}

setTimeout(function () { visible.value = false }, 5000);
</script>

<template>
    <div v-if="visible" class="notice-background" style="display: block;"></div>

    <div v-if="visible" class="notice">

        <h3 class="notice-title">网站公告</h3>

        <div class="notice-describe">
            <p style="text-align: center;">温馨提示：本窗口将在5秒后自动关闭</p>
            <p class="notice-domain">
                <strong>
                    最新网址：<a href="https://docs.qxiansen.online" target="_blank">docs.qxiansen.online</a>
                </strong>
            </p>
            <p>QQ 频道：乔先森的知识库</p>
            <img class="notice-img" src="https://alist.qxiansen.online/d/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/images/docs/qrcode.png?sign=Zx2eHsF7plr83aeSe9kIS-gygVTwkmNKQ9_ZoYKeS9g=:0">
        </div>

        <div class="notice-footer">
            <div class="notice-btn" @click="closetz">朕知道了</div>
        </div>

    </div>
</template>

<style scoped>
.notice-img {
    z-index: 9999
}

/* 全屏遮罩层 */
.notice-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 99;
    pointer-events: none;
}

/* 通知 */
.notice {
    z-index: 999;
    padding: 25px;
    background: #fff;
    width: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 18px;
    box-sizing: border-box;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05), 0 1.5rem 2.2rem rgba(0, 0, 0, 0.1);
}



@media (max-width: 640px) {
    .notice {
        width: 82%;
        padding: 25px;
    }
}

.notice-title {
    text-align: center;
    color: #3c3c3c;
    font-size: 20px;
    font-weight: 900;
}

.notice-describe p {
    color: #3c3c3c;
    padding: 10px 0;
    font-size: 15px;
}

.notice-describe p strong {
    color: #3c3c3c;
}

.notice-describe p a {
    color: #eb0e0e;
}

.notice-domain {
    background: #f3f5f7;
    text-align: center;
    border-radius: 10px;
}




/* 通知底部 */
.notice-footer {
    padding: 20px 0 0;
    text-align: center;
}

.notice-btn {
    text-align: center;
    cursor: pointer;
    border-radius: 50px;
    font-weight: 700;
    padding: 0 30px;
    color: #fff;
    background: linear-gradient(to right, #1e69f5 0%, #093ce5 100%);
    box-shadow: 0 10px 12px -4px rgb(0 0 0 / 40%);
    line-height: 40px;
    font-size: 14px;
    display: inline-block;
    text-wrap: nowrap;
}
</style>