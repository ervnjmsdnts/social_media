import { Activity, LogoutCurve, Message, Profile } from "iconsax-react";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";

const SideBarIcon = ({ icon, text = "hi" }) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};
const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="flex md:flex-col md:flex-1">
        <Link to="profile">
          <SideBarIcon
            icon={<Profile size={32} color={theme.primary} />}
            text="Profile"
          />
        </Link>
        <Link to="messages">
          <SideBarIcon
            icon={<Message size={32} color={theme.primary} />}
            text="Messages"
          />
        </Link>
        <Link to=".">
          <SideBarIcon
            icon={<Activity size={32} color={theme.primary} />}
            text="News Feed"
          />
        </Link>
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
