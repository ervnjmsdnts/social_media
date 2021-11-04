import { Profile } from "iconsax-react";
import { theme } from "../styles/theme";

const ProfilePhoto = ({ size, className }) => {
  return (
    <div
      className={`bg-white flex justify-center items-center rounded-full ${
        className || ""
      }`}>
      <Profile size={size} variant="Bold" color={theme.primary} />
    </div>
  );
};

export default ProfilePhoto;
