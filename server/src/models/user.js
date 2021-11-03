import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    confirmed: {
      type: Boolean,
      default: false,
    },
    follower: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
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
