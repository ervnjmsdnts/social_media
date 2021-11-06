import { Image, VideoPlay } from "iconsax-react";
import { useMutation } from "@apollo/client";

import Input from "./Input";
import Icon from "./Icon";
import ProfilePhoto from "./ProfilePhoto";
import { theme } from "../styles/theme";
import Section from "./layout/Section";
import Button from "./Button";
import { useForm } from "../utils/hooks/useForm";
import { CREATE_POST } from "../config/graphql/mutations";
import { TIMELINE } from "../config/graphql/queries";

const CreatePost = () => {
  const [CreatePost] = useMutation(CREATE_POST);

  const createFormCallBack = async () => {
    try {
      await CreatePost({
        variables: values,
        refetchQueries: [TIMELINE, "Timeline"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { onSubmit, onChange, values } = useForm(createFormCallBack, {
    body: "",
  });

  //TODO Reverse post
  return (
    <Section className="flex justify-center">
      <div className="flex justify-center items-center w-full">
        <ProfilePhoto size={40} className="h-14 md:h-20 w-14 md:w-20 mr-2" />
        <form className="relative flex flex-col w-3/4" onSubmit={onSubmit}>
          <div className="flex w-full">
            <Input
              placeholder="What are you thinking about?"
              className="w-full h-12 mr-2 text-sm md:text-lg"
              name="body"
              value={values.body}
              onChange={onChange}
              textBig
            />
            <Button className="bg-primary text-secondary px-4" type="submit">
              Send
            </Button>
          </div>
          <div className="absolute flex -bottom-9 md:-bottom-11 left-0">
            <Icon icon={<Image color={theme.primary} />} label="Photo" />
            <Icon icon={<VideoPlay color={theme.primary} />} label="Video" />
          </div>
        </form>
      </div>
    </Section>
  );
};

export default CreatePost;
