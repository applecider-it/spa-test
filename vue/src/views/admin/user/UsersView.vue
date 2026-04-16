<script setup lang="ts">
import AppLayout from '@/components/admin/layouts/AppLayout.vue';
import UserList from '@/components/admin/user/UserList.vue';
</script>

<template>
  <AppLayout>
    Users

    <div class="mt-10">
      <div>
        <UserList client:load />
      </div>
    </div>
  </AppLayout>
</template>
