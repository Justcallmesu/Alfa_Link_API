import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { PenjualanService } from './Penjualan.service';
import { CreateDto, UpdateDto } from './Penjualan.dto';
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';

@Controller('penjualan')
@UseGuards(JwtGuard)
export class PenjualanController {
  constructor(private readonly sService: PenjualanService) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.sService.create(createDto);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.sService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.sService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sService.remove(+id);
  }
}
