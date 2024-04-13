import { Controller, Get, Post, Patch } from '@nestjs/common';

// Services
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/login')
  async Login() {}

  @Post('/register')
  async Register() {}

  @Get('/logout')
  async logout() {}

  @Get('/me')
  async getMe() {}

  @Patch('/update-password')
  async updatePassword() {}

  @Post('/refresh-token')
  async refreshToken() {}
}
