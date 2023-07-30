<script setup lang="ts">
interface Props {
  disable?: boolean
  size?: "sm" | "md" | "lg"
  liquid?: boolean
  type?: "icon" | "text"
}

const props = defineProps<Props>()
const disable = props.disable ?? false
const size = props.size ?? "md"
const liquid = props.liquid ?? false
const type = props.type ?? "text"

const paddingStyles = computed(() => {
  switch (size) {
    case "sm":
      return "px-3 py-2"
    case "md":
      return "px-4 py-2"
    case "lg":
      return "px-6 py-2"
  }
})

const textStyles = computed(() => {
  switch (size) {
    case "sm":
      return "text-base font-medium"
    case "md":
      return "text-base font-semibold"
    case "lg":
      return "text-md font-bold"
  }
})

const widthStyles = computed(() => {
  switch (liquid) {
    case false:
      return "w-fit"
    case true:
      return "w-full"
  }
})

const styles = computed(
  () => `${paddingStyles.value} ${textStyles.value} ${widthStyles.value}`
)
</script>

<template>
  <button
    :class="`${
      type === 'text' && styles
    } rounded-full flex justify-center text-white bg-blue-400 hover:bg-blue-500 font-sm disabled:bg-blue-400 disabled:opacity-80 disabled:cursor-not-allowed`"
    :disabled="disable"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

