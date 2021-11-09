import { Button } from "@chakra-ui/button";
import { useForm } from "../utils/hooks/useForm";
import CustomInput from "./CustomInput";

const RegisterForm = () => {
  const registerCallBack = () => {
    console.log("Hello");
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
