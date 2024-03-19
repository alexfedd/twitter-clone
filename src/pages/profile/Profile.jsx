import UpperBar from "../../common/components/upperBar/upperBar";
import { Link, useParams } from "react-router-dom";
import { useGetDocData } from "../../common/hooks/useGetDocData";
import Loader from "../../common/components/loader/loader";
import { useGetCountFromServer } from "../../common/hooks/useGetCountFromServer";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../setup/auth";
import { useGetSomeDocs } from "../../common/hooks/useGetSomeDocs";
import { useEffect, useState } from "react";
import PostComponent from "../../common/components/postComponent/PostComponent";
import ShowMoreButton from "../../common/components/showMoreButton/ShowMoreButton";
import FollowButton from "../../common/components/followButton/FollowButton";
import { useSelector } from "react-redux";
import locationIcon from "./../../assets/svg/profile/location.svg";
import dateIcon from "./../../assets/svg/profile/date.svg";
import { monthsList } from "../../common/components/postComponent/models";
import { useGetFileByURL } from "../../common/hooks/useGetFileByUrl";
import "./style.scss";
function Profile() {
  const { userId } = useParams();
  const [numberOfPosts, setNumberOfPosts] = useState(15);
  const { currentUserID } = useSelector((state) => state.auth);
  const { data: currentUserData } = useGetDocData(currentUserID, "users");
  const { data: userData, isLoading } = useGetDocData(userId, "users");
  const { data: pfpImage } = useGetFileByURL(userData?.data().pfp);
  const { data: bannerImage } = useGetFileByURL(userData?.data().banner);
  const { data: postsCount, refetch: countRefetch } = useGetCountFromServer(
    "posts",
    query(
      collection(db, "posts"),
      where("authorId", "==", userData?.id || null)
    )
  );
  const {
    data: postsList,
    isLoading: isPostsLoading,
    isRefetching: isPostsRefetching,
    refetch,
  } = useGetSomeDocs(
    numberOfPosts,
    "posts",
    query(
      collection(db, "posts"),
      limit(numberOfPosts),
      orderBy("date", "desc"),
      where("authorId", "==", userData?.id || null)
    )
  );
  useEffect(() => {
    refetch();
    countRefetch();
  }, [userData]);
  if (isLoading) {
    return (
      <div className="profile-page">
        <Loader />
      </div>
    );
  }
  const date = new Date(userData?.data().joinDate.seconds * 1000);
  const joinDate = `${monthsList[date.getMonth()]} ${date.getFullYear()}`;
  return (
    <div className="profile-page">
      <UpperBar>
        <div className="profile-page__upper-info">
          <h1 className="title-h2">{userData?.data().name}</h1>
          <span className="subtitle">
            {userData?.data().posts.length} posts
          </span>
        </div>
      </UpperBar>
      <div className="profile-page__profile-info">
        <div className="profile-page__banner image-wrapper">
          {bannerImage && (
            <img src={bannerImage} alt="" className="image-wrapper__image" />
          )}
          <div className="profile-page__pfp image-wrapper">
            <img src={pfpImage} alt="" className="image-wrapper__image" />
          </div>
        </div>
        <div className="profile-page__profile-info-upper">
          {userId === currentUserID ? (
            <Link to={"/edit"} className="profile-page__edit-btn">
              Edit profile
            </Link>
          ) : (
            <FollowButton
              uid={userId}
              currentUserFollowing={currentUserData?.data().following}
              userFollowers={userData?.data().followers}
              userAmount={8}
            />
          )}
        </div>
        <div className="profile-page__main-info">
          <h2 className="title-h2">{userData?.data().name}</h2>
          <span className="subtitle">{userData?.data().nickname}</span>
          <p className="profile-page__description text">
            {userData?.data().description === ""
              ? "No description"
              : userData?.data().description}
          </p>
          <div className="profile-page__user-meta">
            {userData?.data().location !== "" ? (
              <div className="profile-page__meta-item">
                <img src={locationIcon} alt="" className="profile-page__icon" />

                <p className="profile-page__meta-text">
                  {userData?.data().location}
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="profile-page__meta-item">
              <img src={dateIcon} alt="" className="profile-page__icon" />
              <p className="profile-page__meta-text">Joined {joinDate}</p>
            </div>
          </div>
          <div className="profile-page__follows-info">
            <Link to={`/profile/${userId}/following`} className="profile-page__follow-info">
              <span className="profile-page__follow-number">
                {userData?.data().following.length}
              </span>{" "}
              Following
            </Link>
            <Link to={`/profile/${userId}/followers`} className="profile-page__follow-info">
              <span className="profile-page__follow-number">
                {userData?.data().followers.length}
              </span>{" "}
              Followers
            </Link>
          </div>
        </div>
        <h2 className="profile-page__posts-title title-h3">Posts</h2>
      </div>
      <div className="profile-page__posts">
        {isPostsLoading ? (
          <Loader />
        ) : postsList?.length === 0 ? (
          <div className="global-message">
            <p className="global-message__text">No posts</p>
          </div>
        ) : (
          postsList?.map((post) => {
            return (
              <PostComponent
                key={post.id}
                postData={post}
                amountOfPosts={numberOfPosts}
              />
            );
          })
        )}
        {postsCount > numberOfPosts && (
          <ShowMoreButton
            onButtonClick={() => {
              setNumberOfPosts((prev) => prev + 15);
            }}
            isPostsRefetching={isPostsRefetching}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
