import { gql } from "@apollo/client";

export const TIMELINE = gql`
  query Timeline {
    timeline {
      id
      body
      file
      user {
        id
        firstName
        lastName
        username
        profilePhoto
      }
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      body
      file
      user
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const GET_USER_POST = gql`
  query GetUserPost($username: String!) {
    getUserPost(username: $username) {
      id
      body
      file
      user
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      firstName
      lastName
      username
      profilePhoto
      coverPhoto
      createdAt
      updatedAt
      following
      follower
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUser {
    getAllUsers {
      id
      username
      firstName
      lastName
      profilePhoto
    }
  }
`;
