<script setup lang="ts">
import AppLayout from '@/components/admin/layouts/AppLayout.vue';
import UserEdit from '@/components/admin/user/UserEdit.vue';
</script>

<template>
  <AppLayout>
    User

    <div class="mt-10">
      <div>
        <UserEdit />
      </div>
    </div>
  </AppLayout>
</template>
