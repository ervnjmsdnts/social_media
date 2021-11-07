import { verify } from "jsonwebtoken";
import { User } from "../models/user";
import { createAccessToken } from "./createToken";

export const checkAuth = async (context) => {
  if (context.req.cookies.jai) {
    const authHeader = context.req.headers["authorization"];
    if (!authHeader) {
      context.res.clearCookie("jai");
      throw new Error("Auth header does not exist");
    }
    try {
      const token = authHeader.split(" ")[1];
      const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(userId);

      if (!user) {
        context.res.clearCookie("jai");
        throw new Error("No user authenticated");
      }

      return user;
    } catch (error) {
      console.log("There is no user");
      try {
        const { userId } = verify(
          context.req.cookies.jai,
          process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(userId);

        if (!user) {
          context.res.clearCookie("jai");
          throw new Error("Invalid user");
        }

        context.res.setHeader("access-token", createAccessToken(user));
        return user;
      } catch (error) {
        console.log(error);
      }
    }
  }
  throw new Error("Not Authenticated");
};
