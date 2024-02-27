import commentBtn from './../../../assets/svg/post/comments.svg'
import likeBtn from './../../../assets/svg/post/like.svg'
import activeLikeBtn from './../../../assets/svg/post/like-active.svg'
import { useSelector } from 'react-redux';
import { useGetUserData } from '../../hooks/useGetUserData';
import { useGetFileByURL } from '../../hooks/useGetFileByUrl';
import { monthsList } from './models';
import './style.scss';
function PostComponent({postData}) {
    const {currentUserID} = useSelector(state => state.auth)
    const {data: postUserData, isLoading} = useGetUserData(postData.authorId);
    const {data: postUserPfpUrl} = useGetFileByURL(postUserData?.data().pfp);
    const date = new Date(postData.date.seconds * 1000);
    const postDate = `${monthsList[date.getMonth()]} ${date.getDate()}`;
  return (
    <div className="post">
      <div className="post__pfp-wrapper">
        <img src={postUserPfpUrl} alt="" className="post__pfp" />
      </div>
      <div className="post__body">
        <div className="post__user-info">
          <h3 className="title-h3">{postUserData?.data().name}</h3>
          <span className="subtitle">{postUserData?.data().nickname}</span>
          <span className="post__date">{postDate}</span>
        </div>
        <p className="post__content">{postData.content}</p>
        <div className="post__funcs">
          <div className="post__func">
            <img src={commentBtn} alt="" className="post__func-image" />{postData.comments.length}
          </div>
          <div className="post__func">
            <img src={likeBtn} alt="" className="post__func-image" />{postData.likes.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
