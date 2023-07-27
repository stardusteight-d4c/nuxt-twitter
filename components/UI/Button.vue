<script setup lang="ts">
interface Props {
  disable?: boolean
  size?: "sm" | "md" | "lg"
  // liquid: boolean
}

const props = defineProps<Props>()
const disable = props.disable ?? false
const size = props.size ?? "md"
// const liquid = props.liquid ?? false

const paddingStyles = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-2"
    case "md":
      return "px-4 py-2"
    case "lg":
      return "px-6 py-2"
  }
})

const fontSizeStyles = computed(() => {
  switch (props.size) {
    case "sm":
      return "text-base"
    case "md":
      return "text-base"
    case "lg":
      return "text-md"
  }
})

const styles = computed(() => `${paddingStyles.value} ${fontSizeStyles.value}`)
</script>

<template>
  <button
    :class="`${styles} flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-sm disabled:bg-blue-300 disabled:cursor-not-allowed`"
    :disabled="disable"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
