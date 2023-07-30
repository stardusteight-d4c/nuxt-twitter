<script setup lang="ts">
interface IProps {
  title: string
}
defineProps<IProps>()

const { twitterBorderColor, defaultTransition } = useTailwindConfig()
</script>

<template>
  <div
    :class="`${twitterBorderColor} m-2 border rounded-2xl bg-gray-50 dark:bg-black overflow-hidden`"
  >
    <h1
      :class="`${twitterBorderColor} p-3 tracking-wide text-xl font-bold text-black dark:text-white border-b`"
    >
      {{ title }}
    </h1>
    <slot></slot>
    <div
      :class="`${defaultTransition} px-3 py-2 text-sm text-blue-400 hover:bg-fuchsia-50 dark:hover:bg-white/5`"
    >
      <span class="hover:underline cursor-pointer"> Show more </span>
    </div>
  </div>
</template>
