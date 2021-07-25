import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCrawlerVersionInput {
  @Field()
  lastUsage: string;
  @Field()
  status: string;
}
