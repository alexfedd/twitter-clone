import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import SignIn from "../../pages/sign-in/SignIn";
import SignUp from "../../pages/sign-up/SignUp";
import Layout from "../../pages/layout/Layout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home/>
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
])