/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ModalWindow from "./modalWindow/ModalWindow";
import { useSignOut } from "../../../../../common/hooks/useSignOut";
import { useToggle } from "../../../../../common/hooks/useToggle";
import ProfileComponent from "../../../../../common/components/profileComponent/ProfileComponent";
import "./style.scss";
function AccountSettings({ userLoggedIn, currentUserData }) {
  const signOutHandle = useSignOut();
  const [isModalOpen, toggleModal] = useToggle();
  return (
    <>
      {isModalOpen && (
        <ModalWindow toggleModal={toggleModal}>
          {userLoggedIn ? (
            <p
              onClick={() => {
                signOutHandle.mutate();
              }}
            >
              Sign out
            </p>
          ) : (
            <Link style={{ color: "#FFFFFF" }} to={"/sign-in"}>
              Sign in
            </Link>
          )}
        </ModalWindow>
      )}
      <div className="left-bar__user-setting" onClick={toggleModal}>
        <ProfileComponent
          onHandleClick={toggleModal}
          nickname={userLoggedIn ? currentUserData?.data().nickname : ""}
          name={userLoggedIn ? currentUserData?.data().name : "Sign in"}
          pfpUrl={userLoggedIn ? currentUserData?.data().pfp : 'default_pfp.svg'}
        />
      </div>
    </>
  );
}

export default AccountSettings;
