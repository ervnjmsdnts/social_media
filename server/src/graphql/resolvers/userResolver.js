import { genSalt, hash, compare } from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";

import { User } from "../../models/user";
import { createAccessToken, createRefreshToken } from "../../utils/createToken";
import { checkAuth } from "../../utils/checkAuth";
import { sendConfirmationEmail } from "../../services/emailService";
import { sendRefreshToken } from "../../utils/sendRefreshToken";
import { loginValidator, registerValidator } from "../../utils/validators";

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
  register: async (
    _,
    { firstName, lastName, username, email, password, confirmPassword }
  ) => {
    const { valid, errors } = registerValidator(
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    );

    if (!valid) {
      throw new UserInputError("Input Errors", { errors });
    }

    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      errors.general = "Username already taken";
      throw new UserInputError("Username already taken", { errors });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      errors.general = "Email already taken";
      throw new UserInputError("Email already taken", { errors });
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
    const { valid, errors } = loginValidator(username, password);

    if (!valid) {
      throw new UserInputError("Input Errors", { errors });
    }

    const user = await User.findOne({ username });

    if (!user) {
      errors.general = "User not found";
      throw new AuthenticationError("User not found", { errors });
    }

    if (!user.confirmed) {
      errors.general = "Email is not confirmed yet";
      throw new AuthenticationError("Email not confirmed", { errors });
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      errors.general = "Wrong credentials";
      throw new UserInputError("User credentials are wrong", { errors });
    }

    sendRefreshToken(res, createRefreshToken(user));

    res.setHeader("access-token", createAccessToken(user));

    return user;
  },

  logout: async (_, __, { res }) => {
    res.clearCookie("jai");
    return true;
  },

  addFollow: async (_, { followId }, context) => {
    const { id } = await checkAuth(context);
    if (id === followId) {
      throw new Error("You can't follow yourself");
    }

    const followUser = await User.findById(followId);
    const currentUser = await User.findById(id);

    if (currentUser.following.includes(followId)) {
      throw new Error("Can't follow same user twice");
    }

    await followUser.updateOne({ $push: { follower: id } });
    await currentUser.updateOne({ $push: { following: followId } });

    return "User has been followed";
  },

  deleteFollow: async (_, { followId }, context) => {
    const { id } = await checkAuth(context);
    if (id === followId) {
      throw new Error("You can't unfollow yourself");
    }

    const followUser = await User.findById(followId);
    const currentUser = await User.findById(id);

    if (!currentUser.following.includes(followId)) {
      throw new Error("You are not following this user");
    }

    await followUser.updateOne({ $pull: { follower: id } });
    await currentUser.updateOne({ $pull: { following: followId } });
    return "User has been unfollowed";
  },
};
