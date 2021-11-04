import Input from "./Input";
import Icon from "./Icon";
import ProfilePhoto from "./ProfilePhoto";
import { Image, VideoPlay } from "iconsax-react";
import { theme } from "../styles/theme";

const CreatePost = () => {
  return (
    <div className="flex justify-center items-center h-[175px] bg-secondary w-full m-8 rounded-xl">
      <ProfilePhoto size={48} className="h-20 w-20 mr-2" />
      <div className="relative flex flex-col">
        <Input
          placeholder="What are you thinking about?"
          className="w-[750px] h-12 text-lg"
        />
        <div className="absolute flex -bottom-12 left-0">
          <Icon icon={<Image color={theme.primary} />} label="Photo" />
          <Icon icon={<VideoPlay color={theme.primary} />} label="Video" />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
