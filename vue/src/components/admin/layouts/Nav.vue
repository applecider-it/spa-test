<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from '@/services/ui/message';
import { useRouter } from 'vue-router';

import { Auth } from '@/services/admin/auth/auth';

import { adminPrefix } from '@/config/constants';

const user = ref<any>(null);

const router = useRouter();

const desktopClass = 'hover:text-indigo-500';

const handleLogout = async () => {
  if (!confirm('ログアウトしますか？')) return;

  await Auth.logout();
  showToast('ログアウトしました。');
  location.href = adminPrefix;
};

onMounted(async () => {
  user.value = await Auth.user();
});
</script>

<template>
  <header class="bg-gray-100 shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink
        :to="{
          name: 'admin:home',
        }"
      >
        <div
          class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          MySite
        </div>
      </RouterLink>

      <!-- Desktop Menu -->
      <nav class="flex space-x-8 text-gray-700 font-medium">
        <RouterLink
          :to="{
            name: 'admin:home',
          }"
          :class="desktopClass"
          >Home</RouterLink
        >
        <RouterLink to="/users" :class="desktopClass">Users</RouterLink>

        <span v-if="user" class="space-x-8">
          <span :class="desktopClass">{{ user.name }}</span>
          <span @click="handleLogout" :class="`${desktopClass} cursor-pointer`"
            >Logout</span
          >
        </span>

        <span v-else class="space-x-8">
          <span :class="desktopClass">Guest</span>
          <RouterLink
            :to="{
              name: 'admin:login',
            }"
            :class="desktopClass"
            >Login</RouterLink
          >
        </span>
      </nav>
    </div>
  </header>
</template>
