import { ref, onMounted } from 'vue'
import { sendRest } from '@/services/api/rest'
import type { AuthResult, User } from '@/types/types'

/** 認証チェック */
const authCheck = async (): Promise<AuthResult> => {
  const data = {}
  const uri = '/auth/me'

  const res = await sendRest<AuthResult>(uri, data)
  console.log('res', res)
  return res
}

/**
 * 認証管理Composable
 *
 * loading.value === true の時は認証確認中
 * user.value === null の時は認証失敗
 */
export const useAuth = (callback?: (user: User) => void) => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  const init = async () => {
    try {
      const result = await authCheck()
      user.value = result.user
    } catch (e) {
      user.value = null
    } finally {
      loading.value = false
      if (callback) callback(user.value as User)
    }
  }

  onMounted(() => {
    init()
  })

  return {
    user,
    loading,
  }
}