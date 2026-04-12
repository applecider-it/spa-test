<script setup lang="ts">
import { ref } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';

import LoginForm from '@/components/auth/LoginForm.vue';

import { Auth } from '@/services/auth/auth';

const execLogout = async () => {
  await Auth.logout();
  showToastNextPage('ログアウトしました。');
  navigate('/');
};

const execMe = async () => {
  Auth.me();
};
</script>

<template>
  <div>
    <div>
      <LoginForm />
    </div>
    <div class="mt-10 border p-5 space-x-5">
      <button @click="execLogout" class="app-btn-primary">ログアウト</button>

      <button @click="execMe" class="app-btn-secondary">
        ログインチェック
      </button>

      <a href="/profile" class="app-link-normal">プロフィールページ</a>
    </div>
  </div>
</template>
