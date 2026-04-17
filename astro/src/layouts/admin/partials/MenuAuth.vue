<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';

import { Auth } from '@/services/admin/auth/auth';

import { adminPrefix } from '@/config/constants';

type Props = {
  elementClass: string;
};

const props = defineProps<Props>();

const user = ref<any>(null);

const handleLogout = async () => {
  if (!confirm('ログアウトしますか？')) return;

  await Auth.logout();
  showToastNextPage('ログアウトしました。');
  navigate(adminPrefix);
}

onMounted(async () => {
  console.log('MenuAuth');

  user.value = await Auth.user();
});
</script>

<template>
  <span>
    <span v-if="user" class="space-x-8">
      <span :class="elementClass">{{ user.name }}</span>
      <span @click="handleLogout" :class="`${elementClass} cursor-pointer`">Logout</span>
    </span>

    <span v-else class="space-x-8">
      <span :class="elementClass">Guest</span>
      <a :href="`${adminPrefix}/login`" :class="elementClass">Login</a>
    </span>
  </span>
</template>
