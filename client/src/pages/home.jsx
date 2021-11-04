import SideBar from "../components/SideBar";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex w-full max-w-screen-lg mx-auto">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
