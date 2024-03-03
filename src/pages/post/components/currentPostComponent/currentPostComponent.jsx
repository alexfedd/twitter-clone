import { Link } from "react-router-dom";
import LikeButton from "../../../../common/components/likeButton/LikeButton";
import { monthsList } from "../../../../common/components/postComponent/models";
import ProfileComponent from "../../../../common/components/profileComponent/ProfileComponent";
import { useGetDocData } from "../../../../common/hooks/useGetDocData";
import { shrinkTheString } from "../../../../common/utils";
import commentBtn from "./../../../../assets/svg/post/comments.svg";
import "./style.scss";
function CurrentPostComponent({ postData, postId }) {
  const { data: authorData, isLoading } = useGetDocData(
    postData?.data().authorId,
    "users"
  );

  const nickname = shrinkTheString(authorData?.data().nickname, 20);
  const name = shrinkTheString(authorData?.data().name, 20);
  const date = new Date(postData?.data().date.seconds * 1000);
  const dateTime = `${date.getHours()}:${date.getMinutes()}`;
  const dateDay = `${
    monthsList[date.getMonth()]
  } ${date.getDate()}, ${date.getUTCFullYear()}`;

  return (
    <div className="current-post">
      {postData?.data().parentPost && postData?.data().parentPost != "" ? (
        <p className="current-post__parent">
          Answered on <Link to={`/post/${postData?.data().parentPost}`}>post</Link>
        </p>
      ) : (
        ""
      )}
      <div className="current-post__post">
        <ProfileComponent
          nickname={nickname}
          name={name}
          pfpUrl={authorData?.data().pfp}
        />
        <p className="current-post__content">{postData?.data().content}</p>
        <div className="current-post__date">
          <span className="subtitle">{dateTime}</span>
          <span className="subtitle">{dateDay}</span>
        </div>
        <div className="post__funcs">
          <div className="post__func">
            <img src={commentBtn} alt="" className="post__func-image" />
            {postData?.data().comments.length}
          </div>
          <LikeButton
            postData={{ ...postData?.data(), id: postId }}
            amountOfPosts={-1}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentPostComponent;
