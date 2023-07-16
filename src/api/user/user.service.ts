import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prismaClient/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async getHashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async created(body: CreateUserDto): Promise<User> {
    try {
      const { email, firstName, lastName, password } = body;

      const findUser = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (findUser) {
        throw new BadRequestException('Email is duplicated');
      }

      const hashPassword = await this.getHashPassword(password);

      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hashPassword,
          firstName: firstName,
          lastName: lastName,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUser(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    where?: Prisma.UserWhereInput;
  }): Promise<User[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: id },
        data: { ...body },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });

      return {};
    } catch (error) {
      throw error;
    }
  }
}
