import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';

class SendTestDto {
  message: string;
}

@Controller('development')
export class DevelopmentController {
  @Post('send-test')
  sendTest(@Body() body: SendTestDto, @Req() req: Request) {
    return {
      message: 'Message: ' + body.message,
      user: req.session['user'] || null,
    };
  }
}
