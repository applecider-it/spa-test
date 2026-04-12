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

  const res = await sendRest<{ status: any }>(uri, data);
  console.log('res', res);

  clear();

  return res.status === 'ok';
};

/** ログアウト処理 */
const logout = async () => {
  const data = {};
  const uri = '/auth/logout';

  const res = await sendRest<{ status: string }>(uri, data);
  console.log('res', res);

  clear();
};

/** 認証ユーザー取得 */
const me = async () => {
  console.log('Auth.me()');

  const data = {};
  const uri = '/auth/me';

  const res = await sendRest<{ user: any }>(uri, data);
  console.log('res', res);

  return res;
};

/** 認証ユーザー変数クリア */
const clear = () => {
  authUser = null;
  authChecked = false;
};

/**
 * クライアントに保存されている認証ユーザー取得
 *
 * この関数がいろいろな場所で呼ばれている場合は、
 * ブラウザを開いた直後だけは、複数回`me()`が動く可能性がある。
 * 
 * 呼ばれる場所
 * 
 * - layouts/partials/MenuAuth.vue
 *  - デスクトップ
 *  - モバイル (`user()`の実行を遅らせることで`me()`は実行されない)
 * - 各ページごとのisland
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
