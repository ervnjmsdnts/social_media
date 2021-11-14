import { model, Schema } from "mongoose";

const messagesSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: String,
    message: String,
  },
  { timestamps: true }
);

export const Message = model("Message", messagesSchema);
