import { Flex } from "@chakra-ui/layout";
import CreatePost from "./CreatePost";

const NewsFeed = () => {
  return (
    <Flex alignItems="center" direction="column" maxW="container.lg" w="full">
      <CreatePost />
    </Flex>
  );
};

export default NewsFeed;
