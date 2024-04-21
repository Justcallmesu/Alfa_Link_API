import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { Model } from 'mongoose';

// DTO
import { JwtGuardDto } from '../dto/JwtGuard.dto';

// Schema
import { User, UserDocument } from '@/schemas/auth/User';
import { Roles } from '@/schemas/auth/Roles';
import { Permissions } from '@/schemas/auth/Permissions';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Roles.name) private RolesModel: Model<Roles>,
    @InjectModel(Permissions.name) private PermissionsModel: Model<Permissions>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request.signedCookies.refresh_token_jwt) {
      throw new UnauthorizedException(
        'Session Expired',
        'Session Expired! Please Log In!',
      );
    }
    try {
      const data: JwtGuardDto = (await verify(
        request.signedCookies.refresh_token_jwt,
        process.env.JWT_REFRESH_SECRET as string,
      )) as JwtGuardDto;

      const userData: User | null = (await this.UserModel.findById(
        data.id as string,
      )
        .select(
          '+role_id -date_created -date_updated -date_deleted +refresh_token -__v -password  -user_status',
        )
        .populate({
          path: 'role_id' as string,
          model: this.RolesModel,
          select: ['role_name', 'permissions_id'],

          // Populate Permissions
          populate: {
            path: 'permissions_id' as string,
            model: this.PermissionsModel,
          },
        })) as User;
      if (!userData) {
        throw new UnauthorizedException(
          'Session Expired',
          'Session Expired! Please Log In!',
        );
      }

      if (
        !(await userData.compareRefreshToken(
          request.signedCookies.refresh_token_jwt,
        ))
      ) {
        throw new UnauthorizedException(
          'Session Expired',
          'Session Expired! Please Log In!',
        );
      }

      request.user = userData;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Session Expired',
        'Session Expired! Refresh Please Log In!',
      );
    }
  }
}
