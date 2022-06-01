import "reflect-metadata";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Cocktail } from "./cocktail.schema";

@Resolver(Cocktail)
export class CocktailResolver {
  @Query(() => Int)
  test(): Number {
    return 1;
  }

  @Mutation(() => Cocktail)
  createCocktail(@Arg("id") id: string): Cocktail {
    return {
      id: "1",
    };
  }
}
