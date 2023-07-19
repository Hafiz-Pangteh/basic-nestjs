import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async compareHashPassword(
    password: string,
    hashPassword: string,
  ): Promise<Boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async validateUser(body: loginDto) {
    try {
      const { email, password } = body;
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundException('Not Found User');
      }

      const checkpass = this.compareHashPassword(password, user.password);

      if (!checkpass) {
        throw new BadRequestException('Incorrected password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(body: loginDto) {
    const user = await this.validateUser(body);

    return {
      access_token: this.jwtService.sign(user),
      data: user,
    };
  }

  async getProfile(user: any) {
    try {
      const _user = await this.prisma.user.findUnique({
        where: { id: user.id },
      });

      return _user;
    } catch (error) {
      throw error;
    }
  }
}
