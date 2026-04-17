import { sendRest } from '@/services/api/rest';

import { adminPrefix } from '@/config/constants';

/**
 * ユーザー管理
 */

/** ユーザー一覧取得 */
export const getUsers = async () => {
  const data = {};
  const uri = `${adminPrefix}/user/users`;

  const res = await sendRest<any[]>(uri, data);

  return res;
};

/** ユーザー取得 */
export const getUser = async (id: number) => {
  const data = { id };
  const uri = `${adminPrefix}/user/user`;

  const res = await sendRest<any[]>(uri, data);

  return res;
};

/** ユーザー更新 */
export const updateUser = async (id: number, name: string, email: string) => {
  const data = { id, name, email };
  const url = `${adminPrefix}/user/update`;

  const res = await sendRest<{ status: string; user?: any }>(url, data);

  return res;
};
