import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/layout";

import CreatePost from "./CreatePost";
import Post from "./Post";
import { TIMELINE } from "../config/graphql/queries";

const NewsFeed = () => {
  const { data } = useQuery(TIMELINE, { fetchPolicy: "network-only" });

  return (
    <Flex alignItems="center" direction="column" maxW="container.lg" w="full">
      <CreatePost />
      {data?.timeline.map((post) => {
        const { id, body, user, createdAt, likes, comments } = post;
        return (
          <Post
            key={id}
            id={id}
            body={body}
            user={user}
            createdAt={createdAt}
            likes={likes}
            likeCount={likes.length}
            commentCount={comments.length}
          />
        );
      })}
    </Flex>
  );
};

export default NewsFeed;
