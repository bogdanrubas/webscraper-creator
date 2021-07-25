import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateSpiderInput } from "src/resolvers/spider/dto/createSpider.input";

@Injectable()
export class SpiderService {
  constructor(private prisma: PrismaService) { }

  async findUnique(spiderId: number) {
    return await this.prisma.spider.findUnique({
      where: {
        id: spiderId,
      },
    });
  }

  async findMany() {
    return await this.prisma.spider.findMany();
  }

  async delete(spiderId: number) {
    return await this.prisma.spider.delete({
      where: {
        id: spiderId,
      },
    });
  }

  async create(crawlerVersionId: number, data: CreateSpiderInput) {
    return await this.prisma.spider.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        crawlerVersion: {
          connect: {
            id: crawlerVersionId,
          },
        },
      },
    });
  }
}
