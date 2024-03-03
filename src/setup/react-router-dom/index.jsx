import { createHashRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import SignIn from "../../pages/sign-in/SignIn";
import SignUp from "../../pages/sign-up/SignUp";
import Layout from "../../pages/layout/Layout";
import Post from "../../pages/post/Post";


export const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/post/:postId',
                element: <Post/>
            },
            {
                path: '/profile/:userId',
                element: <p>This is a user page</p>
            }
        ]
    },
    {
        path: '/sign-in',
        element: <SignIn/>
    },
    {
        path: '/sign-up',
        element: <SignUp/>
    }
]
)