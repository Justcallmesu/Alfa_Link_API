import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { UserDocument } from '@/schemas/auth/User';

import { Response, Request } from 'express';
import GenerateToken from '../function/generateToken.function';
import { AccessCookiesConfig } from '../config/CookiesConfig';
import { GenerateTokenType } from '../enum/GenerateTokenType.enum';

@Injectable()
export class AccessToken implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const User = request.user as UserDocument;

    const res = context.switchToHttp().getResponse() as Response;

    if (request.signedCookies.access_token) {
      return true;
    }

    const accessToken = GenerateToken(GenerateTokenType.ACCESS_TOKEN, {
      id: User._id,
    });

    res.cookie('access_token_jwt', accessToken, AccessCookiesConfig());

    request.signedCookies['access_token_jwt'] = accessToken;
    return true;
  }
}
