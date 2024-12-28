
import Headers from "../../Components/Headers/Headers";
import Searchbar from "../../Components/home/searchbar/Searchbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Profile from "../../Components/home/profile/Profile";
import Repositories from "../../Components/home/userRepositories/Repositories";
import "./Home.css";
import { toast } from "sonner";
const Home = () => {
  const { userInfo } = useSelector(
    (state: RootState) => state.gitHubData.gitHubState
  );
  // console.log("🚀 ~ file: Home.tsx:11 ~ Home ~ userInfo:", userInfo);
  return (
    <div>
      <Headers />
      <Searchbar />
      {Object.keys(userInfo).length ? (
        <>
          <Profile />
          <Repositories />
        </>
      ) : (
        <div className="empty" onClick={() => toast.error("Please try")}>
          Oops! No results found. Please try searching for a valid GitHub
          username.
        </div>
      )}
    </div>
  );
};

export default Home;
