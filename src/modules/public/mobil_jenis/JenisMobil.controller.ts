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
import { CreateJenisMobilDto, UpdateJenisMobilDto } from './JenisMobil.dto';

// Services
import { JenisMobilService } from './JenisMobil.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('jenismobil')
@UseGuards(JwtGuard)
export class JenisMobilController {
  constructor(private readonly jenisMobilService: JenisMobilService) {}

  @Get('/')
  //   @UseGuards(PermissionsGuard)
  //   @RequiredPermissions(PermissionsEnum.)
  async findAll(@Req() req: Request, @Res() res: Response) {
    return await this.jenisMobilService.getAll(res);
  }

  @Get('/:id')
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.jenisMobilService.getOne(res, id);
  }

  @Post()
  async createJenisMobil(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateJenisMobilDto,
  ) {
    await this.jenisMobilService.createMobil(res, body);
  }

  @Put('/:id')
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateJenisMobilDto,
  ) {
    await this.jenisMobilService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.jenisMobilService.deleteMobil(res, id);
  }
}
