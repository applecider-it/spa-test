import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { IsNotEmpty } from 'class-validator';

import { ADMIN_PREFIX } from '@/config/constants';

import { setTimeout } from 'timers/promises';

/** ログイン処理用 */
class LoginRequestBody {
  @IsNotEmpty({ message: 'emailは必須項目です' })
  email: string;

  @IsNotEmpty({ message: 'passwordは必須項目です' })
  password: string;
}

/**
 * 管理画面　認証コントローラー
 */
@Controller(`${ADMIN_PREFIX}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** ログイン処理 */
  @Post('login')
  async login(@Body() body: LoginRequestBody, @Req() req: Request) {
    //await setTimeout(1000 * 1);
    console.log('login', body.email, body.password);
    return await this.authService.login(req.session, body.email, body.password);
  }

  /** 認証処理 */
  @Post('me')
  async me(@Req() req: Request) {
    return await this.authService.me(req.session);
  }

  /** ログアウト処理 */
  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.session);
  }
}
