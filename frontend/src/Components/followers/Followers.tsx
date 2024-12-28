import React, { useEffect, useState } from "react";
import "./Followers.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../utils/api";
const Followers = () => {
  const { userName } = useParams();
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    async function findFollowers() {
      try {
        const response = await axios.get(
          `${endpoints.gitHubData}${userName}/followers`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        console.log(
          "🚀 ~ file: Followers.tsx:24 ~ findFollowers ~ response:",
          response
        );
        setFollowers(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error showing find the followers data", error);
      }
    }
    findFollowers()
  }, []);

  return (
    <>
      <div className="follower-head">
        <h1>Followers</h1>
      </div>
      <div className="follower-list-head">
        {followers.map((data: any, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(`/followerProfile/${data.login}`)}
              className="follower-list"
            >
              <img src={data.avatar_url} alt="follower imge" />
              <h5>{data.login}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Followers;
