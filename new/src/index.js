import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import theme from "./config/theme";
import { ApolloConfig } from "./config/graphql/config";
import { AuthProvider } from "./context/authContext";

const { client } = ApolloConfig();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
