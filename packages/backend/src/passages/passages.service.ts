import { Injectable } from '@nestjs/common';
import { CreatePassageDto } from './dto/create-passage.dto';
import { UpdatePassageDto } from './dto/update-passage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreatePassageData extends CreatePassageDto {
  authorId: number;
}

@Injectable()
export class PassagesService {
  constructor(private prisma: PrismaService) {}

  create(createPassageData: CreatePassageData) {
    return this.prisma.passage.create({
      data: createPassageData,
    });
  }

  async findAll() {
    return this.prisma.passage.findMany();
  }

  findOne(id: number) {
    return this.prisma.passage.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePassageDto: UpdatePassageDto) {
    return `This action updates a #${id} passage`;
  }

  remove(id: number) {
    return this.prisma.passage.delete({
      where: {
        id,
      },
    });
  }

  async meta() {
    const count = await this.prisma.passage.count();
    return { count };
  }
}
