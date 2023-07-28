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
    class="flex items-center py-2 px-3 w-full hover:bg-gray-200 dark:hover:bg-blue-200/5 text-black dark:text-white rounded-full cursor-pointer"
    :class="defaultTransition"
  >
    <div class="w-6 h-6" :class="defaultTransition">
      <slot name="icon"></slot>
    </div>
    <div class="ml-4 text-xl hidden xl:block -mt-1" :class="textClasses">
      <slot name="name"></slot>
    </div>
  </next-link>
</template>
