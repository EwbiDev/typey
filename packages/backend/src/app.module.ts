import { Module } from '@nestjs/common';
import { PassagesModule } from './passages/passages.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PassagesModule, PrismaModule, AuthModule, UsersModule],
})
export class AppModule {}
