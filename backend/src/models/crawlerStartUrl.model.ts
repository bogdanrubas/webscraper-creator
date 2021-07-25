import { Field, ObjectType } from "@nestjs/graphql";
import { Model } from "./model";

@ObjectType()
export class CrawlerStartUrl extends Model {
  @Field((type) => String)
  url: string;
  @Field((type) => Boolean)
  crawled: string;
  @Field((type) => Boolean)
  hasErrors: string;
  @Field((type) => String)
  errorsDescription: string;
  @Field((type) => String)
  errorFields: string;
}
