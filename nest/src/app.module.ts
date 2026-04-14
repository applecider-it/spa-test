import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserController as AdminUserController } from './admin/user/user.controller';
import { UserService as AdminUserService } from './admin/user/user.service';

import { AuthModule } from './auth/auth.module';
import { DevelopmentModule } from './development/development.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule as AdminAuthModule } from './admin/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ←これ重要（どこでも使える）
    }),
    DbModule,

    // アプリケーション
    AuthModule,
    DevelopmentModule,
    TweetModule,

    // 管理画面
    AdminAuthModule,
  ],
  controllers: [
    AppController,

    // 管理画面
    AdminUserController,
  ],
  providers: [
    AppService,

    // 管理画面
    AdminUserService,
  ],
})
export class AppModule {}
