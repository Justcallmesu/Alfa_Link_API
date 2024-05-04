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

@Controller('penjualan')
@UseGuards(JwtGuard)
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) {}

  @Post()
  create(@Body() createPenjualan: CreatePenjualanDto) {
    return this.penjualanService.createPenjualan(createPenjualan);
  }

  @Get()
  findAll() {
    return this.penjualanService.getAllPenjualan();
  }

  @Get(':id')
  findOne(
    @ObjectIdParams()
    @Param('id')
    id: string,
  ) {
    return this.penjualanService.getPenjualan(id);
  }

  @Put(':id')
  update(
    @ObjectIdParams() @Param('id') id: string,
    @Body() updatePenjualan: UpdatePenjualanDto,
  ) {
    return this.penjualanService.updatePenjualan(id, updatePenjualan);
  }

  @Delete(':id')
  remove(@ObjectIdParams() @Param('id') id: string, @Res() res: Response) {
    return this.penjualanService.deletePenjualan(id, res);
  }
}
