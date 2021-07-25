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
import { CrawlerService } from "src/services/crawler.service";
import { Crawler } from "src/models/crawler.model";
import { PrismaService } from "src/services/prisma.service";
import { CreateCrawlerInput } from "./dto/createCrawler.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { UserEntity } from "src/decorators/user.decorator";
import { User } from "src/models/user.model";

const pubSub = new PubSub();

@Resolver((of) => Crawler)
export class CrawlerResolver {
  constructor(
    private crawlerService: CrawlerService,
    private prisma: PrismaService
  ) { }
  @Subscription((returns) => Crawler)
  crawlerCreated() {
    return pubSub.asyncIterator('crawlerCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Crawler])
  async crawlers(@UserEntity() user: User) {
    return await this.crawlerService.findMany(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Crawler)
  async crawler(@Args("crawlerId", { type: () => Int }) crawlerId: number) {
    return await this.crawlerService.findUnique(crawlerId);
  }

  @Mutation((returns) => Crawler)
  async deleteCrawler(
    @Args("crawlerId", { type: () => Int }) crawlerId: number
  ) {
    return await this.crawlerService.delete(crawlerId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Crawler)
  async createCrawler(
    @UserEntity() user: User,
    @Args("data") data: CreateCrawlerInput
  ) {
    const newCrawler = await this.crawlerService.create(user.id, data);

    pubSub.publish("crawlerCreated", {
      crawlerCreated: {
        ...newCrawler,
      },
    });

    return newCrawler;
  }
}
