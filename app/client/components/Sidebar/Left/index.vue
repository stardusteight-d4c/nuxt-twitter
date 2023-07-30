<script setup lang="ts">
interface Props {
  user: any
}

const props = defineProps<Props>()
const emits = defineEmits(["onTweet", "onLogout"])

const { defaultTransition } = useTailwindConfig()

function emitsTweet() {
  emits("onTweet")
}
</script>

<template>
  <div class="h-screen flex flex-col pr-2">
    <nuxt-link
      to="/"
      :class="`${defaultTransition} cursor-pointer p-2 my-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/5 w-min`"
    >
      <div class="w-8 h-8 dark:text-white">
        <LogoTwitter />
      </div>
    </nuxt-link>

    <div class="mt-1 space-y-2">
      <SidebarLeftTab active>
        <template v-slot:icon>
          <IconHome />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>
      <SidebarLeftTab :active="false">
        <template v-slot:icon>
          <IconHashtag />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarLeftTab>
      <SidebarLeftTab :active="false">
        <template v-slot:icon>
          <IconBell />
        </template>
        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>
      <SidebarLeftTab :active="false">
        <template v-slot:icon>
          <IconInbox />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>
      <SidebarLeftTab :active="false">
        <template v-slot:icon>
          <IconBookmark />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>
      <SidebarLeftTab :active="false">
        <template v-slot:icon>
          <IconDocumentText />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarLeftTab>
      <SidebarLeftTab :active="false">
        <template v-slot:icon>
          <IconUser />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>
      <SidebarLeftTab :active="false">
        <template v-slot:icon>
          <IconEllipsisHorizontalCircle />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton size="lg" liquid @click="emitsTweet"> Tweet </UIButton>
      </div>
      <div class="block xl:hidden w-fit px-3">
        <UIButton type="icon" @click="emitsTweet">
          <div class="w-6 h-6 p-1 font-bold dark:text-white">
            <LogoTwitter />
          </div>
        </UIButton>
      </div>
    </div>

    <div
      @click="emits('onLogout')"
      :class="`${defaultTransition} flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-200 dark:hover:bg-white/5 text-black dark:text-white`"
    >
      <div class="flex flex-row">
        <img
          :src="props.user.profileImage"
          alt="user_account"
          class="rounded-full w-10 h-10"
        />
        <div class="hidden xl:flex flex-col ml-2">
          <h3 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ user.name }}
          </h3>
          <p class="text-sm text-gray-400 -mt-1">
            {{ user.handle }}
          </p>
        </div>
      </div>
      <div class="hidden ml-auto xl:block">
        <div class="w-6 h-6">
          <IconChevronDoubleDown />
        </div>
      </div>
    </div>
  </div>
</template>
