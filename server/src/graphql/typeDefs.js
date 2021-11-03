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

  type Post {
    id: ID!
    body: String!
    user: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: Date!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: Date!
  }

  type Query {
    getAllUsers: [User]!
    getUser(userId: ID!): User!
    getAllPosts: [Post]!
    getPost(postId: ID!): Post!
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
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;

export default typeDefs;
