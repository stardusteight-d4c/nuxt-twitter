<script setup lang="ts">
interface Props {
  color: string
}

const props = defineProps<Props>()

const { defaultTransition } = useTailwindConfig()
</script>

<template>
  <div class="flex items-center text-gray-400 cursor-pointer group w-fit">
    <div
      :class="`${defaultTransition} p-2 rounded-full group-hover:bg-${props.color}-100 group-hover:text-${props.color}-500 dark:group-hover:bg-opacity-20`"
    >
      <slot name="icon" class="w-5 h-5" />
    </div>
    <span :class="`group-hover:text-${props.color}-500 ml-1`">
      <slot name="default"
    /></span>
  </div>
</template>
