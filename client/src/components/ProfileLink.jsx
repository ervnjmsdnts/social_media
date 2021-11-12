import { useQuery } from "@apollo/client";
import { Link } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { GET_USER } from "../config/graphql/queries";

const ProfileLink = ({ children, username }) => {
  const [profile, setProfile] = useState({});
  const { data: user } = useQuery(GET_USER, { variables: { username } });

  useEffect(() => {
    if (user) {
      setProfile(user.getUser);
    }
  }, [user]);

  return (
    <Link as={RouteLink} to={`/profile/${profile.username}`}>
      {children}
    </Link>
  );
};

export default ProfileLink;
