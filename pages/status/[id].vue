<script setup lang="ts">
const loading = ref(false)
</script>

<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title></Title>
      </Head>
    </MainSection>
  </div>
</template>
