export default defineNuxtPlugin((nuxtApp) => {
  const loading = useState('app-nav-loading')

  nuxtApp.hook('page:start', () => {
    console.log('page:start')
    loading.value = true
  })

  nuxtApp.hook('page:finish', () => {
    console.log('page:finish')
    loading.value = false
  })
})