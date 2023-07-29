<script setup lang="ts">
const whatsHappening = ref([
  { title: "SpaceX", count: "18.8k Tweets" },
  { title: "#CodingIsFun", count: "8.8k Tweets" },
  { title: "artforall", count: "1.8k Tweets" },
])

const whoToFollow = ref([
  {
    name: "Joe Yabuki",
    handle: "@ashitanojoe",
    image: `https://i.pinimg.com/originals/19/72/77/1972776241251a3cea9fef51742a2b8f.jpg`,
  },
  {
    name: "Link",
    handle: "@notzelda",
    image: `https://img.elo7.com.br/product/original/4A3BE19/quadro-game-the-legend-of-zelda-tears-of-the-kingdom-quadro.jpg`,
  },
  {
    name: "Guts",
    handle: "@justguts",
    image: `https://i1.sndcdn.com/artworks-AV3yT135aFYucjX4-O771hA-t500x500.jpg`,
  }
])
</script>

<template>
  <div class="flex flex-col">
    <!-- Preview Card: What's happening -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem v-for="topic in whatsHappening">
        <div class="p-2">
          <h2 class="font-bold text-gray-800 dark:text-white">
            {{ topic.title }}
          </h2>
          <p class="text-sm text-gray-400">{{ topic.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
    <!-- Preview Card: Who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="account in whoToFollow">
        <div class="flex justify-between items-center p-2">
          <div class="flex">
            <img
              :src="account.image"
              :alt="account.name"
              class="w-10 h-10 rounded-full"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-base font-bold text-gray-900 dark:text-white">
                {{ account.name }}
              </h1>
              <p class="text-sm text-gray-400">{{ account.handle }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>
