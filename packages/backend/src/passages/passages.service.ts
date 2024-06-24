import { Injectable } from '@nestjs/common';
import { CreatePassageDto } from './dto/create-passage.dto';
import { UpdatePassageDto } from './dto/update-passage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PassagesService {
  constructor(private prisma: PrismaService) {}

  create(createPassageDto: CreatePassageDto) {
    return this.prisma.passage.create({
      data: createPassageDto,
    });
  }

  async findAll() {
    return this.prisma.passage.findMany();
  }

  findOne(id: number) {
    return this.prisma.passage.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updatePassageDto: UpdatePassageDto) {
    return `This action updates a #${id} passage`;
  }

  remove(id: number) {
    return `This action removes a #${id} passage`;
  }

  async meta() {
    const count = await this.prisma.passage.count();
    return { count };
  }
}
