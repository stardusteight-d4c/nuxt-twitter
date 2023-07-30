<script setup lang="ts">
const { useAuthUser, useAuthLoading, logout } = useAuth()
const user = useAuthUser() as unknown as any
const {
  closePostTweetModal,
  openPostTweetModal,
  usePostTweetModal,
  useReplyTweet,
} = useTweets()

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

const changeRouteCondition = () => {
  if (!user.value && !isAuthLoading.value) {
    useRouter().push({
      path: "/login",
    })
  }
}

watch(() => isAuthLoading.value, changeRouteCondition);
watch(() => user.value, changeRouteCondition);
</script>

<template>
  <UIFragment class="min-h-screen">
    <LoadingPage v-if="isAuthLoading" />
    <div v-if="!isAuthLoading && user">
      <div
        class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-1"
      >
        <SidebarLeft
          @on-tweet="handleOpenTweetModal"
          @on-logout="handleUserLogout"
          :user="user"
        />
        <main class="col-span-12 md:col-span-8 xl:col-span-6 h-full border border-white-200 dark:border-white/10">
          <slot />
        </main>
        <SidebarRight />
      </div>
      <UIModal :isOpen="postTweetModal" @onClose="handleModalClose">
        <TweetForm
          :user="user"
          :reply-to="replyTweet"
          @on-success="handleFormSuccess"
          :placeholder="
            replyTweet?.id ? 'Tweet your reply' : 'What`s happening?'
          "
          showReply
        />
      </UIModal>
    </div>
  </UIFragment>
</template>
