import { Activity, LogoutCurve, Message, Profile } from "iconsax-react";
import { Link, NavLink } from "react-router-dom";
import { theme } from "../styles/theme";

const SideBarIcon = ({ icon, text = "hi" }) => {
  return (
    <div
      className="relative flex justify-center items-center h-12 w-12 mt-2 mb-2 mx-2 md:mx-auto shadow-lg
     bg-secondary hover:bg-white rounded-2xl hover:rounded-3xl cursor-pointer 
     transition-all duration-200 ease-linear group">
      {icon}
      <span
        className="absolute bottom-14 md:bottom-0 w-auto p-2 m-2 min-w-max md:left-16 rounded-md 
      shadow-md text-primary bg-secondary text-xs font-bold 
      transition-all duration-100 scale-0 origin-left group-hover:scale-100">
        {text}
      </span>
    </div>
  );
};
const SideBar = () => {
  return (
    <div
      className="fixed md:sticky bottom-0 md:top-0 left-0 w-screen md:w-20 md:h-screen 
    flex md:flex-col justify-center bg-primary shadow-lg">
      <div className="flex md:flex-col md:flex-1">
        <NavLink to="profile">
          <SideBarIcon
            icon={<Profile size={32} color={theme.primary} />}
            text="Profile"
          />
        </NavLink>
        <NavLink to="messages">
          <SideBarIcon
            icon={<Message size={32} color={theme.primary} />}
            text="Messages"
          />
        </NavLink>
        <NavLink to=".">
          <SideBarIcon
            icon={<Activity size={32} color={theme.primary} />}
            text="News Feed"
          />
        </NavLink>
      </div>
      <div className="flex justify-center">
        <Link to="auth">
          <SideBarIcon
            icon={<LogoutCurve size={32} color={theme.primary} />}
            text="Logout"
          />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
