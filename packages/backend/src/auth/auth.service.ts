import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(username: string, password: string) {
    const user = await this.usersService.findPasswordByUsername(username);

    const passwordMatch = await bcrypt.compare(
      password,
      user ? user.passwordHash : '',
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Login details do not match.');
    }

    const tokenPayload = { sub: user.id, username: user.username };
    return {
      userId: user.id,
      username: user.username,
      accessToken: await this.jwtService.signAsync(tokenPayload),
    };
  }
}
