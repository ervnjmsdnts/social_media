import { UserInputError } from "apollo-server-errors";
import { subscribe } from "graphql";
import { withFilter } from "graphql-subscriptions";

import { Message } from "../../models/messages";
import { User } from "../../models/user";
import { checkAuth } from "../../utils/checkAuth";

export const messageQueries = {
  getMessages: async (_, { from }, context) => {
    try {
      const { id } = await checkAuth(context);

      const otherUser = await User.findOne({ username: from });
      if (!otherUser) throw new Error("User does not exist");

      const user = await User.findById(id);

      const usernames = [user.username, otherUser.username];

      const messages = await Message.find({
        from: { $in: usernames },
        to: { $in: usernames },
      }).sort({ createdAt: -1 });

      return messages;
    } catch (error) {
      console.log(error);
    }
  },
};

export const messageMutations = {
  sendMessage: async (_, { to, content }, context) => {
    try {
      const { id } = await checkAuth(context);

      const { pubsub } = context;

      const user = await User.findById(id);

      const recipient = await User.findOne({ username: to });
      if (!recipient) {
        throw new Error("User does not exist");
      } else if (recipient.username === user.username) {
        throw new Error("You can't message yourself");
      }

      if (content.trim() === "") {
        throw new UserInputError("Message is empty");
      }

      const message = new Message({
        from: user.username,
        to,
        content,
      });

      await message.save();

      pubsub.publish("NEW_MESSAGE", { newMessage: message });

      return message;
    } catch (error) {
      console.log(error);
    }
  },
};

export const messageSubscriptions = {
  // newMessage: {
  //   async subscribe(_, __, context) {
  //     const { id } = await checkAuth(context);
  //     const user = await User.findById(id);
  //     return withFilter(
  //       (_, __, { pubsub }) => {
  //         return pubsub.asyncIterator("NEW_MESSAGE");
  //       },
  //       ({ newMessage }, _, __) => {
  //         if (
  //           newMessage.from === user.username ||
  //           newMessage.to === user.username
  //         ) {
  //           return true;
  //         }
  //         return false;
  //       }
  //     );
  //   },
  // },
  newMessage: {
    subscribe: (_, __, { pubsub }) => {
      return pubsub.asyncIterator("NEW_MESSAGE");
    },
  },
};
