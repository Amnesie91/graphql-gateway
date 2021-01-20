const { gql } = require("apollo-server");

const typeDefs = gql`
  type Car @key(fields: "id") @key(fields: "userId") {
    id: ID!
    userId: ID!
    name: String
  }

  extend type Account @key(fields: "id") {
    id: ID! @external
    cars: [Car]!
  }

  extend type Query {
    car(id: ID!): Car
    cars: [Car]
  }

  extend type Mutation {
    updateCar(id: ID!, name: String!): Car
  }
`;

module.exports = {
  typeDefs,
};
