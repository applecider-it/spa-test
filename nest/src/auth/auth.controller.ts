import { Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Req() req: Request) {
    req.session['user'] = { id: 1, name: 'Test' };
    return { message: 'logged in' };
  }

  @Post('me')
  me(@Req() req: Request) {
    return { user: req.session['user'] || null };
  }

  @Post('logout')
  logout(@Req() req: Request) {
    req.session.destroy(() => {});
    return { message: 'logged out' };
  }
}
