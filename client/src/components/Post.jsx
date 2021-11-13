import { useMutation } from "@apollo/client";
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Avatar,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Image,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiTrash, FiMoreVertical } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";
import { MdOutlineThumbUpOffAlt, MdThumbUpAlt } from "react-icons/md";
import { format } from "timeago.js";

import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  LIKE_POST,
} from "../config/graphql/mutations";
import { GET_USER_POST, TIMELINE } from "../config/graphql/queries";
import ProfileLink from "./ProfileLink";
import { useForm } from "../utils/hooks/useForm";
import { useAuth } from "../context/authContext";

const Comment = ({ postId, comment }) => {
  const { user: currentUser } = useAuth();
  const [DeleteComment] = useMutation(DELETE_COMMENT, {
    variables: { postId, commentId: comment.id },
    refetchQueries: [TIMELINE, GET_USER_POST],
  });

  return (
    <VStack mb="4" alignItems="start" spacing="0">
      <HStack w="full" role="group">
        <Avatar size="sm" />
        <Box
          w="auto"
          maxW="full"
          bgColor="whiteAlpha.200"
          p="2"
          color="secondary"
          rounded="md">
          <Text>{comment.body}</Text>
        </Box>
        {currentUser.username === comment.username && (
          <IconButton
            onClick={DeleteComment}
            size="sm"
            display="none"
            _groupHover={{ display: "flex" }}
            icon={<FiTrash />}
          />
        )}
      </HStack>
      <Text fontSize="sm" color="gray.500" pl="10">
        {format(comment.createdAt)}
      </Text>
    </VStack>
  );
};

const CommentInput = ({ postId }) => {
  const [CreateComment] = useMutation(CREATE_COMMENT);
  const commentCallBack = async () => {
    try {
      await CreateComment({
        variables: { postId, body: values.body },
        refetchQueries: [TIMELINE, GET_USER_POST],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { onSubmit, onChange, values } = useForm(commentCallBack, { body: "" });
  return (
    <HStack as="form" onSubmit={onSubmit}>
      <Input
        placeholder="Write a comment"
        name="body"
        value={values.body}
        onChange={onChange}
        size="sm"
        rounded="md"
      />
      <Button size="sm" type="submit">
        Send
      </Button>
    </HStack>
  );
};

const Post = ({
  id,
  body,
  postUser,
  image,
  createdAt,
  likes,
  comments,
  likeCount,
  commentCount,
}) => {
  const [liked, setLiked] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (
      currentUser &&
      likes.find((like) => like.username === currentUser.username)
    ) {
      setLiked(true);
    } else setLiked(false);
  }, [currentUser, likes]);

  const [DeletePost] = useMutation(DELETE_POST, {
    variables: { postId: id },
    refetchQueries: [TIMELINE, GET_USER_POST],
  });

  const [LikePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    refetchQueries: [TIMELINE, GET_USER_POST],
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
          <ProfileLink username={postUser.username}>
            <Avatar src={postUser.profilePhoto} />
          </ProfileLink>
          <Box>
            <HStack>
              <ProfileLink
                username={postUser.username}
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md" }}>
                {postUser.firstName} {postUser.lastName}
              </ProfileLink>
              <ProfileLink
                username={postUser.username}
                display={{ base: "none", md: "block" }}>
                @{postUser.username}
              </ProfileLink>
            </HStack>
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              {format(createdAt)}
            </Text>
          </Box>
        </HStack>
        <Spacer />
        {currentUser.username === postUser.username && (
          <Menu>
            <MenuButton as={IconButton} icon={<FiMoreVertical />} />
            <MenuList color="secondary">
              <MenuItem onClick={DeletePost} icon={<FiTrash />}>
                Delete Post
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Divider my="4" />
      <Box px="4">
        <Text mb="2">{body}</Text>
        <Center>
          {image && (
            <Image boxSize="fit-content" maxH="2xl" maxW="2xl" src={image} />
          )}
        </Center>
      </Box>
      <Divider my="4" />
      <HStack>
        <Button onClick={LikePost}>
          {liked ? (
            <MdThumbUpAlt fontSize="24" />
          ) : (
            <MdOutlineThumbUpOffAlt fontSize="24" />
          )}
          <Text ml="2">{likeCount}</Text>
        </Button>
        <Button>
          <AiOutlineComment fontSize="24" />
          <Text ml="2">{commentCount}</Text>
        </Button>
      </HStack>
      <Divider my="4" />
      {comments.map((comment) => (
        <Comment key={comment.id} postId={id} comment={comment} />
      ))}
      <CommentInput postId={id} />
    </Flex>
  );
};

export default Post;
