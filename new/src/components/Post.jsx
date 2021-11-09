import { useMutation } from "@apollo/client";
import { Box, Divider, Flex, HStack, Spacer, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiTrash, FiEdit, FiMoreVertical } from "react-icons/fi";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { format } from "timeago.js";
import { LIKE_POST } from "../config/graphql/mutations";
import { TIMELINE } from "../config/graphql/queries";

const Post = ({
  id,
  body,
  user,
  image,
  createdAt,
  likes,
  likeCount,
  commentCount,
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [LikePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    refetchQueries: [TIMELINE, "Timeline"],
  });

  return (
    <Flex
      bgColor="primary"
      direction="column"
      w="full"
      mb="2"
      p="4"
      rounded="lg">
      <Flex alignItems="center" w="full">
        <HStack>
          <Avatar mr="4" />
          <Box>
            <HStack>
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                {user.firstName} {user.lastName}
              </Text>
              <Text display={{ base: "none", md: "block" }}>
                @{user.username}
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              {format(createdAt)}
            </Text>
          </Box>
        </HStack>
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} icon={<FiMoreVertical />} />
          <MenuList color="secondary">
            <MenuItem icon={<FiTrash />}>Delete Post</MenuItem>
            <MenuItem icon={<FiEdit />}>Edit Post</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Divider my="4" />
      <Text>{body}</Text>
      <Divider my="4" />
      <HStack>
        <Button onClick={LikePost}>
          {liked ? (
            <RiThumbUpFill fontSize="24" />
          ) : (
            <RiThumbUpLine fontSize="24" />
          )}
          <Text ml="2">{likeCount}</Text>
        </Button>
        <Text>Comment {commentCount}</Text>
      </HStack>
    </Flex>
  );
};

export default Post;
