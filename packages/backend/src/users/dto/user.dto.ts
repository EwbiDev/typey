import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'username of the user',
    example: 'user123',
  })
  @IsString()
  @IsNotEmpty({ message: 'username must not be empty' })
  @MaxLength(24, { message: 'username must not exceed 24 characters' })
  username: string;

  @ApiProperty({
    type: Number,
    description: 'id of the user',
    example: 1,
  })
  @IsInt()
  userId: number;
}

export class UserJwtDto extends UserDto {
  @ApiProperty({
    type: String,
    description: 'Jwt token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUzLCJ1c2VybmFtZSI6IjEyMyIsImlhdCI6MTcyNDg3NDc5NiwiZXhwIjoxNzI0ODc0ODU2fQ.-csD9Hg9f8Ul2_hCl_AAjR8qG3bRv7iA_64AEjCPeKM',
  })
  @IsString()
  @IsNotEmpty({ message: 'username must not be empty' })
  accessToken: string;
}
