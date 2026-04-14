import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { IsNotEmpty } from 'class-validator';

import { TweetContentValidation } from './tweet.validation';

import { setTimeout } from 'timers/promises';

import { TweetService } from './tweet.service';
import { AuthService } from '@/auth/auth.service';

import { SessionAuthGuard } from '@/auth/auth.guard';

/** ツイート取得用DTO */
class TweetDto {
  @IsNotEmpty({ message: 'idは必須項目です' })
  id: number;
}

/** ツイート作成用DTO */
class StoreTweetDto {
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
  @UseGuards(SessionAuthGuard)
  @Post('store')
  async store(@Body() body: StoreTweetDto, @Req() req: Request) {
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
