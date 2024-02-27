import { useSelector } from "react-redux";
import PostForm from './components/PostForm/PostForm';
import { useGetUserData } from './../../common/hooks/useGetUserData';
import { useGetSomeDocs } from "../../common/hooks/useGetSomeDocs";
import PostComponent from "../../common/components/postComponent/PostComponent";
import { useState } from "react";
import './style.scss'
function Home() {
  const [numberOfPosts, setNumberOfPosts] = useState(15)
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  const { data: currentUserData } = useGetUserData(currentUserID, userLoggedIn);
  const {data: postsData, isLoading: isPostsLoading, isError: isPostsError, error: postsError} = useGetSomeDocs(numberOfPosts, 'posts')
  if(isPostsLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className="home">
      {userLoggedIn && <PostForm currentUserData={currentUserData} numberOfPosts={numberOfPosts} />}
      <div className="home__posts-list">
        {isPostsError ? <p>Something went wrong... {postsError.message}</p> : postsData.map(postData => {
          return <PostComponent key={postData.id} postData={postData}/>
        })}
      </div>
    </div>
  );
}

export default Home;
