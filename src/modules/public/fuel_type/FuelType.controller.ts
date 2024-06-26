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
import { CreateFuelTypeDto, UpdateFuelTypeDto } from './FuelType.dto';

// Services
import { FuelTypeService } from './FuelType.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('jenisbahanbakar')
@UseGuards(JwtGuard)
export class FuelTypeController {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @Get('/')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_FUEL_TYPE)
  async findAll(@Res() res: Response, @Query() query: any) {
    return await this.fuelTypeService.getAll(res, query);
  }

  @Get('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.READ_FUEL_TYPE)
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.fuelTypeService.getOne(res, id);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.CREATE_FUEL_TYPE)
  async createFuelType(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateFuelTypeDto,
  ) {
    await this.fuelTypeService.createFuelType(res, body);
  }

  @Put('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.UPDATE_FUEL_TYPE)
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateFuelTypeDto,
  ) {
    await this.fuelTypeService.updateMobil(res, id, body);
  }

  @Delete('/:id')
  @UseGuards(PermissionsGuard)
  @RequiredPermissions(PermissionsEnum.DELETE_FUEL_TYPE)
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.fuelTypeService.deleteMobil(res, id);
  }
}
