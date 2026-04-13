import { Inject, Injectable } from '@nestjs/common';
import type { Session } from 'express-session';

import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

/**
 * 認証サービス
 */
@Injectable()
export class AuthService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  /** ログイン処理 */
  async login(session: Session, email: string, password: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    console.log('result', result)

    if (result.length === 0) return { status: 'ng' };

    const user = result[0];

    if (user.password !== password) return { status: 'ng' };

    // パスワードは保存項目から除外
    delete user.password;

    session['user'] = user;
    return { status: 'ok' };
  }

  /** 認証処理 */
  async me(session: Session) {
    return { user: session['user'] || null };
  }

  /** ログアウト処理 */
  logout(session: Session) {
    session.destroy(() => {});
    return { status: 'ok' };
  }
}
