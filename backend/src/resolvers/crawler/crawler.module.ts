import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CrawlerService } from "src/services/crawler.service";
import { CrawlerResolver } from "./crawler.resolver";

@Module({
  providers: [
    CrawlerService,
    CrawlerResolver,
    // SpiderVersionService,
    PrismaService,
  ],
})
export class CrawlerModule { }
