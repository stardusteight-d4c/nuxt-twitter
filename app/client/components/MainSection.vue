<script setup lang="ts">
interface IProps {
  title: string
}
defineProps<IProps>()
</script>

<template>
  <div>
    <div
      class="glassmorphism min-sticky top-0 px-4 py-3 bg-background-light/80 dark:bg-background-dark/80 z-50"
    >
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {{ title }}
      </h2>
    </div>
    <div class="min-h-screen">
      <slot></slot>
    </div>
  </div>
</template>
