import { Field, ObjectType } from "@nestjs/graphql";
import { Model } from "./model";
import { CrawlerVersion } from "./crawlerVersion.model";

@ObjectType()
export class Crawler extends Model {
  @Field((type) => String)
  name: string;
  @Field({ nullable: true })
  actualVersion?: number;
  @Field((type) => [CrawlerVersion], { nullable: true })
  crawlerVersions?: CrawlerVersion[];
}
