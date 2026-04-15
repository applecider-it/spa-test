import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { IsNotEmpty } from 'class-validator';

import { TweetContentValidation } from './tweet.validation';

import { setTimeout } from 'timers/promises';

import { TweetService } from './tweet.service';

import { SessionAuthGuard } from '@/auth/auth.guard';

/** ツイート取得用 */
class TweetRequestBody {
  @IsNotEmpty({ message: 'idは必須項目です' })
  id: number;
}

/** ツイート作成用 */
class StoreTweetRequestBody {
  @TweetContentValidation()
  content: string;
}

/**
 * ツイートコントローラー
 */
@Controller('tweet')
export class TweetController {
  constructor(
    private readonly tweetService: TweetService,
  ) {}

  /** ツイート一覧 */
  @Post('tweets')
  async tweets(@Req() req: Request) {
    return await this.tweetService.tweets();
  }

  /** ツイート取得 */
  @Post('tweet')
  async tweet(@Body() body: TweetRequestBody, @Req() req: Request) {
    return await this.tweetService.tweet(body.id);
  }

  /** ツイート作成 */
  @UseGuards(SessionAuthGuard)
  @Post('store')
  async store(@Body() body: StoreTweetRequestBody, @Req() req: Request) {
    //await setTimeout(1000 * 1);

    console.log('user', req.user);

    const newTweet = await this.tweetService.storeTweet(req.user, body.content);

    console.log('newTweet', newTweet);

    return {
      status: 'ok',
      tweet: newTweet,
    };
  }
}
