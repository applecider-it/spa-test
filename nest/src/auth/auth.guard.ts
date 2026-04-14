import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

/** ユーザーログインガード */
@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const ret = await this.authService.me(request.session);
    const user = ret.user;

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}
