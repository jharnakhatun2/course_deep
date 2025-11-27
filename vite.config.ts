import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Group by node_modules packages
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('axios') || id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'vendor';
            }
            if (id.includes('html2canvas')) {
              return 'html2canvas';
            }
            if (id.includes('jspdf')) {
              return 'jspdf';
            }
            if (id.includes('lottie-web')) {
              return 'lottie';
            }
            if (id.includes('swiper') || id.includes('slick-carousel')) {
              return 'ui-libs';
            }
            // Default vendor chunk for other node_modules
            return 'vendor';
          }
          
          // Group your own components by feature
          if (id.includes('src/')) {
            // Dashboard-related components
            if (id.includes('dashboard/UserDashboard') || 
                id.includes('dashboard/LessonPage') || 
                id.includes('dashboard/InstructorDashboard') || 
                id.includes('dashboard/AdminDashboard')) {
              return 'dashboard';
            }
            
            // Admin components
            if (id.includes('dashboard/admin/Settings') || 
                id.includes('dashboard/admin/InstructorSingleCourse') || 
                id.includes('dashboard/admin/InstructorsCourse') || 
                id.includes('dashboard/admin/Admin')) {
              return 'admin';
            }
            
            // Course-related pages
            if (id.includes('pages/courses/Courses') || 
                id.includes('pages/courses/Course')) {
              return 'courses';
            }
            
            // Blog-related pages
            if (id.includes('pages/blogs/Blogs') || 
                id.includes('pages/blogs/Blog')) {
              return 'blogs';
            }
            
            // Event-related pages  
            if (id.includes('pages/events/Events') || 
                id.includes('pages/events/Event')) {
              return 'events';
            }
          }
        }
      },
    },
    chunkSizeWarningLimit: 1500, 
  },
});