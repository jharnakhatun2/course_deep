import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, type FC, type ReactNode, useEffect, startTransition } from "react";
import { ToastContainer } from "react-toastify";
import ScrollBtn from "./ult/scrollBtn/ScrollBtn";
import { useCurrentUser } from "./components/auth/useCurrentUser";
import { AdminRoute, InstructorRoute, StudentRoute } from "./components/route/RoleBasedRoute";
import Loader from "./ult/loader/Loader";

// Critical CSS only - load immediately
import "swiper/css";
import "swiper/css/navigation";

// Lazy load non-critical CSS with error handling
const loadNonCriticalCSS = () => {
  if (typeof window !== 'undefined') {
    import("swiper/css/pagination").catch(() => {});
    import("slick-carousel/slick/slick.css").catch(() => {});
    import("slick-carousel/slick/slick-theme.css").catch(() => {});
  }
};

// Optimized lazy imports with proper chunk naming
const Layout = lazy(() => import(/* webpackChunkName: "layout" */ "./components/route/Layout"));
const Home = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home"));
const About = lazy(() => import(/* webpackChunkName: "about" */ "./pages/about/About"));
const Courses = lazy(() => import(/* webpackChunkName: "courses" */ "./pages/courses/Courses"));
const Course = lazy(() => import(/* webpackChunkName: "course" */ "./pages/courses/Course"));
const Login = lazy(() => import(/* webpackChunkName: "auth" */ "./components/auth/Login"));
const Terms = lazy(() => import(/* webpackChunkName: "legal" */ "./pages/Terms"));
const Privacy = lazy(() => import(/* webpackChunkName: "legal" */ "./pages/privacy/Privacy"));
const ErrorPage = lazy(() => import(/* webpackChunkName: "error" */ "./pages/Error"));

// Heavy components - lazy load with prefetch hint
const InstructorProfilePage = lazy(() => 
  import(/* webpackChunkName: "instructor" */ "./pages/instructor/Instructor")
);
const Events = lazy(() => 
  import(/* webpackChunkName: "events" */ "./pages/events/Events")
);
const Event = lazy(() => 
  import(/* webpackChunkName: "events" */ "./pages/events/Event")
);
const Blogs = lazy(() => 
  import(/* webpackChunkName: "blogs" */ "./pages/blogs/Blogs")
);
const Blog = lazy(() => 
  import(/* webpackChunkName: "blogs" */ "./pages/blogs/Blog")
);

// Dashboard chunks - heavy, load only when needed
const UserDashboard = lazy(() => 
  import(/* webpackChunkName: "dashboard-user" */ "./dashboard/UserDashboard")
);
const LessonPage = lazy(() => 
  import(/* webpackChunkName: "lesson" */ "./dashboard/LessonPage")
);
const InstructorDashboard = lazy(() => 
  import(/* webpackChunkName: "dashboard-instructor" */ "./dashboard/InstructorDashboard")
);
const AdminDashboard = lazy(() => 
  import(/* webpackChunkName: "dashboard-admin" */ "./dashboard/AdminDashboard")
);

// Payment chunks
const Cart = lazy(() => 
  import(/* webpackChunkName: "payment" */ "./components/cart/Cart")
);
const CheckOutWrapper = lazy(() => 
  import(/* webpackChunkName: "payment" */ "./components/checkout/CheckOutWrapper")
);
const PaymentSuccess = lazy(() => 
  import(/* webpackChunkName: "payment" */ "./pages/PaymentSuccess")
);

// Admin chunks
const Settings = lazy(() => 
  import(/* webpackChunkName: "admin" */ "./dashboard/admin/Settings")
);
const InstructorSingleCourse = lazy(() => 
  import(/* webpackChunkName: "admin" */ "./dashboard/admin/InstructorSingleCourse")
);
const InstructorsCourse = lazy(() => 
  import(/* webpackChunkName: "admin" */ "./dashboard/admin/InstructorsCourse")
);
const Admin = lazy(() => 
  import(/* webpackChunkName: "admin" */ "./dashboard/admin/Admin")
);

// Create a reusable Suspense wrapper component with optimized fallback
const RouteSuspense: FC<{ children: ReactNode }> = ({ children }) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader /></div>}>
    {children}
  </Suspense>
);

// Preload function for critical routes
const preloadCriticalRoutes = () => {
  // Preload home and layout immediately after app loads
  const preloadHome = import(/* webpackChunkName: "home" */ "./pages/Home");
  const preloadLayout = import(/* webpackChunkName: "layout" */ "./components/route/Layout");
  
  return Promise.all([preloadHome, preloadLayout]);
};

const App = () => {
  // Use startTransition for non-urgent updates
  useCurrentUser();

  // Load non-critical CSS after initial render with optimization
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        loadNonCriticalCSS();
      });
    }, 3000); // Increased delay to ensure critical content loads first
    
    // Preload critical routes
    const preloadTimer = setTimeout(() => {
      preloadCriticalRoutes().catch(() => {});
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(preloadTimer);
    };
  }, []);

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

        // Student routes - heavy, load only when authenticated
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
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ScrollBtn />
    </>
  );
};

export default App;