<template>
  <AppLayout :auth="auth" :needAuth="true">
    <div>
      <h2 class="app-h2">Profile</h2>
    </div>

    <!-- ロード中 -->
    <LoadingBlock v-if="auth.loading.value" height="12rem" />

    <!-- 認証後 -->
    <div v-else class="space-y-5">
      <div>
        <div class="mb-5 font-bold text-xl">Name</div>
        <div>{{ auth.user.value ? auth.user.value.name : 'none' }}</div>
      </div>
      <div>
        <div class="mb-5 font-bold text-xl">Description</div>
        <div>{{ desc }}</div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import LoadingBlock from '@/components/ui/LoadingBlock.vue'
import { useAuth } from '@/composables/useAuth'

// 認証
const auth = useAuth()

// 説明文
const desc = ref('')

// 認証完了後に desc を更新
watch(
  () => auth.user.value,
  (user) => {
    if (user) {
      desc.value = 'desc desc desc desc ' + user.name
    }
  }
)
</script>