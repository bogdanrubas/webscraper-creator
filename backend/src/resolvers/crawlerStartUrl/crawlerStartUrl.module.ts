import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CrawlerStartUrlService } from "src/services/crawlerStartUrl.service";
import { CrawlerStartUrlResolver } from "./crawlerStartUrl.resolver";

@Module({
  providers: [
    CrawlerStartUrlService,
    CrawlerStartUrlResolver,
    PrismaService,
  ],
})
export class CrawlerStartUrlModule { }
