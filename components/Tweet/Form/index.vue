<script setup lang="ts">
interface Props {
  user: User
}

const props = defineProps<Props>()
const { postTweet } = useTweets()

async function handleFormSubmit(data: { text: string; mediaFiles: [File] }) {
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    })
    console.log("response ->", response)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <TweetFormInput @on-submit="handleFormSubmit" :user="props.user" />
  </div>
</template>

<style scoped></style>
