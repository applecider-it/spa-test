import { Controller, Post, Body, Req, UseGuards, Inject } from '@nestjs/common';
import type { Request } from 'express';
import { IsNotEmpty } from 'class-validator';

import {
  UserNameValidation,
  UserEmailValidation,
  UserEmailCustomValidation,
} from '@/user/user.validation';

import { ADMIN_PREFIX } from '@/config/constants';

import { setTimeout } from 'timers/promises';

import { UserService } from './user.service';

import { AdminSessionAuthGuard } from '@/admin/auth/auth.guard';

/** ユーザー取得用 */
class UserRequestBody {
  @IsNotEmpty({ message: 'idは必須項目です' })
  id: number;
}

/** ユーザー更新用 */
class UpdateRequestBody {
  @IsNotEmpty({ message: 'idは必須項目です' })
  id: number;

  @UserNameValidation()
  name: string;

  @UserEmailValidation()
  email: string;

  /** 追加バリデーション */
  async validateCustom(db: any) {
    await UserEmailCustomValidation(db, this.id, this.email);
  }
}

/**
 * 管理画面　ユーザー管理コントローラー
 */
@UseGuards(AdminSessionAuthGuard)
@Controller(`${ADMIN_PREFIX}/user`)
export class UserController {
  constructor(
    @Inject('DRIZZLE') private db: any,
    private readonly userService: UserService,
  ) {}

  /** ユーザー一覧 */
  @Post('users')
  async users(@Req() req: Request) {
    console.log('req.adminUser', req.adminUser);
    return await this.userService.users();
  }

  /** ユーザー取得 */
  @Post('user')
  async user(@Body() body: UserRequestBody, @Req() req: Request) {
    return await this.userService.user(body.id);
  }

  /** ユーザー更新 */
  @Post('update')
  async update(@Body() body: UpdateRequestBody, @Req() req: Request) {
    await body.validateCustom(this.db);

    //await setTimeout(1000 * 1);

    const updatedUser = await this.userService.updateUser(
      body.id,
      body.name,
      body.email,
    );

    console.log('updatedUser', updatedUser);

    return {
      status: 'ok',
      user: updatedUser,
    };
  }
}
