import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { PermissionService } from './Permissions.service';
import { Response } from 'express';
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';

@Controller('permissions')
@UseGuards(JwtGuard)
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_PERMISSION)
  async getAll(@Res() res: Response) {
    return await this.permissionsService.findAll(res);
  }
}
