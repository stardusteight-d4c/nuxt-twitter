<script setup lang="ts">
const { initAuth } = useAuth()
const emitter = useEmitter()
const darkMode = ref(true)
const route = useRoute()
const path = ref(route.fullPath)

onBeforeMount(async () => {
  await initAuth()
})

emitter.$on("toggleDarkMode", () => {
  darkMode.value = !darkMode.value
})

console.log('path', path);
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-background-light dark:bg-background-dark">
      <NuxtPage :key="path" />
    </div>
  </div>
</template>
