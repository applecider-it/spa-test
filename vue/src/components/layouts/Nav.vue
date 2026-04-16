<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from '@/services/ui/message';
import { useRouter } from 'vue-router';

import { Auth } from '@/services/auth/auth';

const open = ref(false);

const user = ref<any>(null);

const router = useRouter();

const desktopClass = 'hover:text-indigo-500';
const mobileClass = 'block py-2 text-gray-700 hover:text-indigo-500';

const handleLogout = async () => {
  if (!confirm('ログアウトしますか？')) return;

  await Auth.logout();
  showToast('ログアウトしました。');
  location.href = '/';
};

onMounted(async () => {
  user.value = await Auth.user();
});
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/">
        <div
          class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          MySite
        </div>
      </RouterLink>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-8 text-gray-700 font-medium">
        <RouterLink to="/" :class="desktopClass">Home</RouterLink>
        <RouterLink to="/tweets" :class="desktopClass">Tweet</RouterLink>

        <span v-if="user" class="space-x-8">
          <RouterLink to="/profile" :class="desktopClass">{{ user.name }}</RouterLink>
          <span @click="handleLogout" :class="`${desktopClass} cursor-pointer`"
            >Logout</span
          >
        </span>

        <span v-else class="space-x-8">
          <span :class="desktopClass">Guest</span>
          <RouterLink to="/login" :class="desktopClass">Login</RouterLink>
        </span>
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
