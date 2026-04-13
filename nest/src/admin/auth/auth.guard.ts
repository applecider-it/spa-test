import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/** 管理者ログインガード */
@Injectable()
export class AdminSessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return !!request.session?.adminUser;
  }
}