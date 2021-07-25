import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CompileCrawlerVersion {
  @Field((type) => Boolean)
  errors: boolean;
}