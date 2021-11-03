import { Post } from "../../models/post";
import { User } from "../../models/user";
import { checkAuth } from "../../utils/checkAuth";

export const postQueries = {
  getAllPosts: async () => {
    const posts = await Post.find();
    return posts;
  },

  getPost: async (_, { postId }) => {
    const post = await Post.findById(postId);
    return post;
  },
};

export const postMutations = {
  createPost: async (_, { body }, context) => {
    const { userId } = checkAuth(context);
    const user = await User.findById(userId);

    try {
      const post = await new Post({
        body,
        user: user.id,
      });

      await post.save();

      return post;
    } catch (error) {
      console.log(error);
    }
  },

  deletePost: async (_, { postId }, context) => {
    const { userId } = checkAuth(context);

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user.id === post.user) {
      throw new Error("Action not allowed");
    }

    await post.delete();
    return "Post has been deleted";
  },
};
