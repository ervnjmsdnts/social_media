import Button from "../Button";
import Input from "../Input";

const Register = () => {
  return (
    <div className="register-container">
      <h2 className="auth-form-header">Register</h2>
      <div className="register-input-container">
        <div className="m-8">
          <Input type="text" label="First Name:" className="p-2" />
          <Input type="text" label="Last Name:" className="p-2" />
          <Input type="text" label="Username" className="p-2" />
          <Input type="text" label="Email Address" className="p-2" />
          <Input type="password" label="Password:" className="p-2" />
          <Input type="password" label="Confirm Password:" className="p-2" />
        </div>
      </div>
      <Button className="bg-primary text-secondary text-2xl w-[150px]">
        Enter
      </Button>
    </div>
  );
};

export default Register;
