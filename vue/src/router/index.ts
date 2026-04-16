import { createRouter, createWebHistory } from 'vue-router';

import { Auth } from '@/services/auth/auth';
import { Auth as AdminAuth } from '@/services/admin/auth/auth';
import { showToast } from '@/services/ui/message';
import { adminPrefix } from '@/config/constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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

export default router;
