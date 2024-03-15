import twitterLogo from "./../../../../assets/svg/layout/twitter-logo.svg";
import homeBtn from "./../../../../assets/svg/layout/homeBtn.svg";
import profileBtn from "./../../../../assets/svg/layout/profileBtn.svg";
import { NavLink } from "react-router-dom";
import { useGetDocData } from "../../../../common/hooks/useGetDocData";
import { useSelector } from "react-redux";
import "./style.scss";
import AccountSettings from "./accountSettings/AccountSettings";
import Loader from "../../../../common/components/loader/loader";

function LeftBar() {
  const {
    currentUserID,
    userLoggedIn,
    isLoading: isCurrentUserLoading,
  } = useSelector((state) => state.auth);
  const { data: currentUserData } = useGetDocData(currentUserID, 'users');
  const {windowWidth} = useSelector(state => state.window)
  if (isCurrentUserLoading) {
    return (
      <div className="layout__left-bar left-bar">
        <Loader />
      </div>
    );
  }
  return (
    <div className="layout__left-bar left-bar">
      <img src={twitterLogo} alt="" className="left-bar__logo" />
      <ul className="left-bar__navigation navigation">
        <li className="navigation__item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "navigation__link navigation__link--active"
                : "navigation__link"
            }
            to={"/"}
          >
            <img className="navigation__image" src={homeBtn} />{(windowWidth > 1023) && 'Home'}
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "navigation__link navigation__link--active"
                : "navigation__link"
            }
            to={userLoggedIn ? `/profile/${currentUserID}` : '/sign-in'}
          >
            <img className="navigation__image" src={profileBtn} />{(windowWidth > 1023) && 'Profile'}
          </NavLink>
        </li>
      </ul>
      <AccountSettings
        userLoggedIn={userLoggedIn}
        currentUserData={currentUserData}
      />
    </div>
  );
}

export default LeftBar;
