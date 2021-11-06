import { genSalt, hash, compare } from "bcrypt";

import { User } from "../../models/user";
import { createAccessToken, createRefreshToken } from "../../utils/token";
import { checkAuth } from "../../utils/checkAuth";
import { sendConfirmationEmail } from "../../services/emailService";
import { sendRefreshToken } from "../../utils/sendRefreshToken";

export const userQueries = {
  getAllUsers: async () => {
    const user = await User.find();
    return user;
  },

  getUser: async (_, { userId }) => {
    const user = await User.findById(userId);
    return user;
  },
};

export const userMutations = {
  // TODO Edit User Profile
  // TODO Set access token when refresh token is called
  // TODO User form validation
  register: async (
    _,
    { firstName, lastName, username, email, password, confirmPassword }
  ) => {
    const isUserExist = await User.findOne({ username });

    if (password !== confirmPassword) {
      throw new Error("Password does not match");
    }

    if (isUserExist) {
      throw new Error("User already exist");
    }

    try {
      const salt = await genSalt(10);
      password = await hash(password, salt);

      const user = new User({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      await user.save();

      sendConfirmationEmail(user);

      return user;
    } catch (error) {
      console.log(error);
    }
  },

  login: async (_, { username, password }, { res }) => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Could not find user");
    }

    if (!user.confirmed) {
      throw new Error("Email not confirmed");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error("User credentials are wrong");
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      ...user._doc,
      id: user.id,
      token: createAccessToken(user),
    };
  },

  logout: async (_, __, { res }) => {
    res.clearCookie("jai");
    return true;
  },

  addFollow: async (_, { followId }, context) => {
    const { userId } = checkAuth(context);
    if (userId === followId) {
      throw new Error("You can't follow yourself");
    }

    const followUser = await User.findById(followId);
    const currentUser = await User.findById(userId);

    if (currentUser.following.includes(followId)) {
      throw new Error("Can't follow same user twice");
    }

    await followUser.updateOne({ $push: { follower: userId } });
    await currentUser.updateOne({ $push: { following: followId } });

    return "User has been followed";
  },

  deleteFollow: async (_, { followId }, context) => {
    const { userId } = checkAuth(context);
    if (userId === followId) {
      throw new Error("You can't unfollow yourself");
    }

    const followUser = await User.findById(followId);
    const currentUser = await User.findById(userId);

    if (!currentUser.following.includes(followId)) {
      throw new Error("You are not following this user");
    }

    await followUser.updateOne({ $pull: { follower: userId } });
    await currentUser.updateOne({ $pull: { following: followId } });
    return "User has been unfollowed";
  },
};
