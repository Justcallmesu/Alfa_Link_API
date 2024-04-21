import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Body,
  Res,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Response, Request } from 'express';

// Services
import { AuthService } from './auth.service';

// DTO
import {
  LoginDto,
  createUserDto,
  updatePasswordDto,
  updateUserDto,
} from './auth.dto';

// Guards
import { JwtGuard } from '@/modules/common/guards/Jwt.Guard';
import { PermissionsGuard } from '@/modules/common/guards/Permissions.Guard';

// Reflector
import { RequiredPermissions } from '@/modules/common/decorators/Permissions.decorator';

// Enum
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';
import { AccessToken } from '@/modules/common/guards/AccessToken.Guard';

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
  async logout(@Req() req: Request, @Res() res: Response) {
    return await this.AuthService.logout(req, res);
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async getMe(@Res() res: Response, @Req() req: Request) {
    return await this.AuthService.getMe(res, req);
  }

  @Put('/updateme')
  @UseGuards(JwtGuard)
  async updateMe(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: updateUserDto,
  ) {
    await this.AuthService.updateMe(res, req, body);
  }

  @Patch('/update-password')
  @UseGuards(JwtGuard)
  async updatePassword(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: updatePasswordDto,
  ) {
    await this.AuthService.updatePassword(res, req, body);
  }

  @Post('/refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    await this.AuthService.refreshToken(req, res);
  }
}
