import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCrawlerStartUrlInput {
  @Field()
  url: string;
}
