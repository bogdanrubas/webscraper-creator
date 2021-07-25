import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCrawlerInput {
  @Field()
  name: string;
}
