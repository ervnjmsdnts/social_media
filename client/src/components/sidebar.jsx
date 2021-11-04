import { Activity, LogoutCurve, Message, Profile } from "iconsax-react";

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
    <div className="sticky top-0 left-0 w-16 h-screen flex flex-col bg-primary shadow-lg">
      <div className="flex flex-col flex-1">
        <SideBarIcon icon={<Profile size={32} />} text="User Profile" />
        <SideBarIcon icon={<Message size={32} />} text="Messages" />
        <SideBarIcon icon={<Activity size={32} />} text="News Feed" />
      </div>
      <div className="flex">
        <SideBarIcon icon={<LogoutCurve size={32} />} text="Logout" />
      </div>
    </div>
  );
};

export default SideBar;
