<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';

import { Auth } from '@/services/admin/auth/auth';

import { adminPrefix } from '@/config/constants';

const user = ref<any>(null);

const desktopClass = 'hover:text-indigo-500';

const handleLogout = async () => {
  if (!confirm('ログアウトしますか？')) return;

  await Auth.logout();
  showToastNextPage('ログアウトしました。');
  navigate(adminPrefix);
}

onMounted(async () => {
  user.value = await Auth.user();
});
</script>

<template>
  <header class="bg-gray-100 shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a :href="`${adminPrefix}/`"">
        <div
          class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          MySite
        </div>
      </a>

      <!-- Desktop Menu -->
      <nav class="flex space-x-8 text-gray-700 font-medium">
        <a :href="`${adminPrefix}/`" class={desktopClass}>Home</a>
        <a :href="`${adminPrefix}/user/users`" class={desktopClass}>User</a>
        <template v-if="user">
          <span :class="desktopClass">{{ user.name }}</span>
          <span @click="handleLogout" :class="`${desktopClass} cursor-pointer`">Logout</span>
        </template>

        <template v-else>
          <span :class="desktopClass">Guest</span>
          <a :href="`${adminPrefix}/login`" :class="desktopClass">Login</a>
        </template>
      </nav>
    </div>
  </header>
</template>
