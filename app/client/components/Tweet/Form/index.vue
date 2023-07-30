<script setup lang="ts">
interface Props {
  user: User
  placeholder: string
  replyTo?: any
  showReply?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["onSuccess"])

const replyTo = props.replyTo ?? null
const showReply = props.showReply ?? false
const { postTweet } = useTweets()
const loading = ref<boolean>(false)

async function handleFormSubmit(data: { text: string; mediaFiles: [File] }) {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
      replyTo: replyTo?.id,
    })
    emits("onSuccess", response.tweet)
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
