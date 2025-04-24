import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración corregida
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@': '/src' // Para usar importaciones como '@/components/Navbar'
    }
  }
})

