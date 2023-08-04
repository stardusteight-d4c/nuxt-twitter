<script setup lang="ts">
const data = reactive({
  username: "",
  password: "",
  loading: false,
})

async function handleLogin() {
  const { login } = useAuth()
  data.loading = true
  try {
    await login({ username: data.username, password: data.password })
  } catch (error) {
    console.error(error)
  } finally {
    data.loading = false
  }
}
</script>

<template>
  <div>
    <span class="text-blue-400 hover:underline cursor-pointer">
      Create account
    </span>
    <div class="pt-5 space-y-6 text-black dark:text-white">
      <UIInput
        label="Username"
        placeholder="@username"
        v-model="data.username"
      />
      <UIInput
        label="Password"
        placeholder="••••••••••"
        type="password"
        v-model="data.password"
      />
      <div>
        <UIButton @click="handleLogin">Submit</UIButton>
      </div>
    </div>
  </div>
</template>
