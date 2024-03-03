import { Link, useParams } from "react-router-dom";
import { useGetDocData } from "../../common/hooks/useGetDocData";
import CurrentPostComponent from "./components/currentPostComponent/currentPostComponent";
import UpperBar from "../../common/components/upperBar/upperBar";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../setup/auth";
import { useEffect, useState } from "react";
import { useGetSomeDocs } from "../../common/hooks/useGetSomeDocs";
import PostComponent from "../../common/components/postComponent/PostComponent";
import { useSelector } from "react-redux";
import { useGetCountFromServer } from "../../common/hooks/useGetCountFromServer";
import CommentForm from "./components/commentForm/commentForm";
import "./style.scss";
import Loader from "../../common/components/loader/loader";
import ShowMoreButton from "../../common/components/showMoreButton/ShowMoreButton";
function Post() {
  const { postId } = useParams();
  const [numberOfPosts, setNumberOfPosts] = useState(15);
  const {
    data: currentPostData,
    isLoading: isCurrentPostLoading,
    refetch: refetchCurrentPost,
  } = useGetDocData(postId, "posts");
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  const { data: currentUserData } = useGetDocData(currentUserID, "users");
  const { data: postsCount, refetch: countRefetch } = useGetCountFromServer('posts', query(collection(db, 'posts'), where("parentPost", "==", currentPostData?.id || null)));
  const {
    data: commentsList,
    isLoading: isCommentsLoading,
    isRefetching: isCommentsRefetching,
    refetch,
  } = useGetSomeDocs(
    numberOfPosts,
    "posts",
    query(
      collection(db, "posts"),
      limit(numberOfPosts),
      orderBy("date", "desc"),
      where("parentPost", "==", currentPostData?.id || null)
    )
  );
  useEffect(() => {
    refetch();
    countRefetch();
  }, [currentPostData]);

  if (isCurrentPostLoading) {
    return (
      <div className="post-page">
        <Loader />
      </div>
    );
  }
  return (
    <div className="post-page">
      <UpperBar>
        <h1 className="title-h2">Post</h1>
      </UpperBar>
      <CurrentPostComponent postData={currentPostData} postId={postId} />
      {userLoggedIn && (
        <CommentForm
          currentUserData={currentUserData}
          numberOfPosts={numberOfPosts}
          currentPostData={currentPostData}
        />
      )}
      <div className="post-page__comments">
        {isCommentsLoading ? (
          <Loader />
        ) : commentsList?.length === 0 ? (
          <div className="global-message">
            <p className="global-message__text">No replies</p>
          </div>
        ) : (
          commentsList?.map((comment) => {
            return (
              <PostComponent
                key={comment.id}
                postData={comment}
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
            isPostsRefetching={isCommentsRefetching}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
