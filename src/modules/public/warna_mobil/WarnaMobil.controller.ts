import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Guards
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';

// DTO
import { CreateWarnaMobilDto, UpdateWarnaMobilDto } from './WarnaMobil.dto';

// Services
import { WarnaMobilService } from './WarnaMobil.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('warnamobil')
@UseGuards(JwtGuard)
export class WarnaMobilController {
  constructor(private readonly warnaMobilService: WarnaMobilService) {}

  @Get('/')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_WARNA)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
  ) {
    return await this.warnaMobilService.getAll(res, query);
  }

  @Get('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_WARNA)
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.warnaMobilService.getOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_WARNA)
  async createWarnaMobil(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateWarnaMobilDto,
  ) {
    await this.warnaMobilService.createWarnaMobil(res, body);
  }

  @Put('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_WARNA)
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateWarnaMobilDto,
  ) {
    await this.warnaMobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_WARNA)
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.warnaMobilService.deleteMobil(res, id);
  }
}
