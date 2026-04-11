import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { userTweets, users } from '../db/schema';

@Injectable()
export class TweetService {
  constructor(@Inject('DRIZZLE') private db: any) {}

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
      .innerJoin(users, eq(userTweets.userId, users.id));

    console.log('result', result);

    return result;
  }

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
}
