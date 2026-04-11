import { Controller, Post, Body, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';

import { setTimeout } from 'timers/promises';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Req() req: Request) {
    //await setTimeout(1000 * 1);
    console.log('login', body.email, body.password);
    return await this.authService.login(req.session, body.email, body.password);
  }

  @Post('me')
  async me(@Req() req: Request) {
    return await this.authService.me(req.session);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.session);
  }
}
