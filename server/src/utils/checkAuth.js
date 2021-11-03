import { verify } from "jsonwebtoken";

export const checkAuth = (context) => {
  const authHeader = context.req.headers["authorization"];

  if (!authHeader) {
    throw new Error("Auth header does not exist");
  }

  try {
    const token = authHeader.split(" ")[1];
    const user = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Not Authenticated");
  }
};

export const checkEmailConfirmation = (context) => {};
