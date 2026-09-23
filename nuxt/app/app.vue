<script setup lang="ts">
import '@/assets/css/app.css';
import AppCommon from '@/services/app/AppCommon.vue';
import Loading from '@/components/app/Loading.vue';
</script>

<template>
  <NuxtLayout>
    <AppCommon />

    <Loading />
    <NuxtPage />
  </NuxtLayout>
</template>
