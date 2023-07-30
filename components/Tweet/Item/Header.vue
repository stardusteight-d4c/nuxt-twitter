<script setup lang="ts">
interface Props {
  tweet: any
}

const props = defineProps<Props>()
const author = props.tweet.author
const replyToTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`)
</script>

<template>
  <div class="p-4 flex">
      <img :src="author.profileImage" class="rounded-full w-10 h-10 " />
    <div class="ml-3 -mt-1">
      <span class="font-semibold text-gray-800 dark:text-white">{{
        author.name
      }}</span>
      <span class="ml-1 text-sm font-medium text-gray-400">
        <nuxt-link to="#">
          {{ author.handle }}
        </nuxt-link>
        • {{ props.tweet.postedAtHuman }}
      </span>
      <p v-if="props.tweet.replyTo" class="text-sm">
        <span class="text-gray-500"> Replying to </span>
        <nuxt-link :to="replyToTweetUrl" class="text-blue-400">
          {{ props.tweet.replyTo.author.handle }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>
