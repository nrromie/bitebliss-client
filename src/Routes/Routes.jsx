import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../Layout/Root/Root";
import Home from "../pages/Home/Home";
import BrandsProducts from "../pages/BrandsProducts/BrandsProducts";
import AddProduct from "../pages/AddProduct/AddProduct";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import Cart from "../pages/Cart/Cart";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/brandproducts/:name',
        element: <BrandsProducts />
      }, ,
      {
        path: "/addproduct",
        element: <PrivateRoutes><AddProduct /></PrivateRoutes>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: '/update/:id',
        element: <UpdateProduct />
      },
      {
        path: '/details/:id',
        element: <PrivateRoutes><ProductDetails /></PrivateRoutes>
      },
      {
        path: '/cart',
        element: <PrivateRoutes><Cart /></PrivateRoutes>
      }
    ],
  },
]);

export default router;