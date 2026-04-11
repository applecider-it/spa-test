<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Auth } from '@/services/auth/auth';

const user = ref<any>(null);

const userByApi = ref<any>(null);

onMounted(async() => {
  console.log('profile');

  const res: any = await Auth.user();

  user.value = res;

  const me: any = await Auth.me();

  console.log('profile', me);

  if (!me) return;

  userByApi.value = me.user;
});
</script>

<template>
  <div>user</div>
  <div v-if="user">
    <div>id: {{ user.id }}</div>
    <div>name: {{ user.name }}</div>
    <div>email: {{ user.email }}</div>
  </div>

  <div class="mt-10">me</div>
   <div v-if="userByApi">
    <div>id: {{ userByApi.id }}</div>
    <div>name: {{ userByApi.name }}</div>
    <div>email: {{ userByApi.email }}</div>
  </div>
</template>
