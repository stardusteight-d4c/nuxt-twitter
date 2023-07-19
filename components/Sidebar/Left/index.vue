<script setup lang="ts">
const { defaultTransition } = useTailwindConfig()
</script>

<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </nuxt-link>
    </div>

    <div class="mt-1 space-y-1">
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
    </div>
  </div>
</template>
