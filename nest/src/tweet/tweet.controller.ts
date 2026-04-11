import { Controller, Post, Body, Req } from '@nestjs/common';
import { TweetService } from './tweet.service';

class TweetDto {
  id: number;
}

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post('tweets')
  tweets(@Req() req: Request) {
    return this.tweetService.tweets();
  }

  @Post('tweet')
  tweet(@Body() body: TweetDto, @Req() req: Request) {
    return this.tweetService.tweet(body.id);
  }
}
