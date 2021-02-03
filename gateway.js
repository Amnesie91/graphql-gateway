const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");
const costAnalysis = require("graphql-cost-analysis").default;

const express = require("express");
const expressJwt = require("express-jwt");
const { ACCESS_TOKEN_SECRET } = require("./secrets");

const port = 4000;
const app = express();
const costAnalyzer = costAnalysis({
  maximumCost: 1000,
});

app.use(
  expressJwt({
    secret: ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

const gateway = new ApolloGateway({
  serviceList: [
    { name: "accounts", url: "http://localhost:4001" },
    { name: "posts", url: "http://localhost:4002" },
    { name: "legends", url: "http://localhost:4003" },
    { name: "images", url: "http://localhost:4004" },
  ],
  // thats how we get the information from the context, to the implementing services
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
  validationRules: [depthLimit(5), costAnalyzer],
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Gateway ready at http://localhost:${port}${server.graphqlPath}`)
);
