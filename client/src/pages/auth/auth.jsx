import { useState } from "react";
import Button from "../../components/button";
import Login from "./login";
import Register from "./register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col flex-1 md:flex-row bg-primary h-screen">
      {/* Title */}
      <div className="flex flex-col md:flex-grow md:justify-center items-center">
        <div>
          <div className="w-[400px] md:w-[700px] mt-4 md:mt-0">
            <h1 className="text-6xl md:text-8xl mb-24 text-secondary text-center md:text-left">
              Social Media App
            </h1>
          </div>
          <div className="md:ml-8 flex md:flex-col items-center justify-center md:items-start">
            <Button
              className="bg-white text-primary text-3xl w-[200px] md:w-[300px] md:mb-8 m-2 md:m-0"
              onClick={() => setIsLogin(true)}>
              Login
            </Button>
            <Button
              className="bg-secondary text-primary text-3xl w-[200px] md:w-[300px]"
              onClick={() => setIsLogin(false)}>
              Register
            </Button>
          </div>
        </div>
      </div>
      {/* Form */}
      <div className="flex flex-[2] m-4 md:m-8">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;
