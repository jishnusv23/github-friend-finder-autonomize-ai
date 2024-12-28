import  { useState } from "react";
import "./Repositories.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../../utils/api";
const Repositories = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const { userRepositories } = useSelector(
    (state: RootState) => state.gitHubData.gitHubState
  );
  const [followerRepos, setFollowerRepos] = useState([]);
  if (userName) {
    const findRepo = async () => {
      const repos = await axios.get(
        `${endpoints.gitHubData}${userName}/repos`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      // console.log("🚀 ~ file: Searchbar.tsx:40 ~ handleSubmit ~ repos:", repos);
      setFollowerRepos(repos.data);
    };
    findRepo();
  }

  return (
    <>
      {
        userName ?<div className="repositories-comp">
        {followerRepos &&
          followerRepos.map((data: any, index: any) => (
            <div
              className="repo-row"
              key={index}
              onClick={() => navigate(`/single-repo/${data.name}`)}
            >
              {data.name}
            </div>
          ))}
      </div>

      :
      <div className="repositories-comp">
        {userRepositories &&
          userRepositories.map((data: any, index: any) => (
            <div
              className="repo-row"
              key={index}
              onClick={() => navigate(`/single-repo/${data.name}`)}
            >
              {data.name}
            </div>
          ))}
      </div>
}
    </>
  );
};

export default Repositories;
