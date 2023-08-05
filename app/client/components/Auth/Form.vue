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
  profileImage: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
})

async function handleSignIn() {
  const { signin } = useAuth()
  signInData.loading = true
  try {
    await signin({
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
  const { signup } = useSignUp()
  signUpData.loading = true
  try {
    await signup(signUpData, loginType)
  } catch (error) {
    console.error(error)
  } finally {
    signUpData.loading = false
  }
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
          label="Profile Image URL"
          placeholder="https://storage.com/myavatarimage.png"
          v-model="signUpData.profileImage"
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
