<template>
  <div>
    <div>
      <div>
        <div>text: {{ text }}</div>
        <div>auth.loading: {{ auth.loading.value ? 'on' : 'off' }}</div>
        <div>auth.user: {{ auth.user.value ? auth.user.value.name : 'none' }}</div>
      </div>
    </div>

    <div class="mt-5">
      <LoadingBlock v-if="auth.loading.value" />
      <div v-else>
        <div>text: {{ text }}</div>
        <div>auth.loading: {{ auth.loading.value ? 'on' : 'off' }}</div>
        <div>auth.user: {{ auth.user.value ? auth.user.value.name : 'none' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingBlock from '@/components/ui/LoadingBlock.vue'

interface Props {
  text: string
  auth: ReturnType<typeof useAuth>
}

// props 定義
const props = defineProps<Props>()
</script>