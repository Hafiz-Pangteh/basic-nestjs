import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async createUser(@Body() body: CreateUserDto) {
    try {
      return this.userService.created(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getUser(): Promise<User[]> {
    try {
      return this.userService.getUser({});
    } catch {
      throw error;
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw new BadRequestException('User Not Found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    try {
      const findUser = this.userService.getUserById(id);

      if (!findUser) {
        throw new BadRequestException('User NOt Found');
      }
      return await this.userService.updateUser(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw new BadRequestException('User Not Found');
      } else {
        await this.userService.deleteUser(id);
      }

      return {
        message: 'Deleted Successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
