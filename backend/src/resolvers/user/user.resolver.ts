import {
  Mutation,
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Subscription,
  Int,
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { UserService } from "src/services/user.service";
import { User } from "src/models/user.model";
import { PrismaService } from "src/services/prisma.service";
import { UserEntity } from "src/decorators/user.decorator";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { ChangePasswordInput } from "./dto/changePassword.input";
import { Crawler } from "src/models/crawler.model";

@Resolver((of) => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService
  ) { }

  @Query((returns) => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async changePassword(
    @UserEntity() user: User,
    @Args("data") changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  @ResolveField("crawlers", () => [Crawler])
  crawlers(@Parent() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).crawlers();
  }

  // @Query((returns) => [User])
  // async users() {
  //   return await this.userService.findMany();
  // }

  // @Mutation((returns) => User)
  // async createUser(@Args("data") data: CreateUserInput) {
  //   return await this.userService.create(data);
  // }

  // @Mutation((returns) => User)
  // async signUp(@Args("data") data: CreateUserInput) {
  //   data.email = data.email.toLowerCase();
  //   const isEmailUnavailable = await this.userService.findEmail(data.email);
  //   if (isEmailUnavailable) {
  //     throw new Error("Użytkownik z podanym adresem e-mail już istnieje!");
  //   }

  //   // const password = await bcrypt.hash(data.password, 10);
  //   // const user = await this.userService.create({
  //   //   ...data,
  //   //   password,
  //   // });

  //   // const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  //   // return user;
  // }

  // @ResolveField("crawlers")
  // async crawlers(@Parent() user: User) {
  //   return await this.prisma.user
  //     .findUnique({ where: { id: user.id } })
  //     .crawlers();
  // }
}
