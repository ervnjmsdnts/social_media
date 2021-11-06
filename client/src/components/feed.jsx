import CreatePost from "./CreatePost";
import Post from "./Post";
import { TIMELINE } from "../config/graphql/queries";
import { useQuery } from "@apollo/client";

const Feed = () => {
  const { data } = useQuery(TIMELINE, { fetchPolicy: "network-only" });

  return (
    <div className="flex flex-col items-center w-full">
      <CreatePost />
      {data?.timeline.map((post) => (
        <Post
          key={post.id}
          body={post.body}
          user={post.user}
          likeCount={post.likes.length}
          commentCount={post.comments.length}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};

export default Feed;
