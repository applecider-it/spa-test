<script setup lang="ts">
import UserEdit from '@/components/admin/user/UserEdit.vue';
definePageMeta({
  layout: 'admin',
  requiresAdminAuth: true,
});
</script>

<template>
  <div>
    User

    <div class="mt-10">
      <div>
        <UserEdit />
      </div>
    </div>
  </div>
</template>
