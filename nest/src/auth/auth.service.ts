import { Injectable } from '@nestjs/common';
import type { Session } from 'express-session';

import { setTimeout } from 'timers/promises';

/**
 * 認証サービス
 */
@Injectable()
export class AuthService {
  /** ログイン処理 */
  login(session: Session) {
    session['user'] = { id: 1, name: 'テスト' };
    return { message: 'logged in' };
  }

  /** 認証処理 */
  async me(session: Session) {
    await setTimeout(1000 * 0);
    return { user: session['user'] || null };
  }

  /** ログアウト処理 */
  logout(session: Session) {
    session.destroy(() => {});
    return { message: 'logged out' };
  }
}
