import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password',
  })
  password: string;
}
