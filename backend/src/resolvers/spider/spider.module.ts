import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { SpiderService } from "src/services/spider.service";
import { SpiderResolver } from "./spider.resolver";

@Module({
  providers: [SpiderService, SpiderResolver, PrismaService],
})
export class SpiderModule { }
