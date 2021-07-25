import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateCrawlerVersionInput } from "src/resolvers/crawlerVersion/dto/createCrawlerVersion.input";
import { UpdateCrawlerVersionInput } from "src/resolvers/crawlerVersion/dto/updateCrawlerVersion.input";

@Injectable()
export class CrawlerVersionService {
  constructor(private prisma: PrismaService) { }

  async findUnique(crawlerVersionId: number) {
    return await this.prisma.crawlerVersion.findUnique({
      where: {
        id: crawlerVersionId,
      },
    });
  }

  async findMany() {
    return await this.prisma.crawlerVersion.findMany();
  }

  async delete(crawlerVersionId: number) {
    return await this.prisma.crawlerVersion.delete({
      where: {
        id: crawlerVersionId,
      },
    });
  }

  async update(crawlerVersionId: number, newData: UpdateCrawlerVersionInput) {
    return await this.prisma.crawlerVersion.update({
      data: newData,
      where: {
        id: crawlerVersionId
      }
    })
  }

  async create(crawlerId: number, data: CreateCrawlerVersionInput) {
    return await this.prisma.crawlerVersion.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        crawler: {
          connect: {
            id: crawlerId,
          },
        },
      },
    });
  }
}
