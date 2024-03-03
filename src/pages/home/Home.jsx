import { useSelector } from "react-redux";
import PostForm from "./components/PostForm/PostForm";
import { useGetDocData } from "../../common/hooks/useGetDocData";
import { useGetSomeDocs } from "../../common/hooks/useGetSomeDocs";
import PostComponent from "../../common/components/postComponent/PostComponent";
import { useState } from "react";
import "./style.scss";
import ShowMoreButton from "../../common/components/showMoreButton/ShowMoreButton";
import { useGetCountFromServer } from "../../common/hooks/useGetCountFromServer";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../setup/auth";
import Loader from "../../common/components/loader/loader";
function Home() {
  const [numberOfPosts, setNumberOfPosts] = useState(15);
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  const { data: currentUserData } = useGetDocData(currentUserID, "users");
  const { data: postsCount } = useGetCountFromServer(
    "posts",
    query(collection(db, "posts"))
  );
  const q = query(
    collection(db, "posts"),
    limit(numberOfPosts),
    orderBy("date", "desc")
  );
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isRefetching: isPostsRefetching,
    isError: isPostsError,
    error: postsError,
  } = useGetSomeDocs(numberOfPosts, "posts", q);
  if (isPostsLoading) {
    return (
      <div className="home">
        <Loader />
      </div>
    );
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
