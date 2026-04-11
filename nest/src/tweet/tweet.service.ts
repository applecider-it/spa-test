import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetService {
  tweets() {
    return [
      {
        id: 1,
        content: "ツイート１",
      },
      {
        id: 2,
        content: "ツイート２",
      },
    ]
  }
  
  tweet(id) {
    const tweets = this.tweets();

    return tweets.find(tweet => tweet.id === id);
  }
}
