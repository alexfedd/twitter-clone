import FollowButton from "../../../../../../common/components/followButton/FollowButton";
import ProfileComponent from "../../../../../../common/components/profileComponent/ProfileComponent";
import './style.scss';
function UserCard({ user, currentUserFollowing, userAmount }) {
  return (
    <div className="user-card">
      <ProfileComponent
        nickname={user.nickname}
        name={user.name}
        pfpUrl={user.pfp}
      />
      <FollowButton
        uid={user.id}
        userFollowers={user.followers}
        currentUserFollowing={currentUserFollowing}
        userAmount={userAmount}
      />
    </div>
  );
}

export default UserCard;
