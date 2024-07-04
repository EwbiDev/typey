import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

type UserWithoutInfo = Omit<User, 'passwordHash' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly _select = { id: true, email: true, username: true };

  async create(userData: CreateUserDto): Promise<UserWithoutInfo> {
    const passwordHash = await bcrypt.hash(userData.password, 12);

    return await this.prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        passwordHash,
      },
      select: this._select,
    });
  }

  findByEmail(email: string): Promise<UserWithoutInfo> {
    return this.prisma.user.findUnique({
      where: { email },
      select: this._select,
    });
  }

  findById(id: number): Promise<UserWithoutInfo> {
    return this.prisma.user.findUnique({
      where: { id },
      select: this._select,
    });
  }
}
