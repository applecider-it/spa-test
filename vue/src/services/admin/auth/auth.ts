import AuthCtrl from '@/services/auth/AuthCtrl';

const prefix = import.meta.env.PUBLIC_ADMIN_PREFIX;

const Auth = new AuthCtrl(
  `${prefix}/auth/login`,
  `${prefix}/auth/logout`,
  `${prefix}/auth/me`,
  `${prefix}/`,
);

export { Auth };
