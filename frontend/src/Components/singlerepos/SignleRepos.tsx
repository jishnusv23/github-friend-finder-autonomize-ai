import React, { useEffect, useState } from "react";
import "./SingleRepos.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { endpoints } from "../../utils/api";

const SignleRepos = () => {
  const { repoName } = useParams();
  console.log("🚀 ~ file: SignleRepos.tsx:9 ~ SignleRepos ~ params:", repoName);
  const { userInfo } = useSelector(
    (state: RootState) => state.gitHubData.gitHubState
  );
  const [repositoriesdata, setRepositoriesData] = useState({
    name: "",
    size: 0,
    subscribers_count: 0,
    description: "",
    language: "",
    forks_count: 0,
  });
  useEffect(() => {
    async function findRepo() {
      try {
        const response = await axios.get(
          `${endpoints.gitSingleRepo}${userInfo.username}/${repoName}`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
          }
        );
        setRepositoriesData({
          name: response.data.name,
          size: response.data.size,
          subscribers_count: response.data.subscribers_count,
          description: response.data.description || "No description provided.",
          language: response.data.language,
          forks_count: response.data.forks_count,
        });
      } catch (error: any) {
        console.error("Error fetching singlerepocompo", error);
      }
    }
    findRepo();
  }, [userInfo.login,repoName]);
  return (
    <div className="singleRepo-compo">
      <div className="singlerepo-header">
        <h1>{repositoriesdata.name}</h1>
      </div>
      <div className="singlerepo-section">
        <p>
          <strong>Description:</strong>
          {repositoriesdata.description}
        </p>
        <p>
          <strong> Language:</strong>
          {repositoriesdata.language}
        </p>
        <p>
          <strong>Size:</strong>
          {repositoriesdata.size}
        </p>
        <p>
          <strong> Subcribers:</strong>
          {repositoriesdata.subscribers_count}
        </p>
        <p>
          <strong> Forks:</strong>
          {repositoriesdata.forks_count}
        </p>
      </div>
    </div>
  );
};

export default SignleRepos;
