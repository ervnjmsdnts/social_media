import { useMutation } from "@apollo/client";

import Button from "../Button";
import Input from "../Input";
import { REGISTER } from "../../config/graphql/mutations";
import { useForm } from "../../utils/hooks/useForm";

const Register = () => {
  const [Register] = useMutation(REGISTER);

  const registerCallBack = async () => {
    try {
      const response = await Register({ variables: values });

      if (response && response.data) {
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
    <form
      className="bg-secondary w-full rounded-3xl flex flex-col items-center"
      onSubmit={onSubmit}>
      <h2 className="text-primary text-4xl font-bold my-8">Register</h2>
      <div className="w-full overflow-y-scroll max-h-[400px] md:h-auto md:max-h-full md:overflow-hidden">
        <div className="m-8 flex flex-col">
          <Input
            type="text"
            label="First Name:"
            name="firstName"
            value={values.firstName}
            onChange={onChange}
          />
          <Input
            type="text"
            label="Last Name:"
            name="lastName"
            value={values.lastName}
            onChange={onChange}
          />
          <Input
            type="text"
            label="Username"
            name="username"
            value={values.username}
            onChange={onChange}
          />
          <Input
            type="text"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={onChange}
          />
          <Input
            type="password"
            label="Password:"
            name="password"
            value={values.password}
            onChange={onChange}
          />
          <Input
            type="password"
            label="Confirm Password:"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={onChange}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="bg-primary text-secondary text-2xl w-[150px]">
        Enter
      </Button>
    </form>
  );
};

export default Register;
