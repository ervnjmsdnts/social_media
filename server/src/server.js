import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { User } from "./models/user";
import { createAccessToken, createRefreshToken } from "./utils/token";

(async () => {
  const app = express();

  //Handling Refresh Token
  app.use(cookieParser());
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jai;

    if (!token) {
      return res.send({ accessToken: "" });
    }

    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      console.log(error);
      return res.send({ accessToken: "" });
    }

    const user = await User.findOne({ id: payload.userId });

    res.cookie("jai", createRefreshToken(user), { httpOnly: true });

    return res.send({ accessToken: createAccessToken(user) });
  });

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
