<script setup lang="ts">
const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const loading = ref(false)
const tweet = ref(null)
const user: any = useAuthUser()

function getTweetIdFromRouter() {
  return useRoute().params.id as string
}

watch(
  () => useRoute().fullPath,
  () => getTweet()
)

async function getTweet() {
  loading.value = true
  try {
    const response: any = await getTweetById(getTweetIdFromRouter())
    tweet.value = response.tweet
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
getTweet()
</script>

<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title></Title>
      </Head>
      <TweetDetails :user="user" :tweet="tweet" />
    </MainSection>
  </div>
</template>
