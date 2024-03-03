import { Outlet } from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setWindowWidth } from "../../setup/store/reducers/windowSlice";
import { useEffect } from "react";
import Loader from "../../common/components/loader/loader";
function Layout() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { windowWidth } = useSelector((state) => state.window);
  useEffect(() => {
    function handleResize() {
      dispatch(setWindowWidth(window.innerWidth));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container layout">
      <div className="left-bar-wrapper">
        <LeftBar />
      </div>
      <Outlet />
      {windowWidth > 767 && (
        <div className="right-bar-wrapper">
          <RightBar />
        </div>
      )}
    </div>
  );
}

export default Layout;
