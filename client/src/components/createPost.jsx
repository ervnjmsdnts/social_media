import Input from "./input";
import ProfilePhoto from "./profilePhoto";
import Icon from "./icon";
import { Image, VideoPlay } from "iconsax-react";
import { theme } from "../styles/theme";

const CreatePost = () => {
  return (
    <>
      <div className="flex justify-center items-center h-[150px] bg-secondary w-full m-8 rounded-xl">
        <ProfilePhoto size={48} className="h-20 w-20 mr-2" />
        <div className="relative flex flex-col">
          <Input placeholder="Create Post" className="w-[750px] h-12 text-lg" />
          <div className="absolute flex -bottom-10 left-0">
            <Icon icon={<Image color={theme.secondary} />} />
            <Icon icon={<VideoPlay color={theme.secondary} />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
