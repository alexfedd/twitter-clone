import { useEffect, useState } from "react";
import { useUpdateData } from "../../hooks/useUpdateData";
import { useSelector } from "react-redux";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAddToDocArray } from "../../hooks/useAddToDocArray";
import { useRemoveFromDocArray } from "../../hooks/useRemoveFromDocArray";
function FollowButton({
  userFollowers,
  currentUserFollowing,
  uid,
  userAmount,
}) {
  const [isFollowed, setIsFollowed] = useState(false);
  const abortChanges = useUpdateData(userAmount, "users");
  const handleFollow = useAddToDocArray(userAmount, 'users');
  const handleUnfollow = useRemoveFromDocArray(userAmount, 'users');
  const { currentUserID, userLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn && userFollowers.includes(currentUserID)) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  }, [userLoggedIn, userFollowers]);

  const handleOnClick = async (e) => {
    e.stopPropagation()
    if (!userLoggedIn) {
      navigate("/sign-in");
      return;
    }
    setIsFollowed((prev) => {
      return !prev;
    });

    const userArgs = {
      uid: uid,
      fieldName: 'followers',
      arrayValue: currentUserID
    };
    const currentUserArgs = {
      uid: currentUserID,
      fieldName: 'following',
      arrayValue: uid,
    };
    try {
      if(!isFollowed) {
        await Promise.all([
          handleFollow.mutateAsync(userArgs),
          handleFollow.mutateAsync(currentUserArgs),
        ]);
      } else {
        await Promise.all([
          handleUnfollow.mutateAsync(userArgs),
          handleUnfollow.mutateAsync(currentUserArgs),
        ]);
      }

    } catch (error) {
      setIsFollowed((prev) => {
        return !prev;
      });
      await Promise.all([
        abortChanges.mutateAsync({
          uid: uid,
          newField: { followers: userFollowers },
        }),
        abortChanges.mutateAsync({
          uid: currentUserID,
          newField: { followers: currentUserFollowing },
        }),
      ]);
    }
  };
  return (
    <button
      className={
        isFollowed ? "follow-button follow-button--followed" : "follow-button"
      }
      onClick={(e) => {handleOnClick(e)}}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
