import { Permissions } from '@/schemas/auth/Permissions';
import { Roles } from '@/schemas/auth/Roles';
import { User } from '@/schemas/auth/User';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';

// DTO
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Roles.name) private RolesModel: Model<Roles>,
    @InjectModel(Permissions.name) private PermissionsModel: Model<Permissions>,
  ) {}

  async login(req: Request, body: LoginDto) {}
}
