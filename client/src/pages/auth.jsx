import { useState } from "react";
import Button from "../components/Button";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col md:flex-row flex-1 bg-primary h-screen">
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
              className={`text-primary text-3xl w-[200px] md:w-[300px] md:mb-8 m-2 md:m-0 ${
                isLogin ? "bg-white" : "bg-secondary"
              }`}
              onClick={() => setIsLogin(true)}>
              Login
            </Button>
            <Button
              className={`text-primary text-3xl w-[200px] md:w-[300px] ${
                isLogin ? "bg-secondary" : "bg-white"
              }`}
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
