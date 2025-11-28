// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          stripe: ['@stripe/react-stripe-js', '@stripe/stripe-js', 'stripe'],
          pdf: ['html2canvas', 'jspdf'],
          carousel: ['swiper', 'slick-carousel', 'react-slick'],
          utils: ['axios', 'qrcode', 'jszip', 'file-saver', 'uuid'],
          icons: ['react-icons'],
          animation: ['lottie-react'],
          state: ['@reduxjs/toolkit', 'react-redux', 'redux']
        },
      },
    },
    chunkSizeWarningLimit: 1600,
    minify: 'esbuild',
    target: 'esnext'
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})