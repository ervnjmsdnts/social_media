import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { REGISTER } from "../config/graphql/mutations";
import { useForm } from "../utils/hooks/useForm";
import CustomInput from "./CustomInput";

const RegisterForm = () => {
  const [Register] = useMutation(REGISTER);
  const toast = useToast();

  const registerCallBack = async () => {
    try {
      const response = await Register({ variables: values });

      if (response && response.data) {
        toast({
          description: "A confirmation email has been sent to your account.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        console.log("User is registered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { onChange, onSubmit, values } = useForm(registerCallBack, {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        label="First Name"
        placeholder="First name"
        name="firstName"
        values={values.firstName}
        onChange={onChange}
      />
      <CustomInput
        label="Last Name"
        placeholder="Last name"
        name="lastName"
        values={values.lastName}
        onChange={onChange}
      />
      <CustomInput
        label="Username"
        placeholder="Username"
        name="username"
        values={values.username}
        onChange={onChange}
      />
      <CustomInput
        label="Email Address"
        placeholder="Email address"
        name="email"
        values={values.email}
        onChange={onChange}
      />
      <CustomInput
        label="Password"
        placeholder="********"
        type="password"
        name="password"
        values={values.password}
        onChange={onChange}
      />
      <CustomInput
        label="Confirm Password"
        placeholder="********"
        type="password"
        name="confirmPassword"
        values={values.confirmPassword}
        onChange={onChange}
      />
      <Button
        w="full"
        colorScheme="primary"
        variant="outline"
        size="lg"
        type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
