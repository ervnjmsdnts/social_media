import SideBar from "../components/sidebar";
import Feed from "../components/feed";

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
