import { useParams, useOutletContext } from "react-router-dom";
import { useGetDocsByArray } from "../../../../common/hooks/useGetDocsByArray";
import Loader from "../../../../common/components/loader/loader";
import UserCard from "../../../layout/components/rightBar/components/UserName/UserCard";
import { useSelector } from 'react-redux';
import { useGetDocData } from "../../../../common/hooks/useGetDocData";
function Followers() {
  const { followers } = useOutletContext();
  const {currentUserID} = useSelector(state => state.auth)
  const {data: currentUserData} = useGetDocData(currentUserID, 'users')
  const { data, isLoading } = useGetDocsByArray(followers, "users");
  if (isLoading) {
    return (
      <div className="follows-page__list">
        <Loader />
      </div>
    );
  }
  return (
    <div className="follows-page__list">
      {data.map((user) => {
        const userData = { id: user?.id, ...user?.data() };
         return <UserCard key={user?.data().id} user={userData} userAmount={8} currentUserFollowing={currentUserData?.data().following}/>
      })}
    </div>
  );
}

export default Followers;
