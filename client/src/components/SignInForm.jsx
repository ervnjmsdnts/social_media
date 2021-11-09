import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "../utils/hooks/useForm";
import { useMutation } from "@apollo/client";

import CustomInput from "./CustomInput";
import { LOGIN } from "../config/graphql/mutations";
import { useAuth } from "../context/authContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [Login] = useMutation(LOGIN);

  const signInCallBack = async () => {
    try {
      await Login({ variables: values });
      login();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const { onSubmit, onChange, values } = useForm(signInCallBack, {
    username: "",
    password: "",
  });

  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        label="Username"
        placeholder="Username"
        name="username"
        values={values.username}
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
      <Button
        w="full"
        colorScheme="primary"
        variant="outline"
        size="lg"
        type="submit">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
