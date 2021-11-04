import Button from "../button";
import Input from "../input";

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="auth-form-header">Log In</h2>
      <div className="w-full">
        <div className="m-8">
          <Input type="text" label="Username:" />
          <Input type="password" label="Password:" />
        </div>
      </div>
      <Button className="bg-primary text-secondary text-2xl w-[150px] mt-4">
        Enter
      </Button>
    </div>
  );
};

export default Login;
