import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { CompileService } from "src/services/compile.service";
import { CompileResolver } from "./compile.resolver";

@Module({
  providers: [
    CompileService,
    CompileResolver,
    PrismaService,
    CompileService
  ],
})
export class CompileModule { }
