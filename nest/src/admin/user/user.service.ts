import { Inject, Injectable } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { users } from '../../db/schema';

@Injectable()
export class UserService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  /** ユーザー一覧 */
  async users() {
    const result = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .orderBy(desc(users.id));

    console.log('result', result);

    return result;
  }

  /** ユーザー取得 */
  async user(userId) {
    const user = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .then((res) => res[0] ?? null);

    return user;
  }

  /** ユーザー更新 */
  async updateUser(id, name, email) {
    console.log('updateUser', id, name);

    const ret = await this.db
      .update(users)
      .set({
        name: name,
        email: email,
      })
      .where(eq(users.id, id))
      .returning();

    const updatedUser = ret[0];

    return updatedUser;
  }
}
