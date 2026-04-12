import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { DevelopmentController } from './development/development.controller';
import { AuthService } from './auth/auth.service';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';
import { DbModule } from './db/db.module';
import { AuthController as AdminAuthController } from './admin/auth/auth.controller';
import { AuthService as AdminAuthService } from './admin/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ←これ重要（どこでも使える）
    }),
    DbModule,
  ],
  controllers: [
    AppController,
    AuthController,
    DevelopmentController,
    TweetController,

    // 管理画面
    AdminAuthController,
  ],
  providers: [
    AppService,
    AuthService,
    TweetService,

    // 管理画面
    AdminAuthService,
  ],
})
export class AppModule {}
