import Button from "../Button";
import Input from "../Input";

const Register = () => {
  return (
    <div className="bg-secondary w-full rounded-3xl flex flex-col items-center">
      <h2 className="text-primary text-4xl font-bold my-8">Register</h2>
      <div className="w-full overflow-y-scroll max-h-[400px] md:h-auto md:max-h-full md:overflow-hidden">
        <div className="m-8">
          <Input type="text" label="First Name:" />
          <Input type="text" label="Last Name:" />
          <Input type="text" label="Username" />
          <Input type="text" label="Email Address" />
          <Input type="password" label="Password:" />
          <Input type="password" label="Confirm Password:" />
        </div>
      </div>
      <Button className="bg-primary text-secondary text-2xl w-[150px]">
        Enter
      </Button>
    </div>
  );
};

export default Register;
