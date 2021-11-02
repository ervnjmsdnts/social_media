import { sign } from "jsonwebtoken";

export const createAccessToken = (user) => {
  return sign(
    { userId: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

export const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "3d",
    }
  );
};
