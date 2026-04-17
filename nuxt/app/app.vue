<script setup lang="ts">
import '@/assets/css/app.css';
import AppCommon from '@/services/app/AppCommon.vue';
</script>

<template>
  <NuxtLayout>
    <AppCommon />
    
    <NuxtPage />
  </NuxtLayout>
</template>
