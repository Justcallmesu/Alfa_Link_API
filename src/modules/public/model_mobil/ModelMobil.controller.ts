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

// Services

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';
import { ModelMobilService } from './ModelMobil.service';
import { CreateModelMobilDto } from './ModelMobil.dto';
import { UpdateWarnaMobilDto } from '../warna_mobil/WarnaMobil.dto';

@Controller('modelmobil')
@UseGuards(JwtGuard)
export class ModelMobilController {
  constructor(private readonly modelMobilService: ModelMobilService) {}

  @Get('/')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_MODEL)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
  ) {
    return await this.modelMobilService.getAll(res, query);
  }

  @Get('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_MODEL)
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.modelMobilService.getOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_MODEL)
  async createWarnaMobil(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateModelMobilDto,
  ) {
    await this.modelMobilService.createModelMobil(res, body);
  }

  @Put('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_MODEL)
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateWarnaMobilDto,
  ) {
    await this.modelMobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_MODEL)
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.modelMobilService.deleteMobil(res, id);
  }
}
