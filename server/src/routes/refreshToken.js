import express from "express";
import { verify } from "jsonwebtoken";
import { User } from "../models/user";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../utils/createToken";

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

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ accessToken: createAccessToken(user) });
});

export default router;
