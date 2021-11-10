import { Link } from "@chakra-ui/layout";
import { Link as RouteLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProfileLink = ({ children }) => {
  const { user } = useAuth();

  return (
    <Link as={RouteLink} to={`/profile/${user.userId}`}>
      {children}
    </Link>
  );
};

export default ProfileLink;
