<template>
  <div>
    <button @click="execLogin" class="app-btn-primary">
      ログイン
    </button>
    <button @click="execLogout" class="app-btn-primary ml-5">
      ログアウト
    </button>
  </div>
</template>

<script setup lang="ts">
import { sendRest } from '@/services/api/rest'
import { useRouter } from 'vue-router'

const router = useRouter()

const execLogin = async () => {
  const data = {}
  const uri = '/auth/login'

  try {
    const res = await sendRest<{ message: string }>(uri, data)
    console.log('res', res)

    // Nuxtルーターで遷移
    router.push('/')
  } catch (e) {
    console.error(e)
  }
}

const execLogout = async () => {
  const data = {}
  const uri = '/auth/logout'

  try {
    const res = await sendRest<{ message: string }>(uri, data)
    console.log('res', res)

    // SSR/CSR問わず確実にリロードしたい場合
    location.href = '/'
  } catch (e) {
    console.error(e)
  }
}
</script>