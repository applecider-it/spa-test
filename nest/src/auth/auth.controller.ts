import { Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.session);
  }

  @Post('me')
  me(@Req() req: Request) {
    return this.authService.me(req.session);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.session);
  }
}
