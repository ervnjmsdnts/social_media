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
import { useState } from "react";
import { FiTrash, FiEdit, FiMoreVertical } from "react-icons/fi";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";

const Post = () => {
  const [isLike, setIsLike] = useState(false);
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
                Earvin James Dantes
              </Text>
              <Text display={{ base: "none", md: "block" }}>@Oduum</Text>
            </HStack>
            <Text fontSize="sm" fontWeight="semibold" color="gray.500">
              1hr ago
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
      <Text>Hello I am text</Text>
      <Divider my="4" />
      <HStack>
        <Button>
          {isLike ? (
            <RiThumbUpFill fontSize="24" />
          ) : (
            <RiThumbUpLine fontSize="24" />
          )}
          <Text ml="2">0</Text>
        </Button>
        <Text>Comment 0</Text>
      </HStack>
    </Flex>
  );
};

export default Post;
