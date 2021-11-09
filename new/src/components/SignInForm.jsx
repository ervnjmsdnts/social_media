import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "../utils/hooks/useForm";
import CustomInput from "./CustomInput";

const SignInForm = () => {
  const navigate = useNavigate();
  const signInCallBack = () => {
    navigate("/", { replace: true });
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
