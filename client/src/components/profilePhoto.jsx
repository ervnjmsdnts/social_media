import { Profile } from "iconsax-react";

const DefaultProfile = ({ size, className }) => {
  return (
    <div
      className={`bg-white flex justify-center items-center rounded-full ${
        className || ""
      }`}>
      <Profile size={size} variant="Bold" />
    </div>
  );
};

export default DefaultProfile;
