import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const Conversation = model("Conversation", conversationSchema);
