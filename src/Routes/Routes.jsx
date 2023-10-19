import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../Layout/Root/Root";
import Home from "../pages/Home/Home";
import BrandsProducts from "../pages/BrandsProducts/BrandsProducts";
import AddProduct from "../pages/AddProduct/AddProduct";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: '/brandproducts/:name',
          element: <BrandsProducts/>,
        },,
        {
          path: "/addproduct",
          element: <AddProduct/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/signup",
          element: <Signup/>,
        },
      ],
    },
  ]);

export default router;