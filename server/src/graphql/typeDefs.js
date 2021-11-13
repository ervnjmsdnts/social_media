import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  scalar Upload
  type User {
    id: ID!
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
    file: String
    user: String!
    comments: [Comment]!
    likes: [Like]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Timeline {
    id: ID!
    body: String!
    file: String
    user: User!
    comments: [Comment]!
    likes: [Like]!
    createdAt: Date!
    updatedAt: Date!
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
    getUser(username: String!): User!
    getAllPosts: [Post]!
    getUserPost(username: String!): [Post]!
    timeline: [Timeline]!
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User
    login(username: String!, password: String!): User!
    logout: Boolean!
    changeProfilePhoto(profilePhoto: Upload!): String!
    changeCoverPhoto(coverPhoto: Upload!): String!
    addFollow(followId: String!): String!
    deleteFollow(followId: String!): String!
    createPost(body: String!, file: Upload): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

export default typeDefs;
