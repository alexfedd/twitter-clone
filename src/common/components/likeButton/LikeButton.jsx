/* eslint-disable react/prop-types */
import likeBtn from "./../../../assets/svg/post/like.svg";
import activeLikeBtn from "./../../../assets/svg/post/like-active.svg";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useUpdateData } from "../../hooks/useUpdateData";
import { useNavigate } from 'react-router-dom';
import { useAddToDocArray } from "../../hooks/useAddToDocArray";
import { useRemoveFromDocArray } from "../../hooks/useRemoveFromDocArray";
function LikeButton({postData, amountOfPosts}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(postData.likes);
  const { currentUserID, userLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const abortChanges = useUpdateData(amountOfPosts, 'posts');
  const handleLike = useAddToDocArray(amountOfPosts, 'posts');
  const handleUnlike = useRemoveFromDocArray(amountOfPosts, 'posts')

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
      fieldName: 'likes',
      arrayValue: currentUserID,
    };
    try {
      if(!isLiked) {
        handleLike.mutateAsync((likeArgs));
      }
      else {
        handleUnlike.mutateAsync(likeArgs)
      }
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
      abortChanges.mutate({ uid: postData.id, newField: { likes: postData.likes } });
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
