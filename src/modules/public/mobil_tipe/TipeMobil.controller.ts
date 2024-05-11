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
import { CreateTipeMobilDto, UpdateTipeMobilDto } from './TipeMobil.dto';

// Services
import { TipeMobilservice } from './TipeMobil.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('tipemobil')
@UseGuards(JwtGuard)
export class TipeMobilController {
  constructor(private readonly tipeMobilService: TipeMobilservice) {}

  @Get('/')
  //   @UseGuards(PermissionsGuard)
  //   @RequiredPermissions(PermissionsEnum.)
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.tipeMobilService.getAll(res);
  }

  @Get('/:id')
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.tipeMobilService.getOne(res, id);
  }

  @Post()
  async createTipeMobil(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateTipeMobilDto,
  ) {
    await this.tipeMobilService.createMobil(res, body);
  }

  @Put('/:id')
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateTipeMobilDto,
  ) {
    await this.tipeMobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.tipeMobilService.deleteMobil(res, id);
  }
}
