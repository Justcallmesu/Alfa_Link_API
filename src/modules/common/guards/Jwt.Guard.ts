import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(context);
    return true;
  }
}
