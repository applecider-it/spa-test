<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';
import { sleep } from '@/services/system/time';

import { Auth } from '@/services/auth/auth';

type Props = {
  callType: 'desktop' | 'mobile';
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
  console.log('menu', props.callType);

  // mobileの処理を遅らせることでAPIの使用回数を減らす
  if (props.callType === 'mobile') await sleep(1000);

  user.value = await Auth.user();
});
</script>

<template>
  <span v-if="callType === 'desktop'">
    <span v-if="user" class="space-x-8">
      <a href="/profile" :class="elementClass">{{ user.name }}</a>
      <span @click="handleLogout" :class="`${elementClass} cursor-pointer`">Logout</span>
    </span>

    <span v-else class="space-x-8">
      <span :class="elementClass">Guest</span>
      <a href="/login" :class="elementClass">Login</a>
    </span>
  </span>

  <span v-else>
    <span v-if="user">
      <a href="/profile" :class="elementClass">{{ user.name }}</a>
      <span @click="handleLogout" :class="`${elementClass} cursor-pointer`">Logout</span>
    </span>

    <span v-else>
      <span :class="elementClass">Guest</span>
      <a href="/login" :class="elementClass">Login</a>
    </span>
  </span>
</template>
