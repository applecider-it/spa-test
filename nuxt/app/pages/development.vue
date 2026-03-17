<template>
  <AppLayout :auth="auth">
    <div>
      <h2 class="app-h2">Development</h2>

      <!-- 認証ロード中 -->
      <LoadingBlock v-if="auth.loading.value" height="12rem" />

      <!-- 認証完了後 -->
      <div v-else class="border-2 p-10 my-5">
        <SendTest />
      </div>

      <div class="border-2 p-10 my-5">
        <LoginTest />
      </div>

      <div class="border-2 p-10 my-5">
        <AuthLoadingTest :text="text" :auth="auth" />
      </div>

      <div class="border-2 p-10 my-5">
        <NuxtLink to="/profile" class="app-link-normal">
          ユーザーページ
        </NuxtLink>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import LoadingBlock from '@/components/ui/LoadingBlock.vue'
import SendTest from '@/components/development/SendTest.vue'
import LoginTest from '@/components/development/LoginTest.vue'
import AuthLoadingTest from '@/components/development/AuthLoadingTest.vue'
import { useAuth } from '@/composables/useAuth'

// 認証
const auth = useAuth()

// 認証後に text を設定
const text = ref('')
watch(
  () => auth.user.value,
  (user) => {
    if (user) {
      text.value = 'test ' + user.name
    }
  }
)
</script>