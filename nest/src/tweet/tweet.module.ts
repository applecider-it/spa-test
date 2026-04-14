import { Module } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';

import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

@Module({
  controllers: [TweetController],
  providers: [TweetService, AuthService],
  exports: [TweetService],
})
export class TweetModule {}
