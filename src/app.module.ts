import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { PrismaService } from './prismaClient/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApiModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
