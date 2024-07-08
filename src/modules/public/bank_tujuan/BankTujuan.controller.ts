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
import { BankTujuanService } from './BankTujuan.service';
import { Response } from 'express';
import { CreateBankTujuanDto, UpdateBankTujuanDto } from './BankTujuan.dto';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';

@Controller('banktujuan')
@UseGuards(JwtGuard)
export class BankTujuanController {
  constructor(private readonly bankTujuanService: BankTujuanService) {}

  @Get()
  @RequiredPermissions(PermissionsEnum.CREATE_USER)
  @UseGuards(PermissionsGuard)
  async getAll(@Res() res: Response, @Query() query: any) {
    await this.bankTujuanService.getAll(res, query);
  }

  @Get(':id')
  @RequiredPermissions(PermissionsEnum.READ_BANK_TUJUAN)
  @UseGuards(PermissionsGuard)
  async getOne(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
  ) {
    await this.bankTujuanService.getOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_BANK_TUJUAN)
  async createOne(@Res() res: Response, @Body() body: CreateBankTujuanDto) {
    await this.bankTujuanService.create(res, body);
  }

  @Put(':id')
  @RequiredPermissions(PermissionsEnum.UPDATE_BANK_TUJUAN)
  @UseGuards(PermissionsGuard)
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
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_BANK_TUJUAN)
  async deleteOne(
    @Res() res: Response,
    @ObjectIdParams()
    @Param('id')
    id: string,
  ) {
    await this.bankTujuanService.delete(res, id);
  }
}
