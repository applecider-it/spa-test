<template>
  <div>
    <!-- ヘッダー -->
    <div
      class="flex items-center justify-between bg-gradient-to-br from-indigo-100 via-indigo-100 to-blue-100"
    >
      <div class="space-x-3 px-7 py-8">
        <div
          class="inline-block mr-4 text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          MySite
        </div>
        <NuxtLink to="/" class="text-gray-500 underline">Top</NuxtLink>
        <NuxtLink to="/posts/1" class="text-gray-500 underline">Blog</NuxtLink>
      </div>
      <div class="space-x-3 px-7 py-8">
        <span
          v-if="auth.loading.value"
          class="border-2 border-gray-300 bg-gray-200 inline-block rounded"
          :style="{ width: '7rem', height: '0.9rem' }"
        ></span>
        <template v-else>
          <NuxtLink
            v-if="auth.user.value"
            to="/profile"
            class="text-gray-500 underline"
          >
            ユーザーページ
          </NuxtLink>
          <span>{{ auth.user.value ? auth.user.value.name : 'Guest' }}</span>
        </template>
      </div>
    </div>

    <!-- コンテンツ -->
    <div class="container mx-auto my-10">
      <div
        v-if="authError"
        class="text-center my-20 border rounded-2xl p-20 bg-blue-50 shadow-lg text-gray-500"
      >
        このページへのアクセス権がありません。
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// props
interface Props {
  needAuth?: boolean;
  auth: ReturnType<typeof useAuth>;
}

const props = defineProps<Props>();

const needAuth = props.needAuth ?? false;

console.log('needAuth', needAuth);

// 認証エラー判定
const authError = computed(
  () => needAuth && !props.auth.loading.value && !props.auth.user.value,
);
</script>
