import {
  Mutation,
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Subscription,
  Int,
  ObjectType,
  ArgsOptions

} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { SpiderService } from "src/services/spider.service";
import { Spider } from "src/models/spider.model";
import { PrismaService } from "src/services/prisma.service";
import { CreateSpiderInput } from "./dto/createSpider.input";

const pubSub = new PubSub();

@Resolver((of) => Spider)
export class SpiderResolver {
  constructor(
    private spiderService: SpiderService,
    private prisma: PrismaService
  ) { }

  @Query((returns) => [Spider])
  async spiders() {
    return await this.spiderService.findMany();
  }

  @Mutation((returns) => Spider)
  async createSpider(
    @Args("crawlerVersionId", { type: () => Int }) crawlerVersionId: number,
    @Args("data") data: CreateSpiderInput
  ) {
    return await this.spiderService.create(crawlerVersionId, data);
  }

  // @ResolveField("crawlerVersions")
  // async crawlerVersions(@Parent() crawler: CrawlerStartUrl) {
  //   return await this.prisma.crawler
  //     .findOne({ where: { id: crawler.id } })
  //     .crawlerVersions();
  // }
}
