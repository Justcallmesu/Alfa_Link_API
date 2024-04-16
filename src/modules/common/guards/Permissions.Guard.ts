import { Roles } from '@/schemas/auth/Roles';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';

// Decorators
import { RequiredPermissions } from '../decorators/Permissions.decorator';

// Schema
import { Permissions } from '@/schemas/auth/Permissions';
import { User } from '@/schemas/auth/User';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Permissions.name) private PermissionsModel: Model<Permissions>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user)
      throw new UnauthorizedException(
        'Unauthorized',
        'Unauthorized! Please Log In!',
      );

    const {
      role_id: { permissions_id },
    } = request.user as User;

    const ReflectorPermissions = this.reflector.get(
      RequiredPermissions,
      context.getHandler(),
    );

    const isPermissioned = permissions_id.some((value) => {
      const data: Permissions = value as unknown as Permissions;
      return ReflectorPermissions.includes(data.permission_name as string);
    });

    if (!isPermissioned) {
      throw new UnauthorizedException(
        'Unauthorized',
        'Unauthorized! You do not have the required permissions!',
      );
    }

    return true;
  }
}
