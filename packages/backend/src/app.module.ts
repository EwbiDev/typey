import { Module } from '@nestjs/common';
import { PassagesModule } from './passages/passages.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PassagesModule, PrismaModule],
})
export class AppModule {}
