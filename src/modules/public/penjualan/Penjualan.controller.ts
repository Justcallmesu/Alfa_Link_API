import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { PenjualanService } from './Penjualan.service';
import { CreatePenjualanDto, UpdatePenjualanDto } from './Penjualan.dto';
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import { Response } from 'express';
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
  async findAll() {
    return await this.penjualanService.getAllPenjualan();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_PENJUALAN)
  async findOne(
    @ObjectIdParams()
    @Param('id')
    id: string,
  ) {
    return await this.penjualanService.getPenjualan(id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_PENJUALAN)
  async create(@Body() createPenjualan: CreatePenjualanDto) {
    return await this.penjualanService.createPenjualan(createPenjualan);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_PENJUALAN)
  async update(
    @ObjectIdParams() @Param('id') id: string,
    @Body() updatePenjualan: UpdatePenjualanDto,
  ) {
    return await this.penjualanService.updatePenjualan(id, updatePenjualan);
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
