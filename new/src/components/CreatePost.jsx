import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/layout";
import { FaCamera, FaVideo } from "react-icons/fa";

const CreatePost = () => {
  return (
    <Flex
      mb="4"
      bgColor="primary"
      justifyContent="center"
      direction="column"
      w="full"
      p="4"
      rounded="lg">
      <Flex alignItems="center" w="full">
        <Avatar
          size="md"
          mr="4"
          src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        />
        <Input
          size="md"
          borderColor="secondary"
          mr="2"
          placeholder="What are you thinking about?"
        />
        <Button>Send</Button>
      </Flex>
      <Divider my="4" />
      <Grid templateColumns="repeat(2, 1fr)">
        <FileButton icons={FaCamera}>Photo</FileButton>
        <FileButton icons={FaVideo}>Video</FileButton>
      </Grid>
    </Flex>
  );
};

const FileButton = ({ icons, children, ...rest }) => {
  return (
    <Flex
      p="2"
      mx="4"
      justifyContent="center"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "secondary",
        color: "primary",
      }}
      {...rest}>
      <Box mr="4">
        <Icon as={icons} w="6" h="6" />
      </Box>
      <Text fontSize="lg">{children}</Text>
    </Flex>
  );
};

export default CreatePost;
