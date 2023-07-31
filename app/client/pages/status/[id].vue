<script setup lang="ts">
const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const loading = ref(false)
const tweet: any = ref(null)
const user: any = useAuthUser()

function getTweetIdFromRouter() {
  return useRoute().params.id as string
}

onMounted(() => {
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

  watch(
    () => useRoute().fullPath,
    () => getTweet()
  )
})
</script>

<template>
  <UIFragment v-if="tweet?.text">
    <Head>
      <Title>Twitter / {{ tweet?.text ?? "" }}</Title>
    </Head>
    <LayoutMain>
      <MainSection title="Tweet" :loading="loading">
        <TweetDetails :user="user" :tweet="tweet" />
      </MainSection>
    </LayoutMain>
  </UIFragment>
</template>
