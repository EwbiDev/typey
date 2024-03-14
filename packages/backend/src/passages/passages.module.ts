import { Module } from '@nestjs/common';
import { PassagesService } from './passages.service';
import { PassagesController } from './passages.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PassagesController],
  providers: [PassagesService],
  imports: [PrismaModule],
})
export class PassagesModule {}
