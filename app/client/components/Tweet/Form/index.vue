<script setup lang="ts">
interface Props {
  user: User
  placeholder: string
  replyTo?: any
  showReply?: boolean
}

const props = defineProps<Props>()

const { closePostTweetModal } = useTweets()

const replyTo = props.replyTo ?? null
const showReply = props.showReply ?? false
const { postTweet } = useTweets()
const loading = ref<boolean>(false)

function handleFormSuccess(tweet: any) {
  closePostTweetModal()
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

async function handleFormSubmit(data: { text: string; mediaFiles: [File] }) {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
      replyTo: replyTo?.id,
    })
    handleFormSuccess(response.tweet)
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
      <TweetItem :tweet="replyTo" v-if="replyTo && showReply" hideActions />
      <TweetFormInput
        @on-submit="handleFormSubmit"
        :user="props.user"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
