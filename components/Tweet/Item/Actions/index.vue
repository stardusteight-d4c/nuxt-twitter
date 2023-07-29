<script setup lang="ts">
interface Props {
  tweet: any
  compact?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["onCommentClick"])
const compact = props.compact ?? false
const size = computed(() => (compact ? 5 : 8))
const showStats = computed(() => compact)

function generateRandomNumber() {
  return Math.floor(Math.random() * 100)
}
</script>

<template>
  <div
    class="flex items-center justify-around xl:justify-normal xl:gap-x-[80px] w-full"
  >
    <TweetItemActionsIcon
      @on-click="emits('onCommentClick')"
      color="blue"
      :size="size"
    >
      <template v-slot:icon="{ classes }">
        <IconChat :class="classes" />
      </template>
      <template v-slot:default v-if="showStats">
        {{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <IconArrowPath :class="classes" />
      </template>
      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}</template
      >
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <IconHeart :class="classes" />
      </template>
      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="orange" :size="size">
      <template v-slot:icon="{ classes }">
        <IconShare :class="classes" />
      </template>
      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>
