import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";

const Confirmation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/confirmation/${token}`
        );
        setIsValidToken(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, [token]);

  const handleClick = () => {
    navigate("/auth", { replace: true });
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-primary">
      <h1 className="text-secondary text-4xl text-center md:text-7xl font-semibold">
        {isValidToken
          ? "Your Email Address has been Confirmed"
          : "Email Address is Invalid"}
      </h1>
      <Button
        className="text-primary bg-secondary mt-8 text-3xl w-[300px]"
        onClick={handleClick}>
        Go Back
      </Button>
    </div>
  );
};

export default Confirmation;
