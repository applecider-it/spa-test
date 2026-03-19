import { Controller, Post, Body } from '@nestjs/common';

class SendTestDto {
  message: string;
}

@Controller('development')
export class DevelopmentController {
  @Post('send-test')
  sendTest(@Body() body: SendTestDto) {
    return { message: 'Message: ' + body.message };
  }
}
