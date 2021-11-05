import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Confirmation = () => {
  const { token } = useParams();
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

  return <div>{isValidToken ? "Email is confirmed" : "Email is invalid"}</div>;
};

export default Confirmation;
