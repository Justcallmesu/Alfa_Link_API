import { Module } from '@nestjs/common';
import { PermissionController } from './Permissions.controller';
import { PermissionService } from './Permissions.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionsModule {}
