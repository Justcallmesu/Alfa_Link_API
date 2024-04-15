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

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/login')
  async Login(@Res() res: Response, @Body() body: LoginDto) {
    return await this.AuthService.login(res, body);
  }

  @Post('/register')
  @UseGuards(JwtGuard)
  async Register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: createUserDto,
  ) {
    return await this.AuthService.register(req, res, body);
  }

  @Get('/logout')
  async logout() {}

  @Get('/me')
  async getMe() {}

  @Get('/updateme')
  async updateMe() {}

  @Patch('/update-password')
  async updatePassword() {}

  @Post('/refresh-token')
  async refreshToken() {}
}
