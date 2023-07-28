<script setup lang="ts">
interface Props {
  tweet: any
}

const props = defineProps<Props>()
const { twitterBorderColor } = useTailwindConfig()

</script>

<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    <div class="ml-16">
      <p class="flex-shrink font-medium text-gray-800 dark:text-white w-auto">
        {{ props.tweet.text }}
      </p>
      <div
        v-for="image in tweet.mediaFiles"
        :key="image.id"
        :class="`${twitterBorderColor} flex my-3 mr-2 border-2 rounded-2xl overflow-hidden`"
      >
        <img :src="image.url" class="w-full bg-cover rounded-2xl" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
