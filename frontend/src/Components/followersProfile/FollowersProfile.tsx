import { useEffect, useState } from "react";
import "./FollowersProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../utils/api";
import Button from "../ui/Button/Button";
import LoadingPopUp from "../ui/LoadingPopUp/LoadingPopUp";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface GithubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
}

const FollowersProfile = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [loading, setLoading] = useState(false);
  const [mutualFriends, setMutualFriends] = useState<GithubUser[]>([]);
  const [followerData, setFollowerData] = useState<GithubUser | null>(null);

  const { userInfo } = useSelector(
    (state: RootState) => state.gitHubData.gitHubState
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        };

        const followerResponse = await axios.get(
          `${endpoints.gitHubData}${userName}`,
          { headers }
        );

        let mutualFriendsData = [];
        if (userName !== userInfo.username) {
          const [currentFollowers, userFollowers] = await Promise.all([
            axios.get(`${endpoints.gitHubData}${userInfo.username}/followers`, {
              headers,
            }),
            axios.get(`${endpoints.gitHubData}${userName}/followers`, {
              headers,
            }),
          ]);

          const currentFollowersLogins = currentFollowers.data.map(
            (follower: { login: string }) => follower.login
          );
          mutualFriendsData = userFollowers.data.filter(
            (follower: { login: string }) =>
              currentFollowersLogins.includes(follower.login)
          );
        }

        setFollowerData(followerResponse.data);
        setMutualFriends(mutualFriendsData);
      } catch (error: any) {
        console.error("Error fetching profile data:", error.message || error);
      } finally {
        setLoading(false);
      }
    };

    if (userName) {
      fetchData();
    }
  }, [userName, userInfo.username]);
  if (loading) {
    return <LoadingPopUp />;
  }
  if (!followerData) {
    return null;
  }

  return (
    <>
      {/* {loading && <LoadingPopUp />} */}
      <div className="profile">
        <div className="profile-box">
          <img
            src={followerData.avatar_url}
            alt={`${followerData.login} user-profile img`}
            className="user-img"
          />
          <h2>{followerData.name || followerData.login}</h2>
          {followerData.bio && <p>{followerData.bio}</p>}

          <div className="follow-box">
            <Button
              text={`Followers ${followerData.followers}`}
              style={{ backgroundColor: "teal" }}
              onClick={() => navigate(`/followers/${followerData.login}`)}
            />
            <Button
              text={`Following ${followerData.following}`}
              style={{ backgroundColor: "green" }}
              onClick={() => navigate(`/following/${followerData.login}`)}
            />
            {userName !== userInfo.username && (
              <Button
                text={`${mutualFriends.length} Mutual Friends`}
                style={{ backgroundColor: "purple" }}
                onClick={() =>
                  navigate(`/mutual/${userInfo.username}/${userName}`, {
                    state: { mutualFriends },
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowersProfile;
