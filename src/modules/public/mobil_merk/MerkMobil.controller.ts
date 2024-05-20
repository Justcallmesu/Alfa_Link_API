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
import { CreateMerkMobilDto, UpdateMerkMobilDto } from './MerkMobil.dto';

// Services
import { MerkMobilService } from './MerkMobil.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('merkmobil')
@UseGuards(JwtGuard)
export class MerkMobilController {
  constructor(private readonly merkMobilService: MerkMobilService) {}

  @Get('/')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_MERK)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
  ) {
    return await this.merkMobilService.getAll(res, query);
  }

  @Get('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_MERK)
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.merkMobilService.getOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_MERK)
  async createBodyStyle(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMerkMobilDto,
  ) {
    await this.merkMobilService.createMobil(res, body);
  }

  @Put('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_MERK)
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateMerkMobilDto,
  ) {
    await this.merkMobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_MERK)
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.merkMobilService.deleteMobil(res, id);
  }
}
