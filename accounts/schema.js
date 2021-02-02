const { gql } = require("apollo-server");

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    name: String
  }

  type loginMutationResponse {
    access: String!
    refresh: String!
  }

  extend type Query {
    account(id: ID!): Account
    accounts: [Account]
    viewer: Account!
  }

  extend type Mutation {
    login(email: String!, password: String!): loginMutationResponse!
    logout(refresh: String!): Boolean!
    token(refresh: String!): String!
  }
`;

module.exports = {
  typeDefs,
};
