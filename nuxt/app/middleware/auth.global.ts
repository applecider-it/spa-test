import { Auth } from '@/services/auth/auth';
import { Auth as AdminAuth } from '@/services/admin/auth/auth';
import { showToast } from '@/services/ui/message';
import { adminPrefix } from '@/config/constants';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.meta.requiresAuth && !(await Auth.checkAuth())) {
    showToast('ログイン必須ページです。', 'alert');
    return navigateTo('/');
  }

  if (to.meta.requiresAdminAuth && !(await AdminAuth.checkAuth())) {
    showToast('ログイン必須ページです。', 'alert');
    return navigateTo(`${adminPrefix}/login`);
  }
});
