import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Spider } from "src/models/spider.model";
import createCategoriesNSNSNU from "./compileTemplates/categories/ns.ns.nu";
import createGetUrls from "./compileTemplates/getUrls";
import createGetData from "./compileTemplates/getData";

@Injectable()
export class CompileService {
  constructor(private prisma: PrismaService) { }

  // szablon scrapera: main.py, settings.py, itd.
  async compileCrawler() {
    // createDir("./compiled")
    return true;
  }

  // sql/createTables.py
  async compileCreateTablesFunctions(crawlerVersionId: number) {
    return true;
  }

  // sql/addToDatabase/items.py
  async compileItems(crawlerVersionId: number) {
    return true;
  }

  // sql/addToDatabase/validators.py
  async compileValidators(crawlerVersionId: number) {
    return true;
  }

  // sql/addToDatabase/pipeline
  async compilePipeline(crawlerVersionId: number) {
    return true;
  }

  // spiders/extractionFunctions
  async compileExtractionFunction(crawlerVersionId: number) {
    return true;
  }

  // spiders/spiderName.py
  async spider(data: Spider) {
    switch (data.template) {
      case "categories/ns.ns.nu":
        createCategoriesNSNSNU(data.name, data.requestType, data.arguments);
        break;

      case "getUrls":
        createGetUrls(data.name, data.requestType, data.arguments);
        break;

      case "getData":
        createGetData(data.name, data.requestType, data.arguments);
        break;

      default:
        break;
    }

    return true;
  }
}
