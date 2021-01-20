const { ApolloServer, gql } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { permissions } = require("./permissions");

const port = 4001;

// the graphql server needs to be apollo federation compatible, we do this with the buildFederatedSchema function
// then we add our permissions to secure our microservice
const server = new ApolloServer({
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions
  ),
  context: ({ req }) => {
    // here we extract the user set to the header from the gateway and add it to the context of each operation
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  },
});

server.listen({ port }).then(({ url }) => {
  console.log(`Accounts service ready at ${url}`);
});
