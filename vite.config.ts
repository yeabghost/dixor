import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Ensure JSX is recognized
  },
  server: {
    allowedHosts: ['335e-196-189-89-250.ngrok-free.app']
  }
})
