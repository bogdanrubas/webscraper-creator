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
import { CrawlerVersionService } from "src/services/crawlerVersion.service";
import { CrawlerVersion } from "src/models/crawlerVersion.model";
import { PrismaService } from "src/services/prisma.service";
import { CreateCrawlerVersionInput } from "./dto/createCrawlerVersion.input";
import { UpdateCrawlerVersionInput } from "./dto/updateCrawlerVersion.input";
import { CompileCrawlerVersion } from "src/models/compileCrawlerVersion.model";
import { CompileService } from "src/services/compile.service";

@Resolver((of) => CrawlerVersion)
export class CrawlerVersionResolver {
  constructor(
    private crawlerVersionService: CrawlerVersionService,
    private prisma: PrismaService,
    private compileService: CompileService
  ) { }

  @Query((returns) => [CrawlerVersion])
  async crawlerVersions() {
    return await this.crawlerVersionService.findMany();
  }

  @Mutation((returns) => CrawlerVersion)
  async createCrawlerVersion(
    @Args("crawlerId", { type: () => Int }) crawlerId: number,
    @Args("data") data: CreateCrawlerVersionInput
  ) {
    return await this.crawlerVersionService.create(crawlerId, data);
  }

  @Mutation((returns) => CrawlerVersion)
  async updateCrawlerVersionStatus(
    @Args("crawlerVersionId", { type: () => Int }) crawlerVersionId: number,
    @Args("status") status: string
  ) {
    let newData = await this.crawlerVersionService.findUnique(crawlerVersionId);
    newData.status = status
    newData.updatedAt = new Date()
    delete newData.crawlerId

    return await this.crawlerVersionService.update(crawlerVersionId, newData);
  }

  @ResolveField("crawlerStartUrls")
  async crawlerStartUrls(@Parent() crawlerVersion: CrawlerVersion) {
    return await this.prisma.crawlerVersion
      .findUnique({ where: { id: crawlerVersion.id } })
      .crawlerStartUrls();
  }

  @ResolveField("spiders")
  async spiders(@Parent() crawlerVersion: CrawlerVersion) {
    return await this.prisma.crawlerVersion
      .findUnique({ where: { id: crawlerVersion.id } })
      .spiders();
  }

  // CREATING


  // @Query((returns) => Boolean)
  // async compileCrawlerVersion(
  //   @Args("crawlerVersionId", { type: () => Int }) crawlerVersionId: number
  // ) {
  //   await this.compileService.compileCrawler()
  //   // let crawlerVersion = await this.crawlerVersionService.findUnique(crawlerVersionId);
  //   // let startUrls = await this.prisma.crawlerStartUrl.findMany({ where: { crawlerVersion: crawlerVersionId } })
  //   let spiders = await this.prisma.spider.findMany({ where: { crawlerVersion: crawlerVersionId } })
  //   for (let spider of spiders) {
  //     await this.compileService.spider(spider)
  //   }
  //   // console.log(startUrls);
  //   // console.log(spiders);
  //   // return await this.compileService.spider(crawlerVersionId)
  //   return true

  // }
}
