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
      <div className="mx-8">
        <p className="text-xl">Hello this is my post</p>
        {image && (
          <>
            <div className="bg-white w-full h-[750px] mt-2"></div>
          </>
        )}
      </div>
      <Divider />
    </Section>
  );
};

export default Post;
