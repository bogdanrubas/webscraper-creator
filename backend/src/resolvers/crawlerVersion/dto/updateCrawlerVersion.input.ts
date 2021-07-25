import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateCrawlerVersionInput {
  @Field()
  lastUsage: string;
  @Field()
  status: string;
}
