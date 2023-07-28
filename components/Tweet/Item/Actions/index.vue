<script setup lang="ts">
interface Props {
  tweet: any
}

const props = defineProps<Props>()

function generateRandomNumber() {
  return Math.floor(Math.random() * 100)
}
</script>

<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon>
        <IconChat />
      </template>
      <template v-slot:default> {{ props.tweet.repliesCount }} </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green">
      <template v-slot:icon>
        <IconArrowPath />
      </template>
      <template v-slot:default> {{ generateRandomNumber() }}</template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red">
      <template v-slot:icon>
        <IconHeart />
      </template>
      <template v-slot:default> {{ generateRandomNumber() }} </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="orange">
      <template v-slot:icon>
        <IconShare />
      </template>
      <template v-slot:default> {{ generateRandomNumber() }} </template>
    </TweetItemActionsIcon>
  </div>
</template>
