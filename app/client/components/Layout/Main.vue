<script setup lang="ts">
const { useAuthUser, useAuthLoading } = useAuth()
const user = useAuthUser() as unknown as any
const {
  closePostTweetModal,
  openPostTweetModal,
  usePostTweetModal,
  useReplyTweet,
} = useTweets()
const { twitterBorderColor } = useTailwindConfig()
const isAuthLoading = useAuthLoading()
const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on("replyTweet", (tweet: any) => {
  openPostTweetModal(tweet)
})

const changeRouteCondition = () => {
  if (!user.value && !isAuthLoading.value) {
    useRouter().push({
      path: "/login",
    })
  }
}

watch(() => isAuthLoading.value, changeRouteCondition)
watch(() => user.value, changeRouteCondition)
</script>

<template>
  <UIFragment class="wrapper">
    <LoadingPage v-if="isAuthLoading" />
    <div v-if="!isAuthLoading && user">
      <div class="grid-container">
        <SidebarLeft :user="user" />
        <main :class="twitterBorderColor" class="main-content">
          <slot />
        </main>
        <SidebarRight />
      </div>
      <UIModal :isOpen="postTweetModal" @onClose="() => closePostTweetModal()">
        <TweetForm
          showReply
          :user="user"
          :reply-to="replyTweet"
          :placeholder="
            replyTweet?.id ? 'Tweet your reply' : 'What`s happening?'
          "
        />
      </UIModal>
    </div>
  </UIFragment>
</template>

<style scoped lang="postcss">
.wrapper {
  @apply min-h-screen;
}

.grid-container {
  @apply grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-1;
}

.main-content {
  @apply col-span-12 md:col-span-8 xl:col-span-6 h-full border;
}
</style>
