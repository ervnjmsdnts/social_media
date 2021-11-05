import express from "express";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";

const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    const { userId } = verify(req.params.token, process.env.EMAIL_TOKEN_SECRET);
    const user = await User.findById(userId);
    await user.updateOne({ confirmed: true });
  } catch (error) {
    console.log(error);
    return res.send(false);
  }
  return res.send(true);
});

export default router;
