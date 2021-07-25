import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateCrawlerInput } from "src/resolvers/crawler/dto/createCrawler.input";

@Injectable()
export class CrawlerService {
  constructor(private prisma: PrismaService) { }

  async findUnique(crawlerId: number) {
    return await this.prisma.crawler.findUnique({
      where: {
        id: crawlerId,
      },
    });
  }

  async findMany(userId: number) {
    return await this.prisma.crawler.findMany({ where: { user: { id: userId } } });
  }

  async delete(crawlerId: number) {
    return await this.prisma.crawler.delete({
      where: {
        id: crawlerId,
      },
    });
  }

  async create(userId: number, data: CreateCrawlerInput) {
    console.log('##############' + userId);

    return await this.prisma.crawler.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
