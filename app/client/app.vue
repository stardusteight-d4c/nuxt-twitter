<script setup lang="ts">
const { initAuth } = useAuth()
const emitter = useEmitter()
const darkMode = ref(true)
const path = ref(useRoute().fullPath)

onBeforeMount(() => {
  initAuth()
})

emitter.$on("toggle_dark_mode", () => {
  darkMode.value = !darkMode.value
})
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="wrapper">
      <NuxtPage :key="path" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  @apply bg-background-light dark:bg-background-dark;
}
</style>
