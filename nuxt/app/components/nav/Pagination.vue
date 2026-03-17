<template>
  <nav class="flex justify-center items-center gap-3 mt-16">
    <NuxtLink
      v-if="page > 1"
      :to="`/posts/${page - 1}`"
      class="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
    >
      ← Prev
    </NuxtLink>

    <NuxtLink
      v-if="page < info.pageCount"
      :to="`/posts/${page + 1}`"
      class="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
    >
      Next →
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { getPageInfo } from '@/services/nav/paginate'

interface Props {
  page: number
  info: ReturnType<typeof getPageInfo>
}

const props = defineProps<Props>()
const { page, info } = props
</script>