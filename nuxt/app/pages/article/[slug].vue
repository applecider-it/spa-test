<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue';
import { posts, type Post } from '@/../.velite';
import { useRoute, navigateTo } from '#app';
import { toLocaleString } from '@/services/data/datetime';

const auth = useAuth();

// ルートパラメータを取得
const route = useRoute();
const slug = route.params.slug as string;

// 記事データを取得
const post = posts.find((p) => p.slug === slug) as Post;

// 存在しない場合は 404
if (!post) {
  navigateTo('/404');
}

const formattedDate = post ? toLocaleString(post.date) : '';
</script>

<template>
  <AppLayout :auth="auth">
    <article>
      <h2 class="app-h2">{{ post.title }}</h2>
      <div class="text-right text-gray-500 text-sm mt-5">
        {{ formattedDate }}
      </div>

      <div class="app-post-content-container mt-10" v-html="post.body" />
    </article>
  </AppLayout>
</template>
