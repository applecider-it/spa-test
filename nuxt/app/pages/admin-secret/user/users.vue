<script setup lang="ts">
import UserList from '@/components/admin/user/UserList.vue';
definePageMeta({
  layout: 'admin',
  requiresAdminAuth: true,
});
</script>

<template>
  <div>
    Users

    <div class="mt-10">
      <div>
        <UserList />
      </div>
    </div>
  </div>
</template>
