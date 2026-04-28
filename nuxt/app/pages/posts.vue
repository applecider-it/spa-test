<script setup lang="ts">
const posts = await queryCollection('post').order('date', 'DESC').all();

console.log(posts);
</script>

<template>
  <div>
    <h2>Posts</h2>

    <div class="space-y-5 p-10">
      <div v-for="post in posts" :key="post.path">
        <NuxtLink :to="post.path">
          <div class="border p-5">
            <div>{{ post.title }}</div>

            <div>{{ post.description }}</div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
