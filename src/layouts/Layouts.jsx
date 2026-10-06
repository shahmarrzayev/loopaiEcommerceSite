import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Category from "../components/Category/Category";


export default function Layouts() {

  //   const location = useLocation();

  // if (location.pathname !== "/") {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
          <Header />
          {/* <Category/> */}
          <ScrollToTop/>
          <Outlet />
          <Footer/>
    </>
  )
}
