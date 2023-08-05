<script setup lang="ts">
const loginType = ref<"signin" | "signup">("signin")
const signInData = reactive({
  username: "",
  password: "",
  loading: false,
})
const signUpData = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
})

async function handleSignIn() {
  const { login } = useAuth()
  signInData.loading = true
  try {
    await login({
      username: signInData.username,
      password: signInData.password,
    })
  } catch (error) {
    console.error(error)
  } finally {
    signInData.loading = false
  }
}

async function handleSignUp() {
  // const { login } = useAuth()
  // data.loading = true
  // try {
  //   await login({ username: data.username, password: data.password })
  // } catch (error) {
  //   console.error(error)
  // } finally {
  //   data.loading = false
  // }
}
</script>

<template>
  <div>
    <div v-if="loginType === 'signin'">
      <span
        @click="loginType = 'signup'"
        class="text-blue-400 hover:underline cursor-pointer"
      >
        Create account
      </span>
      <div
        class="pt-5 max-w-[206px] w-full space-y-6 text-black dark:text-white"
      >
        <UIInput
          label="Username"
          placeholder="@username"
          v-model="signInData.username"
        />
        <UIInput
          label="Password"
          placeholder="••••••••••"
          type="password"
          v-model="signInData.password"
        />
        <div>
          <UIButton @click="handleSignIn">Sign In</UIButton>
        </div>
      </div>
    </div>
    <div v-else>
      <span
        @click="loginType = 'signin'"
        class="text-blue-400 hover:underline cursor-pointer"
      >
        Already have an account, sign in
      </span>
      <div
        class="pt-5 max-w-[206px] w-full space-y-6 text-black dark:text-white"
      >
        <UIInput
          label="Name"
          placeholder="Your account name"
          v-model="signUpData.name"
        />
        <UIInput
          label="Username"
          placeholder="@username"
          v-model="signUpData.username"
        />
        <UIInput
          label="Email"
          placeholder="johndoe@example.com"
          v-model="signUpData.email"
        />
        <UIInput
          label="Password"
          placeholder="••••••••••"
          type="password"
          v-model="signUpData.password"
        />
        <UIInput
          label="Confirm Password"
          placeholder="••••••••••"
          type="password"
          v-model="signUpData.confirmPassword"
        />
        <div>
          <UIButton @click="handleSignUp">Sign Up</UIButton>
        </div>
      </div>
    </div>
  </div>
</template>
