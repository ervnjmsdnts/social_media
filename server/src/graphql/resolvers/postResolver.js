import { UserInputError } from "apollo-server-express";
import path from "path";
import fs from "fs";

import { Post } from "../../models/post";
import { User } from "../../models/user";
import { checkAuth } from "../../utils/checkAuth";
import { postValidator } from "../../utils/validators";

export const postQueries = {
  getAllPosts: async () => {
    const posts = await Post.find();
    return posts;
  },

  getUserPost: async (_, { username }) => {
    const user = await User.findOne({ username });

    const post = await Post.find({ user: user.id }).sort({ createdAt: -1 });

    return post;
  },

  timeline: async (_, __, context) => {
    const { id } = await checkAuth(context);

    const user = await User.findById(id);
    const userPost = await Post.find({ user: user.id })
      .populate("user")
      .sort({ createdAt: -1 });
    const timelinePost = await Promise.all(
      user.following.map((followId) => {
        return Post.find({ user: followId })
          .populate("user")
          .sort({ createdAt: -1 });
      })
    );

    const timeline = userPost.concat(...timelinePost);

    const sortedTimeline = timeline.sort((a, b) => b.createdAt - a.createdAt);

    return sortedTimeline;
  },
};

export const postMutations = {
  createPost: async (_, { body, file }, context) => {
    const { valid, errors } = postValidator(body);

    if (!valid) {
      throw new UserInputError("Input Errors", { errors });
    }

    const { id } = await checkAuth(context);
    const user = await User.findById(id);

    let uploadedFile = "";

    if (file) {
      const { createReadStream, filename } = await file;
      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../../../public/images/${filename}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      uploadedFile = `http://localhost:5000/images/${filename}`;
    }

    try {
      const post = await new Post({
        body,
        file: uploadedFile,
        user,
      });

      await post.save();

      return post;
    } catch (error) {
      console.log(error);
    }
  },

  deletePost: async (_, { postId }, context) => {
    const { id } = await checkAuth(context);

    const user = await User.findById(id);
    const post = await Post.findById(postId);

    if (!user.id === post.user) {
      throw new Error("Action not allowed");
    }

    await post.delete();
    return "Post has been deleted";
  },

  createComment: async (_, { postId, body }, context) => {
    const { id } = await checkAuth(context);

    const user = await User.findById(id);
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post does not exist");
    }

    post.comments.unshift({
      body,
      username: user.username,
      createdAt: new Date().toISOString(),
    });
    await post.save();

    return post;
  },

  deleteComment: async (_, { postId, commentId }, context) => {
    const { id } = await checkAuth(context);

    const user = await User.findById(id);
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post does not exist");
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (post.comments[commentIndex].username !== user.username) {
      throw new Error("User does not own post");
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    return post;
  },

  likePost: async (_, { postId }, context) => {
    const { id } = await checkAuth(context);

    const user = await User.findById(id);
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post does not exist");
    }

    if (post.likes.find((userLike) => userLike.username === user.username)) {
      post.likes = post.likes.filter((like) => like.username !== user.username);
    } else {
      post.likes.push({
        username: user.username,
        createdAt: new Date().toISOString(),
      });
    }

    await post.save();
    return post;
  },
};
