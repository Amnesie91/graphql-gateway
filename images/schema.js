const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Upload

  extend type Query {
    images: [Image]!
    image(id: ID!): Image!
  }

  extend type Mutation {
    createImage(upload: Upload!): ImageErrorResponse!
  }

  type Image @key(fields: "id") @key(fields: "ownerId") {
    id: ID!
    ownerId: ID!
    data: String!
    mime: String!
    fileName: String!
    width: Int!
    height: Int!
  }

  type FieldError {
    field: String!
    message: String!
  }

  type ImageErrorResponse {
    result: Image
    errors: [FieldError]
  }
`;

module.exports = {
  typeDefs,
};
