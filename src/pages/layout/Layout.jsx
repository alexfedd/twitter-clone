import LeftBar from "../../common/components/leftBar/LeftBar";
import RightBar from "../../common/components/rightBar/RightBar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="container">
      <LeftBar />
      <Outlet />
      <RightBar />
    </div>
  );
}

export default Layout;
