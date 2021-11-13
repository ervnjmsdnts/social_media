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
  mutation CreatePost($body: String!, $file: Upload) {
    createPost(body: $body, file: $file) {
      id
      body
      file
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
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

export const DELETE_FOLLOW = gql`
  mutation DeleteFollow($followId: String!) {
    deleteFollow(followId: $followId)
  }
`;

export const CHANGE_PROFILE_PHOTO = gql`
  mutation ChangeProfilePhoto($profilePhoto: Upload!) {
    changeProfilePhoto(profilePhoto: $profilePhoto)
  }
`;

export const CHANGE_COVER_PHOTO = gql`
  mutation ChangeCoverPhoto($coverPhoto: Upload!) {
    changeCoverPhoto(coverPhoto: $coverPhoto)
  }
`;
