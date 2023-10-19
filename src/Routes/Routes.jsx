import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../Layout/Root/Root";
import Home from "../pages/Home/Home";
import BrandsProducts from "../pages/BrandsProducts/BrandsProducts";
import AddProduct from "../pages/AddProduct/AddProduct";

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
        }
      ],
    },
  ]);

export default router;