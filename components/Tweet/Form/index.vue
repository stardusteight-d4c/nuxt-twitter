<script setup lang="ts">
interface Props {
  user: User
}

const props = defineProps<Props>()
const { postTweet } = useTweets()
const loading = ref<boolean>(false)

async function handleFormSubmit(data: { text: string; mediaFiles: [File] }) {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    })
    console.log("response ->", response)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput @on-submit="handleFormSubmit" :user="props.user" />
    </div>
  </div>
</template>

<style scoped></style>
