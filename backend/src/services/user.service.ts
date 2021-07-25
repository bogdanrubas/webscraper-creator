import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PasswordService } from "./password.service";
// import { CreateUserInput } from "src/resolvers/user/dto/createUser.input";
import { UpdateUserInput } from "src/resolvers/user/dto/updateUser.input";
import { ChangePasswordInput } from "src/resolvers/user/dto/changePassword.input";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  // updateUser(userId: number, newUserData: UpdateUserInput) {
  //   return this.prisma.user.update({
  //     data: newUserData,
  //     where: {
  //       id: userId,
  //     },
  //   });
  // }

  async changePassword(
    userId: number,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException("Invalid password");
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }

  // async findOne(userId: number) {
  //   return await this.prisma.user.findOne({
  //     where: {
  //       id: userId,
  //     },
  //   });
  // }

  // async findEmail(email: string) {
  //   return await this.prisma.user.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }

  // async findMany() {
  //   return await this.prisma.user.findMany();
  // }

  // async delete(userId: number) {
  //   return await this.prisma.user.delete({
  //     where: {
  //       id: userId,
  //     },
  //   });
  // }

  // async create(data: CreateUserInput) {
  //   return await this.prisma.user.create({
  //     data: {
  //       ...data,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     },
  //   });
  // }
}
