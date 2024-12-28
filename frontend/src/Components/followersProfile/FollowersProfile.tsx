import React, { useEffect, useState } from "react";
import "./FollowersProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../utils/api";
import Button from "../ui/Button/Button";
const FollowersProfile = () => {
  const navigate = useNavigate();
  
  const { userName } = useParams();
  const [loading, setLoading] = useState(false);
  const [followerData, setFollowerData] = useState<any>({});
  useEffect(() => {
    setLoading(true);
    async function findFollowerDetails() {
      try {
        const response = await axios.get(`${endpoints.gitHubData}${userName}`, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        console.log(
          "🚀 ~ file: FollowersProfile.tsx:19 ~ findFollowerDetails ~ response:",
          response
        );
        setFollowerData(response.data);
        
      } catch (error: any) {
        console.error("Error fetching find the follower Details", error);
      }
    }
    findFollowerDetails();
  }, []);

  return (
    <div className="profile">
      <div className="profile-box">
        <img
          src={followerData.avatar_url}
          alt={`${followerData.name} user-profile img`}
          className="user-img"
        />
        <h2>{followerData.name}</h2>
        <p>{followerData.bio}</p>

        <div className="follow-box">
          <Button
            text={`followers ${followerData.followers}`}
            style={{ backgroundColor: "teal" }}
            onClick={() => navigate(`/followers/${followerData.username}`)}
          />
          <Button
            text={`following ${followerData.following}`}
            style={{ backgroundColor: "green" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FollowersProfile;
