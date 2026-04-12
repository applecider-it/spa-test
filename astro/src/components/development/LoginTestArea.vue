<script setup lang="ts">
import { ref } from 'vue';

import { Auth } from '@/services/auth/auth';

const execMe = async () => {
  Auth.me();
};
</script>

<template>
  <div class="space-x-5">
    <button @click="execMe" class="app-btn-secondary">ログインチェック</button>

    <a href="/profile" class="app-link-normal">プロフィールページ</a>
  </div>
</template>
