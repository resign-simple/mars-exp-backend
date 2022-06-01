import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { CocktailResolver } from "./cocktail/cocktail.resolver";
import { buildSchema } from "type-graphql";

const main = async () => {
  /**
   * * 셋팅 참조 링크
   * * https://velog.io/@qhgus/Node-Express-TypeScript-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85
   */

  const PORT_NUMBER = 8000;

  const app = express();

  // * ====== RestAPI ====== * //
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  // * ====== GraphQL Schema Setting ====== * //
  const schema = await buildSchema({
    resolvers: [CocktailResolver],
  });

  // * ====== Graphql Apollo Server 셋팅 ====== * //
  const server = await new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(), // playground 셋팅 방법: https://www.apollographql.com/docs/apollo-server/migration/
    ],
  });
  server.start().then(() => {
    // 아폴로 서버에 express와 같이 동작한다고 알려줘야 한다
    // (https://velog.io/@bard/5.-apollo-server-express-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-express-%EC%84%9C%EB%B2%84%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0)
    // 공식 문서: https://www.apollographql.com/docs/apollo-server/api/apollo-server/
    server.applyMiddleware({ app });
    app.listen({ port: PORT_NUMBER }, () => {
      return console.log(
        `Server ready at http://localhost:${PORT_NUMBER}${server.graphqlPath}`
      );
    });
  });
};

main().then(() => {
  console.log(`main() called`);
});
