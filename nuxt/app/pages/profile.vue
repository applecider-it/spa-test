<script setup lang="ts">
import ProfileDetail from '@/components/profile/ProfileDetail.vue';
definePageMeta({
  requiresAuth: true
})
</script>

<template>
  <div>
    プロフィール

    <div class="mt-10">
      <div>
        <ProfileDetail />
      </div>
    </div>
  </div>
</template>
