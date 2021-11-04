import Button from "../../components/button";
import Input from "../../components/input";

const Login = () => {
  return (
    <div className="bg-secondary md:h-full w-full rounded-3xl flex flex-col items-center">
      <h2 className="text-primary text-4xl font-bold my-8">Log In</h2>
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
