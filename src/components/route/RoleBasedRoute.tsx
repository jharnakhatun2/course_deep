import type { FC } from "react";
import PrivateRoute from "./PrivateRoute";


// Admin only routes (only admin can access)
export const AdminRoute: FC<{ children: React.ReactNode }> = ({ children }) => (
  <PrivateRoute allowedRoles={["admin"]}>
    {children}
  </PrivateRoute>
);

// Instructor routes (admin and instructor can access)
export const InstructorRoute: FC<{ children: React.ReactNode }> = ({ children }) => (
  <PrivateRoute allowedRoles={["admin", "instructor"]}>
    {children}
  </PrivateRoute>
);

// Student routes (all authenticated users can access)
export const StudentRoute: FC<{ children: React.ReactNode }> = ({ children }) => (
  <PrivateRoute allowedRoles={["admin", "instructor", "student"]}>
    {children}
  </PrivateRoute>
);
