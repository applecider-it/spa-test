<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
import ProfileDetail from '@/components/profile/ProfileDetail.vue';
</script>

<template>
  <AppLayout>
    プロフィール

    <div class="mt-10">
      <div>
        <ProfileDetail />
      </div>
    </div>
  </AppLayout>
</template>
