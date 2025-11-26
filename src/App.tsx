import { createBrowserRouter, RouterProvider } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Error from "./pages/Error";
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
import UserDashboard from "./dashboard/UserDashboard";
import LessonPage from "./dashboard/LessonPage";
import ScrollBtn from "./ult/scrollBtn/ScrollBtn";
import InstructorDashboard from "./dashboard/InstructorDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import Settings from "./dashboard/admin/Settings";
import { AdminRoute, InstructorRoute, StudentRoute } from "./components/route/RoleBasedRoute";
import InstructorSingleCourse from "./dashboard/admin/InstructorSingleCourse";
import InstructorsCourse from "./dashboard/admin/InstructorsCourse";
import Admin from "./dashboard/admin/Admin";




const App: FC = () => {
  // Custom hook to fetch current user on app load
  useCurrentUser();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // Public routes (accessible to everyone)
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/courses", element: <Courses /> },
        { path: "/course/:id", element: <Course /> },
        { path: "/instructor/:name", element: <InstructorProfilePage /> },
        { path: "/events", element: <Events /> },
        { path: "/events/:id", element: <Event /> },
        { path: "/blogs", element: <Blogs /> },
        { path: "/blogs/:id", element: <Blog /> },
        { path: "/login", element: <Login /> },
        { path: "/terms", element: <Terms /> },
        { path: "/privacy", element: <Privacy /> },


         // Student routes (accessible by admin, instructor, student)
        { 
          path: "/cart", 
          element: <StudentRoute><Cart /></StudentRoute> 
        },
        { 
          path: "/checkout", 
          element: <StudentRoute><CheckOutWrapper /></StudentRoute> 
        },
        { 
          path: "/payment-success", 
          element: <StudentRoute><PaymentSuccess /></StudentRoute> 
        },
        {
          path: "/dashboard",
          element: <StudentRoute><UserDashboard /></StudentRoute>,
          children: [
            {
              index: true,
              element: <div>Welcome to your Dashboard!</div>,
            }
          ],
        },
        { 
          path: "/lesson", 
          element: <StudentRoute><LessonPage /></StudentRoute> 
        },

        // Instructor routes (accessible by admin, instructor)
        { 
          path: "/instructor-dashboard", 
          element: <InstructorRoute><InstructorDashboard /></InstructorRoute> 
        },

        // Admin routes (accessible only by admin)
        {
          path: "/admin",
          element: <AdminRoute><AdminDashboard /></AdminRoute>,
          children: [
            { index: true, element: <Admin/> },
            { path: "instructor-course", element: <InstructorsCourse/> },
            { path: "instructor-course/:id", element: <InstructorSingleCourse /> },
            { path: "settings", element: <Settings/> },
          ],
        },

        { path: "*", element: <Error /> }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      <ScrollBtn />
    </>
  );
};

export default App;
