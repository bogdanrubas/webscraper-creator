import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateSpiderInput {
  @Field()
  depth: number;
  @Field()
  template: string;
  @Field()
  arguments: string;
  @Field()
  name: string;
  @Field()
  requestType: string;
}
