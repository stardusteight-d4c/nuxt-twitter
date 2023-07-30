<script setup lang="ts">
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const user: any = useAuthUser()
const {
  closePostTweetModal,
  openPostTweetModal,
  usePostTweetModal,
  useReplyTweet,
} = useTweets()

onBeforeMount(() => {
  initAuth()
})
const isAuthLoading = useAuthLoading()
const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on("replyTweet", (tweet: any) => {
  openPostTweetModal(tweet)
})

function handleFormSuccess(tweet: any) {
  closePostTweetModal()
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

function handleUserLogout() {
  logout()
}

function handleModalClose() {
  closePostTweetModal()
}

function handleOpenTweetModal() {
  openPostTweetModal(null)
}
</script>

<template>
  <LoadingPage v-if="isAuthLoading" />
  <div
    v-else-if="user"
    class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-1"
  >
    <SidebarLeft
      @on-tweet="handleOpenTweetModal"
      @on-logout="handleUserLogout"
      :user="user"
    />
    <main class="col-span-12 md:col-span-8 xl:col-span-6">
      <slot />
    </main>
    <SidebarRight />
  </div>
  <AuthPage v-else />
  <UIModal :isOpen="postTweetModal" @onClose="handleModalClose">
    <TweetForm
      :user="user"
      :reply-to="replyTweet"
      @on-success="handleFormSuccess"
      :placeholder="replyTweet?.id ? 'Tweet your reply' : 'What`s happening?'"
      showReply
    />
  </UIModal>
</template>
