<script setup lang="ts">
const { useAuthUser } = useAuth()
const { twitterBorderColor } = useTailwindConfig()
const { getTweets } = useTweets()
const homeTweets = ref([])
const loading = ref(false)
const user = useAuthUser() as unknown as User

onBeforeMount(async () => {
  loading.value = true
  try {
    const { tweets } = (await getTweets()) as any
    homeTweets.value = tweets
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

function handleFormSuccess(tweet: any) {
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
        <TweetListFeed :tweets="homeTweets" />
      </MainSection>
    </LayoutMain>
  </UIFragment>
</template>
