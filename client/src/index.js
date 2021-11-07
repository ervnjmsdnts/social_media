import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/output.css";
import App from "./App";
import { ApolloConfig } from "./config/apollo/apolloConfig";
import { AuthProvider } from "./context/authContext";

const { client } = ApolloConfig();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
