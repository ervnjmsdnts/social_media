import SideBar from "../components/SideBar";
import Feed from "../components/Feed";
import Main from "../components/layout/Main";

const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <Main>
        <Feed />
      </Main>
    </div>
  );
};

export default Home;
