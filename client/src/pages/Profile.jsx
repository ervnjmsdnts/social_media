import { Avatar } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FiUserPlus, FiUserX } from "react-icons/fi";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import Icon from "@chakra-ui/icon";

import CreatePost from "../components/CreatePost";
import SideBar from "../components/SideBar";
import Post from "../components/Post";
import { GET_USER, GET_USER_POST } from "../config/graphql/queries";
import { useAuth } from "../context/authContext";
import { ADD_FOLLOW, DELETE_FOLLOW } from "../config/graphql/mutations";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [followed, setFollowed] = useState(false);
  const { user: currentUser } = useAuth();
  const { username } = useParams();

  const { data: user, loading: getUserLoading } = useQuery(GET_USER, {
    variables: { username },
    fetchPolicy: "network-only",
  });

  const { data: usersPost } = useQuery(GET_USER_POST, {
    variables: { username },
  });

  const [AddFollow, { loading: addFollowLoading }] = useMutation(ADD_FOLLOW, {
    variables: { followId: profile.id },
    refetchQueries: [GET_USER],
  });

  const [DeleteFollow, { loading: deleteFollowLoading }] = useMutation(
    DELETE_FOLLOW,
    {
      variables: { followId: profile.id },
      refetchQueries: [GET_USER],
    }
  );

  useEffect(() => {
    if (user) {
      setProfile(user.getUser);
    }
  }, [user]);

  useEffect(() => {
    if (
      currentUser &&
      profile.follower?.find((userId) => userId === currentUser.userId)
    ) {
      setFollowed(true);
    } else setFollowed(false);
  }, [currentUser, profile]);

  if (getUserLoading) return null;

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
            {currentUser.username !== profile.username && (
              <Tooltip
                placement="right"
                label={followed ? "Unfollow User" : "Follow User"}
                color="secondary"
                bgColor="primary">
                <Button
                  onClick={followed ? DeleteFollow : AddFollow}
                  position="absolute"
                  isLoading={
                    addFollowLoading || deleteFollowLoading ? true : false
                  }
                  _hover={{ bgColor: followed ? "red.400" : "green.400" }}
                  justifyContent="center"
                  alignItems="center"
                  bottom="0"
                  right="0"
                  bgColor={followed ? "red.200" : "green.200"}
                  border="2px"
                  borderColor="primary"
                  w="10"
                  h="10"
                  rounded="full">
                  <Icon fontSize="2xl" as={followed ? FiUserX : FiUserPlus} />
                </Button>
              </Tooltip>
            )}
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
