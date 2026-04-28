<script setup lang="ts">
import { loading } from '@/router';
</script>

<template>
  <div v-show="loading" class="overlay fade-in" />
</template>

<style>
.overlay {
  position: fixed;
  inset: 0;
  background: black;
  opacity: 0.1;
  z-index: 999;
  pointer-events: none;
}
.fade-in {
  animation: fadeIn 2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.1;
  }
}
</style>
