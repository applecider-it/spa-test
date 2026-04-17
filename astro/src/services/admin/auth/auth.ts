import AuthCtrl from '@/services/auth/AuthCtrl';

import { adminPrefix } from '@/config/constants';

const Auth = new AuthCtrl(
  `${adminPrefix}/auth/login`,
  `${adminPrefix}/auth/logout`,
  `${adminPrefix}/auth/me`,
  `${adminPrefix}/`,
);

export { Auth };
