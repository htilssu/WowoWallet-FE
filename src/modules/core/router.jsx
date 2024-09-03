import {createBrowserRouter} from "react-router-dom";
import {PageNotFound} from "./system-component/PageNotFound.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import SignInPage from "../../components/auth/SignInPage.jsx";
import SignUpPage from "../../components/auth/SignUpPage.jsx";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage.jsx";
import {MainLayout} from "./layouts/MainLayout.jsx";
import Home from "../../components/home/HomePage.jsx";
import UnAuthHome from "../../components/home/UnAuthHome.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedLayout/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    {index: true, element: <UnAuthHome/>},
                    {path: "/home", element: <Home/>},
                ]
            }
        ],
        errorElement: <PageNotFound/>,
    }, {
        children: [
            {path: "/sign-in", element: <SignInPage/>},
            {path: "/sign-up", element: <SignUpPage/>},
            {path: "/reset-password", element: <ForgotPasswordPage/>},
        ]
    }
]);