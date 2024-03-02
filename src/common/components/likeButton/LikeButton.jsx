/* eslint-disable react/prop-types */
import likeBtn from "./../../../assets/svg/post/like.svg";
import activeLikeBtn from "./../../../assets/svg/post/like-active.svg";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useUpdateData } from "../../hooks/useUpdateData";
import { useNavigate } from 'react-router-dom';
function LikeButton({postData, amountOfPosts}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(postData.likes);
  const { currentUserID, userLoggedIn } = useSelector((state) => state.auth);
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
  return (
    <div
      className="post__func"
      onClick={(e) => {
        e.stopPropagation();
        handleOnClick();
      }}
    >
      <img
        src={isLiked ? activeLikeBtn : likeBtn}
        alt=""
        className="post__func-image"
      />
      {likes.length}
    </div>
  );
}

export default LikeButton;
