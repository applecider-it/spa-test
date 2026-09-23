<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppCommon from '@/services/app/AppCommon.vue';
import Loading from '@/components/app/Loading.vue';
</script>

<template>
  <AppCommon />
  <Loading />
  
  <RouterView />
</template>
