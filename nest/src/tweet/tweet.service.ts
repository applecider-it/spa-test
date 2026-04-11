import { Inject, Injectable } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { userTweets, users } from '../db/schema';

@Injectable()
export class TweetService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  /** ツイート一覧 */
  async tweets() {
    const result = await this.db
      .select({
        id: userTweets.id,
        content: userTweets.content,
        createdAt: userTweets.createdAt,
        user: {
          id: users.id,
          name: users.name,
        },
      })
      .from(userTweets)
      .innerJoin(users, eq(userTweets.userId, users.id))
      .orderBy(desc(userTweets.id));

    console.log('result', result);

    return result;
  }

  /** ツイート取得 */
  async tweet(tweetId) {
    const tweet = await this.db
      .select({
        id: userTweets.id,
        content: userTweets.content,
        createdAt: userTweets.createdAt,
        user: {
          id: users.id,
          name: users.name,
        },
      })
      .from(userTweets)
      .innerJoin(users, eq(userTweets.userId, users.id))
      .where(eq(userTweets.id, tweetId))
      .limit(1)
      .then((res) => res[0] ?? null);

    return tweet;
  }

  /** ツイート作成 */
  async storeTweet(user, content) {
    console.log('storeTweet', user, content);

    const ret = await this.db
      .insert(userTweets)
      .values({
        userId: user.id,
        content: content,
      })
      .returning();

    const newTweet = ret[0];

    return newTweet;
  }
}
