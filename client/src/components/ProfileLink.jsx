import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProfileLink = ({ children, ...props }) => {
  const { user } = useAuth();
  return (
    <Link to={`profile/${user?.userId}`} {...props}>
      {children}
    </Link>
  );
};

export default ProfileLink;
