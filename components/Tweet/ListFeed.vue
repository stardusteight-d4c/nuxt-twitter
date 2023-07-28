<script setup lang="ts">
interface Props {
  tweets: any[]
}

const props = defineProps<Props>()
const { twitterBorderColor, defaultTransition } = useTailwindConfig()
const isEmptyArray = computed(() => props.tweets.length === 0)
</script>

<template>
  <div class="min-h-screen">
    <div v-if="isEmptyArray" class="p-4 h-full">
      <p class="text-center text-gray-500 text-2xl">No tweets 🥺</p>
    </div>

    <div
      v-else
      v-for="tweet in props.tweets"
      :class="`${twitterBorderColor} ${defaultTransition} cursor-pointer pb-4 border-b hover:bg-gray-100 dark:hover:bg-white/[0.02]`"
    >
      <TweetItem :tweet="tweet" :key="tweet.id" />
    </div>
  </div>
</template>

<style scoped></style>
