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
