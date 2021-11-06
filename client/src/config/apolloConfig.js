import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const ApolloConfig = () => {
  const httpLink = new createHttpLink({
    uri: "http://localhost:5000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            timeline: {
              merge(existing = [], incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
      },
    }),
    credentials: "include",
  });

  return { client };
};

export default ApolloConfig;
