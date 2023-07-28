<script setup lang="ts">
const { twitterBorderColor, defaultTransition } = useTailwindConfig()

const wrapperClasses = computed(() => `${defaultTransition} ${twitterBorderColor}`)
</script>

<template>
  <div
    class="p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-blue-200/5 border-b"
    :class="wrapperClasses"
  >
    <slot></slot>
  </div>
</template>
