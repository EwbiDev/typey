import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login with user details',
    description: 'Returns a JWT on successful login attempt.',
  })
  async logIn(@Body() logInDto: LogInDto) {
    return await this.authService.logIn(logInDto.email, logInDto.password);
  }
}
