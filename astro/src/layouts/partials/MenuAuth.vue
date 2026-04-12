<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';

type Props = {
  desktopClass: string;
};

defineProps<Props>();

import { Auth } from '@/services/auth/auth';

const user = ref<any>(null);

const handleLogout = async () => {
  if (!confirm('ログアウトしますか？')) return;

  await Auth.logout();
  showToastNextPage('ログアウトしました。');
  navigate('/');
}

onMounted(async () => {
  console.log('menu');

  user.value = await Auth.user();
});
</script>

<template>
  <span v-if="user" class="space-x-8">
    <a href="/profile" :class="desktopClass">{{ user.name }}</a>
    <span @click="handleLogout" :class="`${desktopClass} cursor-pointer`">Logout</span>
  </span>
  <span v-else class="space-x-8">
    <span :class="desktopClass">Guest</span>
    <a href="/login" :class="desktopClass">Login</a>
  </span>
</template>
