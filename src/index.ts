import express, { Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

/**
 * * 셋팅 참조 링크
 * * https://velog.io/@qhgus/Node-Express-TypeScript-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85
 */
const app = express();

// * ====== RestAPI ====== * //
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// * ====== Graphql 테스트용 코드(삭제 예정) ====== * //
const typeDefs = gql`
  type Lang {
    id: Int
    name: String!
  }
  type Query {
    getLangs(name: String): [Lang]
  }
`;
const langs = [
  {
    id: 0,
    name: "Node",
  },
  {
    id: 1,
    name: "Pythton",
  },
];

const resolvers = {
  Query: {
    getLangs: () => langs,
  },
};

// * ====== Graphql Apollo Server 셋팅 ====== * //
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(), // playground(https://www.apollographql.com/docs/apollo-server/migration/)
  ],
});
server.start().then(() => {
  server.applyMiddleware({ app }); // 아폴로 서버에 express와 같이 동작한다고 알려줘야 한다

  app.listen({ port: 8080 }, () =>
    console.log(`Server ready at http://localhost:${8080}${server.graphqlPath}`)
  );
});
