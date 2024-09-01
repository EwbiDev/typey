import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PassagesService } from './passages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { PassageEntity } from './entities/passage.entity';
import { CreatePassageDto } from './dto/create-passage.dto';
import { UpdatePassageDto } from './dto/update-passage.dto';

interface ReqCurrentUser {
  user: {
    userId: number;
    username: string;
  };
}

@ApiTags('passages')
@Controller('passages')
export class PassagesController {
  constructor(private readonly passagesService: PassagesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPassageDto: CreatePassageDto,
    @Req() { user }: ReqCurrentUser,
  ) {
    return this.passagesService.create({
      ...createPassageDto,
      authorId: user.userId,
    });
  }

  @Get()
  @ApiOkResponse({ type: PassageEntity, isArray: true })
  findAll() {
    return this.passagesService.findAll();
  }

  @Get('meta')
  findMeta() {
    return this.passagesService.meta();
  }

  @Get('random')
  @ApiOkResponse({ type: PassageEntity })
  async findRandom(tryCount = 0) {
    if (tryCount > 5) {
      return {
        statusCode: 500,
        message: 'Internal server error: my randomness hack has broken',
      };
    }

    const { count } = await this.passagesService.meta();
    try {
      const randomInt = Math.floor(Math.random() * count) + 1;
      return this.findOne(String(randomInt));
    } catch (e) {
      this.findRandom(tryCount + 1);
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: PassageEntity })
  async findOne(@Param('id') id: string) {
    const passage = await this.passagesService.findOne(+id);

    if (passage) {
      return passage;
    }

    throw new NotFoundException();
  }

  @Patch(':id')
  @ApiOkResponse({ type: PassageEntity })
  update(@Param('id') id: string, @Body() updatePassageDto: UpdatePassageDto) {
    return this.passagesService.update(+id, updatePassageDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PassageEntity })
  remove(@Param('id') id: string) {
    return this.passagesService.remove(+id);
  }
}
