<script setup lang="ts">
const { twitterBorderColor, defaultTransition } = useTailwindConfig()

const wrapperClasses = computed(() => `${defaultTransition} ${twitterBorderColor}`)
</script>

<template>
  <div
    class="px-2 hover:bg-gray-100 cursor-default dark:hover:bg-white/5 border-b"
    :class="wrapperClasses"
  >
    <slot></slot>
  </div>
</template>
