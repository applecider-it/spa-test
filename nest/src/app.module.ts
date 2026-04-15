import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { DevelopmentModule } from './development/development.module';
import { TweetModule } from './tweet/tweet.module';

import { AuthModule as AdminAuthModule } from './admin/auth/auth.module';
import { UserModule as AdminUserModule } from './admin/user/user.module';

import appConfig from '@/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ←これ重要（どこでも使える）
      load: [appConfig],
    }),
    DbModule,

    // アプリケーション
    AuthModule,
    DevelopmentModule,
    TweetModule,

    // 管理画面
    AdminAuthModule,
    AdminUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
