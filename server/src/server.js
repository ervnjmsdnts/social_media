import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import refreshTokenRoute from "./routes/refreshToken";

(async () => {
  const app = express();

  app.use(cookieParser());
  app.use("/refresh_token", refreshTokenRoute);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/social", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("MongoDB connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
})();
