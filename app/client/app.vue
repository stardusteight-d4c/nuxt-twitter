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
    <div class="bg-background-light dark:bg-background-dark min-h-screen">
      <NuxtPage :key="path" />
    </div>
  </div>
</template>
