import Button from "../../components/button";
import Input from "../../components/input";

const Register = () => {
  return (
    <div className="bg-secondary w-full rounded-3xl flex flex-col items-center">
      <h2 className="text-primary text-4xl font-bold my-8">Register</h2>
      <div className="w-full overflow-y-scroll max-h-[400px] md:h-auto md:max-h-full md:overflow-hidden">
        <Input type="text" label="First Name:" className="p-2" />
        <Input type="text" label="Last Name:" className="p-2" />
        <Input type="text" label="Username" className="p-2" />
        <Input type="text" label="Email Address" className="p-2" />
        <Input type="password" label="Password:" className="p-2" />
        <Input type="password" label="Confirm Password:" className="p-2" />
      </div>
      <Button className="bg-primary text-secondary text-2xl w-[150px]">
        Enter
      </Button>
    </div>
  );
};

export default Register;
