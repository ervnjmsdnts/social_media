import { useQuery } from "@apollo/client";

import CreatePost from "./CreatePost";
import Post from "./Post";
import { TIMELINE } from "../config/graphql/queries";

const Feed = () => {
  const { data } = useQuery(TIMELINE);

  return (
    <div className="flex flex-col items-center w-full">
      <CreatePost />
      {data?.timeline.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          body={post.body}
          user={post.user}
          likeCount={post.likes.length}
          commentCount={post.comments.length}
          createdAt={post.createdAt}
          likes={post.likes}
        />
      ))}
    </div>
  );
};

export default Feed;
