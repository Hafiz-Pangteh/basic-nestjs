import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prismaClient/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
