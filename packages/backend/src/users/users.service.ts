import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userData.password, 12);

    const newUser = await this.prisma.user.create({
      data: {
        email: userData.email,
        passwordHash,
      },
    });

    delete newUser.passwordHash;
    return newUser;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
