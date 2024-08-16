<script setup lang="ts">
import { useData } from 'vitepress'
const { page } = useData()
</script>

<template>
  <div class="LastUpdated">
    <p>更新时间: {{ page.lastUpdated }}</p>
  </div>
</template>

<style>
.LastUpdated {
  color: var(--vp-c-text-2);
}
</style>
