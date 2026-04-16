<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

import { getTweet } from '@/services/tweet/tweet';

const tweet = ref<any>(null);

onMounted(async () => {
  console.log('tweet');

  const id = Number(route.params.id);

  console.log('id', id);

  const res: any = await getTweet(id);

  if (!res) return;

  console.log('tweet', res);

  tweet.value = res;
});
</script>

<template>
  <div v-if="tweet" class="max-w-2xl mx-auto mt-10">
    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <!-- ヘッダー -->
      <div class="flex items-center justify-between mb-4">
        <div class="text-sm text-gray-500">#{{ tweet.id }}</div>
        <div class="text-sm text-gray-400">by {{ tweet.user.name }}</div>
      </div>

      <!-- 本文 -->
      <div class="text-gray-800 text-lg leading-relaxed mb-6 break-words">
        {{ tweet.content }}
      </div>

      <!-- アクション -->
      <div class="flex justify-between items-center">
        <RouterLink
          to="/tweets"
          class="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← 戻る
        </RouterLink>
      </div>
    </div>
  </div>
</template>
