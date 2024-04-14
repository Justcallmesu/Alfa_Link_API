import { Controller, Get, Post, Patch, Req, Body } from '@nestjs/common';
import { Request } from 'express';

// Services
import { AuthService } from './auth.service';

// DTO
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/login')
  async Login(@Req() req: Request, @Body() body: LoginDto) {
    return await this.AuthService.login(req, body);
  }

  @Post('/register')
  async Register() {}

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
