import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { IsNotEmpty } from 'class-validator';

import { AuthService } from '@/auth/auth.service';

class SendTestRequestBody {
  @IsNotEmpty({ message: 'messageは必須項目です' })
  message: string;
}

@Controller('development')
export class DevelopmentController {
  constructor(private readonly authService: AuthService) {}

  /** 送信テスト */
  @Post('send-test')
  async sendTest(@Body() body: SendTestRequestBody, @Req() req: Request) {
    const user = await this.authService.me(req.session);

    console.log('sendTest', user)

    return {
      message: 'Message: ' + body.message,
      user: user,
    };
  }
}
