import commentBtn from "./../../../assets/svg/post/comments.svg";
import likeBtn from "./../../../assets/svg/post/like.svg";
import activeLikeBtn from "./../../../assets/svg/post/like-active.svg";
import { useSelector } from "react-redux";
import { useGetUserData } from "../../hooks/useGetUserData";
import { useGetFileByURL } from "../../hooks/useGetFileByUrl";
import { monthsList } from "./models";
import "./style.scss";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUpdateData } from "../../hooks/useUpdateData";
function PostComponent({ postData, amountOfPosts }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(postData.likes)
  const { currentUserID, userLoggedIn } = useSelector((state) => state.auth);
  const { data: postUserData, isLoading } = useGetUserData(postData.authorId);
  const { data: postUserPfpUrl } = useGetFileByURL(postUserData?.data().pfp);
  const navigate = useNavigate()
  const handleLike = useUpdateData(amountOfPosts, 'posts')
  useEffect(() => {
    if(userLoggedIn && postData.likes.includes(currentUserID)) {
      setIsLiked(true)
    }
    else {
      setIsLiked(false)
    }
  }, [userLoggedIn])
  const handleOnClick = () => {
    if (!userLoggedIn) {
      navigate("/sign-in");
      return;
    }
    setIsLiked((prev) => {
      return !prev;
    });
    setLikes((prev)=> {
      if(prev.includes(currentUserID)){
        return prev.filter(item => item !== currentUserID)
      }
      else {
        return [...prev, currentUserID]
      }
    })
    const likeArgs = {
      uid: postData.id,
      newField: {
        likes: isLiked
          ? postData.likes.filter((item) => item !== currentUserID)
          : !postData.likes.includes(currentUserID)
          ? [...postData.likes, currentUserID]
          : postData.likes,
      },
    };
    try {
      handleLike.mutate(likeArgs);
    } catch (error) {
      setIsLiked((prev) => {
        return !prev;
      });
      setLikes((prev)=> {
        if(prev.includes(currentUserID)){
          return prev.filter(item => item !== currentUserID)
        }
        else {
          return [...prev, currentUserID]
        }
      })
      handleLike.mutate({ uid: postData.id, newField: { likes: postData.likes } });
    }
  };
  const date = new Date(postData.date.seconds * 1000);
  const postDate = `${monthsList[date.getMonth()]} ${date.getDate()}`;
  const name = (postUserData?.data().name.length > 12) ? `${postUserData?.data().name.substring(0, 8)}...` : postUserData?.data().name
  const nickname = (postUserData?.data().nickname.length > 12) ? `${postUserData?.data().nickname.substring(0, 8)}...` : postUserData?.data().nickname
  return (
    <div className="post">
      <div className="post__pfp-wrapper">
        <img src={postUserPfpUrl} alt="" className="post__pfp" />
      </div>
      <div className="post__body">
        <div className="post__user-info">
          <h3 className="title-h3">{name}</h3>
          <span className="subtitle">{nickname}</span>
          <span className="post__date">{postDate}</span>
        </div>
        <p className="post__content">{postData.content}</p>
        <div className="post__funcs">
          <div className="post__func">
            <img src={commentBtn} alt="" className="post__func-image" />
            {postData.comments.length}
          </div>
          <div className="post__func" onClick={()=> {handleOnClick()}}>
            <img src={isLiked ? activeLikeBtn : likeBtn} alt="" className="post__func-image" />
            {likes.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
