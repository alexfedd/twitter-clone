import Loader from "../../common/components/loader/loader";
import UpperBar from "../../common/components/upperBar/upperBar";
import { useGetDocData } from "../../common/hooks/useGetDocData";
import { NavLink, useParams, Outlet } from "react-router-dom";
import "./style.scss";
function Follows() {
  const { userId } = useParams();
  const { data: userData, isLoading: isUserDataLoading } = useGetDocData(
    userId,
    "users"
  );
  if (isUserDataLoading) {
    return (
      <div className="follows-page">
        <Loader />
      </div>
    );
  }
  return (
    <div className="follows-page">
      <div className="follows-page__upper">
        <UpperBar>
          <div className="follows-page__upper-info">
            <h1 className="title-h2">{userData?.data().name}</h1>
            <span className="subtitle">{userData?.data().nickname}</span>
          </div>
        </UpperBar>
        <div className="follows-page__tabs">
          <NavLink
            to={`/profile/${userId}/followers`}
            className={({ isActive }) =>
              isActive
                ? "follows-page__tab follows-page__tab--active"
                : "follows-page__tab"
            }
          >
            Followers
          </NavLink>
          <NavLink
            to={`/profile/${userId}/following`}
            className={({ isActive }) =>
              isActive
                ? "follows-page__tab follows-page__tab--active"
                : "follows-page__tab"
            }
          >
            Following
          </NavLink>
        </div>
      </div>
      <Outlet context={{following: userData?.data().following, followers: userData?.data().followers}} />
    </div>
  );
}

export default Follows;
