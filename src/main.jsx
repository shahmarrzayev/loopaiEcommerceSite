import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layouts from "./layouts/Layouts.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Basket from "./pages/Basket/Basket.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProductsFilter from "./pages/ProductsFilter/ProductsFilter.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import OnlinePaymetStatusPage from "./pages/OnlinePaymetStatusPage/OnlinePaymetStatusPage.jsx";
import DeliveryTerms from "./pages/DeliveryTerms/DeliveryTerms.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy.jsx";
import Rules from "./pages/Rules/Rules.jsx";
import LocaleCategoryProducts from "./pages/LocaleCategoryProducts/LocaleCategoryProducts.jsx";
import LocaleProductDetail from "./pages/LocaleProductDetail/LocaleProductDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <ProductsFilter />,
      },
      {
        path: "/sebetim",
        element: <Basket />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/haqqimizda",
        element: <About />, 
      },
      // {
      //   path: "/details/:slug",
      //   element: <ProductDetail />,
      // },
      { 
        path: "/:slug",
        element: <ProductsFilter />,  
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
      {
        path: "/online-payment/status",
        element: <OnlinePaymetStatusPage />,
      },
      {
        path: "/Çatdırılma-şərtləri",
        element: <DeliveryTerms />,
      },
      {
        path: "/Gizlilik-siyasəti",
        element: <PrivacyPolicy />,
      },
      {
        path: "/Qaydalar",
        element: <Rules />,
      },
       {
        path: "/category/:slug",
        element: <LocaleCategoryProducts />,
      },
         {
        path: "/details/:slug",
        element: <LocaleProductDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
