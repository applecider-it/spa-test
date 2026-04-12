import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import { setTimeout } from 'timers/promises';

import { TweetService } from './tweet.service';
import { AuthService } from '../auth/auth.service';

class TweetDto {
  @IsNotEmpty({ message: 'idは必須項目です' })
  id: number;
}

class StoreTweetDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value
  )
  @Length(1, 10, {
    message: (args) => {
      return `${args.property}は${args.constraints[0]}〜${args.constraints[1]}文字です`;
    },
  })
  @IsString({ message: 'contentは文字列で入力してください' })
  @IsNotEmpty({ message: 'contentは必須項目です' })
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
