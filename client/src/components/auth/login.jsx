import { useMutation } from "@apollo/client";

import Button from "../Button";
import Input from "../Input";
import { LOGIN } from "../../config/graphql/mutations";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../utils/hooks/useForm";
import { useAuth } from "../../context/authContext";
import Error from "../Error";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [Login, { error }] = useMutation(LOGIN);

  const loginCallBack = async () => {
    try {
      await Login({
        variables: values,
      });

      login();

      navigate("/", { replace: true });
    } catch {}
  };

  const { onChange, onSubmit, values, errors } = useForm(
    loginCallBack,
    {
      username: "",
      password: "",
    },
    error
  );

  return (
    <form
      className="bg-secondary md:h-full w-full rounded-3xl flex flex-col items-center"
      onSubmit={onSubmit}>
      <h2 className="text-primary text-4xl font-bold my-8">Log In</h2>
      <div className="w-full">
        <div className="m-8 flex flex-col">
          <Input
            type="text"
            label="Username:"
            name="username"
            value={values.username}
            onChange={onChange}
          />
          <Input
            type="password"
            label="Password:"
            name="password"
            error
            value={values.password}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <Button
            type="submit"
            className="bg-primary text-secondary text-2xl w-[150px] mt-4">
            Enter
          </Button>
          <Error errors={errors} />
        </div>
      </div>
    </form>
  );
};

export default Login;
