<script setup lang="ts">
const { useAuthUser } = useAuth()
const { twitterBorderColor } = useTailwindConfig()
const { getTweets } = useTweets()
const homeTweets = ref<ITweet[]>([])
const loading = ref(true)
const user = useAuthUser() as unknown as User
const revalidate = 1000 // 1sec

onBeforeMount(() => {
  setInterval(() => {
    if (homeTweets.value.length <= 0) {
      ;(async () => {
        loading.value = true
        try {
          const { tweets } = (await getTweets()) as { tweets: ITweet[] }
          homeTweets.value = tweets
        } catch (error) {
          console.error(error)
        } finally {
          loading.value = false
        }
      })()
    } else {
      loading.value = false
    }
  }, revalidate)
})

function handleFormSuccess(tweet: ITweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
</script>

<template>
  <UIFragment>
    <Head>
      <Title>Twitter / Home</Title>
    </Head>
    <LayoutMain>
      <MainSection title="Home" :loading="loading">
        <div :class="`${twitterBorderColor} border-b`">
          <TweetForm
            v-if="user"
            :user="user"
            @on-success="handleFormSuccess"
            placeholder="What's happening?"
          />
        </div>
        <div
          v-if="loading"
          class="min-h-full flex items-center justify-center p-4 mt-10"
        >
          <UISpinner />
        </div>
        <TweetListFeed v-else :tweets="homeTweets" />
      </MainSection>
    </LayoutMain>
  </UIFragment>
</template>
