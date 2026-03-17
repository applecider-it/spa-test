<script setup>
import '@/assets/css/app.css';

useHead({
  title: 'MySite',
  meta: [{ name: 'description', content: '説明文です' }],
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
