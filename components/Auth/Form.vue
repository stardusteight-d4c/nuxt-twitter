<script setup lang="ts">
const data = reactive({
  username: "",
  password: "",
})

function handleLogin() {
  alert(JSON.stringify(data))
}
</script>

<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        label="Username"
        placeholder="@username"
        v-model="data.username"
      />
      <UIInput
        label="Password"
        placeholder="*********"
        type="password"
        v-model="data.password"
      />
      <div>
        <button @click="handleLogin">Submit</button>
      </div>
    </div>
  </div>
</template>
