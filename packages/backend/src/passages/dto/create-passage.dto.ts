import { ApiProperty } from '@nestjs/swagger';

export class CreatePassageDto {
  @ApiProperty({
    type: String,
    description: 'Passage Text',
  })
  text: string;
}
