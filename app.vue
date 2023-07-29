<script setup lang="ts">
const darkMode = ref(true)
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const isAuthLoading = useAuthLoading()
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

const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on("replyTweet", (tweet: any) => {
  openPostTweetModal(tweet)
})

emitter.$on("toggleDarkMode", () => {
  darkMode.value = !darkMode.value
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
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900 dark:text-white">
      <div v-if="isAuthLoading">
        <LoadingPage />
      </div>
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-1"
        >
          <!-- Left sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @on-tweet="handleOpenTweetModal" @on-logout="handleUserLogout" :user="user" />
            </div>
          </div>
          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <!-- Right sidebar -->
          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <AuthPage v-else />
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
  </div>
</template>
