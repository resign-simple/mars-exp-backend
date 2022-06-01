import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Cocktail {
  @Field(() => ID)
  id: string;
}
