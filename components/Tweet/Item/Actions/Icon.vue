<script setup lang="ts">
interface Props {
  color: string
  size?: number
}

const props = defineProps<Props>()
const size = props.size ?? 5

const { defaultTransition } = useTailwindConfig()
</script>

<template>
  <div class="flex items-center text-gray-400 cursor-pointer group w-fit">
    <div
      :class="`${defaultTransition} p-2 rounded-full group-hover:bg-${props.color}-300/20 group-hover:text-${props.color}-500`"
    >
      <slot name="icon" :classes="`w-${size} h-${size}`" />
    </div>
    <span :class="`group-hover:text-${props.color}-500 ml-1`">
      <slot name="default"
    /></span>
  </div>
</template>
