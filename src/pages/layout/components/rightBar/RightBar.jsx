import { useSelector } from "react-redux";
import UserCard from "./components/UserName/UserCard";
import "./style.scss";
import { useGetSomeDocs } from "../../../../common/hooks/useGetSomeDocs";
import { collection, limit, query } from "firebase/firestore";
import { db } from "../../../../setup/auth";
import Loader from "../../../../common/components/loader/loader";
import { useParams } from 'react-router-dom';
function RightBar() {
  const {userId} = useParams();
  const USER_AMOUNT = 8;
  const q = query(collection(db,'users'), limit(USER_AMOUNT))
  const { data: usersData, isLoading } = useGetSomeDocs(USER_AMOUNT, 'users', q);
  const { currentUserID } = useSelector((state) => state.auth);
  if (isLoading) {
    return <div className="layout__right-bar right-bar">
      <Loader />
    </div>;
  }
  console.log('render');
  return (
    <div className="layout__right-bar right-bar">
      <div className="right-bar__users">
        <h2 className="title-h2">Other users</h2>
        <div className="right-bar__users-list">
          {usersData.map((user) => {
            if (user.id === currentUserID || (userId && userId === user.id)) {
              return;
            }
            return (
              <UserCard
                key={user.id}
                user={user}
                currentUserFollowing={
                  usersData.find((item) => item.id === currentUserID)?.following
                }
                userAmount={USER_AMOUNT}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
