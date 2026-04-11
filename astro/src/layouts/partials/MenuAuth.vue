<script setup lang="ts">
import { ref, onMounted } from 'vue';

type Props = {
  desktopClass: string;
}

defineProps<Props>();

import { Auth } from '@/services/auth/auth';

const user = ref<any>(null)

onMounted(() => {
  console.log('menu');

  user.value = Auth.user();
});
</script>

<template>
  <span v-if="user" :class="desktopClass">
    <a href="/profile">{{ user.name }}</a>
  </span>
  <span v-else :class="desktopClass">
    Guest
  </span>
</template>