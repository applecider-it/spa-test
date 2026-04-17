<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showToast, setIsLoading } from '@/services/ui/message';

import { getTweets, storeTweet } from '@/services/tweet/tweet';

const tweets = ref<any[]>([]);
const content = ref('');
const errors = ref<any>({});

/** 送信時 */
const handleSubmit = async () => {
  errors.value = {};

  setIsLoading(true);
  try {
    const res = await storeTweet(content.value);
    setIsLoading(false);

    console.log('res', res);

    content.value = '';
    showToast('ツイートしました。');

    await setTweets();
  } catch (e: any) {
    setIsLoading(false);
    if (e.response.status === 400) {
      errors.value = e.response.data.errors;
    } else if (e.response.status === 403) {
      showToast('ログインが必要です。', 'alert');
    }
  }
};

/** 一覧 */
const setTweets = async () => {
  const res: any = await getTweets();

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
      <div>
        <textarea
          placeholder="メッセージ"
          v-model="content"
          class="app-form-input"
        />
      </div>

      <div>
        <button type="submit" class="app-btn-primary">送信</button>
      </div>

      <div v-if="errors.content" class="app-form-error">
        {{ errors.content[0] }}
      </div>
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
      <NuxtLink
        :to="`/tweet?id=${tweet.id}`"
        class="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        詳細
      </NuxtLink>
    </div>
  </div>
</template>
