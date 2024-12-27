import React from "react";
import Headers from "../../Components/Headers/Headers";
import Searchbar from "../../Components/home/searchbar/Searchbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Profile from "../../Components/home/profile/Profile";
import Repositories from "../../Components/home/userRepositories/Repositories";

const Home = () => {
  const { gitHubData } = useSelector((state: RootState) => state.gitHubData);
  console.log("🚀 ~ file: Home.tsx:9 ~ Home ~ gitHubData:", gitHubData);
  return (
    <div>
      <Headers />
      <Searchbar />
      <Profile />
      <Repositories/>
    </div>
  );
};

export default Home;
