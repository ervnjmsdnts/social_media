import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";

const Confirmation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      const response = await axios.get(
        `http://localhost:5000/confirmation/${token}`
      );
      setIsValidToken(response.data);
    };
    getToken();
  }, [token]);

  const handleClick = () => {
    navigate("/auth", { replace: true });
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-primary">
      <h1 className="text-secondary text-4xl text-center md:text-7xl font-semibold">
        Your Email Address has been Confirmed
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
