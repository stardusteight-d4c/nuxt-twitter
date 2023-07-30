// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  build: {
    transpile: ["@heroicons/vue"],
  },
  srcDir: "app/client",
  serverDir: "app/server",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  typescript: {
    strict: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    cloudinaryCloudName: process.env.CLOUDNARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDNARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDNARY_API_SECRET,
  },
})
