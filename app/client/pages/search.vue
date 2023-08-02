<script setup lang="ts">
const { getTweets: getTweetsComposable } = useTweets()
const loading = ref(false)
const searchTweets = ref([])

watch(
  () => useRoute().fullPath,
  () => getTweets()
)

onBeforeMount(async () => {
  getTweets()
})

async function getTweets() {
  const searchQuery = useRoute().query.q
  loading.value = true
  try {
    console.log("searchQuery", searchQuery)

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
  <UIFragment>
    <Head>
      <Title>Twitter / Search</Title>
    </Head>
    <LayoutMain>
      <MainSection title="Search" :loading="loading">
        <TweetListFeed :tweets="searchTweets" />
      </MainSection>
    </LayoutMain>
  </UIFragment>
</template>
