import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassagesModule } from './passages/passages.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PassagesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
