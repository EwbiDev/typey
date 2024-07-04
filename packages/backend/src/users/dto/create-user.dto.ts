import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'email address of the user',
    example: 'user123',
  })
  @IsString()
  @IsNotEmpty({ message: 'username must not be empty' })
  @MaxLength(24, { message: 'username must not exceed 24 characters' })
  username: string;

  @ApiProperty({
    type: String,
    description: 'email address of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'please provide a valid email address' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of the user',
    example: 'password123',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @MaxLength(128, { message: 'password must not exceed 128 characters' })
  password: string;
}
