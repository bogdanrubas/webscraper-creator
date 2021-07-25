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
import { CrawlerStartUrlService } from "src/services/crawlerStartUrl.service";
import { CrawlerStartUrl } from "src/models/crawlerStartUrl.model";
import { PrismaService } from "src/services/prisma.service";
import { CreateCrawlerStartUrlInput } from "./dto/createCrawlerStartUrl.input";

@Resolver((of) => CrawlerStartUrl)
export class CrawlerStartUrlResolver {
  constructor(
    private crawlerStartUrlService: CrawlerStartUrlService,
    private prisma: PrismaService
  ) {}

  @Query((returns) => [CrawlerStartUrl])
  async crawlerStartUrls() {
    return await this.crawlerStartUrlService.findMany();
  }

  @Mutation((returns) => CrawlerStartUrl)
  async createCrawlerStartUrl(
    @Args("crawlerVersionId", { type: () => Int }) crawlerVersionId: number,
    @Args("data") data: CreateCrawlerStartUrlInput
  ) {
    return await this.crawlerStartUrlService.create(crawlerVersionId, data);
  }

  // @ResolveField("crawlerVersions")
  // async crawlerVersions(@Parent() crawler: CrawlerStartUrl) {
  //   return await this.prisma.crawler
  //     .findOne({ where: { id: crawler.id } })
  //     .crawlerVersions();
  // }
}
