<script setup lang="ts">
const { openPostTweetModal } = useTweets()

interface Props {
  isOpen: boolean
}

defineProps<Props>()
const {twitterBorderColor} = useTailwindConfig()
const emits = defineEmits(["onClose"])
const emitter = useEmitter()

function closeModal() {
  emits("onClose")
}

emitter.$on("replyTweet", (tweet: any) => {
  openPostTweetModal(tweet)
})
</script>

<template>
  <div v-if="isOpen" class="fixed w-screen h-screen overflow-hidden inset-0">
    <div
      @click="closeModal"
      class="fixed z-[80] bg-black/50 w-screen h-screen overflow-hidden inset-0"
    />
    <div
      :class="`${twitterBorderColor} max-w-[500px] max-h-screen overflow-y-scroll w-full border z-[100] bg-white dark:bg-background-dark text-black dark:text-white rounded-xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-md shadow-black/20 dark:shadow-black/80`"
    >
      <slot></slot>
    </div>
  </div>
</template>
