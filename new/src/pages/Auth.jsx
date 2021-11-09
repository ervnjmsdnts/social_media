import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Spacer, Stack } from "@chakra-ui/layout";
import { useState } from "react";
import SignInForm from "../components/SignInForm";
import RegisterForm from "../components/RegisterForm";

const Auth = () => {
  const [form, setForm] = useState(false);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      h={{ base: "auto", md: "100vh" }}>
      <Flex
        maxW="1/2"
        w="full"
        p="16"
        justifyContent="center"
        alignItems="center"
        direction="column">
        <Heading as="h1" size="3xl" mb="12" textAlign={{ base: "center" }}>
          Social Media Application
        </Heading>
        <Stack
          direction={{ base: "row", md: "column" }}
          justifyContent="center"
          spacing="4"
          w="full">
          <Button size="lg" fontSize="2xl" onClick={() => setForm(false)}>
            Sign in
          </Button>
          <Button size="lg" fontSize="2xl" onClick={() => setForm(true)}>
            Register
          </Button>
        </Stack>
      </Flex>
      <Spacer />
      <Box p={{ base: "8", md: "16" }} w="full">
        <Flex
          direction="column"
          bgColor="secondary"
          color="primary"
          p="8"
          h="full"
          rounded="lg">
          <Box textAlign="center">
            <Heading>{form ? "Register" : "Sign in"}</Heading>
          </Box>
          <Box>{form ? <RegisterForm /> : <SignInForm />}</Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Auth;
