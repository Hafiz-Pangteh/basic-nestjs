import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.toLowerCase()?.trim())
  email: string;

  @IsString()
  @ApiProperty({ required: true })
  password: string;
}
