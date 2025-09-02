import { Outlet } from "react-router";
import Nav from "../navigation/Nav";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
