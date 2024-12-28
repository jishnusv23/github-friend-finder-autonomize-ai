import React from "react";
import "./Profile.css";
import Button from "../../ui/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate()
  const { userInfo } = useSelector(
    (state: RootState) => state.gitHubData.gitHubState
  );
  console.log("🚀 ~ file: Profile.tsx:9 ~ Profile ~ userInfo:", userInfo);

  // You can now use userInfo and userRepositories in your component

  return (
    <div className="profile">
      <div className="profile-box">
        <img
          src={userInfo.avatar_url}
          alt={`${userInfo.username} user-profile img`}
          className="user-img"
        />
        <h2>{userInfo.username}</h2>
        <p>{userInfo.bio}</p>
        <p>{userInfo.location}</p>
        <div className="follow-box">
          <Button
            text={`followers ${userInfo.followers}`}
            style={{ backgroundColor: "teal" }}
            onClick={() => navigate(`/followers/${userInfo.username}`)}
          />
          <Button
            text={`following ${userInfo.following}`}
            style={{ backgroundColor: "green" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
