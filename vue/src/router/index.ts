import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

import { Auth } from '@/services/auth/auth';
import { showToast } from '@/services/ui/message';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !(await Auth.checkAuth())) {
    showToast('ログイン必須ページです。', 'alert');
    next('/');
  } else {
    next();
  }
});

export default router;
