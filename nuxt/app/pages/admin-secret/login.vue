<script setup lang="ts">
import LoginForm from '@/components/admin/auth/LoginForm.vue';
definePageMeta({
  layout: 'admin',
});
</script>

<template>
  <div>
    ログイン

    <LoginForm />
  </div>
</template>
