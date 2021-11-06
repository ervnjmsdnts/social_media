import { useMutation } from "@apollo/client";

import Button from "../Button";
import Input from "../Input";
import { LOGIN } from "../../config/graphql/mutations";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../utils/hooks/useForm";

const Login = () => {
  const navigate = useNavigate();

  const [Login] = useMutation(LOGIN);

  const loginCallBack = async () => {
    try {
      const response = await Login({
        variables: values,
      });

      if (response && response.data) {
        localStorage.setItem("accessToken", response.data.login.token);
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const { onChange, onSubmit, values } = useForm(loginCallBack, {
    username: "",
    password: "",
  });

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
            value={values.password}
            onChange={onChange}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="bg-primary text-secondary text-2xl w-[150px] mt-4">
        Enter
      </Button>
    </form>
  );
};

export default Login;
