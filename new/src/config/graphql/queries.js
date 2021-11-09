import { gql } from "@apollo/client";

export const TIMELINE = gql`
  query Timeline {
    timeline {
      id
      body
      user {
        id
        firstName
        lastName
        username
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
