import { useState } from "react";
import Button from "../components/Button";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="auth-container">
      {/* Title */}
      <div className="auth-title-wrapper">
        <div>
          <div className="auth-header-container">
            <h1 className="auth-header">Social Media App</h1>
          </div>
          <div className="auth-button-container">
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
      <div className="auth-form-container">
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;
