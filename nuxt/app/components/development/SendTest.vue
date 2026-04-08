<script setup lang="ts">
import { ref } from 'vue';
import { sendRest } from '@/services/api/rest';

const message = ref('');
const result = ref('');

const handleSubmit = async () => {
  const data = { message: message.value };
  const url = '/development/send-test';

  try {
    const res = await sendRest<{ message: string; user: any }>(url, data);

    console.log('res', res);

    let message = res.message;
    if (res.user) message += ' by ' + res.user.name;

    result.value = message;
  } catch (e) {
    console.error(e);
    result.value = '送信に失敗しました';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
    <textarea
      placeholder="メッセージ"
      v-model="message"
      class="app-form-input"
    />
    <button type="submit" class="app-btn-primary">送信</button>
    <p v-if="result">{{ result }}</p>
  </form>
</template>
