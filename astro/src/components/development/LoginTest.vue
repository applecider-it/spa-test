<script setup lang="ts">
import { ref } from 'vue';
import { navigate } from 'astro:transitions/client';

import { Auth } from '@/services/auth/auth';

const email = ref("test@localhost");
const password = ref("1234");

const execLogin = async () => {
  const res = await Auth.login(email.value, password.value);
  if (res) {
    navigate('/');
  } else {
    console.warn('ログインエラー');
  }
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
    <div class="space-y-5">
      <div>
        <input type="text" v-model="email" class="app-form-input" />
      </div>
      <div>
        <input type="text" v-model="password" class="app-form-input" />
      </div>
      <div>
        <button @click="execLogin" class="app-btn-primary">ログイン</button>
      </div>
    </div>
    <div class="mt-10">
      <button @click="execLogout" class="app-btn-primary ml-5">
        ログアウト
      </button>
      <button @click="execMe" class="app-btn-primary ml-5">
        ログインチェック
      </button>
    </div>
  </div>
</template>
