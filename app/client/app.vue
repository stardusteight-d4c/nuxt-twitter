<script setup lang="ts">
const darkMode = ref(true)
const emitter = useEmitter()

emitter.$on("toggleDarkMode", () => {
  darkMode.value = !darkMode.value
})
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-background-light dark:bg-background-dark">
      <NuxtPage :key="$route.fullPath" />
    </div>
  </div>
</template>
