import { Controller, Get } from '@nestjs/common';

@Controller('admin-secret/auth')
export class AuthController {
    @Get('hello')
    async getHello(): Promise<string> {
      return "Hello";
    }
}
