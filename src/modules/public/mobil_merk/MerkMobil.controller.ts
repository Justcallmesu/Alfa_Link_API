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
import {
  CreateMerkMobilDto,
  StatusPajakMobil,
  UpdateMerkMobilDto,
} from './MerkMobil.dto';

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
  //   @UseGuards(PermissionsGuard)
  //   @RequiredPermissions(PermissionsEnum.)
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.merkMobilService.getAll(res);
  }

  @Get('/:id')
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.merkMobilService.getOne(res, id);
  }

  @Post()
  async createJenisMobil(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMerkMobilDto,
  ) {
    await this.merkMobilService.createMobil(res, body);
  }

  @Put('/:id')
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateMerkMobilDto,
  ) {
    await this.merkMobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.merkMobilService.deleteMobil(res, id);
  }
}
