import ProfilePhoto from "./ProfilePhoto";
import Section from "./layout/Section";
import Divider from "./Divider";

const Post = ({ image }) => {
  return (
    <Section className="flex justify-center flex-col">
      <div className="flex">
        <ProfilePhoto size={40} className="h-16 w-16 mr-2" />
        <div className="flex flex-col justify-center text-primary">
          <div>
            <span className="font-bold mr-2 text-lg">Earvin James Dantes</span>
            <span className="font-semibold text-lg">@Oduum</span>
          </div>
          <span>12m ago</span>
        </div>
      </div>
      <Divider />
      <div className="ml-8 mt-4">
        <p className="text-xl">Hello this is my post</p>
      </div>
    </Section>
  );
};

export default Post;
