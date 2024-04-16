import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

// Services
import { AuthService } from './auth.service';

// DTO
import { LoginDto, createUserDto } from './auth.dto';

// Guards
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';

// Reflector
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/login')
  async Login(@Res() res: Response, @Body() body: LoginDto) {
    return await this.AuthService.login(res, body);
  }

  @Post('/register')
  @RequiredPermissions(PermissionsEnum.CREATE_USER)
  @UseGuards(PermissionsGuard)
  @UseGuards(JwtGuard)
  async Register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: createUserDto,
  ) {
    return await this.AuthService.register(req, res, body);
  }

  @Get('/logout')
  @UseGuards(JwtGuard)
  async logout(@Res() res: Response) {
    return await this.AuthService.logout(res);
  }

  @Get('/me')
  @RequiredPermissions(PermissionsEnum.READ_USER)
  @UseGuards(JwtGuard)
  async getMe(@Res() res: Response, @Req() req: Request) {
    return await this.AuthService.getMe(res, req);
  }

  @Get('/updateme')
  async updateMe() {}

  @Patch('/update-password')
  async updatePassword() {}

  @Post('/refresh-token')
  async refreshToken() {}
}
