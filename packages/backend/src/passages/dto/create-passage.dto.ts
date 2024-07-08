import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePassageDto {
  @ApiProperty({
    type: String,
    description: 'Passage Text',
    example: 'Passages are a simple way to convey text over the internet',
  })
  @IsString()
  @MinLength(8, { message: 'passage must be at least 8 characters long' })
  text: string;
}
