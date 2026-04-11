<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { Tweet } from '@/services/tweet/tweet';

const tweet = ref<any>(null);

onMounted(async () => {
  console.log('tweet');

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  console.log('id', id);

  const res: any = await Tweet.tweet(id);

  if (!res) return;

  console.log('tweet', res);

  tweet.value = res;
});
</script>

<template>
  <div v-if="tweet">
    <div>id: {{ tweet.id }}</div>
    <div>content: {{ tweet.content }}</div>
    <div>by {{ tweet.user.name }}</div>
  </div>
</template>
