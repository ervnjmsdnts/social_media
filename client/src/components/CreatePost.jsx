import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { FaPhotoVideo } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks/useForm";
import { GET_USER_POST, TIMELINE } from "../config/graphql/queries";
import { CREATE_POST } from "../config/graphql/mutations";
import { useState } from "react";

const CreatePost = () => {
  const [file, setFile] = useState("");
  const [CreatePost] = useMutation(CREATE_POST);

  const createPostCallBack = async () => {
    try {
      await CreatePost({
        variables: { ...values, file: file !== "" ? file : null },
        refetchQueries: [TIMELINE, GET_USER_POST],
      });
      setFile("");
    } catch (error) {
      console.log(error);
    }
  };

  const { onChange, onSubmit, values } = useForm(createPostCallBack, {
    body: "",
  });

  return (
    <Flex
      mb="4"
      bgColor="primary"
      justifyContent="center"
      direction="column"
      as="form"
      onSubmit={onSubmit}
      w="full"
      p="4"
      rounded="lg">
      <Flex alignItems="center" w="full">
        <Input
          size="md"
          borderColor="secondary"
          mr="2"
          placeholder="What are you thinking about?"
          name="body"
          value={values.body}
          onChange={onChange}
        />
        <Button type="submit">Send</Button>
      </Flex>
      <Divider my="4" />
      <Flex w="full">
        <Button
          position="relative"
          p="2"
          mx="4"
          w="full"
          justifyContent="center"
          borderRadius="lg"
          role="group"
          _hover={{
            bg: "secondary",
            color: "primary",
          }}>
          <Box mr="4">
            <Icon as={FaPhotoVideo} w="8" h="8" />
          </Box>
          <Text fontSize="lg">{file ? file.name : "Upload Photo/Video"}</Text>
          <Input
            position="absolute"
            _hover={{ bgColor: "transparent" }}
            opacity="0"
            cursor="pointer"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreatePost;
