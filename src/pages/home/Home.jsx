import { useSelector } from "react-redux";
import PostForm from "./components/PostForm/PostForm";
import { useGetUserData } from "./../../common/hooks/useGetUserData";
import { useGetSomeDocs } from "../../common/hooks/useGetSomeDocs";
import PostComponent from "../../common/components/postComponent/PostComponent";
import React, { useState } from "react";
import "./style.scss";
import ShowMoreButton from "../../common/components/showMoreButton/ShowMoreButton";
function Home() {
  const [numberOfPosts, setNumberOfPosts] = useState(3);
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  const { data: currentUserData } = useGetUserData(currentUserID, userLoggedIn);
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
          postsData.pages.map((page, pageIndex) => {
            console.log(page);
            <React.Fragment key={pageIndex}>
              {page.map((postData) => (
                <PostComponent
                  key={postData.id}
                  postData={postData}
                  amountOfPosts={numberOfPosts}
                />
              ))}
            </React.Fragment>;
          })
        )}
      </div>
      <ShowMoreButton
        onButtonClick={() => {
          fetchNextPage();
        }}
        isFetchingMore={isFetchingNextPage}
      />
    </div>
  );
}

export default Home;
