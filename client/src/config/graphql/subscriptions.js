import { gql } from "@apollo/client";

export const NEW_MESSAGE = gql`
  subscription NewMessage {
    newMessage {
      id
      from
      to
      content
      createdAt
    }
  }
`;
