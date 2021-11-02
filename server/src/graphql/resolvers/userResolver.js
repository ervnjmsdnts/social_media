import { User } from "../../models/user";
import { genSalt, hash, compare } from "bcrypt";

import { createAccessToken, createRefreshToken } from "../../utils/token";

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
    try {
      const isUserExist = User.findOne({ username });
      if (isUserExist) {
        throw new Error("User already exist");
      }

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
};
