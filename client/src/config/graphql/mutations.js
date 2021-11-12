import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      firstName
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      firstName
      lastName
      username
    }
  }
`;

export const LOGOUT = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      user
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      user
    }
  }
`;

export const ADD_FOLLOW = gql`
  mutation AddFollow($followId: String!) {
    addFollow(followId: $followId)
  }
`;
