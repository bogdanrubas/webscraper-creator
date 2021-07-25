import { Query, Args, Int, Resolver, Mutation } from "@nestjs/graphql";
import { PrismaService } from "src/services/prisma.service";
import { CompileService } from "src/services/compile.service";

@Resolver()
export class CompileResolver {
  constructor(
    private prisma: PrismaService,
    private compileService: CompileService
  ) { }

  @Mutation((returns) => Boolean)
  async compileCrawlerVersion(
    @Args("crawlerVersionId", { type: () => Int }) crawlerVersionId: number
  ) {

    await this.compileService.compileCrawler();
    // let crawlerVersion = await this.crawlerVersionService.findOne(crawlerVersionId);
    // let startUrls = await this.prisma.crawlerStartUrl.findMany({ where: { crawlerVersion: crawlerVersionId } })
    let spiders = await this.prisma.spider.findMany({
      where: { crawlerVersionId },
    });
    for (let spider of spiders) {
      if (spider.depth == 0) {
      }
      await this.compileService.spider(spider);
    }
    // console.log(startUrls);
    // console.log(spiders);
    // return await this.compileService.spider(crawlerVersionId)
    return true;
  }
}
