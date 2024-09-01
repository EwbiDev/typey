import { ApiProperty } from '@nestjs/swagger';
import { Passage } from '@prisma/client';

export class PassageEntity implements Passage {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
