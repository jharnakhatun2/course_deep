import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import ScrollBtn from "./ult/scrollBtn/ScrollBtn";
import { useCurrentUser } from "./components/auth/useCurrentUser";
import { AdminRoute, InstructorRoute, StudentRoute } from "./components/route/RoleBasedRoute";

// Global CSS imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./ult/loader/Loader";

// Lazy-loaded pages (code-splitting)
const Layout = lazy(() => import("./components/route/Layout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/about/About"));
const Courses = lazy(() => import("./pages/courses/Courses"));
const Course = lazy(() => import("./pages/courses/Course"));
const InstructorProfilePage = lazy(() => import("./pages/instructor/Instructor"));
const Events = lazy(() => import("./pages/events/Events"));
const Event = lazy(() => import("./pages/events/Event"));
const Blogs = lazy(() => import("./pages/blogs/Blogs"));
const Blog = lazy(() => import("./pages/blogs/Blog"));
const Login = lazy(() => import("./components/auth/Login"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/privacy/Privacy"));
const Cart = lazy(() => import("./components/cart/Cart"));
const CheckOutWrapper = lazy(() => import("./components/checkout/CheckOutWrapper"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const UserDashboard = lazy(() => import("./dashboard/UserDashboard"));
const LessonPage = lazy(() => import("./dashboard/LessonPage"));
const InstructorDashboard = lazy(() => import("./dashboard/InstructorDashboard"));
const AdminDashboard = lazy(() => import("./dashboard/AdminDashboard"));
const Settings = lazy(() => import("./dashboard/admin/Settings"));
const InstructorSingleCourse = lazy(() => import("./dashboard/admin/InstructorSingleCourse"));
const InstructorsCourse = lazy(() => import("./dashboard/admin/InstructorsCourse"));
const Admin = lazy(() => import("./dashboard/admin/Admin"));
const ErrorPage = lazy(() => import("./pages/Error"));

// Create a reusable Suspense wrapper component
const RouteSuspense: FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<div><Loader /></div>}>
    {children}
  </Suspense>
);

const App = () => {
  useCurrentUser(); // fetch user on load

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RouteSuspense>
          <Layout />
        </RouteSuspense>
      ),
      errorElement: (
        <RouteSuspense>
          <ErrorPage />
        </RouteSuspense>
      ),
      children: [
        { 
          index: true, 
          element: (
            <RouteSuspense>
              <Home />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/about", 
          element: (
            <RouteSuspense>
              <About />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/courses", 
          element: (
            <RouteSuspense>
              <Courses />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/course/:id", 
          element: (
            <RouteSuspense>
              <Course />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/instructor/:name", 
          element: (
            <RouteSuspense>
              <InstructorProfilePage />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/events", 
          element: (
            <RouteSuspense>
              <Events />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/events/:id", 
          element: (
            <RouteSuspense>
              <Event />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/blogs", 
          element: (
            <RouteSuspense>
              <Blogs />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/blogs/:id", 
          element: (
            <RouteSuspense>
              <Blog />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/login", 
          element: (
            <RouteSuspense>
              <Login />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/terms", 
          element: (
            <RouteSuspense>
              <Terms />
            </RouteSuspense>
          ) 
        },
        { 
          path: "/privacy", 
          element: (
            <RouteSuspense>
              <Privacy />
            </RouteSuspense>
          ) 
        },

        // Student routes
        { 
          path: "/cart",
          element: (
            <StudentRoute>
              <RouteSuspense>
                <Cart />
              </RouteSuspense>
            </StudentRoute>
          ),
        },
        { 
          path: "/checkout",
          element: (
            <StudentRoute>
              <RouteSuspense>
                <CheckOutWrapper />
              </RouteSuspense>
            </StudentRoute>
          ),
        },
        { 
          path: "/payment-success",
          element: (
            <StudentRoute>
              <RouteSuspense>
                <PaymentSuccess />
              </RouteSuspense>
            </StudentRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <StudentRoute>
              <RouteSuspense>
                <UserDashboard />
              </RouteSuspense>
            </StudentRoute>
          ),
        },
        { 
          path: "/lesson",
          element: (
            <StudentRoute>
              <RouteSuspense>
                <LessonPage />
              </RouteSuspense>
            </StudentRoute>
          ),
        },

        // Instructor routes
        {
          path: "/instructor-dashboard",
          element: (
            <InstructorRoute>
              <RouteSuspense>
                <InstructorDashboard />
              </RouteSuspense>
            </InstructorRoute>
          ),
        },

        // Admin routes
        {
          path: "/admin",
          element: (
            <AdminRoute>
              <RouteSuspense>
                <AdminDashboard />
              </RouteSuspense>
            </AdminRoute>
          ),
          children: [
            { 
              index: true, 
              element: (
                <RouteSuspense>
                  <Admin />
                </RouteSuspense>
              ) 
            },
            { 
              path: "instructor-course", 
              element: (
                <RouteSuspense>
                  <InstructorsCourse />
                </RouteSuspense>
              ) 
            },
            { 
              path: "instructor-course/:id", 
              element: (
                <RouteSuspense>
                  <InstructorSingleCourse />
                </RouteSuspense>
              ) 
            },
            { 
              path: "settings", 
              element: (
                <RouteSuspense>
                  <Settings />
                </RouteSuspense>
              ) 
            },
          ],
        },
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