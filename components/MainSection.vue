<script setup lang="ts">
interface IProps {
  title: string
  loading: boolean
}
defineProps<IProps>()

const { twitterBorderColor } = useTailwindConfig()
</script>

<template>
  <div :class="`${twitterBorderColor} border-x`">
    <div
      class="glassmorphism sticky top-0 px-4 py-3 bg-background-light/80 dark:bg-background-dark/80 z-50"
    >
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {{ title }}
      </h2>
    </div>
    <div
      v-if="loading"
      :class="`${twitterBorderColor} flex items-center justify-center p-4 border-b`"
    >
      <UISpinner />
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>
