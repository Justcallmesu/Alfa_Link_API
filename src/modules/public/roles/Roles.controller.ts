import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { Response } from 'express';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import { CreateUserDto, UpdateuserDto } from '../users/Users.dto';
import { RolesService } from './Roles.service';
import { CreateRoleDto, UpdateRoleDto } from './Roles.dto';

@Controller('roles')
@UseGuards(JwtGuard)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_ROLE)
  async findAll(@Res() res: Response, @Query() query: any) {
    return await this.roleService.findAll(res, query);
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_ROLE)
  async findOne(@Res() res: Response, @ObjectIdParams() id: any) {
    return await this.roleService.getOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_ROLE)
  async create(@Res() res: Response, @Body() body: CreateRoleDto) {
    return await this.roleService.create(res, body);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_ROLE)
  async update(
    @Res() res: Response,
    @ObjectIdParams() id: any,
    @Body() body: UpdateRoleDto,
  ) {
    return await this.roleService.update(res, id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_ROLE)
  async remove(@Res() res: Response, @ObjectIdParams() id: any) {
    return await this.roleService.delete(res, id);
  }
}
