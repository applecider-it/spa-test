<script setup>
import '@/assets/css/app.css';

const linkClass = 'text-gray-500 underline';
</script>

<template>
  <div>
    <div class="flex items-center justify-between bg-gray-100">
      <div class="space-x-3 px-7 py-8">
        <span class="text-xl pr-5">SPA Test</span>
        <NuxtLink to="/" :class="linkClass">Top</NuxtLink>
        <NuxtLink to="/posts/1" :class="linkClass">
          Blog
        </NuxtLink>
      </div>
      <div class="space-x-3 px-7 py-8">
        ....
      </div>
    </div>
    <div class="container mx-auto my-10">
      <slot />
    </div>
  </div>
</template>
