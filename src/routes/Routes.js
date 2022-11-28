import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Booking from "../dashboard/Booking/Booking";
import Dashboard from "../dashboard/Dashboard/Dashboard";
import DashboardMain from "../dashboard/DashboardLayout/DashboardMain/DashboardMain";
import AddProduct from "../dashboard/Products/AddProduct/AddProduct";
import MyProducts from "../dashboard/Products/MyProducts/MyProducts";
import Buyers from "../dashboard/Users/Buyers/Buyers";
import Sellers from "../dashboard/Users/Sellers/Sellers";
import Users from "../dashboard/Users/Users";
import Main from "../layout/Main/Main";
import NotFound404 from "../others/NotFound404/NotFound404";
import About from "../pages/About/About";
import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import BrandProducts from "../pages/Products/ProductsBrand/BrandProducts/BrandProducts";
import ProductsBrand from "../pages/Products/ProductsBrand/ProductsBrand";
import CategoryProducts from "../pages/Products/ProductsCategory/CategoryProducts/CategoryProducts";
import ProductsCategory from "../pages/Products/ProductsCategory/ProductsCategory";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
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
        path: '/cars',
        element: <Products></Products>
      },
      {
        path: '/category',
        element: <ProductsCategory></ProductsCategory>
      },
      {
        path: '/category/:slug',
        loader: ({ params }) => fetch(`http://localhost:5000/category/${params.slug}`),
        element: <CategoryProducts></CategoryProducts>
      },
      {
        path: '/brand',
        element: <ProductsBrand></ProductsBrand>
      },
      {
        path: '/brand/:slug',
        loader: ({ params }) => fetch(`http://localhost:5000/brand/${params.slug}`),
        element: <BrandProducts></BrandProducts>
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
        path: '/dashboard/bookings',
        element: <PrivateRoutes><Booking></Booking></PrivateRoutes>
      },
      {
        path: '/dashboard/products',
        element: <PrivateRoutes><MyProducts></MyProducts></PrivateRoutes>
      },
      {
        path: '/dashboard/add-product',
        element: <PrivateRoutes><AddProduct></AddProduct></PrivateRoutes>
      },
      {
        path: '/dashboard/sellers',
        element: <AdminRoutes><Sellers></Sellers></AdminRoutes>
      },
      {
        path: '/dashboard/buyers',
        element: <AdminRoutes><Buyers></Buyers></AdminRoutes>
      }
      ,
      {
        path: '/dashboard/users',
        element: <AdminRoutes><Users></Users></AdminRoutes>
      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`https://doctors-portal-server-rust.vercel.app/bookings/${params.id}`)
      }
    ]
  }
])

export default router;