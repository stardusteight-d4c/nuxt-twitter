<script setup lang="ts">
const { useAuthUser, useAuthLoading } = useAuth()
const user = useAuthUser() as unknown as any
const { closePostTweetModal, usePostTweetModal, useReplyTweet } = useTweets()

const { twitterBorderColor } = useTailwindConfig()
const isAuthLoading = useAuthLoading()
const postTweetModal = usePostTweetModal()

const replyTweet = useReplyTweet()

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
  <UIFragment class="min-h-screen">
    <LoadingPage v-if="isAuthLoading" />
    <div v-if="!isAuthLoading && user">
      <div
        class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-1"
      >
        <!-- Tirar user e denpendência -->
        <SidebarLeft :user="user" />
        <main
          :class="twitterBorderColor"
          class="col-span-12 mb-20 md:col-span-8 xl:col-span-6 h-full border-x"
        >
          <slot />
        </main>
        <SidebarRight />
      </div>
      <UIModal :isOpen="postTweetModal" @onClose="() => closePostTweetModal()">
        <!-- Tirar user e replyTweet de denpendências -->
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
