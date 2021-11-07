import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import confirmationRoute from "./routes/confirmation";

(async () => {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
      exposedHeaders: ["access-token"],
    })
  );
  app.use(cookieParser());
  app.use("/confirmation", confirmationRoute);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  await mongoose.connect("mongodb://localhost:27017/social", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("MongoDB connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
})();
