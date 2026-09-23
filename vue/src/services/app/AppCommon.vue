<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Toasts from '@/components/ui/message/Toasts.vue';
import Loading from '@/components/ui/message/Loading.vue';
import { useToast } from '@/services/ui/useToast';
import { setupMessage } from '@/services/ui/message';

const { toasts, showToast } = useToast();

const isLoading = ref(false);

onMounted(() => {
  console.log('AppCommon')
  setupMessage(showToast, (value: boolean) => {
    isLoading.value = value;
  });
});
</script>

<template>
  <div>
    <Toasts :toasts="toasts" />
    <Loading :isLoading="isLoading" />
  </div>
</template>
