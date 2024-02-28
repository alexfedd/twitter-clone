import { useGetUsers } from "../../../../common/hooks/useGetUsers";
import { useSelector } from "react-redux";
import UserCard from "./components/UserName/UserCard";
import "./style.scss";
import { useGetSomeDocs } from "../../../../common/hooks/useGetSomeDocs";
import { Fragment } from "react";
function RightBar() {
  const USER_AMOUNT = 8;
  const { data: usersData, isLoading } = useGetSomeDocs(USER_AMOUNT, "users");
  const { currentUserID } = useSelector((state) => state.auth);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="layout__right-bar right-bar">
      <div className="right-bar__users">
        <h2 className="title-h2">Other users</h2>
        <div className="right-bar__users-list">
          {usersData?.pages.map((group, index) => {
            <Fragment key={index}>
              {group.map((user) => {
                if (user.id === currentUserID) {
                  return;
                }
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    currentUserFollowing={
                      usersData.find((item) => item.id === currentUserID)
                        ?.following
                    }
                    userAmount={USER_AMOUNT}
                  />
                );
              })}
            </Fragment>;
          })}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
