<script setup lang="ts">
const { useAuthUser } = useAuth()
const { getTweets } = useTweets()
const { twitterBorderColor } = useTailwindConfig()

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

const loading = ref(false)
const user = useAuthUser() as unknown as User
const homeTweets = ref([])

console.log(homeTweets);

</script>

<template>
  <div>
    <NuxtLayout>
      <MainSection title="Home" :loading="loading">
        <Head>
          <Title>Twitter / Home</Title>
        </Head>
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
    </NuxtLayout>
  </div>
</template>
