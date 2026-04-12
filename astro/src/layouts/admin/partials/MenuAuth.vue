<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';

import { Auth } from '@/services/auth/auth';

type Props = {
  elementClass: string;
};

const props = defineProps<Props>();

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

const prefix = import.meta.env.PUBLIC_ADMIN_PREFIX;
console.log(prefix);
</script>

<template>
  <span>
    <span v-if="user" class="space-x-8">
      <span @click="handleLogout" :class="`${elementClass} cursor-pointer`">Logout</span>
    </span>

    <span v-else class="space-x-8">
      <span :class="elementClass">Guest</span>
      <a :href="`${prefix}/login`" :class="elementClass">Login</a>
    </span>
  </span>
</template>
