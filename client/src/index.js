import React from "react";
import ReactDOM from "react-dom";
import "./styles/output.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "./util/accessToken";

const httpLink = new createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();

  console.log(accessToken);

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
