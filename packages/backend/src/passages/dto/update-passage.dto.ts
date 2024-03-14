import { PartialType } from '@nestjs/mapped-types';
import { CreatePassageDto } from './create-passage.dto';

export class UpdatePassageDto extends PartialType(CreatePassageDto) {}
