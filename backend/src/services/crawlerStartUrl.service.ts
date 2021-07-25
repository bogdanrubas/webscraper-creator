import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateCrawlerStartUrlInput } from "src/resolvers/crawlerStartUrl/dto/createCrawlerStartUrl.input";

@Injectable()
export class CrawlerStartUrlService {
  constructor(private prisma: PrismaService) { }

  async findUnique(crawlerStartUrlId: number) {
    return await this.prisma.crawlerStartUrl.findUnique({
      where: {
        id: crawlerStartUrlId,
      },
    });
  }

  async findMany() {
    return await this.prisma.crawlerStartUrl.findMany();
  }

  async delete(crawlerStartUrlId: number) {
    return await this.prisma.crawlerStartUrl.delete({
      where: {
        id: crawlerStartUrlId,
      },
    });
  }

  async create(crawlerVersionId: number, data: CreateCrawlerStartUrlInput) {
    return await this.prisma.crawlerStartUrl.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        crawled: false,
        hasErrors: false,
        errorsDescription: "",
        errorFields: "",
        crawlerVersion: {
          connect: {
            id: crawlerVersionId,
          },
        },
      },
    });
  }
}
