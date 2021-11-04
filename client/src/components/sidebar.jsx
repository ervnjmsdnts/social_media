import { Activity, LogoutCurve, Message, Profile } from "iconsax-react";
import { Link } from "react-router-dom";

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
      <div className="flex flex-col flex-1">
        <Link to="profile">
          <SideBarIcon icon={<Profile size={32} />} text="User Profile" />
        </Link>
        <Link to="messages">
          <SideBarIcon icon={<Message size={32} />} text="Messages" />
        </Link>
        <Link to=".">
          <SideBarIcon icon={<Activity size={32} />} text="News Feed" />
        </Link>
      </div>
      <div className="flex justify-center">
        <Link to="auth">
          <SideBarIcon icon={<LogoutCurve size={32} />} text="Logout" />
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
