import { Module } from '@nestjs/common';
import { PassagesService } from './passages.service';
import { PassagesController } from './passages.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PassagesController],
  providers: [PassagesService, PrismaService],
})
export class PassagesModule {}
