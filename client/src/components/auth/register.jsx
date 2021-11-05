import { useState } from "react";
import Button from "../Button";
import Input from "../Input";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form is submitting");
    console.log(
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    );
  };

  return (
    <form
      className="bg-secondary w-full rounded-3xl flex flex-col items-center"
      onSubmit={handleSubmit}>
      <h2 className="text-primary text-4xl font-bold my-8">Register</h2>
      <div className="w-full overflow-y-scroll max-h-[400px] md:h-auto md:max-h-full md:overflow-hidden">
        <div className="m-8">
          <Input
            type="text"
            label="First Name:"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            label="Last Name:"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="text"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            label="Confirm Password:"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
