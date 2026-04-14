<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Auth } from '@/services/auth/auth';

const user = ref<any>(null);

onMounted(async () => {
  console.log('profile');

  if (!(await Auth.requieAuth())) return;

  const res: any = await Auth.user();

  user.value = res;
});
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center">
    <div v-if="user" class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
      <!-- ヘッダー -->
      <div class="flex items-center space-x-4 mb-6">
        <div
          class="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white"
        >
          {{ user.name?.charAt(0).toUpperCase() }}
        </div>
        <div>
          <div class="text-xl font-semibold text-gray-800">
            {{ user.name }}
          </div>
          <div class="text-sm text-gray-500">
            {{ user.email }}
          </div>
        </div>
      </div>

      <!-- 情報セクション -->
      <div class="border-t pt-4 space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-500">User ID</span>
          <span class="font-medium text-gray-800">{{ user.id }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Name</span>
          <span class="font-medium text-gray-800">{{ user.name }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Email</span>
          <span class="font-medium text-gray-800">{{ user.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
