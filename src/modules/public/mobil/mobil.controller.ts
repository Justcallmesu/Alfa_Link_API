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
import { CreateMobilDto, UpdateMobilDto } from './mobil.dto';

// Services
import { MobilService } from './mobil.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('mobil')
@UseGuards(JwtGuard)
export class MobilController {
  constructor(private readonly mobilService: MobilService) {}

  @Get('/')
  //   @UseGuards(PermissionsGuard)
  //   @RequiredPermissions(PermissionsEnum.)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
  ) {
    return await this.mobilService.getAll(res, query);
  }

  @Get('/:id')
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.mobilService.getOne(res, id);
  }

  @Post()
  async createCustomer(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMobilDto,
  ) {
    await this.mobilService.createMobil(res, body);
  }

  @Put('/:id')
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateMobilDto,
  ) {
    await this.mobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.mobilService.deleteMobil(res, id);
  }
}
