<script setup lang="ts">
interface Props {
  user: User
}

const props = defineProps<Props>()
const { postTweet } = useTweets()

async function handleFormSubmit(data: { text: string }) {
  try {
    const response = await postTweet(data)
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
