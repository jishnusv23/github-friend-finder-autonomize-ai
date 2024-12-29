import { useLocation, useNavigate } from "react-router-dom";
import "./MutualFriendsList.css";

interface GithubUser {
  login: string;
  avatar_url: string;
}

const MutualFriendsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mutualFriends: GithubUser[] = location.state?.mutualFriends || [];

  return (
    <div className="follower-head">
      <h2>Mutual Friends</h2>
      {mutualFriends.length > 0 ? (
        <div className="follower-list-head">
          {mutualFriends.map((friend) => (
            <div
              key={friend.login}
              className="follower-list"
              onClick={() => navigate(`/followerProfile/${friend.login}`)}
            >
              <img
                src={friend.avatar_url}
                alt={`${friend.login}'s avatar`}
                className="mutual-friend-avatar"
              />
              <span className="mutual-friend-name">{friend.login}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No mutual friends found.</p>
      )}
    </div>
  );
};

export default MutualFriendsList;
