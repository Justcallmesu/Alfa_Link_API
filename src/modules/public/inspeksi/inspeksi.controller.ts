import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { InspeksiService } from './inspeksi.service';
import { Response } from 'express';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import { CreateInspeksiDTO, UpdateInspeksiDTO } from './inspeksi.dto';

@Controller('inspeksi')
export class InspeksiController {
  constructor(private readonly inspeksiService: InspeksiService) {}

  @Get()
  async findAll(@Res() res: Response) {
    return this.inspeksiService.findAll(res);
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @ObjectIdParams()
    @Query('id')
    id: string,
  ) {
    return this.inspeksiService.findOne(res, id);
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() createInspeksiData: CreateInspeksiDTO,
  ) {
    return this.inspeksiService.create(res, createInspeksiData);
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @ObjectIdParams()
    @Query('id')
    id: string,
    @Body() updateInspeksiData: UpdateInspeksiDTO,
  ) {
    return this.inspeksiService.update(res, updateInspeksiData, id);
  }

  @Delete(':id')
  async delete(
    @Res() res: Response,
    @ObjectIdParams()
    @Query('id')
    id: string,
  ) {
    return this.inspeksiService.delete(res, id);
  }
}
