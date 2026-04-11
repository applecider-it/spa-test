import { sendRest } from '@/services/api/rest';

/**
 * 認証管理
 */

/** 認証しているユーザー */
let authUser:any = null;

/** すでに認証確認している場合はtrue */
let authChecked = false;

/** ログイン処理 */
const login = async () => {
  const data = {};
  const uri = '/auth/login';

  try {
    const res = await sendRest<{ status: any }>(uri, data);
    console.log('res', res);

    authChecked = false;
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
    const res = await sendRest<{ status: string }>(uri, data);
    console.log('res', res);

    authUser = null;
    authChecked = false;
  } catch (e) {
    console.error(e);
  }
};

/** 認証ユーザー取得 */
const me = async () => {
  const data = {};
  const uri = '/auth/me';

  try {
    const res = await sendRest<{ user: any }>(uri, data);
    console.log('res', res);

    return res;
  } catch (e) {
    console.error(e);
  }
};

/**
 * クライアントに保存されている認証ユーザー取得
 * 
 * この構造の為、最初だけは、ここ複数回me()が動く可能性がある。
 */
const user = async() => {
  if (authUser || authChecked) return authUser;

  console.log('find user');

  const res = await me();

  authUser = res?.user;

  authChecked = true;

  return authUser;
};

export const Auth = {
  login,
  logout,
  me,
  user,
};
