import CreatePost from "./CreatePost";
import Post from "./Post";

const Feed = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <CreatePost />
      <Post image="This is an image" likeCount={410} commentCount={512} />
      <Post likeCount={21} commentCount={3} />
      <Post likeCount={0} commentCount={0} />
      <Post likeCount={0} commentCount={0} />
      <Post likeCount={0} commentCount={0} />
      <Post likeCount={0} commentCount={0} />
      <Post likeCount={0} commentCount={0} />
      <Post likeCount={0} commentCount={0} />
      <Post likeCount={0} commentCount={0} />
    </div>
  );
};

export default Feed;
