import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InspeksiService } from './inspeksi.service';
import { Response, query } from 'express';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import {
  CreateInspeksiDTO,
  InspeksiQueryDto,
  UpdateInspeksiDTO,
  updateInspeksiStatusDto,
} from './inspeksi.dto';
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';

@Controller('inspeksi')
@UseGuards(JwtGuard)
export class InspeksiController {
  constructor(private readonly inspeksiService: InspeksiService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_INSPEKSI)
  async findAll(@Res() res: Response, @Query() query: any) {
    return this.inspeksiService.findAll(res, query);
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_INSPEKSI)
  async findOne(
    @Res() res: Response,
    @ObjectIdParams()
    @Query('id')
    id: string,
  ) {
    return this.inspeksiService.findOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_INSPEKSI)
  async create(
    @Res() res: Response,
    @Body() createInspeksiData: CreateInspeksiDTO,
  ) {
    return this.inspeksiService.create(res, createInspeksiData);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_INSPEKSI)
  async update(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
    @Body() updateInspeksiData: UpdateInspeksiDTO,
  ) {
    return this.inspeksiService.update(res, updateInspeksiData, id);
  }

  @Put(':id/status')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_INSPEKSI)
  async updateStatus(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
    @Body() updateInspeksiData: updateInspeksiStatusDto,
  ) {
    return this.inspeksiService.UpdateStatus(res, updateInspeksiData, id);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_INSPEKSI)
  async delete(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
  ) {
    return this.inspeksiService.delete(res, id);
  }
}
