<script setup lang="ts">
import { useData } from 'vitepress'
import { computed,} from 'vue'
const { page } = useData()

const date = computed(
  () => new Date(page.value.lastUpdated!)
)


</script>

<template>
  <div class="LastUpdated">
    <!-- <p>更新时间: {{ a }}</p> -->
    <pre>{{ date.toLocaleString() }}</pre>
  </div>
</template>

<style>
.LastUpdated {
  color: var(--vp-c-text-2);
}
</style>
