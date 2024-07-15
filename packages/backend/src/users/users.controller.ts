import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user on the Typey site.',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Successful operation.',
  })
  @ApiBadRequestResponse({ description: 'Bad request. Invalid input data.' })
  @ApiConflictResponse({ description: 'Conflict. Username already in use.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username already in use');
      }
    }
  }
}
