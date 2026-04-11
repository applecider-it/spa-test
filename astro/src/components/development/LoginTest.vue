<script setup lang="ts">
import { ref } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToast, setIsLoading } from '@/services/ui/message';

import { Auth } from '@/services/auth/auth';

const email = ref('test@localhost');
const password = ref('1234');

const execLogin = async () => {
  setIsLoading(true);
  const res = await Auth.login(email.value, password.value);
  setIsLoading(false);
  if (res) {
    navigate('/');
  } else {
    showToast('ログインエラー', 'alert');
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
    <div class="space-y-5 border p-5">
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
    <div class="mt-10 border p-5 space-x-5">
      <button @click="execLogout" class="app-btn-primary">ログアウト</button>

      <button @click="execMe" class="app-btn-secondary">
        ログインチェック
      </button>

      <a href="/profile" class="app-link-normal">プロフィールページ</a>
    </div>
  </div>
</template>
