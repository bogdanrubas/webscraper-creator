import {
  Field,
  ObjectType,
  registerEnumType,
  HideField,
} from "@nestjs/graphql";
import { Crawler } from "./crawler.model";
import { Model } from "./model";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

registerEnumType(Role, {
  name: "Role",
  description: "User role",
});

@ObjectType()
export class User extends Model {
  @Field((type) => String)
  email: string;
  // @Field((type) => String)
  // password: string;
  role: Role;
  @Field((type) => [Crawler], { nullable: true })
  crawlers?: Crawler[];
  @HideField()
  password: string;
}
