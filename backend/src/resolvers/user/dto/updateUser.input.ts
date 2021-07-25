import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field((type) => String)
  password: string;
}
