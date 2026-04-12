<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { navigate } from 'astro:transitions/client';
import { showToast, showToastNextPage, setIsLoading } from '@/services/ui/message';

import { Auth } from '@/services/auth/auth';

const email = ref('test@localhost');
const password = ref('1234');

const execLogin = async () => {
  setIsLoading(true);
  const res = await Auth.login(email.value, password.value);
  setIsLoading(false);
  if (res) {
    showToastNextPage('ログインしました。');
    navigate('/');
  } else {
    showToast('ログインエラー', 'alert');
  }
};
</script>

<template>
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
</template>
