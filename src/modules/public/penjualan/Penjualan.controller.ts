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

import { PenjualanService } from './Penjualan.service';
import {
  CreatePenjualanDto,
  UpdatePenjualanDto,
  UpdatePenjualanStatus,
} from './Penjualan.dto';
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import { Response, query } from 'express';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';

@Controller('penjualan')
@UseGuards(JwtGuard)
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_PENJUALAN)
  async findAll(@Res() res: Response, @Query() query: any) {
    return await this.penjualanService.getAllPenjualan(res, query);
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_PENJUALAN)
  async findOne(
    @ObjectIdParams()
    @Param('id')
    id: string,

    @Res() res: Response,
  ) {
    return await this.penjualanService.getPenjualan(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_PENJUALAN)
  async create(
    @Body() createPenjualan: CreatePenjualanDto,
    @Res() res: Response,
  ) {
    return await this.penjualanService.createPenjualan(res, createPenjualan);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_PENJUALAN)
  async update(
    @ObjectIdParams() @Param('id') id: string,
    @Res() res: Response,
    @Body() updatePenjualan: UpdatePenjualanDto,
  ) {
    return await this.penjualanService.updatePenjualan(
      res,
      id,
      updatePenjualan,
    );
  }

  @Put(':id/status')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_PENJUALAN)
  async updateStatus(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
    @Body() updatePenjualan: UpdatePenjualanStatus,
  ) {
    return this.penjualanService.UpdateStatus(res, updatePenjualan, id);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_PENJUALAN)
  async remove(
    @ObjectIdParams() @Param('id') id: string,
    @Res() res: Response,
  ) {
    return await this.penjualanService.deletePenjualan(id, res);
  }
}
