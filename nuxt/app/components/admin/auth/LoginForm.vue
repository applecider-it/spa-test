<script setup lang="ts">
import { ref } from 'vue';
import { showToast, setIsLoading } from '@/services/ui/message';

import { Auth } from '@/services/admin/auth/auth';

import { adminPrefix } from '@/config/constants';

const email = ref('admin@localhost.com');
const password = ref('adminadmin');

const errors = ref<any>({});

/** ログイン処理実行 */
const execLogin = async () => {
  errors.value = {};

  setIsLoading(true);
  try {
    const res = await Auth.login(email.value, password.value);
    setIsLoading(false);
    if (res) {
      location.href = adminPrefix;
    } else {
      errors.value = {
        email: ['ログインエラー'],
      };
    }
  } catch (e: any) {
    setIsLoading(false);
    if (e.response.status === 400) {
      errors.value = e.response.data.errors;
    }
  }
};
</script>

<template>
  <div class="space-y-5 border p-5">
    <div>
      <input type="text" v-model="email" class="app-form-input" autocomplete="on" />

      <div v-if="errors.email" class="app-form-error">
        {{ errors.email[0] }}
      </div>
    </div>

    <div>
      <input type="text" v-model="password" class="app-form-input" />

      <div v-if="errors.password" class="app-form-error">
        {{ errors.password[0] }}
      </div>
    </div>

    <div>
      <button @click="execLogin" class="app-btn-primary">ログイン</button>
    </div>
  </div>
</template>
