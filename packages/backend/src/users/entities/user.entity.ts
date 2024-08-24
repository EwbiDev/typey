import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity
  implements Omit<User, 'passwordHash' | 'email' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user123' })
  username: string;
}
