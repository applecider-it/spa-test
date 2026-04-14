import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';

import { AuthController as AdminAuthController } from './admin/auth/auth.controller';
import { UserController as AdminUserController } from './admin/user/user.controller';
import { AuthService as AdminAuthService } from './admin/auth/auth.service';
import { UserService as AdminUserService } from './admin/user/user.service';

import { AuthModule } from './auth/auth.module';
import { DevelopmentModule } from './development/development.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ←これ重要（どこでも使える）
    }),
    DbModule,

    // アプリケーション
    AuthModule,
    DevelopmentModule,
  ],
  controllers: [
    AppController,
    TweetController,

    // 管理画面
    AdminAuthController,
    AdminUserController,
  ],
  providers: [
    AppService,
    TweetService,

    // 管理画面
    AdminAuthService,
    AdminUserService,
  ],
})
export class AppModule {}
