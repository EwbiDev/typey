import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserJwtDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

type UserWithoutInfo = Omit<
  User,
  'passwordHash' | 'email' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  private readonly _select = { id: true, username: true };

  async create(userData: CreateUserDto): Promise<UserJwtDto> {
    const passwordHash = await bcrypt.hash(userData.password, 12);

    const user = await this.prisma.user.create({
      data: {
        username: userData.username,
        passwordHash,
      },
      select: this._select,
    });

    return await this.authService.logIn(user);
  }

  findByUsername(username: string): Promise<UserWithoutInfo> {
    return this.prisma.user.findUnique({
      where: { username },
      select: this._select,
    });
  }

  findById(id: number): Promise<UserWithoutInfo> {
    return this.prisma.user.findUnique({
      where: { id },
      select: this._select,
    });
  }

  findPasswordByUsername(
    username: string,
  ): Promise<Pick<User, 'id' | 'passwordHash' | 'username'>> {
    return this.prisma.user.findUnique({
      where: { username },
      select: { id: true, passwordHash: true, username: true },
    });
  }
}
