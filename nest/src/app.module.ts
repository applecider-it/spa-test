import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { DevelopmentController } from './development/development.controller';
import { AuthService } from './auth/auth.service';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, DevelopmentController, TweetController],
  providers: [AppService, AuthService, TweetService],
})
export class AppModule {}
