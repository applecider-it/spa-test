import { sendRest } from '@/services/api/rest';

import { adminPrefix } from '@/config/constants';

/**
 * ユーザー管理
 */

/** ユーザー一覧取得 */
export const getUsers = async () => {
  const data = {};
  const uri = `${adminPrefix}/user/users`;

  try {
    const res = await sendRest<any[]>(uri, data);

    return res;
  } catch (e) {
    console.error(e);
  }
};

/** ユーザー取得 */
export const getUser = async (id: number) => {
  const data = {id};
  const uri = `${adminPrefix}/user/user`;

  try {
    const res = await sendRest<any[]>(uri, data);

    return res;
  } catch (e) {
    console.error(e);
  }
};
