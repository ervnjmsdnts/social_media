import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    follower: [
      {
        firstName: String,
        lastName: String,
        username: String,
      },
    ],
    following: [
      {
        firstName: String,
        lastName: String,
        username: String,
      },
    ],
    profilePhoto: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
