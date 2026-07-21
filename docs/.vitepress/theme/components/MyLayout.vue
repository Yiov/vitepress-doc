<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
import MouseClick from "./MouseClick.vue"
import MouseFollower from "./MouseFollower.vue"
import backtotop from "./backtotop.vue"
import notice from "./notice.vue"
import bsz from "./bsz.vue"

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  
  document.documentElement.style.setProperty('--v-x', `${x}px`)
  document.documentElement.style.setProperty('--v-y', `${y}px`)

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  await transition.ready

  const clipPath = isDark.value
    ? [
        `circle(${endRadius}px at ${x}px ${y}px)`,
        `circle(0px at ${x}px ${y}px)`
      ]
    : [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]

  document.documentElement.animate(
    { clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: isDark.value
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)'
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">
    <template #doc-footer-before>
      <backtotop />
    </template>
    <template #layout-top>
      <notice />
      <MouseFollower />
      <MouseClick />
    </template>
    <template #layout-bottom>
      <bsz />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}

.dark::view-transition-old(root) {
  z-index: 9999;
  clip-path: circle(0px at var(--v-x, 50%) var(--v-y, 50%));
}
.dark::view-transition-new(root) {
  z-index: 1;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

/* 修正因视图过渡导致的月牙图标偏移 */
.VPSwitchAppearance .check .icon {
  top: -2px;
}
</style>