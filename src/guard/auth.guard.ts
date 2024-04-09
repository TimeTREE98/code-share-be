import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class IsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.isAuthenticated()) {
      return true;
    } else {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
  }
}
