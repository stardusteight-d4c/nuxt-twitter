<script setup lang="ts">
interface Props {
  tweet: any
  user: User
}

const props = defineProps<Props>()
const replies = computed(() => props.tweet?.replies || [])
</script>

<template>
  <div>
    <TweetItem :tweet="props.tweet" />
    <TweetForm :user="user" placeholder="Tweet your reply" />
    <TweetListFeed :tweets="replies" />
  </div>
</template>
