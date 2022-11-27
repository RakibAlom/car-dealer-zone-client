import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Dashboard from "../dashboard/Dashboard/Dashboard";
import DashboardMain from "../dashboard/DashboardLayout/DashboardMain/DashboardMain";
import AddProduct from "../dashboard/Products/AddProduct/AddProduct";
import MyProducts from "../dashboard/Products/MyProducts/MyProducts";
import Users from "../dashboard/Users/Users";
import Main from "../layout/Main/Main";
import NotFound404 from "../others/NotFound404/NotFound404";
import About from "../pages/About/About";
import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import AdminRoute from "./AdminRoutes/AdminRoutes";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

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
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
      },
      {
        path: '/dashboard/products',
        element: <AdminRoutes><MyProducts></MyProducts></AdminRoutes>
      },
      {
        path: '/dashboard/add-product',
        element: <AdminRoutes><AddProduct></AddProduct></AdminRoutes>
      },
      {
        path: '/dashboard/users',
        element: <AdminRoutes><Users></Users></AdminRoutes>
      }
    ]
  }
])

export default router;