<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Tweet } from '@/services/tweet/tweet';

const tweets = ref<any[]>([]);

onMounted(async () => {
  console.log('tweets');

  const res: any = await Tweet.tweets();

  if (!res) return;

  console.log('tweets', res);

  tweets.value = res;
});
</script>

<template>
  <div v-for="tweet in tweets" class="border-4 p-10 my-5 space-y-5">
    <div>id: {{ tweet.id }}</div>
    <div>content: {{ tweet.content }}</div>
    <div>
      <a :href="`/tweet?id=${tweet.id}`" class="app-btn-primary">詳細</a>
    </div>
  </div>
</template>
