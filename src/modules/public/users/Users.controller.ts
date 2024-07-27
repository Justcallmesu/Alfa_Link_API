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
import { UsersService } from './Users.service';
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { Response } from 'express';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import { CreateUserDto, UpdateuserDto } from './Users.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_USER)
  async findAll(@Res() res: Response, @Query() query: any) {
    return await this.userService.findAll(res, query);
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_USER)
  async findOne(@Res() res: Response, @ObjectIdParams() id: any) {
    return await this.userService.getOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_USER)
  async create(@Res() res: Response, @Body() body: CreateUserDto) {
    return await this.userService.create(res, body);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_USER)
  async update(
    @Res() res: Response,
    @ObjectIdParams() id: any,
    @Body() body: UpdateuserDto,
  ) {
    return await this.userService.update(res, id, body);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_USER)
  async remove(@Res() res: Response, @ObjectIdParams() id: any) {
    return await this.userService.delete(res, id);
  }
}
