import { createBrowserRouter, RouterProvider } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Error from "./pages/Error";
import { UserDashboard } from "./dashboard/UserDashboard";
import PrivateRoute from "./components/route/PrivateRoute";
import Blogs from "./pages/blogs/Blogs";
import Blog from "./pages/blogs/Blog";
import Courses from "./pages/courses/Courses";
import Course from "./pages/courses/Course";
import Home from "./pages/Home";
import Layout from "./components/route/Layout";
import type { FC } from "react";
import Events from "./pages/events/Events";
import Event from "./pages/events/Event";
import { ToastContainer } from "react-toastify";
import Login from "./components/auth/Login";
import { useCurrentUser } from "./components/auth/useCurrentUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Terms from "./pages/Terms";
import Privacy from "./pages/privacy/Privacy";
import About from "./pages/about/About";
import Cart from "./components/cart/Cart";
import CheckOutWrapper from "./components/checkout/CheckOutWrapper";
import PaymentSuccess from "./pages/PaymentSuccess";
import InstructorProfilePage from "./pages/instructor/Instructor";




const App: FC = () => {
  // Custom hook to fetch current user on app load
  useCurrentUser(); 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/courses", element: <Courses /> },
        { path: "/course/:id", element: <Course /> },
        { path: "/instructor/:name", element: <InstructorProfilePage /> },
        { path: "/events", element: <Events /> },
        { path: "/events/:id", element:  <Event />},
        { path: "/blogs", element: <Blogs /> },
        { path: "/blogs/:id", element: <Blog /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <PrivateRoute><CheckOutWrapper/></PrivateRoute>},
        { path: "/payment-success", element: <PaymentSuccess/>},
        { path: "/login", element: <Login /> },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          ),
        },
        { path: "/terms", element: <Terms /> },
        { path: "/privacy", element: <Privacy /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
