import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

export const ApolloConfig = () => {
  const httpLink = new createHttpLink({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
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

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);

        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: async () => {
      return await fetch("http://localhost:5000/refresh_token", {
        method: "POST",
        credentials: "include",
      });
    },
    handleFetch: (newToken) => {
      localStorage.setItem("accessToken", newToken);
    },
    handleError: (error) => {
      console.warn("Your refresh token is invalid");
      console.log(error);
    },
  });

  const client = new ApolloClient({
    link: authLink.concat(refreshLink).concat(httpLink),
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
