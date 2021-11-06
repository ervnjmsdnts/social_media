import ProfilePhoto from "./ProfilePhoto";
import Section from "./layout/Section";
import Divider from "./Divider";
import Icon from "./Icon";
import { Like1, Message2 } from "iconsax-react";
import { theme } from "../styles/theme";
import { format } from "timeago.js";

const Post = ({ body, user, image, createdAt, likeCount, commentCount }) => {
  //TODO setup is like
  //TODO make comment component
  const isLike = false;
  return (
    <Section className="flex justify-center flex-col">
      <div className="flex">
        <ProfilePhoto size={40} className="h-16 w-16 mr-2" />
        <div className="flex flex-col justify-center text-primary">
          <div>
            <span className="font-bold mr-2 text-lg">
              {user.firstName} {user.lastName}
            </span>
            <span className="font-semibold text-lg">@{user.username}</span>
          </div>
          <span>{format(createdAt)}</span>
        </div>
      </div>
      <Divider />
      <div className="mx-8">
        <p className="text-xl">{body}</p>
        {image && (
          <>
            <div className="bg-white w-full h-[750px] mt-2"></div>
          </>
        )}
      </div>
      <Divider />
      <div className="flex">
        <Icon
          icon={
            <Like1
              variant={isLike ? "Bold" : "Outline"}
              color={theme.primary}
            />
          }
          label={likeCount}
        />
        <Icon icon={<Message2 color={theme.primary} />} label={commentCount} />
      </div>
    </Section>
  );
};

export default Post;
