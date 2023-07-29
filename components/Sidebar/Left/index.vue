<script setup lang="ts">
const { defaultTransition } = useTailwindConfig()
const emits = defineEmits(["onTweet"])

function emitsTweet() {
  emits("onTweet")
}
</script>

<template>
  <div class="h-screen flex flex-col pr-2">
    <nuxt-link
      to="/"
      :class="`${defaultTransition} cursor-pointer border border-transparent hover:border-white-200 dark:hover:border-white/10 p-2 my-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/5 w-min`"
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
  </div>
</template>
