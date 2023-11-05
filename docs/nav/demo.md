---
layout: doc
layoutClass: m-nav-layout
sidebar: false
outline: [2, 3, 4]
---

<style src="./index.scss"></style>

<script setup>
import MNavLinks from './components/MNavLinks.vue'

import { NAV_DATA } from './data'
</script>


# 我的导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>