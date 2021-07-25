import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Model } from "./model";

@ObjectType()
export class Spider extends Model {
  @Field((type) => Int)
  depth: number;
  @Field((type) => String)
  template: string;
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  requestType: string;
  @Field((type) => String)
  arguments?: string;
}
