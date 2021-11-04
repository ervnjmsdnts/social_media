import Button from "../../components/button";
import Input from "../../components/input";

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="auth-form-header">Log In</h2>
      <div className="w-full">
        <Input type="text" label="Username:" className="p-2" />
        <Input type="password" label="Password:" className="p-2" />
      </div>
      <Button className="bg-primary text-secondary text-2xl w-[150px] mt-4">
        Enter
      </Button>
    </div>
  );
};

export default Login;
