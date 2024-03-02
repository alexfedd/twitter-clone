import { useSelector } from "react-redux";
import PostForm from "./components/PostForm/PostForm";
import { useGetUserData } from "./../../common/hooks/useGetUserData";
import { useGetSomeDocs } from "../../common/hooks/useGetSomeDocs";
import PostComponent from "../../common/components/postComponent/PostComponent";
import { useState } from "react";
import "./style.scss";
import ShowMoreButton from "../../common/components/showMoreButton/ShowMoreButton";
import { useGetCountFromServer } from "../../common/hooks/useGetCountFromServer";
function Home() {
  const [numberOfPosts, setNumberOfPosts] = useState(15);
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  const { data: currentUserData } = useGetUserData(currentUserID, userLoggedIn);
  const { data: postsCount } = useGetCountFromServer("posts");
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isRefetching: isPostsRefetching,
    isError: isPostsError,
    error: postsError,
  } = useGetSomeDocs(numberOfPosts, "posts");
  if (isPostsLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="home">
      {userLoggedIn && (
        <PostForm
          currentUserData={currentUserData}
          numberOfPosts={numberOfPosts}
        />
      )}
      <div className="home__posts-list">
        {isPostsError ? (
          <p>Something went wrong... {postsError.message}</p>
        ) : (
          postsData.map((postData) => {
            return (
              <PostComponent
                key={postData.id}
                postData={postData}
                amountOfPosts={numberOfPosts}
              />
            );
          })
        )}
      </div>
      {postsCount > numberOfPosts && (
        <ShowMoreButton
          onButtonClick={() => {
            setNumberOfPosts((prev) => prev + 15);
          }}
          isPostsRefetching={isPostsRefetching}
        />
      )}
    </div>
  );
}

export default Home;
