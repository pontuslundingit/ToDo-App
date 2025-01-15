import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specifiera mappen för byggoutputen
  },
  base: '/ToDo-App/', // Lägg till detta för att säkerställa korrekt URL-baserad laddning
})
