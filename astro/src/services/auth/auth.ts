import { sendRest } from '@/services/api/rest';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';

/**
 * 認証管理
 *
 * スコープ内変数を使っているため、SSRでは利用できないので注意。
 */

/** 認証しているユーザー */
let authUser: any = null;

/** すでに認証確認している場合はtrue */
let authChecked = false;

/** ログイン処理 */
const login = async (email: string, password: string) => {
  const data = { email, password };
  const uri = '/auth/login';

  try {
    const res = await sendRest<{ status: any }>(uri, data);
    console.log('res', res);

    clear();

    return res.status === 'ok';
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

    clear();
  } catch (e) {
    console.error(e);
  }
};

/** 認証ユーザー取得 */
const me = async () => {
  console.log('Auth.me()');

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

/** 認証ユーザー変数クリア */
const clear = () => {
  authUser = null;
  authChecked = false;
};

/**
 * クライアントに保存されている認証ユーザー取得
 *
 * この構造の為、最初だけは、ここ複数回me()が動く可能性がある。
 */
const user = async () => {
  if (authUser || authChecked) return authUser;

  console.log('find user');

  const res = await me();

  authUser = res?.user;

  authChecked = true;

  return authUser;
};

/** 認証必須ページ処理 */
const requieAuth = async () => {
  const rec = await user();

  if (!rec) {
    showToastNextPage('ログイン必須ページです。', 'alert');
    navigate('/');
    return false;
  }

  return true;
};

export const Auth = {
  login,
  logout,
  me,
  user,
  requieAuth,
};
