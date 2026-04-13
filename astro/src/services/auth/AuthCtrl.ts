import { sendRest } from '@/services/api/rest';
import { navigate } from 'astro:transitions/client';
import { showToastNextPage } from '@/services/ui/message';

/**
 * 認証管理
 *
 * スコープ内変数を使うため、SSRでは利用できないので注意。
 */
export default class AuthCtrl {
  /** 認証しているユーザー */
  private authUser: any = null;

  /** すでに認証確認している場合はtrue */
  private authChecked = false;

  private loginUrl;
  private logoutUrl;
  private meUrl;
  private redirectUrl;

  constructor(
    loginUrl: string,
    logoutUrl: string,
    meUrl: string,
    redirectUrl: string,
  ) {
    this.loginUrl = loginUrl;
    this.logoutUrl = logoutUrl;
    this.meUrl = meUrl;
    this.redirectUrl = redirectUrl;
  }

  /** ログイン処理 */
  async login(email: string, password: string) {
    const data = { email, password };
    const uri = this.loginUrl;

    const res = await sendRest<{ status: any }>(uri, data);
    console.log('res', res);

    this.clear();

    return res.status === 'ok';
  }

  /** ログアウト処理 */
  async logout() {
    const data = {};
    const uri = this.logoutUrl;

    const res = await sendRest<{ status: string }>(uri, data);
    console.log('res', res);

    this.clear();
  }

  /** 認証ユーザー取得 */
  async me() {
    console.log('Auth.me()');

    const data = {};
    const uri = this.meUrl;

    const res = await sendRest<{ user: any }>(uri, data);
    console.log('res', res);

    return res;
  }

  /** 認証ユーザー変数クリア */
  clear() {
    this.authUser = null;
    this.authChecked = false;
  }

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
  async user() {
    if (this.authUser || this.authChecked) return this.authUser;

    console.log('find user');

    const res = await this.me();

    this.authUser = res?.user;

    this.authChecked = true;

    return this.authUser;
  }

  /** 認証必須ページ処理 */
  async requieAuth() {
    const rec = await this.user();

    if (!rec) {
      showToastNextPage('ログイン必須ページです。', 'alert');
      navigate(this.redirectUrl);
      return false;
    }

    return true;
  }
}