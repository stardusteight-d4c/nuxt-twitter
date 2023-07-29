<script setup lang="ts">
const { getTweets: getTweetsComposable } = useTweets()
const loading = ref(false)
const searchTweets = ref([])
const searchQuery = useRoute().query.q

// watch(
//   () => useRoute().fullPath,
//   () => getTweets()
// )

onBeforeMount(async () => {
  getTweets()
})

async function getTweets() {
  loading.value = true
  try {
    const { tweets } = (await getTweetsComposable({
      query: searchQuery,
    })) as any
    searchTweets.value = tweets
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Twitter / Search</Title>
      </Head>
      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>
