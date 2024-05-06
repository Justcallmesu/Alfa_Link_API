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
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

// Services
import { CustomerService } from './customer.service';

// Decorators
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { ObjectIdParams } from '@/modules/common/decorators/ObjectIdParams.decorator';

@Controller('customer')
@UseGuards(JwtGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  //   @UseGuards(PermissionsGuard)
  //   @RequiredPermissions(PermissionsEnum.)
  async findAll(@Res() res: Response, @Query() query: any) {
    return await this.customerService.getAll(res, query);
  }

  @Get('/:id')
  async getOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.customerService.getOne(res, id);
  }

  @Post()
  async createCustomer(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateCustomerDto,
  ) {
    await this.customerService.createCustomer(res, body);
  }

  @Put('/:id')
  async updateOne(
    @Req() req: Request,
    @Res() res: Response,
    @ObjectIdParams() id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    await this.customerService.updateCustomer(res, id, body);
  }

  @Delete('/:id')
  async deleteOne(
    @Req() req: Request,
    @ObjectIdParams() id: string,
    @Res() res: Response,
  ) {
    await this.customerService.deleteCustomer(res, id);
  }
}
