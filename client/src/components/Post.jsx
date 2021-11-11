import { useMutation } from "@apollo/client";
import {
  Box,
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
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiTrash, FiEdit, FiMoreVertical } from "react-icons/fi";
import { AiOutlineComment } from "react-icons/ai";
import { MdOutlineThumbUpOffAlt, MdThumbUpAlt } from "react-icons/md";
import { format } from "timeago.js";
import { CREATE_COMMENT, LIKE_POST } from "../config/graphql/mutations";
import { TIMELINE } from "../config/graphql/queries";
import ProfileLink from "./ProfileLink";
import { useForm } from "../utils/hooks/useForm";

const Comment = ({ postId, comment }) => {
  return (
    <VStack mb="4" alignItems="start" spacing="0">
      <HStack w="full">
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
        refetchQueries: [TIMELINE, "Timeline"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { onSubmit, onChange, values } = useForm(commentCallBack, { body: "" });
  return (
    <HStack as="form" onSubmit={onSubmit}>
      <Avatar size="sm" />
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
  user,
  image,
  createdAt,
  likes,
  comments,
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
          <ProfileLink>
            <Avatar />
          </ProfileLink>
          <Box>
            <HStack>
              <ProfileLink
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md" }}>
                {user.firstName} {user.lastName}
              </ProfileLink>
              <ProfileLink display={{ base: "none", md: "block" }}>
                @{user.username}
              </ProfileLink>
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
