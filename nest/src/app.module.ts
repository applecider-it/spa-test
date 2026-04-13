import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DevelopmentController } from './development/development.controller';
import { TweetController } from './tweet/tweet.controller';
import { TweetService } from './tweet/tweet.service';

import { AuthController as AdminAuthController } from './admin/auth/auth.controller';
import { UserController as AdminUserController } from './admin/user/user.controller';
import { AuthService as AdminAuthService } from './admin/auth/auth.service';
import { UserService as AdminUserService } from './admin/user/user.service';

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
    AdminUserController,
  ],
  providers: [
    AppService,
    AuthService,
    TweetService,

    // 管理画面
    AdminAuthService,
    AdminUserService,
  ],
})
export class AppModule {}
