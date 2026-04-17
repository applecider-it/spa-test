import { sendRest } from '@/services/api/rest';

/**
 * 認証管理
 */
export default class AuthCtrl {
  /** 認証しているユーザー */
  private authUser: any = null;

  /** すでに認証確認している場合はtrue */
  private authChecked = false;

  private loginUrl;
  private logoutUrl;
  private meUrl;

  constructor(
    loginUrl: string,
    logoutUrl: string,
    meUrl: string,
  ) {
    this.loginUrl = loginUrl;
    this.logoutUrl = logoutUrl;
    this.meUrl = meUrl;
  }

  /** ログイン処理 */
  async login(email: string, password: string) {
    const data = { email, password };
    const uri = this.loginUrl;

    const res = await sendRest<{ status: any }>(uri, data);

    this.clear();

    return res.status === 'ok';
  }

  /** ログアウト処理 */
  async logout() {
    const data = {};
    const uri = this.logoutUrl;

    const res = await sendRest<{ status: string }>(uri, data);

    this.clear();
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
   * - レイアウト
   * - 各ページ（利用している場合のみ）
   */
  async user() {
    if (this.authUser || this.authChecked) return this.authUser;

    console.log('Auth.me()');

    const data = {};
    const uri = this.meUrl;

    const res = await sendRest<{ user: any }>(uri, data);

    this.authUser = res;
    this.authChecked = true;

    return this.authUser;
  }

  /** 認証確認処理 */
  async checkAuth() {
    const rec = await this.user();

    if (!rec) {
      return false;
    }

    return true;
  }
}