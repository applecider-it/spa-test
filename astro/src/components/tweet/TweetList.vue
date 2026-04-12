<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { sendRest } from '@/services/api/rest';
import { showToast } from '@/services/ui/message';

import { Tweet } from '@/services/tweet/tweet';

const tweets = ref<any[]>([]);
const content = ref('');

/** 送信時 */
const handleSubmit = async () => {
  if (content.value === '') return;

  const data = { content: content.value };
  const url = '/tweet/store';

  try {
    const res = await sendRest<{ status: string; tweet?: any }>(url, data);

    console.log('res', res);

    if (res.status === 'ok') {
      content.value = '';
      showToast('ツイートしました。');
    } else {
      if (res.status === 'auth') {
        showToast('ログインが必要です。', 'alert');
      }
    }

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

  <div
    v-for="tweet in tweets"
    :key="tweet.id"
    class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 my-4 hover:shadow-md transition"
  >
    <!-- ヘッダー -->
    <div class="flex items-center justify-between mb-3">
      <div class="text-sm text-gray-500">#{{ tweet.id }}</div>
      <div class="text-sm text-gray-400">by {{ tweet.user.name }}</div>
    </div>

    <!-- 本文 -->
    <div class="text-gray-800 text-base leading-relaxed mb-4">
      {{ tweet.content }}
    </div>

    <!-- フッター -->
    <div class="flex justify-end">
      <a
        :href="`/tweet?id=${tweet.id}`"
        class="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        詳細
      </a>
    </div>
  </div>
</template>
