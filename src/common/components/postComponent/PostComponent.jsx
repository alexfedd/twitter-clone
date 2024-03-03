/* eslint-disable react/prop-types */
import commentBtn from "./../../../assets/svg/post/comments.svg";
import { useGetDocData } from "../../hooks/useGetDocData";
import { useGetFileByURL } from "../../hooks/useGetFileByUrl";
import { monthsList } from "./models";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import LikeButton from "./../likeButton/LikeButton";
import { shrinkTheString } from "../../utils";
import { useState } from "react";

function PostComponent({ postData, amountOfPosts }) {
  const { data: postUserData } = useGetDocData(postData.authorId, "users");
  const { data: postUserPfpUrl } = useGetFileByURL(postUserData?.data().pfp);
  const navigate = useNavigate();
  const [isTextSelected, setIsTextSelected] = useState(false);

  const handleMouseDown = () => {
    setIsTextSelected(false);
  };

  const handleMouseUp = () => {
    setIsTextSelected(document.getSelection().toString() !== "");
  };

  const handleClick = () => {
    if (!isTextSelected) {
      navigate(`/post/${postData.id}`);
    }
  };
  const date = new Date(postData.date.seconds * 1000);
  const postDate = `${monthsList[date.getMonth()]} ${date.getDate()}`;
  const name = shrinkTheString(postUserData?.data().name, 12);
  const nickname = shrinkTheString(postUserData?.data().nickname, 12);
  return (
    <div className="post">
      {postData.parentPost && postData.parentPost != "" ? (
        <p className="post__parent">Answered on <Link to={`/post/${postData.parentPost}`}>post</Link></p>
      ) : (
        ""
      )}
      <div
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="post__post"
      >
        <div className="post__pfp-wrapper">
          <img src={postUserPfpUrl} alt="" className="post__pfp" />
        </div>
        <div className="post__body">
          <Link
            to={`/profile/${postData.authorId}`}
            className="post__user-info"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="title-h3">{name}</h3>
            <span className="subtitle">{nickname}</span>
            <span className="post__date">{postDate}</span>
          </Link>
          <p className="post__content">{postData.content}</p>
          <div className="post__funcs">
            <div className="post__func">
              <img src={commentBtn} alt="" className="post__func-image" />
              {postData.comments.length}
            </div>
            <LikeButton postData={postData} amountOfPosts={amountOfPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
