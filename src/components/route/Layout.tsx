import { Outlet } from "react-router";
import Nav from "../navigation/Nav";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div className="bg-gray-100">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
