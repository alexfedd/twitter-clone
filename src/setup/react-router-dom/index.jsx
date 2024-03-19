import { createHashRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import SignIn from "../../pages/sign-in/SignIn";
import SignUp from "../../pages/sign-up/SignUp";
import Layout from "../../pages/layout/Layout";
import Post from "../../pages/post/Post";
import Profile from "../../pages/profile/Profile";
import Follows from "../../pages/follows/Follows";
import Following from "../../pages/follows/components/following/Following";
import Followers from "../../pages/follows/components/followers/Followers";
import Edit from "../../pages/edit/Edit";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post/:postId",
        element: <Post />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        element: <Follows />,
        children: [
          {
            element: <Followers />,
            path: "/profile/:userId/followers",
          },
          {
            path: "/profile/:userId/following",
            element: <Following />,
          },
        ],
      },
      {
        path: "/edit",
        element: <Edit />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
