import { Inject, Injectable } from '@nestjs/common';
import type { Session } from 'express-session';

import { eq } from 'drizzle-orm';
import { adminUsers } from '@/db/schema';

/**
 * 管理画面　認証サービス
 */
@Injectable()
export class AuthService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  /** ログイン処理 */
  async login(session: Session, email: string, password: string) {
    const adminUser = await this.db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .then((res) => res[0] ?? null);

    console.log('adminUser', adminUser);

    if (!adminUser) return { status: 'ng' };

    if (adminUser.password !== password) return { status: 'ng' };

    session['authAdminUserId'] = adminUser.id;

    return { status: 'ok' };
  }

  /** 認証処理 */
  async me(session: Session) {
    const id = session['authAdminUserId'];

    if (!id) {
      return { user: null };
    }

    const adminUser = await this.db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, id))
      .then((res) => res[0] ?? null);

    return { user: adminUser };
  }

  /** ログアウト処理 */
  logout(session: Session) {
    session.destroy(() => {});
    return { status: 'ok' };
  }
}
