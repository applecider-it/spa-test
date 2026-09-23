<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
</script>

<template>
  <AppLayout>
    Index

    <div class="p-10">
      <div>
        <RouterLink to="/development" class="app-link-normal"
          >development</RouterLink
        >
      </div>
    </div>
  </AppLayout>
</template>
