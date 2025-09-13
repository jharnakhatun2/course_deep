import { createBrowserRouter, RouterProvider } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Error from "./pages/Error";
import { UserDashboard } from "./dashboard/UserDashboard";
import CheckOut from "./pages/CheckOut";
import PrivateRoute from "./components/route/PrivateRoute";
import Blogs from "./pages/blogs/Blogs";
import Blog from "./pages/blogs/Blog";
import Faq from "./components/Faq";
import Courses from "./pages/courses/Courses";
import Course from "./pages/courses/Course";
import Home from "./pages/Home";
import Layout from "./components/route/Layout";
import type { FC } from "react";
import Contact from "./pages/Contact";
import Events from "./pages/events/Events";
import Event from "./pages/events/Event";
import { ToastContainer } from "react-toastify";
import Login from "./components/auth/Login";
import { useCurrentUser } from "./components/auth/useCurrentUser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: FC = () => {
  useCurrentUser(); // Custom hook to fetch current user on app load
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/courses",
          loader: async () => {
            return fetch(
              "https://assignment-ten-server-sage.vercel.app/courses"
            );
          },
          element: <Courses />,
        },
        {
          path: "/course/:id",
          loader: async ({ params }) => {
            return fetch(
              `https://assignment-ten-server-sage.vercel.app/courses/${params.id}`
            );
          },
          element: <Course />,
        },
        { path: "/events", element: <Events /> },
        { path: "/events/:title", element: <Event /> },

        { path: "/faq", element: <Faq /> },
        { path: "/blog", element: <Blogs /> },
        { path: "/blog/:title", element: <Blog /> },
        {
          path: "/checkout",
          element: (
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          ),
        },
        { path: "/contact", element: <Contact /> },
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
