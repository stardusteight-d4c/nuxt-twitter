<script setup lang="ts">
interface IProps {
  title: string
}
defineProps<IProps>()

const { twitterBorderColor, defaultTransition } = useTailwindConfig()
</script>

<template>
  <div
    :class="`${twitterBorderColor} m-2 border rounded-2xl bg-gray-50 dark:bg-dim-900 overflow-hidden`"
  >
    <h1
      :class="`${twitterBorderColor} p-3 text-xl font-extrabold text-gray-900 dark:text-white border-b`"
    >
      {{ title }}
    </h1>
    <slot></slot>
    <div
      :class="`${defaultTransition} p-3 text-sm text-blue-400 cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-blue-200/5`"
    >
      Show more
    </div>
  </div>
</template>
