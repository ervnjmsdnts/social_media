import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/layout";

import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import SideBar from "../components/SideBar";
import { TIMELINE } from "../config/graphql/queries";

const NewsFeed = () => {
  const { data } = useQuery(TIMELINE, { fetchPolicy: "network-only" });

  return (
    <SideBar>
      <Flex alignItems="center" direction="column" maxW="container.lg" w="full">
        <CreatePost />
        {data?.timeline.map((post) => {
          const { id, body, user, createdAt, likes, comments } = post;
          return (
            <Post
              key={id}
              id={id}
              body={body}
              postUser={user}
              createdAt={createdAt}
              likes={likes}
              comments={comments}
              likeCount={likes.length}
              commentCount={comments.length}
            />
          );
        })}
      </Flex>
    </SideBar>
  );
};

export default NewsFeed;
