<script setup lang="ts">
interface Props {
  tweet: any
  compact?: boolean
}

const props = defineProps<Props>()
const compact = props.compact ?? false
const { twitterBorderColor } = useTailwindConfig()

const tweetBodyWrapper = computed(() => (compact ? "ml-16" : "ml-2 mt-4"))
const textSize = computed(() => (compact ? "text-base" : "text-2xl"))
</script>

<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    <div :class="tweetBodyWrapper">
      <p :class="`${textSize} flex-shrink font-medium text-gray-800 dark:text-white w-auto`">
        {{ props.tweet.text }}
      </p>
      <div
        v-for="image in tweet.mediaFiles"
        :key="image.id"
        :class="`${twitterBorderColor} flex my-3 mr-2 border-2 rounded-2xl overflow-hidden`"
      >
        <img :src="image.url" class="w-full bg-cover rounded-2xl" />
      </div>
      <div class="mt-2">
        <TweetItemActions :tweet="tweet" :compact="compact" />
      </div>
    </div>
  </div>
</template>
