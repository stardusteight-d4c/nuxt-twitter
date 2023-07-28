<script setup lang="ts"></script>

<template>
  <div class="flex h-screen">
    <div class="relative dark:text-white flex-1 hidden w-0 lg:block">
      <img
        src="~/assets/twitter-background.png"
        alt=""
        class="absolute inset-0 object-cover w-full h-full"
      />
      <LogoTwitter
        class="w-[350px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      />
    </div>
    <div
      class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="flex items-center w-full h-full max-w-sm mx-auto lg:w-96">
       <AuthForm />
      </div>
    </div>
  </div>
</template>
