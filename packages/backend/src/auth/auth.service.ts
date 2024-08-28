import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findPasswordByUsername(username);

    const passwordMatch = await bcrypt.compare(
      password,
      user ? user.passwordHash : '',
    );

    if (passwordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async logIn(user: { id: number; username: string }) {
    const tokenPayload = { sub: user.id, username: user.username };
    return {
      userId: user.id,
      username: user.username,
      accessToken: await this.jwtService.signAsync(tokenPayload),
    };
  }
}
