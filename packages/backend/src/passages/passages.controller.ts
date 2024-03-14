import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PassagesService } from './passages.service';
import { CreatePassageDto } from './dto/create-passage.dto';
import { UpdatePassageDto } from './dto/update-passage.dto';

@Controller('passages')
export class PassagesController {
  constructor(private readonly passagesService: PassagesService) {}

  @Post()
  create(@Body() createPassageDto: CreatePassageDto) {
    return this.passagesService.create(createPassageDto);
  }

  @Get()
  findAll() {
    return this.passagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassageDto: UpdatePassageDto) {
    return this.passagesService.update(+id, updatePassageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passagesService.remove(+id);
  }
}
