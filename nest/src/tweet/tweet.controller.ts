import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { TweetService } from './tweet.service';
import { AuthService } from '../auth/auth.service';

class TweetDto {
  id: number;
}

class StoreTweetDto {
  content: string;
}

@Controller('tweet')
export class TweetController {
  constructor(
    private readonly tweetService: TweetService,
    private readonly authService: AuthService,
  ) {}

  @Post('tweets')
  async tweets(@Req() req: Request) {
    return await this.tweetService.tweets();
  }

  @Post('tweet')
  async tweet(@Body() body: TweetDto, @Req() req: Request) {
    return await this.tweetService.tweet(body.id);
  }

  @Post('store')
  async sendTest(@Body() body: StoreTweetDto, @Req() req: Request) {
    const me = await this.authService.me(req.session);

    console.log('sendTest', me);

    return {
      content: 'Message: ' + body.content,
      user: me.user,
    };
  }
}
