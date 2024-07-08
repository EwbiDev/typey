import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity
  implements Omit<User, 'passwordHash' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'user123' })
  username: string;
}
