import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CrawlerVersionService } from "src/services/crawlerVersion.service";
import { CrawlerVersionResolver } from "./crawlerVersion.resolver";
import { CompileService } from "src/services/compile.service";

@Module({
  providers: [
    CrawlerVersionService,
    CrawlerVersionResolver,
    PrismaService,
    CompileService
  ],
})
export class CrawlerVersionModule { }
