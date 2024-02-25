import { useSelector } from "react-redux";
function Home() {
  const { userLoggedIn, currentUserID } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>HOMEPAGE</h1>
      {userLoggedIn && `Current user id: ${currentUserID}`}
    </div>
  );
}

export default Home;
