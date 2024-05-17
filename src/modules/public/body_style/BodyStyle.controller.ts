import {
  Body,
  Controller,
  Delete,
  Get,
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
import { CreateBodyStyleDto, UpdateBodyStyleDto } from './BodyStyle.dto';

// Services
import { BodyStyleService } from './BodyStyle.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('bodystyle')
@UseGuards(JwtGuard)
export class BodyStyleController {
  constructor(private readonly bodyStyleService: BodyStyleService) {}

  @Get('/')
  //   @UseGuards(PermissionsGuard)
  //   @RequiredPermissions(PermissionsEnum.)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: any,
  ) {
    return await this.bodyStyleService.getAll(res, query);
  }

  @Get('/:id')
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.bodyStyleService.getOne(res, id);
  }

  @Post()
  async createBodyStyle(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateBodyStyleDto,
  ) {
    await this.bodyStyleService.createMobil(res, body);
  }

  @Put('/:id')
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateBodyStyleDto,
  ) {
    await this.bodyStyleService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.bodyStyleService.deleteMobil(res, id);
  }
}
