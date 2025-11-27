import { Outlet } from "react-router";
import { Suspense } from "react";
import Nav from "../navigation/Nav";
import Footer from "../footer/Footer";
import Loader from "../../ult/loader/Loader";

const Layout = () => {
  return (
    <div className="bg-gray-100 text-zinc-500">
      <Nav />

      {/* Loader while lazy pages load */}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Layout;
