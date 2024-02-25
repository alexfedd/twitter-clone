import { useSelector } from "react-redux";
import { auth } from "../../setup/auth";
function Home() {
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>HOMEPAGE</h1>
      {userLoggedIn && `Current user id: ${currentUserID}`}
      {auth.currentUser?.email}
    </div>
  );
}

export default Home;
