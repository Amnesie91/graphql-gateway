const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    legend(id: ID!): Legend!
    legends: [Legend!]!
    skill(id: ID!): Skill!
    skills: [Skill!]!
  }

  extend type Mutation {
    createLegend(data: CreateLegendInput!): LegendErrorResponse!
    updateLegend(id: ID!, data: UpdateLegendInput!): LegendErrorResponse!
    deleteLegend(id: ID!): Boolean!
    createSkill(legendId: ID!, data: CreateSkillInput!): SkillErrorResponse!
    updateSKill(id: ID!, data: UpdateSkillInput!): SkillErrorResponse!
    deleteSkill(id: ID!): Boolean!
  }

  type Legend @key(fields: "id") @key(fields: "ownerId") {
    id: ID!
    ownerId: ID!
    name: String!
    descr: String
    skills: [Skill]!
  }

  type Skill
    @key(fields: "id")
    @key(fields: "ownerId")
    @key(fields: "legendId") {
    id: ID!
    ownerId: ID!
    legendId: ID!
    name: String!
    descr: String
  }

  extend type Account @key(fields: "id") {
    id: ID! @external
    legends: [Legend]!
    skills: [Skill]!
  }

  type FieldError {
    field: String!
    message: String!
  }

  input CreateLegendInput {
    name: String
    descr: String
  }

  input UpdateLegendInput {
    name: String
    descr: String
  }

  type LegendErrorResponse {
    result: Legend
    errors: [FieldError]
  }

  input CreateSkillInput {
    name: String!
    descr: String
  }

  input UpdateSkillInput {
    name: String
    descr: String
  }

  type SkillErrorResponse {
    result: Skill
    errors: [FieldError]
  }
`;

module.exports = {
  typeDefs,
};
