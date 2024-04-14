import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Services
import { UserSeed } from './seeders/user.seed';
import { RolesSeed } from './seeders/roles.seed';

// Schema
import { User, UserSchema } from '@/schemas/auth/User';
import { Roles, RolesSchema } from '@/schemas/auth/Roles';
import { PermissionsSchema, Permissions } from '@/schemas/auth/Permissions';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      dbName: process.env.MONGODB_DB as string,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Permissions.name, schema: PermissionsSchema },
    ]),
  ],
  controllers: [],
  providers: [UserSeed, RolesSeed],
})
export class SeedModule {}
