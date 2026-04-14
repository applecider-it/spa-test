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
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0] ?? null);

    console.log('user', user);

    if (!user) return { status: 'ng' };

    if (user.password !== password) return { status: 'ng' };

    session['authUserId'] = user.id;

    return { status: 'ok' };
  }

  /** 認証処理 */
  async me(session: Session) {
    const id = session['authUserId'];

    if (!id) {
      return { user: null };
    }

    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then((res) => res[0] ?? null);

    console.log('user', user);

    return { user: user };
  }

  /** ログアウト処理 */
  logout(session: Session) {
    session.destroy(() => {});
    return { status: 'ok' };
  }
}
