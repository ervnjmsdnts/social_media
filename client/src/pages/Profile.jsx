import { Avatar } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Icon from "@chakra-ui/icon";
import { AiOutlinePlus } from "react-icons/ai";

import CreatePost from "../components/CreatePost";
import SideBar from "../components/SideBar";
import { GET_USER, GET_USER_POST } from "../config/graphql/queries";
import Post from "../components/Post";
import { useAuth } from "../context/authContext";
import { ADD_FOLLOW } from "../config/graphql/mutations";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { user: currentUser } = useAuth();
  const { username } = useParams();

  const { data: user } = useQuery(GET_USER, { variables: { username } });

  const [AddFollow] = useMutation(ADD_FOLLOW, {
    variables: { followId: profile.id },
  });

  useEffect(() => {
    if (user) {
      setProfile(user.getUser);
    }
  }, [user]);

  const { data: usersPost } = useQuery(GET_USER_POST, {
    variables: { username },
  });

  return (
    <SideBar>
      <Flex direction="column" alignItems="center" maxW="container.lg" w="full">
        <Flex
          position="relative"
          w="full"
          justifyContent="center"
          bgColor="primary"
          rounded="lg"
          h="xs">
          <Avatar
            position="absolute"
            bottom="-16"
            size="2xl"
            showBorder
            borderColor="primary">
            <Flex
              as="button"
              onClick={AddFollow}
              position="absolute"
              justifyContent="center"
              alignItems="center"
              bottom="0"
              right="0"
              bgColor="white"
              border="2px"
              borderColor="primary"
              w="10"
              h="10"
              rounded="full">
              <Icon fontSize="2xl" as={AiOutlinePlus} />
            </Flex>
          </Avatar>
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          mt="16"
          color="primary"
          mb="4">
          <Text fontSize="2xl" fontWeight="bold">
            {profile.firstName} {profile.lastName}
          </Text>
          <Text fontSize="lg" fontWeight="semibold">
            @{profile.username}
          </Text>
        </Flex>
        {currentUser.username === profile.username && <CreatePost />}
        {usersPost?.getUserPost.map((userPost) => {
          const { id, body, createdAt, likes, comments } = userPost;
          return (
            <Post
              key={id}
              id={id}
              body={body}
              postUser={profile}
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

export default Profile;
