<template>
  <AppLayout :auth="auth">
    <div>
      <h2 class="app-h2">Blog</h2>

      <div class="space-y-5">
        <NuxtLink
          v-for="post in info.list"
          :key="post.slug"
          :to="`/article/${post.slug}`"
          class="block"
        >
          <article class="border-2 p-5 border-gray-300 transition hover:bg-gray-50">
            <h3 class="app-h3">{{ post.title }}</h3>
            <div class="my-3">{{ post.description }}</div>
            <div class="text-right text-gray-500 text-sm">
              {{ toLocaleString(post.date) }}
            </div>
          </article>
        </NuxtLink>
      </div>

      <Pagination :page="pageNum" :info="info" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layouts/AppLayout.vue'
import Pagination from '@/components/nav/Pagination.vue'

import { type Post, posts } from '@/../.velite'
import { getPageInfo } from '@/services/nav/paginate'
import { toLocaleString } from '@/services/data/datetime'
import { POST_PER_PAGE } from '@/config/const'

const auth = useAuth();

// 1ページあたりの記事数
const PER_PAGE = POST_PER_PAGE

// 日付降順でソート
const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

console.log('posts', posts)

console.log('sortedPosts', sortedPosts)

// ルートパラメータを取得
import { useRoute, navigateTo } from '#app'
const route = useRoute()
const pageParam = route.params.page as string
const pageNum = Number(pageParam)

// ページ情報を計算
const info = getPageInfo<Post>(sortedPosts, pageNum, PER_PAGE)

// 存在しないページは 404
if (!info.list.length && pageNum !== 1) {
  navigateTo('/404')
}
</script>