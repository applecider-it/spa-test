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
    const user = { id: 1, name: 'テスト', email: 'test@localhost' };
    session['user'] = user;
    return {
      user: {
        id: user.id,
        name: user.name,
      },
    };
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
