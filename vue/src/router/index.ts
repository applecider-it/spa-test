import { createRouter, createWebHistory } from 'vue-router';

import { Auth } from '@/services/auth/auth';
import { Auth as AdminAuth } from '@/services/admin/auth/auth';
import { showToast } from '@/services/ui/message';
import { adminPrefix } from '@/config/constants';

import { ref } from 'vue';

export const loading = ref(false);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: async() => {
        //await new Promise(resolve => setTimeout(resolve, 3000));
        const HomeView = import('../views/HomeView.vue')
        return HomeView;
      },
      meta: {},
    },
    {
      path: '/development',
      name: 'development',
      component: () => import('../views/DevelopmentView.vue'),
      meta: {},
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {},
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/tweets',
      name: 'tweets',
      component: () => import('../views/TweetsView.vue'),
      meta: {},
    },
    {
      path: '/tweet/:id',
      name: 'tweet',
      component: () => import('../views/TweetView.vue'),
      meta: {},
    },

    // 管理画面
    {
      path: adminPrefix,
      name: 'admin:home',
      component: () => import('../views/admin/HomeView.vue'),
      meta: { requiresAdminAuth: true },
    },
    {
      path: `${adminPrefix}/login`,
      name: 'admin:login',
      component: () => import('../views/admin/LoginView.vue'),
      meta: {},
    },
    {
      path: `${adminPrefix}/users`,
      name: 'admin:users',
      component: () => import('../views/admin/user/UsersView.vue'),
      meta: { requiresAdminAuth: true },
    },
    {
      path: `${adminPrefix}/user/:id`,
      name: 'admin:user',
      component: () => import('../views/admin/user/UserView.vue'),
      meta: { requiresAdminAuth: true },
    },
  ],
});

router.beforeEach(async (to, from) => {
  console.log('遷移開始');
  loading.value = true;

  if (to.meta.requiresAuth && !(await Auth.checkAuth())) {
    showToast('ログイン必須ページです。', 'alert');
    return '/';
  }

  if (to.meta.requiresAdminAuth && !(await AdminAuth.checkAuth())) {
    showToast('ログイン必須ページです。', 'alert');
    return {
      name: 'admin:login',
    };
  }

  return true;
});

router.afterEach(async (to, from) => {
  console.log('遷移終了');
  loading.value = false;

  return true;
});

export default router;
