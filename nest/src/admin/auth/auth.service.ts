import { Inject, Injectable } from '@nestjs/common';
import type { Session } from 'express-session';

import { eq } from 'drizzle-orm';
import { adminUsers } from '../../db/schema';

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
      .from(adminUsers)
      .where(eq(adminUsers.email, email));

    console.log('adminUsers result', result)

    if (result.length === 0) return { status: 'ng' };

    const adminUser = result[0];

    if (adminUser.password !== password) return { status: 'ng' };

    delete adminUser.password;

    session['adminUser'] = adminUser;
    return { status: 'ok' };
  }

  /** 認証処理 */
  async me(session: Session) {
    return { user: session['adminUser'] || null };
  }

  /** ログアウト処理 */
  logout(session: Session) {
    session.destroy(() => {});
    return { status: 'ok' };
  }
}
