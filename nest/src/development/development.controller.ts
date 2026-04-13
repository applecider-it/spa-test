import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { IsNotEmpty } from 'class-validator';

import { AuthService } from '@/auth/auth.service';

class SendTestDto {
  @IsNotEmpty({ message: 'messageは必須項目です' })
  message: string;
}

@Controller('development')
export class DevelopmentController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-test')
  async sendTest(@Body() body: SendTestDto, @Req() req: Request) {
    const me = await this.authService.me(req.session);

    console.log('sendTest', me)

    return {
      message: 'Message: ' + body.message,
      user: me.user,
    };
  }
}
