import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    body: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
    comments: [
      {
        body: String,
        username: String,
        createdAt: String,
      },
    ],
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
