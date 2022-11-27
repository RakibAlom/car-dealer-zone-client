import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Dashboard from "../dashboard/Dashboard/Dashboard";
import DashboardMain from "../dashboard/DashboardLayout/DashboardMain/DashboardMain";
import Main from "../layout/Main/Main";
import NotFound404 from "../others/NotFound404/NotFound404";
import About from "../pages/About/About";
import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
      ,
      {
        path: '/*',
        element: <NotFound404></NotFound404>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardMain></DashboardMain>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      }
    ]
  }
])

export default router;