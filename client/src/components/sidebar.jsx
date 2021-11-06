import { Activity, LogoutCurve, Message, Profile } from "iconsax-react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { theme } from "../styles/theme";
import { LOGOUT } from "../config/graphql/mutations";

const SideBarIcon = ({ icon, text = "hi", to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={`${
        match ? "bg-white rounded-[2rem]" : "bg-secondary rounded-2xl"
      } relative flex justify-center items-center h-14 w-14 mt-2 mb-2 mx-2 md:mx-auto shadow-lg
     hover:bg-white hover:rounded-[2rem] cursor-pointer 
     transition-all duration-200 ease-linear group`}
      to={to}
      {...props}>
      {icon}
      <span
        className="absolute bottom-16 md:bottom-1 w-auto p-2 m-2 min-w-max md:left-16 rounded-md 
      drop-shadow-2xl text-primary bg-secondary text-xs font-bold 
      transition-all duration-100 scale-0 origin-left group-hover:scale-100">
        {text}
      </span>
    </Link>
  );
};
const SideBar = () => {
  const [Logout] = useMutation(LOGOUT);

  const handleClick = async () => {
    localStorage.removeItem("accessToken");
    await Logout();
  };

  return (
    <div
      className="fixed md:sticky bottom-0 md:top-0 left-0 w-screen md:w-20 md:h-screen 
    flex md:flex-col justify-center bg-primary shadow-lg">
      <div className="flex md:flex-col md:flex-1">
        <SideBarIcon
          icon={<Profile size={40} color={theme.primary} />}
          text="Profile"
          to="profile"
        />
        <SideBarIcon
          icon={<Message size={40} color={theme.primary} />}
          text="Messages"
          to="messages"
        />
        <SideBarIcon
          icon={<Activity size={40} color={theme.primary} />}
          text="News Feed"
          to=""
        />
      </div>
      <div className="flex justify-center">
        <SideBarIcon
          icon={<LogoutCurve size={32} color={theme.primary} />}
          text="Logout"
          to="auth"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  );
};

export default SideBar;
