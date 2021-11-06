import React from "react";
import ReactDOM from "react-dom";
import ApolloConfig from "./config/apolloConfig";
import { ApolloProvider } from "@apollo/client";

import "./styles/output.css";
import App from "./App";

const { client } = ApolloConfig();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
