import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { IsNotEmpty } from 'class-validator';

import { TweetContentValidation } from './tweet.validation';

import { setTimeout } from 'timers/promises';

import { TweetService } from './tweet.service';
import { AuthService } from '../auth/auth.service';

class TweetDto {
  @IsNotEmpty({ message: 'idは必須項目です' })
  id: number;
}

class StoreTweetDto {
  @TweetContentValidation()
  content: string;
}

@Controller('tweet')
export class TweetController {
  constructor(
    private readonly tweetService: TweetService,
    private readonly authService: AuthService,
  ) {}

  /** ツイート一覧 */
  @Post('tweets')
  async tweets(@Req() req: Request) {
    return await this.tweetService.tweets();
  }

  /** ツイート取得 */
  @Post('tweet')
  async tweet(@Body() body: TweetDto, @Req() req: Request) {
    return await this.tweetService.tweet(body.id);
  }

  /** ツイート作成 */
  @Post('store')
  async store(@Body() body: StoreTweetDto, @Req() req: Request) {
    //await setTimeout(1000 * 1);

    const me = await this.authService.me(req.session);

    console.log('store', me);

    if (!me.user) {
      return {
        status: 'auth',
      };
    }

    const newTweet = await this.tweetService.storeTweet(me.user, body.content);

    console.log('newTweet', newTweet);

    return {
      status: 'ok',
      tweet: newTweet,
    };
  }
}
