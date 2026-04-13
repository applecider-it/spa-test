import { sendRest } from '@/services/api/rest';

const prefix = import.meta.env.PUBLIC_ADMIN_PREFIX;

/**
 * ユーザー管理
 */

/** ユーザー一覧取得 */
export const getUsers = async () => {
  const data = {};
  const uri = `${prefix}/user/users`;

  try {
    const res = await sendRest<any[]>(uri, data);
    console.log('res', res);

    return res;
  } catch (e) {
    console.error(e);
  }
};

/** ユーザー取得 */
export const getUser = async (id: number) => {
  const data = {id};
  const uri = `${prefix}/user/user`;

  try {
    const res = await sendRest<any[]>(uri, data);
    console.log('res', res);

    return res;
  } catch (e) {
    console.error(e);
  }
};
