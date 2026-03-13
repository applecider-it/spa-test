<script setup>
const route = useRoute();
const slug = route.params.slug;
</script>

<template>
  <div>
    <article>
      <h2 class="app-h2">{{ slug }}</h2>
      <div class="text-right text-gray-500 text-sm mt-5">.....</div>

      <div class="app-post-content-container mt-10">....</div>
    </article>
  </div>
</template>
