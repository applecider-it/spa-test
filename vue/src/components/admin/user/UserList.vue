<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { getUsers } from '@/services/admin/user/user';

import { adminPrefix } from '@/config/constants';

const users = ref<any[]>([]);

/** 一覧 */
const setUsers = async () => {
  const res: any = await getUsers();

  if (!res) return;

  console.log('UserList setUsers users', res);

  users.value = res;
};

onMounted(async () => {
  console.log('UserList onMounted');

  await setUsers();
});
</script>

<template>
  <div class="app-table-container">
    <table class="app-table">
      <thead class="app-table-thead">
        <tr>
          <th class="app-table-th">ID</th>
          <th class="app-table-th">名前</th>
          <th class="app-table-th">メールアドレス</th>
          <th class="app-table-th"></th>
        </tr>
      </thead>
      <tbody class="app-table-tbody">
        <tr v-for="user in users" :key="user.id">
          <td class="app-table-td">{{ user.id }}</td>
          <td class="app-table-td">{{ user.name }}</td>
          <td class="app-table-td">{{ user.email }}</td>
          <td class="app-table-td text-right">
            <RouterLink
              :to="`${adminPrefix}/user/${user.id}`"
              class="app-btn-primary"
            >
              更新
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
