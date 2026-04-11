import { sendRest } from '@/services/api/rest';

/**
 * 認証管理
 */

const userKey = "auth-user";

/** ログイン処理 */
const login = async () => {
  const data = {};
  const uri = '/auth/login';

  try {
    const res = await sendRest<{ user: any }>(uri, data);
    console.log('res', res);

    localStorage.setItem(userKey, JSON.stringify(res.user));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/** ログアウト処理 */
const logout = async () => {
  const data = {};
  const uri = '/auth/logout';

  try {
    const res = await sendRest<{ message: string }>(uri, data);
    console.log('res', res);

    localStorage.removeItem(userKey);
  } catch (e) {
    console.error(e);
  }
};

/** 認証ユーザー取得 */
const me = async () => {
  const data = {};
  const uri = '/auth/me';

  try {
    const res = await sendRest<{ message: string }>(uri, data);
    console.log('res', res);

    return res;
  } catch (e) {
    console.error(e);
  }
};

/** クライアントに保存されている認証ユーザー取得 */
const user = () => {
  const stored = localStorage.getItem(userKey);

  const user = stored ? JSON.parse(stored) : null;

  console.log('user', user);

  return user;
};

export const Auth = {
  login,
  logout,
  me,
  user,
};
