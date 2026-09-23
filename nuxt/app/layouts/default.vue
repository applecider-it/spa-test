<script setup lang="ts">
import Nav from '@/components/layouts/Nav.vue';
</script>

<template>
  <div>
    <Nav />

    <div class="pb-40 p-10">
      <slot />
    </div>
  </div>
</template>
