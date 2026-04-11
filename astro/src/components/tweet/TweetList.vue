<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sendRest } from '@/services/api/rest';

import { Tweet } from '@/services/tweet/tweet';

const tweets = ref<any[]>([]);
const content = ref('');

/** 送信時 */
const handleSubmit = async () => {
  if (content.value === '') return;

  const data = { content: content.value };
  const url = '/tweet/store';

  try {
    const res = await sendRest<{ content: string; user: any }>(url, data);

    console.log('res', res);

    content.value = '';

    await setTweets();
  } catch (e) {
    console.error(e);
  }
};

/** 一覧 */
const setTweets = async () => {
  const res: any = await Tweet.tweets();

  if (!res) return;

  console.log('tweets', res);

  tweets.value = res;
};

onMounted(async () => {
  console.log('tweets');

  await setTweets();
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
      <textarea
        placeholder="メッセージ"
        v-model="content"
        class="app-form-input"
      />
      <button type="submit" class="app-btn-primary">送信</button>
    </form>
  </div>

  <div v-for="tweet in tweets" class="border-4 p-10 my-5 space-y-5">
    <div>id: {{ tweet.id }}</div>
    <div>content: {{ tweet.content }}</div>
    <div>by {{ tweet.user.name }}</div>
    <div>
      <a :href="`/tweet?id=${tweet.id}`" class="app-btn-primary">詳細</a>
    </div>
  </div>
</template>
