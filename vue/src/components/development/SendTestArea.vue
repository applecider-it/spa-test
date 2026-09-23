<script setup lang="ts">
import { ref } from 'vue';
import { sendRest } from '@/services/api/rest';
import { showToast, setIsLoading } from '@/services/ui/message';

const message = ref('');
const errors = ref<any>({});

const handleSubmit = async () => {
  const data = { message: message.value };
  const url = '/development/send-test';

  errors.value = {};

  setIsLoading(true);
  try {
    const res = await sendRest<{ message: string; user: any }>(url, data);
    setIsLoading(false);

    console.log('res', res);

    let message = res.message;
    if (res.user) message += ' by ' + res.user.name;

    showToast(message);
  } catch (e: any) {
    setIsLoading(false);
    if (e.response.status === 400) {
      errors.value = e.response.data.errors;
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
    <div>
      <textarea
        placeholder="メッセージ"
        v-model="message"
        class="app-form-input"
      />

      <div v-if="errors.message" class="app-form-error">
        {{ errors.message[0] }}
      </div>
    </div>
    <div>
      <button type="submit" class="app-btn-primary">送信</button>
    </div>
  </form>
</template>
