import { User } from "../../models/user";
import { genSalt, hash, compare } from "bcrypt";

import { createAccessToken, createRefreshToken } from "../../utils/token";
import { checkAuth } from "../../utils/checkAuth";

export const userQueries = {
  getAllUsers: async () => {
    const user = User.find();
    return user;
  },
  getUser: async (_, { userId }) => {
    const user = User.findById(userId);
    return user;
  },
};

export const userMutations = {
  register: async (_, { firstName, lastName, username, email, password }) => {
    const isUserExist = await User.findOne({ username });
    console.log(isUserExist);
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

      return user;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (_, { username, password }, { res }) => {
    //TODO user form validation
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Could not find user");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error("User credentials are wrong");
    }

    console.log(user);

    res.cookie("jai", createRefreshToken(user), { httpOnly: true });

    return {
      ...user._doc,
      id: user.id,
      token: createAccessToken(user),
    };
  },
  addFollow: async (_, { userId, followId }, context) => {
    const user = checkAuth(context);
    if (userId === followId) {
      throw new Error("You can't follow yourself");
    }

    try {
      const followUser = await User.findById(followId);
      const currentUser = await User.findById(userId);

      if (currentUser.following.includes(followId)) {
        throw new Error("Can't follow same user twice");
      }

      await followUser.updateOne({ $push: { follower: userId } });
      await currentUser.updateOne({ $push: { following: followId } });
      return "User has been followed";
    } catch (error) {
      console.log(error);
    }
  },
};
