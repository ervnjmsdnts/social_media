import { ApolloClient, InMemoryCache, ApolloLink, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const ApolloConfig = () => {
  const httpLink = new createUploadLink({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
  });

  const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("accessToken");

    const authHeader = token ? `Bearer ${token}` : "";

    operation.setContext({
      headers: {
        authorization: authHeader,
      },
    });

    return forward(operation);
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();

      const {
        response: { headers },
      } = context;

      if (headers) {
        const accessToken = headers.get("access-token");

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      }
      return response;
    });
  });

  const client = new ApolloClient({
    link: from([middlewareAuthLink, afterwareLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Post: {
          fields: {
            likes: {
              merge: (existing = [], incoming) => [...existing, ...incoming],
            },
          },
        },
      },
    }),
  });

  return { client };
};
