<script setup lang="ts">
const search = ref("")
const { twitterBorderColor } = useTailwindConfig()
const emitter = useEmitter()

function handleToggleDarkMode() {
  emitter.$emit("toggle_dark_mode")
}

function handleSearch() {
  useRouter().push({
    path: "/search",
    query: {
      q: search.value,
    },
  })
}

const whatsHappening = ref([
  { title: "#spacex", count: "18.8k Tweets" },
  { title: "#nuxt", count: "8.8k Tweets" },
  { title: "#anime", count: "1.8k Tweets" },
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
  },
])
</script>

<template>
  <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
    <div class="sticky top-0">
      <div class="flex flex-col">
        <!-- Search bar -->

        <div class="relative m-2">
          <div
            class="absolute flex items-center h-full pl-4 text-gray-500 cursor-pointer"
          >
            <div class="w-6 h-6">
              <IconMagnifyingGlass />
            </div>
          </div>
          <div
            class="absolute flex items-center right-0 h-full pr-4 text-xs text-black dark:text-gray-500"
          >
            <code class="mr-1">Press </code
            ><kbd class="border border-gray-500 rounded-sm px-[2px]">Enter</kbd>
          </div>
          <input
            @keydown.enter="handleSearch"
            v-model="search"
            placeholder="Search twitter"
            :class="`${twitterBorderColor} flex items-center w-full pl-12 pr-[100px] text-sm font-normal text-black dark:text-white bg-gray-200 border rounded-full shadow dark:bg-white/5 focus:bg-gray-100 dark:focus:bg-background-dark focus:outline-none focus:border-blue-300 h-9`"
          />
        </div>

        <!-- Preview Card: What's happening -->
        <SidebarRightPreviewCard title="What's happening">
          <SidebarRightPreviewCardItem v-for="topic in whatsHappening">
            <div class="p-[1px] flex items-center justify-between">
              <h2 class="text-gray-800 dark:text-white">
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
                  class="rounded-full w-10 h-10"
                />
                <div class="flex flex-col ml-2">
                  <h1 class="text-base font-bold text-gray-900 dark:text-white">
                    {{ account.name }}
                  </h1>
                  <p class="text-sm text-gray-400 -mt-1">
                    {{ account.handle }}
                  </p>
                </div>
              </div>
              <div class="flex h-full">
                <button
                  class="rounded-full px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white"
                >
                  Follow
                </button>
              </div>
            </div>
          </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <footer>
          <ul class="mx-2 my-4 text-xs text-gray-500">
            <li class="inline-block mx-2">
              <a
                href="#"
                class="hover:underline"
                @click.prevent="handleToggleDarkMode"
                >Dark mode</a
              >
            </li>
            <li class="inline-block mx-2">
              <a href="#" class="hover:underline">Privacy Policy</a>
            </li>
            <li class="inline-block mx-2">
              <a href="#" class="hover:underline">Cookie Policy</a>
            </li>
            <li class="inline-block mx-2">
              <a href="#" class="hover:underline">Accessability</a>
            </li>
            <li class="inline-block mx-2">
              <a href="#" class="hover:underline">Ads info</a>
            </li>
            <li class="inline-block mx-2">
              <a href="#" class="hover:underline">More</a>
            </li>
            <li class="inline-block mx-2">© 2022 Twitter, Inc.</li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>
