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
      body
    }
  }
`;
