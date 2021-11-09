import { Flex } from "@chakra-ui/layout";
import CreatePost from "./CreatePost";
import Post from "./Post";

const NewsFeed = () => {
  return (
    <Flex alignItems="center" direction="column" maxW="container.lg" w="full">
      <CreatePost />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Flex>
  );
};

export default NewsFeed;
