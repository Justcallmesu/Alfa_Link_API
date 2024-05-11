import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@Controller('warnaMobil')
@UseGuards(JwtGuard)
export class WarnaMobilController {
  constructor(private readonly warnaMobilService: WarnaMobilService) {}

  @Get('/')
  //   @UseGuards(PermissionsGuard)
  //   @RequiredPermissions(PermissionsEnum.)
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.warnaMobilService.getAll(res);
  }

  @Get('/:id')
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.warnaMobilService.getOne(res, id);
  }

  @Post()
  async createWarnaMobil(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateWarnaMobilDto,
  ) {
    await this.warnaMobilService.createWarnaMobil(res, body);
  }

  @Put('/:id')
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateWarnaMobilDto,
  ) {
    await this.warnaMobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.warnaMobilService.deleteMobil(res, id);
  }
}
