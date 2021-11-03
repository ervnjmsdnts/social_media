import express from "express";
import { verify } from "jsonwebtoken";
import { User } from "../models/user";
import { createAccessToken, createRefreshToken } from "../utils/token";

const router = express.Router();

router.post("/", async (req, res) => {
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

export default router;
