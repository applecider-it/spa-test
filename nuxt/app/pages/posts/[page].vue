<script setup lang="ts">
const route = useRoute()

const perPage = 2
const currentPage = Number(route.params.page || 1)

const total = await queryCollection('post').count()

const posts = await queryCollection('post')
  .order('date', 'DESC')
  .skip((currentPage - 1) * perPage)
  .limit(perPage)
  .all()

const totalPages = Math.ceil(total / perPage)
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

    <div class="flex gap-2 justify-center mt-10">
      <NuxtLink
        v-if="currentPage > 1"
        :to="`/posts/${currentPage - 1}`"
        class="border px-4 py-2"
      >
        Prev
      </NuxtLink>

      <NuxtLink
        v-for="p in totalPages"
        :key="p"
        :to="`/posts/${p}`"
        class="border px-4 py-2"
      >
        {{ p }}
      </NuxtLink>

      <NuxtLink
        v-if="currentPage < totalPages"
        :to="`/posts/${currentPage + 1}`"
        class="border px-4 py-2"
      >
        Next
      </NuxtLink>
    </div>
  </div>
</template>