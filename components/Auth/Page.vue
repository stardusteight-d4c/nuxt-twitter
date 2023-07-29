<script setup lang="ts">
const { twitterBorderColor } = useTailwindConfig()
</script>

<template>
  <Head>
    <Title>Login / Twitter</Title>
  </Head>
  <div class="grid grid-cols-8 max-w-[100vw] w-full overflow-hidden h-screen">
    <div
      :class="`${twitterBorderColor} border-r relative shadow-md shadow-white/10 text-white col-span-5 hidden w-0 lg:w-full lg:block`"
    >
      <img
        src="~/assets/twitter-background.png"
        alt="spacex_crew_dragon"
        class="auth-path object-left w-full h-full"
      />
      <LogoTwitter
        class="w-[350px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      />
    </div>
    <div
      class="flex flex-col justify-center px-4 py-12 col-span-3 sm:px-6 lg:px-20 xl:px-24"
    >
      <div class="flex items-center w-full h-full mx-auto lg:w-96">
        <AuthForm />
      </div>
    </div>
  </div>
</template>
