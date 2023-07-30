<script setup lang="ts">
interface Props {
  tweet: any
  user: User
}

const props = defineProps<Props>()
const replies = computed(() => props.tweet?.replies || [])

function handleFormSuccess(tweet: any) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
</script>

<template>
  <div>
    <TweetItem :tweet="props.tweet" />
    <TweetForm
      @on-success="handleFormSuccess"
      :reply-to="props.tweet"
      :user="user"
      placeholder="Tweet your reply"
    />
    <TweetListFeed :tweets="replies" />
  </div>
</template>
