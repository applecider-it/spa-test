<template>
  <AppLayout :auth="auth">
    <h2 class="app-h2">Home</h2>

    <div class="mt-10">
      <NuxtLink to="/development" class="app-link-normal">
        開発者向けページ
      </NuxtLink>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
import { useAuth } from '@/composables/useAuth';

const auth = useAuth();

console.log('Home', auth);
</script>
