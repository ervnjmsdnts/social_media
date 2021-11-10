import { Button } from "@chakra-ui/button";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const Confirmation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/confirmation/${token}`
        );
        setIsValidToken(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, [token]);

  const onClick = () => navigate("/auth", { replace: true });

  return (
    <VStack
      spacing="10"
      justifyContent="center"
      alignItems="center"
      w="full"
      h="100vh">
      <Heading textAlign="center">
        {isValidToken
          ? "Your Email Address is Invalid"
          : "Your Email Address has been Confirmed"}
      </Heading>
      <Button onClick={onClick}>
        <FiArrowLeftCircle fontSize="24" />
        <Text ml="2">Go Back</Text>
      </Button>
    </VStack>
  );
};

export default Confirmation;
