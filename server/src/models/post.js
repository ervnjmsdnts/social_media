import { model, Schema } from "mongoose";

const postSchema = new Schema({
  body: String,
});

export const Post = model("Post", postSchema);
