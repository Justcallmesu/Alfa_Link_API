import { Module } from '@nestjs/common';
import { RolesController } from './Roles.controller';
import { RolesService } from './Roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
