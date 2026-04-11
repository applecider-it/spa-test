<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Toasts from '@/components/ui/message/Toasts.vue';
import Loading from '@/components/ui/message/Loading.vue';
import { useToast } from './useToast';
import { setupMessage } from './message';

const { toasts, showToast } = useToast();

const isLoading = ref(false);

onMounted(() => {
  console.log('UiCommon')
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
