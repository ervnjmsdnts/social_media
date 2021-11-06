import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import "./styles/output.css";
import App from "./App";
import { ApolloConfig } from "./config/apollo/apolloConfig";

const { client } = ApolloConfig();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
