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
} from '@nestjs/common';
import { BankTujuanService } from './BankTujuan.service';
import { Response } from 'express';
import { CreateBankTujuanDto, UpdateBankTujuanDto } from './BankTujuan.dto';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('banktujuan')
export class BankTujuanController {
  constructor(private readonly bankTujuanService: BankTujuanService) {}

  @Get()
  async getAll(@Res() res: Response, @Query() query: any) {
    await this.bankTujuanService.getAll(res, query);
  }

  @Get(':id')
  async getOne(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
  ) {
    await this.bankTujuanService.getOne(res, id);
  }

  @Post()
  async createOne(@Res() res: Response, @Body() body: CreateBankTujuanDto) {
    await this.bankTujuanService.create(res, body);
  }

  @Put(':id')
  async updateOne(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
    @Body() body: UpdateBankTujuanDto,
  ) {
    await this.bankTujuanService.update(res, id, body);
  }

  @Delete(':id')
  async deleteOne(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
  ) {
    await this.bankTujuanService.delete(res, id);
  }
}
