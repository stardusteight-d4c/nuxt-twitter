<script setup lang="ts">
interface Props {
  tweet: any
  compact?: boolean
  hideActions?: boolean
}

const props = defineProps<Props>()
const compact = props.compact ?? false
const hideActions = props.hideActions ?? false
const { twitterBorderColor } = useTailwindConfig()
const emitter = useEmitter()

function handleCommentClick() {
  emitter.$emit("replyTweet", props.tweet)
}

const tweetBodyWrapper = computed(() => (compact ? "ml-16" : "ml-2 mt-4"))
const textSize = computed(() => (compact ? "text-base" : "text-2xl"))
</script>

<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    <div :class="tweetBodyWrapper">
      <p
        style="white-space: break-spaces; word-wrap: break-word"
        :class="`${textSize} pl-1 flex-shrink font-medium text-gray-800 dark:text-white w-auto`"
      >
        {{ props.tweet.text }}
      </p>
      <div
        v-for="image in tweet.mediaFiles"
        :key="image.id"
        :class="`${twitterBorderColor} flex my-3 mr-2 border-b-2 rounded-2xl overflow-hidden`"
      >
        <img :src="image.url" class="w-full bg-cover rounded-2xl" />
      </div>
      <div class="mt-2" v-if="!hideActions">
        <TweetItemActions
          :tweet="tweet"
          :compact="compact"
          @on-comment-click="handleCommentClick"
        />
      </div>
    </div>
  </div>
</template>
