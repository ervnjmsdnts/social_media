import CreatePost from "./CreatePost";
import Post from "./Post";

const Feed = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <CreatePost />
      <Post image="This is an image" />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
