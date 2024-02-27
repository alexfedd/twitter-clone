import { Outlet } from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import "./style.scss";
import { useSelector } from "react-redux";
function Layout() {
  const { isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container layout">
      <div className="left-bar-wrapper">
        <LeftBar />
      </div>
      <Outlet />
      <div className="right-bar-wrapper">
        <RightBar />
      </div>
    </div>
  );
}

export default Layout;
