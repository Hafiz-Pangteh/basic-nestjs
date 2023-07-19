import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { jwtDecorator } from './jwt.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: loginDto) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@jwtDecorator() user: any) {
    try {
      return await this.authService.getProfile(user);
    } catch (error) {
      throw error;
    }
  }
}
