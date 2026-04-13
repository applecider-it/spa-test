import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/** ユーザーログインガード */
@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return !!request.session?.user;
  }
}