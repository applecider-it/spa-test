<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from '@/services/ui/message';
import { sleep } from '@/services/system/time';

import { Auth } from '@/services/auth/auth';

const open = ref(false);

const user = ref<any>(null);

const desktopClass = 'hover:text-indigo-500';
const mobileClass = 'block py-2 text-gray-700 hover:text-indigo-500';

const handleLogout = async () => {
  if (!confirm('ログアウトしますか？')) return;

  await Auth.logout();
  showToast('ログアウトしました。');
};

onMounted(async () => {
  user.value = await Auth.user();
});
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a href="/">
        <div
          class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          MySite
        </div>
      </a>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-8 text-gray-700 font-medium">
        <RouterLink to="/" :class="desktopClass">Home</RouterLink>
        <RouterLink to="/tweets" :class="desktopClass">Tweet</RouterLink>
      </nav>

      <!-- Mobile Button -->
      <button @click="open = !open" id="menuBtn" class="md:hidden text-2xl">
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="open" class="px-6 pb-4 md:hidden">
      <a href="#" :class="mobileClass">Home</a>
      <a href="#" :class="mobileClass">Tweet</a>
    </div>
  </header>
</template>
