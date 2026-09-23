<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { getUser } from '@/services/admin/user/user';
import { showToast, setIsLoading } from '@/services/ui/message';

import { useRoute } from 'vue-router';

import { updateUser } from '@/services/admin/user/user';

const route = useRoute();

const user = ref<any>(null);

const name = ref('');
const email = ref('');

const errors = ref<any>({});

/** 送信時 */
const handleSubmit = async () => {
  errors.value = {};

  setIsLoading(true);
  try {
    const res = await updateUser(user.value.id, name.value, email.value);
    setIsLoading(false);

    console.log('res', res);

    showToast('更新しました。');
  } catch (e: any) {
    setIsLoading(false);
    if (e.response.status === 400) {
      errors.value = e.response.data.errors;
    } else if (e.response.status === 403) {
      showToast('ログインが必要です。', 'alert');
    }
  }
};

onMounted(async () => {
  console.log('UserEdit onMounted');

  const id = Number(route.params.id);

  console.log('UserEdit params.id', id);

  const res: any = await getUser(id);

  if (!res) return;

  console.log('UserEdit user', res);

  user.value = res;

  name.value = res.name;
  email.value = res.email;
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
      <label> 名前 </label>
      <div>
        <input v-model="name" class="app-form-input" />

        <div v-if="errors.name" class="app-form-error">
          {{ errors.name[0] }}
        </div>
      </div>

      <label> メールアドレス </label>
      <div>
        <input v-model="email" class="app-form-input" />

        <div v-if="errors.email" class="app-form-error">
          {{ errors.email[0] }}
        </div>
      </div>

      <div>
        <button type="submit" class="app-btn-primary">更新</button>
      </div>
    </form>
  </div>
</template>
