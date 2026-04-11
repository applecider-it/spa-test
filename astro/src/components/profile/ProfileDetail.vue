<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Auth } from '@/services/auth/auth';

const user = ref<any>(null);

onMounted(async() => {
  console.log('profile');

  const me: any = await Auth.me();

  console.log('profile', me);

  if (!me) return;

  user.value = me.user;
});
</script>

<template>
  <div v-if="user">
    <div>id: {{ user.id }}</div>
    <div>name: {{ user.name }}</div>
    <div>email: {{ user.email }}</div>
  </div>
</template>
