import { Post } from "../../models/post";
import { User } from "../../models/user";
import { checkAuth } from "../../utils/checkAuth";

export const postQueries = {
  // TODO Get post from specific user
  getAllPosts: async () => {
    const posts = await Post.find();
    return posts;
  },

  getPost: async (_, { postId }) => {
    const post = await Post.findById(postId);
    return post;
  },

  timeline: async (_, __, context) => {
    const { userId } = checkAuth(context);

    const user = await User.findById(userId);
    const userPost = await Post.find({ user: user.id });
    const timelinePost = await Promise.all(
      user.following.map((followId) => {
        return Post.find({ user: followId });
      })
    );

    return userPost.concat(...timelinePost);
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

  createComment: async (_, { postId, body }, context) => {
    const { userId } = checkAuth(context);

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post does not exist");
    }

    post.comments.unshift({
      body,
      username: user.username,
      createdAt: new Date(),
    });
    await post.save();

    return post;
  },

  deleteComment: async (_, { postId, commentId }, context) => {
    const { userId } = checkAuth(context);

    const user = await User.findById(userId);
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
    const { userId } = checkAuth(context);

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post does not exist");
    }

    if (post.likes.find((userLike) => userLike.username === user.username)) {
      post.likes = post.likes.filter((like) => like.username !== user.username);
    } else {
      post.likes.push({
        username: user.username,
        createdAt: new Date(),
      });
    }

    await post.save();
    return post;
  },
};
