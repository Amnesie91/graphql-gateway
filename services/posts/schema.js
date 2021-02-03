const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Upload
  scalar Date

  extend type Query {
    post(id: ID!): Post!
    posts: [Post]!
  }

  extend type Mutation {
    createPost(legendId: String!, data: CreatePostInput!): PostErrorResponse!
    updatePost(id: String!, data: CreatePostInput!): PostErrorResponse!
    deletePost(id: String!): Boolean!
  }

  type Post
    @key(fields: "id")
    @key(fields: "ownerId")
    @key(fields: "legendId") {
    id: ID!
    ownerId: ID!
    legendId: ID!
    replies: [Post]!
    message: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreatePostInput {
    message: String!
  }

  type FieldError {
    field: String!
    message: String!
  }

  type PostErrorResponse {
    result: Post
    errors: [FieldError]
  }
`;

module.exports = {
  typeDefs,
};
