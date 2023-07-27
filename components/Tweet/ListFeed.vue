<script setup lang="ts">
interface Props {
  tweets: any[]
}

const props = defineProps<Props>()
</script>

<template>
  <h1>ListFeed</h1>
  <ul>
    <li v-for="tweet in props.tweets">
      {{ tweet }}
    </li>
  </ul>
</template>

<style scoped></style>
