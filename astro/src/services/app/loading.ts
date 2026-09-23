import { ref } from 'vue';

export const loading = ref(false);

/** ローディング演出のセットアップ */
export function setupLoading() {
  console.log('setupLoading');

  document.addEventListener('astro:before-preparation', async() => {
    console.log('astro:before-preparation');
    loading.value = true;
  });
  document.addEventListener('astro:page-load', () => {
    console.log('astro:page-load');
    loading.value = false;
  });
}
