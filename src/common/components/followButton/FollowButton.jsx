import { useEffect, useState } from "react";
import { useUpdateData } from "../../hooks/useUpdateData";
import { useSelector } from "react-redux";
import "./style.scss";
import { useNavigate } from "react-router-dom";
function FollowButton({
  userFollowers,
  currentUserFollowing,
  uid,
  userAmount,
}) {
  const [userFollowersState, setUserFollowersState] = useState(userFollowers);
  const [curUserFollowingState, setCurUserFollowingState] =
    useState(currentUserFollowing);
  const [isFollowed, setIsFollowed] = useState(false);
  const followHandle = useUpdateData(userAmount, "users");
  const { currentUserID, userLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (userLoggedIn && userFollowers.includes(currentUserID)) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  }, [userLoggedIn]);
  const handleOnClick = async () => {
    if (!userLoggedIn) {
      navigate("/sign-in");
      return;
    }
    setIsFollowed((prev) => {
      return !prev;
    });
    const userArgs = {
      uid: uid,
      newField: {
        followers: isFollowed
          ? userFollowers.filter((item) => item !== currentUserID)
          : !userFollowers.includes(uid)
          ? [...userFollowers, currentUserID]
          : userFollowers,
      },
    };
    const currentUserArgs = {
      uid: currentUserID,
      newField: {
        following: isFollowed
          ? currentUserFollowing.filter((item) => item !== uid)
          : !currentUserFollowing.includes(uid)
          ? [...currentUserFollowing, uid]
          : currentUserFollowing,
      },
    };
    try {
      await Promise.all([
        followHandle.mutateAsync(userArgs),
        followHandle.mutateAsync(currentUserArgs),
      ]);
    } catch (error) {
      setIsFollowed((prev) => {
        return !prev;
      });
      await Promise.all([
        followHandle.mutateAsync({
          uid: uid,
          newField: { followers: userFollowers },
        }),
        followHandle.mutateAsync({
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
      onClick={handleOnClick}
    >
      {isFollowed ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
