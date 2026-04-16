<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Nav from '@/components/Nav.vue';
import AppCommon from '@/services/app/AppCommon.vue';

</script>

<template>
  <AppCommon />
  
  <Nav />

  <div class="pb-40 p-10">
    <RouterView />
  </div>
</template>
