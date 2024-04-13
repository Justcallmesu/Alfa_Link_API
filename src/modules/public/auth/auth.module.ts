import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schema
import { User, UserSchema } from '@/schemas/auth/User';
import { Roles, RolesSchema } from '@/schemas/auth/Roles';
import { Permissions, PermissionsSchema } from '@/schemas/auth/Permissions';

// Controllers
import { AuthController } from './auth.controller';

// Services
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Permissions.name, schema: PermissionsSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
