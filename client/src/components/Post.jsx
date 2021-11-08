import { format } from "timeago.js";
import { Like1, Messages1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import ProfilePhoto from "./ProfilePhoto";
import Section from "./layout/Section";
import Divider from "./Divider";
import Icon from "./Icon";
import { theme } from "../styles/theme";
import { TIMELINE } from "../config/graphql/queries";
import { LIKE_POST } from "../config/graphql/mutations";
import ProfileLink from "./ProfileLink";

const Post = ({
  id,
  body,
  user,
  image,
  createdAt,
  likeCount,
  commentCount,
  likes,
}) => {
  return (
    <Section className="flex justify-center flex-col">
      <div className="flex">
        <ProfileLink id={user.id}>
          <ProfilePhoto size={40} className="h-16 w-16 mr-2" />
        </ProfileLink>
        <div className="flex flex-col justify-center text-primary">
          <div>
            <ProfileLink id={user.id} className="font-bold mr-2 text-lg">
              {user.firstName} {user.lastName}
            </ProfileLink>
            <ProfileLink id={user.id} className="font-semibold text-lg">
              @{user.username}
            </ProfileLink>
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
      <PostButtons
        likeCount={likeCount}
        commentCount={commentCount}
        id={id}
        likes={likes}
        user={user}
      />
    </Section>
  );
};

const PostButtons = ({ id, likes, likeCount, commentCount, user }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [LikePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    refetchQueries: [TIMELINE, "Timeline"],
  });

  const likeState = user && (liked ? "Bold" : "Outline");

  return (
    <div className="flex">
      <Icon
        icon={<Like1 variant={likeState} color={theme.primary} />}
        label={likeCount}
        onClick={LikePost}
      />
      <Icon icon={<Messages1 color={theme.primary} />} label={commentCount} />
    </div>
  );
};

export default Post;
