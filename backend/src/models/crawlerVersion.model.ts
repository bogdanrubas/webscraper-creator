import { Field, ObjectType } from "@nestjs/graphql";
import { Model } from "./model";
import { CrawlerStartUrl } from "./crawlerStartUrl.model";
import { Spider } from "./spider.model";

@ObjectType()
export class CrawlerVersion extends Model {
  @Field((type) => String)
  lastUsage: string;
  @Field((type) => String)
  status: string;
  @Field((type) => [CrawlerStartUrl], { nullable: true })
  crawlerStartUrls?: CrawlerStartUrl[];
  @Field((type) => [Spider], { nullable: true })
  spiders?: Spider[];
}