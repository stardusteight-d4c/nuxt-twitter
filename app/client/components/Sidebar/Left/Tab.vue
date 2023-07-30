<script setup lang="ts">
interface IProps {
  active: boolean
}
const props = defineProps<IProps>()

const { defaultTransition } = useTailwindConfig()
const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
)
</script>

<template>
  <next-link
    to="#"
    :class="`${defaultTransition} flex items-center py-2 px-3 w-full hover:bg-gray-200 dark:hover:bg-white/5 text-black dark:text-white rounded-full cursor-pointer`"
  >
    <div class="w-6 h-6">
      <slot name="icon"></slot>
    </div>
    <div :class="`${textClasses} ml-4 text-xl hidden xl:block -mt-1`">
      <slot name="name"></slot>
    </div>
  </next-link>
</template>
