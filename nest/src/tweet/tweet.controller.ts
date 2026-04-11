import { Controller, Post, Body, Req } from '@nestjs/common';
import { TweetService } from './tweet.service';

class TweetDto {
  id: number;
}

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post('tweets')
  async tweets(@Req() req: Request) {
    return await this.tweetService.tweets();
  }

  @Post('tweet')
  async tweet(@Body() body: TweetDto, @Req() req: Request) {
    return await this.tweetService.tweet(body.id);
  }
}
