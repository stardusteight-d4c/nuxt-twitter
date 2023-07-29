<script setup lang="ts">
const { useAuthUser } = useAuth()
const { getHomeTweets } = useTweets()
const { twitterBorderColor } = useTailwindConfig()

onBeforeMount(async () => {
  loading.value = true
  try {
    const { tweets } = (await getHomeTweets()) as any
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

const loading = ref(false)
const user = useAuthUser() as unknown as User
const homeTweets = ref([])
</script>

<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
      <div :class="`${twitterBorderColor} border-b`">
        <TweetForm
          :user="user"
          @on-success="handleFormSuccess"
          placeholder="What's happening?"
        />
      </div>
      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>
