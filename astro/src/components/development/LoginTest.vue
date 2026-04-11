<script setup lang="ts">
import { navigate } from 'astro:transitions/client';

import { Auth } from '@/services/auth/auth';

const execLogin = async () => {
  await Auth.login();
  navigate('/');
};

const execLogout = async () => {
  await Auth.logout();
  navigate('/');
};

const execMe = async () => {
  Auth.me();
};
</script>

<template>
  <div>
    <button @click="execLogin" class="app-btn-primary">ログイン</button>
    <button @click="execLogout" class="app-btn-primary ml-5">ログアウト</button>
    <button @click="execMe" class="app-btn-primary ml-5">
      ログインチェック
    </button>
  </div>
</template>
