import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

/** 管理者ログインガード */
@Injectable()
export class AdminSessionAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const ret = await this.authService.me(request.session);
    const adminUser = ret.user;

    if (!adminUser) {
      return false;
    }

    request.adminUser = adminUser;

    return true;
  }
}
