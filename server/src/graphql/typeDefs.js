import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    token: String
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    confirmed: Boolean!
    follower: [String]
    following: [String]
    profilePhoto: String
    coverPhoto: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getAllUsers: [User]!
    getUser(userId: ID!): User!
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
      profilePhoto: String
      converPhoto: String
    ): User
    login(username: String!, password: String!): User!
    addFollow(followId: String!): String!
    deleteFollow(followId: String!): String!
  }
`;

export default typeDefs;
