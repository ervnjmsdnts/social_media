import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { LOGIN } from "../../config/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [Login] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Login({ variables: { username, password } });

      if (response && response.data) {
        localStorage.setItem("accessToken", response.data.login.token);
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="bg-secondary md:h-full w-full rounded-3xl flex flex-col items-center"
      onSubmit={handleSubmit}>
      <h2 className="text-primary text-4xl font-bold my-8">Log In</h2>
      <div className="w-full">
        <div className="m-8">
          <Input
            type="text"
            label="Username:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            label="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
