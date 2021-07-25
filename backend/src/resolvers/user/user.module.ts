import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { UserService } from "src/services/user.service";
import { UserResolver } from "./user.resolver";
import { PasswordService } from "src/services/password.service";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [
    UserService,
    UserResolver,
    PasswordService,
    PrismaService,
    ConfigService,
  ],
})
export class UserModule { }
