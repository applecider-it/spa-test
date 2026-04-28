<script setup lang="ts">
const route = useRoute();

const post = await queryCollection('post').path(route.path).first();
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <div class="app-post-content-container">
      <ContentRenderer :value="post" />
    </div>
  </article>

  <div v-else>Not found</div>
</template>
