import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Text, VStack } from "@chakra-ui/layout";
import CustomInput from "../components/CustomInput";
import SideBar from "../components/SideBar";

const Messages = () => {
  return (
    <SideBar>
      <Flex h="91.3vh" w="full">
        <VStack
          bgColor="secondary"
          color="primary"
          alignItems="start"
          borderRight="1px"
          overflowY="auto"
          borderColor="primary"
          p="2"
          w="35%">
          <CustomInput placeholder="Search for messages" />
          <Divider />
          <MessageUserItem />
        </VStack>
        <Flex direction="column" p="2" w="full">
          <VStack flexGrow="1" overflowY="auto">
            <ReceiverMessage />
            <SenderMessage />
          </VStack>
          <WriteMessage />
        </Flex>
      </Flex>
    </SideBar>
  );
};

const MessageUserItem = () => {
  return (
    <Box p="2" w="full">
      <Flex>
        <Avatar />
        <Box ml="2" display={{ base: "none", md: "block" }}>
          <Text>Earvin James Dantes</Text>
          <Text>@Oduum</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const WriteMessage = () => {
  return (
    <Flex w="full" justifyContent="center" alignItems="center" mt="2">
      <Input
        bgColor="white"
        color="primary"
        p="2"
        mr="2"
        _placeholder={{ color: "gray.500" }}
        placeholder="Write a message"
      />
      <Button bgColor="primary" _hover={{ bgColor: "" }} color="secondary">
        Send
      </Button>
    </Flex>
  );
};

const SenderMessage = () => {
  return (
    <Box w="full">
      <Flex justifyContent="flex-end">
        <Box maxW="50%" p="2" bgColor="white" color="primary" rounded="2xl">
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Praesentium explicabo fugiat nobis ipsa, architecto exercitationem!
            Qui, fugit distinctio nihil iure est animi rerum in maxime, deleniti
            at harum eveniet officiis eaque asperiores, perspiciatis odit
            explicabo alias corrupti ratione suscipit modi natus facilis. Sed
            repudiandae alias aperiam reiciendis temporibus, delectus sunt.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const ReceiverMessage = () => {
  return (
    <Box w="full">
      <Flex alignItems="center">
        <Avatar />
        <Box ml="2" maxW="50%" bgColor="primary" p="2" rounded="2xl">
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus soluta a et in beatae non? At accusamus optio cum iste!
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Messages;
